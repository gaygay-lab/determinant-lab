# Determinant Lab long-task log

## Design read

Read: 行列之间 for first-time linear-algebra learners · core loop=watch → perform one operation → reveal triangular/single-route structure → answer gate → next level · first win=one integer row addition · friction risk=the player sees a control panel before understanding the goal.

## 2026-10-05

- Read the user's R1–R14 specification.
- Read `index.html`, `app.js`, `engine.js`, `symbolic.js`, `problems.js`, `play.css`, `styles.css`, `note.jpg`, and `skill/determinant-game-design/SKILL.md`.
- GitHub Pages is the only release target. The public source repository is `gaygay-lab/determinant-lab`.
- Added 3 guided cos-tridiagonal metadata levels and 3 additional reward levels; question count is now 78. Existing math tests remain the gate for each addition.
- The public acceptance script is intentionally run against a fresh browser context and a versioned URL; it is not allowed to read or write the player's storage.
- One limitation remains explicitly tracked: browser-native `beforeunload` text cannot be customized. The in-page exit dialog is the custom message; the native guard is only a fallback.

- The previous `f90a839` acceptance record is superseded; it did not cover the strict behavior checks required by the user.
- Rebuilt the guided flow, opening scene, replay controls, physical motion layer, answer keypad, and real mathematical expansion views.
- Online acceptance was rerun against fresh Chrome contexts at `85e5d53`; C1–C14 all PASS. The full output is in `audit/ACCEPTANCE.txt`.
- Two six-report playtest rounds were run at mobile and desktop sizes; reports and screenshots are in `audit/playtest-*.md` and `.png`.
- Before/after evidence was recaptured at levels 1, 35, and 70 for both sizes in `audit/before/` and `audit/after/`.
