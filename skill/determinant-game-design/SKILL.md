---
name: determinant-game-design
description: "Design and improve forgiving educational web games with strong first-minute onboarding, expressive feedback, accessible interaction, and reversible GitHub Pages delivery."
---

# Determinant Game Design

Use this skill when the user wants an educational game or interactive lesson to feel easier, more visual, more playful, or less likely to lose a first-time player. It applies especially to browser games where the subject matter is mathematical, symbolic, or procedural and the player must learn the controls while learning the concept.

The skill owns the player experience. A correct calculation is not enough: the first minute must make the player understand what to do, see a satisfying result, and know why the result is meaningful.

## Experience contract

Before changing code, write a short read:

`Read: <game> for <first-time player> · core loop=<...> · first win=<...> · friction risk=<...>`

Then preserve these invariants:

- A first-time player can start without reading a manual.
- The first interaction is reversible and visually obvious.
- Every important action has an immediate visual response; sound is supplementary and can be muted.
- A failed attempt explains what changed and offers a next action. It never makes the player feel punished for experimenting.
- The player sees a clear win condition before the first challenge begins.
- A solved challenge asks for the player's answer or interpretation before advancing when that answer is part of learning.
- Progress is saved locally, while public source and deployment remain reversible through Git history.

## First-minute sequence

For a new player, prefer this sequence:

1. **Opening motion (3–8 seconds):** show the subject transform once. For a determinant game, show columns or rows flowing into one another, zeros appearing, then the triangular diagonal product resolving. Add a skip button and a reduced-motion path.
2. **One-screen onboarding:** explain the minimum vocabulary, one visible goal, and one control. Use an arrow or spotlight tied to the exact target control. Do not present the whole ruleset as a wall of text.
3. **Guided first win:** the first level supplies a short, valid route. The player still performs the meaningful clicks or key presses; the game should not auto-complete the lesson.
4. **Answer gate:** after a readable structure appears, ask for the result. Accept equivalent exact formats such as `-2`, `−2`, or `D=-2` when the task is numeric. Give a specific correction when wrong.
5. **Choice opens gradually:** only after the first win reveal optional shortcuts, alternate routes, the full level list, and deeper explanations.

The opening animation is a demonstration, not a progress requirement. Provide a `跳过演示` action and never hide the first actionable control behind animation.

## Make mathematics feel physical

Map an operation to a visible material action:

- Row/column addition: source cells lift as small blocks, travel along a curved path, and settle into the target line with a staggered delay.
- Zero creation: the arriving block fades into the target cell and the new zero pulses once.
- Swap: two lines cross or slide past each other and the sign badge flips.
- Scale/extract: the line compresses while the outside factor appears beside `D`.
- Transpose: the grid rotates or folds with a low-motion fallback that simply swaps labels.
- Triangular completion: non-diagonal cells dim, the diagonal remains bright, and the product is revealed one factor at a time.

Use `transform` and `opacity` for routine motion; never animate layout properties for these feedback effects. Stagger small groups of blocks rather than making the whole matrix move at once. Keep the animation interruptible and under roughly 900ms for a normal action. Respect `prefers-reduced-motion` by removing travel and keeping a static highlight plus an explanation.

## Tutorial language

Teach the reason at the moment it becomes useful:

- “倍加像剪切，有向面积不变。”
- “交换把方向翻过来，所以符号变号。”
- “三角形只留下主对角线那条排列，其他路线都被 0 挡住。”
- “三行四列是矩阵；普通行列式要求方阵。”

Keep the first tutorial to one core action and one win. Put the full axioms, geometric intuition, and permutation explanation behind expandable cards or a replayable lesson. Never require a player to watch a long explanation before any interaction.

## Difficulty and level sequencing

Build the first ten levels as an intentional ramp, each showcasing one idea:

1. one integer row addition to an upper triangle;
2. one row swap and the sign change;
3. automatic integer scaling;
4. automatic common-factor extraction;
5. “all into one line” with visible block travel;
6. transpose symmetry;
7. column addition;
8. two-step 3×3 elimination;
9. zero row/column and determinant zero;
10. one surviving permutation or anti-triangular sign.

Prefer small integer matrices (`0`, `1`, `2`, `3`, `4`) in the first ten levels. Compute simple coefficients for the player when the target and source entries make the operation unambiguous. Keep manual input available as an advanced escape hatch, but do not make a first-time player type `-1/3` to discover a concept.

## Interaction rules

- Left click selects a target row/column; right click selects a source.
- Long press selects the entire row/column under the pointer and shows a persistent highlight.
- Keyboard shortcuts must execute or visibly select a single action, never silently do nothing. If a shortcut has no valid source/target, explain the missing selection in the live status region.
- Undo and reset are always available; a new action after undo creates a branch without destroying the previous history until the player leaves the level.
- Inputs have labels, visible focus, keyboard equivalents, and a non-audio visual response.

## Player-friendly failure and leaving

After approximately one minute without a win, offer a yellow “看最短演示” card containing a verified route. It should reveal the next useful idea without marking the level complete.

For leaving behavior, prefer a gentle, dismissible in-page prompt when there is unsaved progress: “不好玩吗？还是做题更方便？如果这个实验帮你理解了一点行列式，它就完成使命了。” Do not trap the user, spam `beforeunload`, or rely on a custom browser message that the browser will ignore. A standard `beforeunload` guard may be used only when there is real unsaved progress and the browser supports it.

## Spectator and promotion surfaces

Treat the opening demonstration and several solved states as capture targets. Define at least three “hero moments” per game:

- the first satisfying transform;
- the visually surprising compression or zero-block;
- the final answer resolving from a diagonal or single permutation.

Give them stable composition, enough contrast, and a way to pause or replay. A promotional video can be made from these deterministic scenes, but never substitute a video for the playable interaction. Keep a `captureMode` or `demo` state separate from real progress so screenshots and promotional clips cannot corrupt the player's route.

## Delivery and rollback

For this user's games, use the public GitHub repository and GitHub Pages as the authoritative delivery path. Keep each meaningful experience change in a separate commit with tests. A public URL from another hosting provider can be a preview, but it is not the canonical release. Never publish credentials, local logs, browser data, or unrelated private files.

For detailed source research and playtest findings, read [references/game-ux-sources.md](references/game-ux-sources.md) when the current task needs them. The file should contain links and concise notes, not copied manuals.
