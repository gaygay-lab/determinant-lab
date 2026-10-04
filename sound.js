/*
 * Determinant Lab: quiet wood, paper and soft-glass feedback.
 * Synthesis concepts informed by Danny Williams' UI Sound Design Skill (MIT).
 * Copyright (c) 2026 Danny Williams — license and source notes: sound-sources.txt.
 * No audio assets, dependencies, network calls, or sound on page load.
 */
(function (global) {
  'use strict';
  if (global.LabSound) return;

  const STORAGE_KEY = 'determinant-lab-sound-v1';
  const MASTER_CEILING = 0.28;
  const MAX_VOICES = 6;
  const COOLDOWN = Object.freeze({select:85, move:110, swap:170, zero:95,
    extract:180, undo:150, invalid:450, success:800, reset:250});
  const active = new Set();
  const recent = new Map();
  let context = null, master = null, noiseBuffer = null, resumePromise = null, masterLevel = 0;
  let initialized = false, gestureDepth = 0, generation = 0, lastGlobal = -Infinity;
  let error = null, explicitPreference = false, reducedMotion = false;
  let enabled = true, volume = 0.4, motionQuery = null;

  const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  };
  const safely = (fn) => { try { return fn(); } catch (_) { return undefined; } };
  const clock = () => global.performance ? global.performance.now() : Date.now();

  function readPreferences() {
    safely(() => {
      motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotion = motionQuery.matches;
    });
    enabled = !reducedMotion;
    safely(() => {
      const stored = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || 'null');
      if (!stored || typeof stored !== 'object') return;
      if (typeof stored.enabled === 'boolean') {
        enabled = stored.enabled;
        explicitPreference = true;
      }
      if (typeof stored.volume === 'number') volume = clamp(stored.volume, 0, 1, 0.4);
    });
  }

  function persist() {
    safely(() => global.localStorage.setItem(STORAGE_KEY,
      JSON.stringify(explicitPreference ? {enabled, volume} : {volume})));
  }

  function status() {
    return {enabled, volume, available:!!(global.AudioContext || global.webkitAudioContext),
      initialized, unlocked:!!context && context.state === 'running',
      contextState:context ? context.state : 'uninitialized', activeVoices:active.size,
      reducedMotion, explicitPreference, lastError:error};
  }

  function notify() {
    safely(() => global.dispatchEvent(new global.CustomEvent('labsoundchange', {detail:status()})));
  }

  function inGesture() {
    return gestureDepth > 0 || !!(global.navigator && global.navigator.userActivation &&
      global.navigator.userActivation.isActive);
  }

  function updateMaster(immediate) {
    if (!context || !master || context.state === 'closed') return;
    safely(() => {
      const now = context.currentTime;
      const value = enabled ? volume * MASTER_CEILING : 0;
      master.gain.cancelScheduledValues(now);
      // Track the scheduled level: AudioParam.value can still be its default
      // during the first render quantum, causing an unwanted full-gain transient.
      master.gain.setValueAtTime(immediate ? value : masterLevel, now);
      if (!immediate) master.gain.linearRampToValueAtTime(value, now + 0.02);
      masterLevel = value;
    });
  }

  function stopAll() {
    generation += 1;
    for (const voice of Array.from(active)) voice.dispose(true);
    recent.clear();
    lastGlobal = -Infinity;
  }

  // Creation/resume is only reached from a current, genuine user activation.
  function ensureAudio() {
    try {
      if (!enabled || volume === 0) return Promise.resolve(false);
      if (context && context.state === 'running') return Promise.resolve(true);
      if (resumePromise) return resumePromise;
      if (!inGesture()) return Promise.resolve(false);
      if (!context) {
        const Audio = global.AudioContext || global.webkitAudioContext;
        if (!Audio) { error = 'unsupported'; return Promise.resolve(false); }
        context = new Audio({latencyHint:'interactive'});
        master = context.createGain();
        const softener = context.createBiquadFilter();
        softener.type = 'lowpass';
        softener.frequency.value = 4200;
        softener.Q.value = 0.6;
        master.connect(softener);
        softener.connect(context.destination);
        updateMaster(true);
        noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.8), context.sampleRate);
        const samples = noiseBuffer.getChannelData(0);
        for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
        context.onstatechange = notify;
      }
      if (context.state === 'closed') { error = 'closed'; return Promise.resolve(false); }
      if (context.state === 'running') { error = null; notify(); return Promise.resolve(true); }
      resumePromise = Promise.resolve(context.resume())
        .then(() => { error = null; notify(); return context.state === 'running'; })
        .catch(() => { error = 'resume-blocked'; notify(); return false; })
        .finally(() => { resumePromise = null; });
      return resumePromise;
    } catch (_) {
      error = 'audio-unavailable';
      return Promise.resolve(false);
    }
  }

  function onGesture(event) {
    if (!event.isTrusted || (event.type === 'keydown' && event.repeat)) return;
    gestureDepth += 1;
    ensureAudio().catch(() => false);
    gestureDepth -= 1;
  }

  function init() {
    if (initialized) return status();
    initialized = true;
    safely(() => {
      global.document.addEventListener('pointerdown', onGesture, {capture:true, passive:true});
      global.document.addEventListener('keydown', onGesture, {capture:true, passive:true});
      global.document.addEventListener('visibilitychange', () => {
        if (global.document.hidden) stopAll();
      });
      global.addEventListener('pagehide', stopAll);
    });
    safely(() => {
      const onPreference = (event) => {
        reducedMotion = event.matches;
        if (!explicitPreference) {
          enabled = !reducedMotion;
          updateMaster(true);
          if (!enabled) stopAll();
        }
        notify();
      };
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onPreference);
      else if (motionQuery.addListener) motionQuery.addListener(onPreference);
    });
    return status();
  }

  function createVoice(now, pan, moving) {
    const nodes = [], sources = [];
    let disposed = false, remaining = 0, timer = null;
    const keep = node => { nodes.push(node); return node; };
    let bus;
    try {
      bus = keep(context.createGain());
      bus.gain.value = 0.75;
      if (context.createStereoPanner) {
        const panner = keep(context.createStereoPanner());
        panner.pan.setValueAtTime(moving ? 0 : pan, now);
        if (moving) panner.pan.linearRampToValueAtTime(pan, now + 0.14);
        bus.connect(panner); panner.connect(master);
      } else bus.connect(master);
    } catch (error) {
      for (const node of nodes) safely(() => node.disconnect());
      throw error;
    }
    const voice = {
      dispose(stop) {
        if (disposed) return;
        disposed = true;
        if (timer !== null) global.clearTimeout(timer);
        for (const source of sources) {
          source.onended = null;
          if (stop) safely(() => source.stop());
        }
        for (const node of nodes) safely(() => node.disconnect());
        active.delete(voice);
      },
      finish(duration) {
        // Cleanup still happens if a tab suspension prevents `ended` dispatch.
        timer = global.setTimeout(() => voice.dispose(true), (duration + 2) * 1000);
      }
    };
    function sourceDone() {
      remaining -= 1;
      if (remaining === 0) voice.dispose(false);
    }
    function envelope(peak, start, duration, attack) {
      const gain = keep(context.createGain());
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + attack);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      gain.gain.linearRampToValueAtTime(0, start + duration + 0.008);
      return gain;
    }
    function route(node, destination, localPan) {
      if (localPan && context.createStereoPanner) {
        const panner = keep(context.createStereoPanner());
        panner.pan.setValueAtTime(localPan, now);
        node.connect(panner); panner.connect(destination);
      } else node.connect(destination);
    }
    voice.tone = function (frequency, endFrequency, duration, peak, delay=0, localPan=0, attack=0.004) {
      const start = now + delay;
      const source = keep(context.createOscillator());
      sources.push(source); remaining += 1;
      source.type = 'sine';
      source.frequency.setValueAtTime(frequency, start);
      source.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
      const gain = envelope(peak, start, duration, attack);
      source.connect(gain); route(gain, bus, localPan);
      source.onended = sourceDone;
      source.start(start); source.stop(start + duration + 0.015);
    };
    voice.noise = function (frequency, endFrequency, duration, peak, delay=0, localPan=0, attack=0.004, q=1) {
      const start = now + delay;
      const source = keep(context.createBufferSource());
      sources.push(source); remaining += 1;
      source.buffer = noiseBuffer;
      const filter = keep(context.createBiquadFilter());
      filter.type = 'bandpass'; filter.Q.value = q;
      filter.frequency.setValueAtTime(frequency, start);
      filter.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
      const gain = envelope(peak, start, duration, attack);
      source.connect(filter); filter.connect(gain); route(gain, bus, localPan);
      source.onended = sourceDone;
      source.start(start, Math.random() * 0.1);
      source.stop(start + duration + 0.015);
    };
    active.add(voice);
    return voice;
  }

  function wood(voice, delay, pan, weight=1) {
    voice.noise(1100, 720, 0.045, 0.38 * weight, delay, pan, 0.002, 2.4);
    voice.tone(420, 340, 0.055, 0.16 * weight, delay, pan);
  }

  function compose(name, voice) {
    switch (name) {
      case 'select': wood(voice, 0, 0, 0.8); return 0.08;
      case 'move':
        voice.noise(1550, 600, 0.18, 0.38, 0, 0, 0.025, 0.8);
        voice.noise(780, 420, 0.09, 0.13, 0.075, 0, 0.016, 1.2);
        return 0.21;
      case 'swap': wood(voice, 0, -0.4); wood(voice, 0.078, 0.4, 0.85); return 0.16;
      case 'zero':
        voice.tone(620, 260, 0.068, 0.3);
        voice.noise(900, 580, 0.027, 0.08, 0, 0, 0.002);
        return 0.1;
      case 'extract':
        voice.tone(880, 876, 0.2, 0.26);
        voice.tone(1870, 1865, 0.085, 0.048, 0.003);
        return 0.23;
      case 'undo':
        voice.noise(620, 1100, 0.085, 0.23, 0, 0, 0.017, 1.4);
        voice.tone(410, 310, 0.085, 0.16, 0.055);
        return 0.17;
      case 'invalid':
        voice.tone(280, 260, 0.085, 0.23, 0, -0.08, 0.01);
        voice.tone(245, 230, 0.11, 0.21, 0.12, 0.08, 0.01);
        return 0.26;
      case 'success':
        voice.tone(523.25, 523.25, 0.26, 0.19, 0, -0.18, 0.012);
        voice.tone(659.25, 659.25, 0.27, 0.16, 0.07, 0, 0.012);
        voice.tone(783.99, 783.99, 0.28, 0.13, 0.13, 0.18, 0.012);
        return 0.44;
      case 'reset':
        voice.noise(1050, 500, 0.125, 0.26, 0, 0, 0.022, 0.7);
        wood(voice, 0.095, 0, 0.55);
        return 0.18;
      default: return 0;
    }
  }

  async function play(name, options={}) {
    let voice = null;
    try {
      init();
      if (!Object.prototype.hasOwnProperty.call(COOLDOWN, name) || !enabled || volume === 0) return false;
      if (global.document && global.document.hidden) return false;
      const token = generation;
      if (!await ensureAudio() || token !== generation || !enabled || volume === 0) return false;
      const at = clock();
      if (at - (recent.get(name) ?? -Infinity) < COOLDOWN[name] || at - lastGlobal < 28) return false;
      recent.set(name, at); lastGlobal = at;
      while (active.size >= MAX_VOICES) active.values().next().value.dispose(true);
      const now = context.currentTime;
      const pan = clamp(options && options.pan, -0.85, 0.85, 0);
      voice = createVoice(now, pan, name === 'move');
      const duration = compose(name, voice);
      voice.finish(duration);
      return true;
    } catch (_) {
      if (voice) voice.dispose(true);
      error = 'playback-unavailable';
      return false;
    }
  }

  function setEnabled(value) {
    enabled = !!value;
    explicitPreference = true;
    updateMaster(!enabled);
    if (!enabled) stopAll();
    persist(); notify();
    if (enabled && inGesture()) ensureAudio().catch(() => false);
    return enabled;
  }

  function setVolume(value) {
    volume = clamp(value, 0, 1, volume);
    updateMaster(volume === 0);
    if (volume === 0) stopAll();
    persist(); notify();
    return volume;
  }

  readPreferences();
  global.LabSound = Object.freeze({init, play, setEnabled, setVolume,
    isEnabled:() => enabled, getVolume:() => volume, status,
    preview:(name='select') => play(name)});
})(window);
