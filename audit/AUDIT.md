# Before audit

Screenshots in `audit/before/` were captured against the public GitHub Pages site in fresh Playwright contexts at desktop and mobile sizes for levels 1, 10, 20, 35, 50, and 70.

| Finding | Status before redesign | Evidence |
|---|---|---|
| A1 shortcut labels agree | present | desktop-level-1-page.png |
| A2 one clear demo entry | needs work | desktop-level-1-page.png |
| A3 onboarding text wall | present | desktop-level-1-page.png |
| A4 demo motion/empty demos | needs work | desktop-level-70-demo.png |
| A5 mobile target/source path | needs work | mobile screenshots from the first audit pass |
| A6 question count copy | needs work | README and first-paint sidebar |
| A7 exit prompt | needs work | no in-page modal on the before version |

The redesign work follows these findings with the visible online experience as the source of truth.

## Evidence added after the rebuild

The three before/after groups were recaptured on the public URL in fresh contexts at 1440×900 and 390×844. Each group contains a page frame and a live demo frame:

- Group 1: `before/desktop-group-1-{page,demo}.png`, `before/mobile-group-1-{page,demo}.png` → `after/desktop-group-1-{page,demo}.png`, `after/mobile-group-1-{page,demo}.png`
- Group 35: `before/desktop-group-35-{page,demo}.png`, `before/mobile-group-35-{page,demo}.png` → `after/desktop-group-35-{page,demo}.png`, `after/mobile-group-35-{page,demo}.png`
- Group 70: `before/desktop-group-70-{page,demo}.png`, `before/mobile-group-70-{page,demo}.png` → `after/desktop-group-70-{page,demo}.png`, `after/mobile-group-70-{page,demo}.png`

`before/desktop-home.png`, `before/mobile-home.png`, and `after-home.png` are the homepage regression pair used by C13; `after-mobile-home.png` is the mobile counterpart. The strict online run at `85e5d53` is recorded in `ACCEPTANCE.txt`.
