# Motion & UX Brief — Agency / Studio Site

A motion-and-experience-first redesign prompt distilled from three reference sites:
- **Tijgerbrood** (https://tijgerbrood.nl/en/) — playful cursor + face-swap toy, slow expressive scroll, sticker-like UI.
- **Lusion** (https://lusion.co/projects) — WebGL/3D hero, scroll-as-narrative, magnetic cursor, seamless project transitions.
- **Studio Kiln** (https://www.studio-kiln.com/) — Vimeo-loop tile grid, drawer-based navigation, FLIP-animated filtering, live time-of-day UI.

This brief is **80% motion and UX**, 20% everything else. Visual style and tech are documented only insofar as they enable the experience.

---

## 1. Motion & UX DNA — what each reference actually does

### Tijgerbrood — *toy-like, hand-led, slow-burn*
- **Custom hand cursor.** A pointing/grabbing illustrated hand follows the cursor; rotates direction toward the nearest interactive element; "grabs" on press.
- **Face remix interaction.** Team-member portraits are split into layers (head / face / mouth). Hovering or holding shuffles the layers — you remix the team. It is the studio's signature interaction; nothing else does the heavy lifting that this does.
- **Heads-as-stickers, scroll-attached.** Portraits float in margins with subtle parallax, rotate slightly with scroll velocity, and re-arrange when sections enter.
- **Big-type reveals on scroll.** Display headlines mount via a clip-path mask reveal (not opacity fade), 600–800ms, custom-easing — text feels "set in" rather than "appeared".
- **Pillar storytelling.** Strategy / Design / Online stack vertically with deep section transitions; each section "owns" the viewport for a beat before releasing.
- **Pointer-aware backgrounds.** Soft color blobs in negative space gently track the cursor and lag with spring physics.
- **Sustainability as quiet UX detail.** Lightweight assets, system-font fallback, and a "low-carbon" badge — the page itself feels light, which *is* the message.

### Lusion — *scroll cinema, magnetic everything, seamless transitions*
- **Real-time 3D hero.** Cursor warps a fluid mesh / particle field; tilt + parallax respond to mouse position with damped easing (no jitter).
- **Magnetic cursor.** Buttons, project tiles, and the menu trigger pull the cursor toward their center on approach; the cursor itself morphs (dot → ring → label like "VIEW", "DRAG", "MUTE").
- **Lenis smooth scroll** — never scroll-jacking. Wheel and trackpad inputs are eased, but the page remains free-scroll; section transitions are choreographed via ScrollTrigger, not snapping.
- **Scroll-bound camera movement** in WebGL scenes. Scrolling drives a virtual camera path through 3D space; sections land at keyframes.
- **Project-tile → case-study transition.** Click a tile and the tile itself becomes the case-study hero — same DOM/canvas element, FLIP/shared-element transition, no flash of new page. Fully crossfaded under 700ms.
- **"CONTINUE TO SCROLL" sentinel.** A scroll-progress hint appears at chapter boundaries; vanishes on input.
- **Discipline tags as choreography.** When project tiles enter, their tags type/stagger in (`concept • web • design • development • 3d • animation`) — the taxonomy becomes part of the show.
- **MUTE / PLAY** as a persistent micro-control bottom-right; sound is optional but present.

### Studio Kiln — *editorial calm, drawer nav, live studio*
- **Drawer/overlay navigation.** Approach, Studio, Contact, Partner Showcase open as full-height drawers from the right (or top), not page navigations. URL still updates; state restores.
- **Vimeo loops as tiles, IntersectionObserver-gated.** Loops play only when in view, pause out-of-view, and pause on cellular. Hover slightly scales + raises z-index.
- **FLIP grid filtering.** Switching between *By Grid* and *By Sector*, or filtering by tag, re-orders the project grid with FLIP animation (each tile springs to its new position over ~500ms, staggered).
- **Live local time** in the header (`13:56PM`) and place name (`Cornwall LIVE`). Updates every second; the studio feels open *right now*.
- **News feed with hover-preview.** Hovering a news item reveals the source logo overlaid on a thumbnail, with a tiny tag (`Press · Feature · Oct 25`).
- **Wordmark micro-animation.** Logo has a subtle breath/loop on idle (1–2% scale, 4s loop) — barely noticeable, but the page feels alive.
- **Long, scrollable awards wall.** Just keeps going. Each entry has a hover state (underline + arrow). Length is the message.
- **Editorial body type, tight tracking, large measure.** Reading is unhurried. Motion stays out of the way of the words.

---

## 2. Shared experience principles to inherit

1. **Cursor is a character.** Replace the OS cursor with a custom one that has at least 4 states: idle / hover-link / hover-media / pressed. It morphs and labels itself ("VIEW", "DRAG", "MUTE", "PLAY", "BACK").
2. **Smooth scroll, not scroll-jack.** Lenis (or RAF + lerp) for inertia. Never disable wheel; never snap full sections; let the user move at their own speed. ScrollTrigger choreographs *what plays*, not *where they go*.
3. **Every tile is alive.** Project cards loop motion; team members blink or breathe; the wordmark drifts. Idle ≠ dead.
4. **One signature interaction.** Pick one toy-like, replayable mechanic that becomes the studio's calling card (Tijgerbrood's face remix; Lusion's WebGL cursor mesh). Without one, the site reads as competent but not memorable.
5. **Page transitions hide the seam.** Same-element morphs between index → detail. No white flash, no full-page fade. Maintain scroll context.
6. **Drawers > pages for studio meta.** About / Approach / Contact slide in over the current page so the user never loses where they were.
7. **Reduced-motion is a designed state, not a fallback.** Define what *every* animated element becomes when `prefers-reduced-motion: reduce`. Static, but still composed — not a broken version of the moving site.
8. **Live data, sparingly.** A single live element (local time, currently-playing track, weather) anchors the studio in the present.
9. **Sound is opt-in but present.** A persistent mute toggle; defaults muted; if a project case study has sound design, expose it.
10. **Mobile is its own choreography.** Cursor effects collapse to tap/long-press; parallax becomes gyro or simply removed; tile loops become single-frame posters until tapped.

---

## 3. The prompt

> Paste the block below into Claude (or your designer/dev brief). Fill the bracketed `[STUDIO]` fields. The prompt is structured around motion, interaction, and UX flows; visual identity and tech follow only as needed to support them.

````
ROLE
You are a motion designer + interaction designer + senior front-end engineer
working as one team. You will redesign the website of [STUDIO_NAME] with
motion and user experience as the lead design layer. Visual identity and
backend follow from interaction needs, not the other way around.

INPUT
- Studio name: [STUDIO_NAME]
- Positioning (one line): [...]
- Signature point of view: [the fight you're picking]
- Locations / hours / time zone: [...]
- Services / disciplines: [3–6 pillars]
- Industries served: [...]
- Languages: [...]
- 3 motion/UX references and the trait we steal from each:
   1. tijgerbrood.nl — playful cursor + face remix interaction
   2. lusion.co — magnetic cursor + scroll-bound 3D + seamless tile transitions
   3. studio-kiln.com — drawer navigation + FLIP filtering + live time
- Anti-references: [...]
- Tech preferences: [Next.js / Astro / Nuxt; GSAP + ScrollTrigger; Lenis;
  React Three Fiber + drei; Framer Motion; Vimeo Pro / Mux for video; CMS]
- Performance budget: LCP < 1.8s on 4G, JS < 200kb gz, 60fps scroll on M1/iPhone 12+

EXPERIENCE PRINCIPLES (lead with these)
1. Cursor as character (4+ states, magnetic toward interactive elements,
   labels itself, morphs over media).
2. Smooth-scroll inertia (Lenis), never scroll-jacked. ScrollTrigger drives
   choreography, not navigation.
3. One signature, replayable interaction on the homepage that becomes the
   studio's calling card.
4. Same-element page transitions (FLIP / shared layout) between work index
   and case study — no white flash, no full fade.
5. Drawers, not pages, for About / Approach / Contact / Partners.
6. FLIP-animated filtering on the work grid (taxonomy + sort changes are
   choreographed, not jump cuts).
7. Idle ≠ dead. Tiles loop, wordmark breathes, live time ticks.
8. prefers-reduced-motion is a designed alternative state, not a degradation.
9. Mobile choreography is designed separately from desktop, not derived.
10. Every interaction has 4 states: idle, hover/focus, active/pressed, completed.

CURSOR SYSTEM
- Custom cursor on pointer:fine devices only. Hidden on touch.
- States and visuals:
   • Idle: 8px filled dot, ink color.
   • Hover-link: 36px outlined ring, 200ms scale-and-fade, optional label
     ("VIEW", "READ", "OPEN").
   • Hover-media: ring expands to 72px, label "PLAY"/"DRAG"/"PEEK"; on
     scrubable video, ring becomes a small playhead.
   • Hover-text-input: I-beam style; native cursor restored over textareas.
   • Pressed: ring shrinks 10%, springs back 120ms.
   • Disabled: 60% opacity, no morphing.
- Magnetism: any element with `data-magnetic` attracts the cursor when
  within 80px; cursor center eased toward element center with a 12% lerp;
  releases on leave. Element itself receives a 4–6px translate toward the
  cursor (mirror magnetism).
- Performance: cursor renders via a single fixed-position element animated
  with `transform: translate3d` only; updates throttled to RAF; avoid
  reflowing during move.
- Accessibility: cursor never replaces the native focus ring on keyboard
  navigation. `:focus-visible` outlines are preserved. Tabbing reveals
  focus styles even while custom cursor is active.

SCROLL SYSTEM
- Library: Lenis (or equivalent RAF-driven smooth scroll). Configuration:
  duration 1.2s, easing `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`,
  smoothWheel true, smoothTouch false (touch uses native momentum).
- Never trap or jack scroll. Section "snapping" is reserved for the single
  manifesto block, and even there it's a soft snap (snap-to nearest only
  when scroll velocity drops below threshold).
- ScrollTrigger pins are limited to ≤1 per viewport on mobile, ≤2 on
  desktop. Total pinned scroll distance ≤ 1.5× viewport per chapter.
- Sticky elements (nav, footer CTA) use CSS `position: sticky`, not JS.
- Scroll progress bar (1px, ink color) at top of viewport on long pages.
- "Continue to scroll" sentinel appears at chapter boundaries when scroll
  is paused > 1.5s; vanishes on first wheel/touch input.

PAGE / VIEW TRANSITIONS
- Use Next.js App Router + View Transitions API where supported, with a
  Framer Motion / GSAP fallback.
- Index → detail: clicked project tile becomes the case-study hero. The
  tile's bounding box, video element, and tags morph to the hero layout
  over 600ms `cubic-bezier(0.65, 0, 0.35, 1)`. No new-page flash.
- Detail → next project: as the user scrolls past the end of a case study,
  the next project's hero builds underneath; releasing scroll commits the
  navigation. URL updates only on commit.
- Drawer open (About / Approach / Contact / Partner Showcase): drawer
  slides in from right at 480ms with a 40px overshoot easing; backdrop
  fades to 60% black. ESC, backdrop click, or back-button closes; URL
  reflects drawer state via query param `?panel=approach`.
- Back/forward buttons restore scroll position and drawer state.

HOMEPAGE — MOTION SCRIPT (section by section)
1. Boot sequence (≤900ms total):
   • Logo wordmark draws on (stroke reveal, 400ms).
   • Nav items fade up, 50ms stagger.
   • Hero copy mask-reveals (clip-path bottom→top, 600ms, custom-cubic).
   • Signature interaction (canvas / WebGL / face remix) initializes.
   • If WebGL fails: fallback static hero appears at 900ms; never blocks.
2. Hero (above the fold):
   • One sentence, 10–14vw, taking a stance.
   • Signature cursor-reactive element (canvas mesh, blob field, or
     interactive remix toy). Cursor distortion eased at 8% lerp.
   • Idle behavior: subtle ambient motion at ≤2% delta, 4s loop.
3. Provocation block:
   • 1–2 short paragraphs that pick a fight.
   • Word-by-word stagger reveal triggered when 50% in view (400ms total,
     30ms per word, opacity + 8px Y).
4. Featured work (5–7 projects, alternating layouts):
   • Each tile is a silent looping video (≤4MB, AV1 + h.264).
   • IntersectionObserver: play when ≥30% in view, pause when ≤10%.
   • Hover: video scrubs to the cursor's X position across its duration;
     on touch, tap toggles play/scrub mode.
   • Tags type in below the title (40ms per tag, separator dot pops in
     between).
   • Magnetic attraction toward cursor (`data-magnetic`).
5. Services / pillars (3–5):
   • Each pillar pins for ~80% viewport scroll.
   • Sub-services list slides up, one at a time, on scroll progress.
   • Pillar's accent illustration animates per pillar (e.g. for "Strategy"
     a compass needle settles; for "Design" a grid resolves; for "Build"
     code typewrites).
6. Studio cameo:
   • Team strip with face remix interaction (signature toy reused).
   • Live local time updates every second.
   • Currently-playing-track badge (Spotify Now Playing API or fallback
     static); subtle equalizer animation.
   • Cursor over a face shows that person's role label.
7. Proof marquee:
   • Awards / press logos scroll horizontally at 30px/s.
   • Hover pauses the marquee + fades non-hovered logos to 40%.
   • Click jumps to filtered news entries.
8. CTA closer:
   • Oversized "Let's team up." (or your CTA) at 14vw.
   • Letters individually `data-magnetic` — they nudge toward the cursor
     on approach.
   • Underneath: mailto, calendar link, address with a tiny live weather
     emoji + temp from the studio's city.
9. Footer:
   • Footer is sticky-revealed (page lifts as you scroll; footer
     underneath fades up).
   • gCO2/visit live badge.
   • Newsletter input: single field, label animates to placeholder on
     focus, success state morphs button to a check + thank-you copy.

WORK INDEX (/work) — INTERACTION SPEC
- Toggle: "By Grid" / "By Sector". Switching re-lays out the grid with
  FLIP animation (450ms, 30ms stagger).
- Filter chips for disciplines and industries. Multi-select. Active chips
  slide in a clear-all pill. Filtering animates with FLIP, no reload.
- Tile interactions same as homepage featured tiles (loop, hover-scrub,
  magnetic, click-to-detail-with-shared-element).
- Empty state when no results: animated mascot / illustration + "Nothing
  in that combo yet — try removing a filter." Clear-all button.
- Sort options ("Recent / Industry / Featured") animate the grid the same
  way (FLIP).
- URL persists state: `/work?discipline=web,3d&industry=fashion&view=sector`.

CASE STUDY (/work/[slug]) — INTERACTION SPEC
- Hero: continues from the index tile (shared element).
- Sticky chapter index on left rail (desktop): "Context / Problem /
  Approach / Outcome / Press / Credits". Active chapter underlines and
  scrolls into view.
- Inline media: image/video/3D embeds stagger-fade as they enter.
- Pull-quotes: large display type, mask reveal.
- Outcome metrics: numbers count up on scroll-into-view (600ms,
  ease-out-expo).
- "Next project" footer auto-builds at 100% scroll; releasing scroll
  navigates with shared-element transition.
- Back-to-index: cursor label "BACK"; clicking morphs hero back to a
  tile in the grid at its original position.

DRAWERS (Approach / Studio / Contact / Partner Showcase)
- Trigger: nav item or footer link.
- Open: slide from right, 480ms, ease-out-overshoot. Backdrop fades.
- Header: drawer title + close X (cursor labels "CLOSE").
- Content: scrollable independently of the page beneath; page beneath
  scroll is locked while drawer is open, but scroll position preserved.
- Close: X click, ESC key, backdrop click, swipe-right (mobile).
- URL state: query param `?panel=approach`. Direct links work.

NEWSFEED (/news)
- Reverse-chronological list, dated.
- Hover (desktop): row expands to show source logo + thumbnail; siblings
  fade to 40%.
- Tap (mobile): row expands inline; tap again to collapse.
- Tag filter at top (Press / Award / Lecture / Article / Book) — FLIP
  re-order on filter change.
- Pagination: infinite scroll with skeleton placeholders; load 20 at a
  time.

CONTACT (drawer)
- Single screen.
- Big mailto in display type, click copies to clipboard with toast.
- Calendly embed below.
- Optional brief form (3 fields max: name, email, what you're working on).
- Form motion: label slides up to placeholder on focus; success morphs
  submit button into a check + "We'll be in touch in 1 business day."
- Validation: inline, on blur, with friendly copy ("That email looks off
  — give it another try?").

MOBILE CHOREOGRAPHY (separate spec, not just "responsive")
- Cursor effects: removed. Replace with tap and long-press feedback.
- Magnetic interactions: removed; replace with subtle haptic on tap
  (where supported via Vibration API, gated on user preference).
- Tile videos: replaced with single-frame posters until tap (saves data).
  Tap once to play, tap again to navigate.
- Drawers: full-screen sheets that slide up from bottom, 60% height by
  default with a drag handle to expand to full.
- Filters: bottom sheet with chips; sticky "Apply (3)" button.
- Reduced parallax / 3D: WebGL hero swaps to a posterframe + subtle CSS
  gradient animation.
- Page transitions: fade + 8px slide instead of shared element when
  shared element would cost > 16ms/frame.
- Gestures: swipe right to close drawer; swipe left/right between
  sequential case studies (with rubber-band edge feedback).

REDUCED-MOTION STATE (fully designed, not a bypass)
When `prefers-reduced-motion: reduce`:
- Cursor remains a static dot; magnetism off; no morph.
- Smooth scroll disabled; native scroll only.
- All entrance animations replaced with instant or 100ms opacity-only
  fades.
- Video loops paused by default; play button visible on each tile.
- Page transitions become instant; URL updates without animation.
- Wordmark breath, marquee, count-ups disabled.
- Live elements (clock, weather) still update — they're informational,
  not decorative.

EMPTY / LOADING / ERROR STATES (designed, not stock)
- First-paint shell: ink-on-paper skeleton with the wordmark and nav
  visible immediately; content blocks shown as low-opacity placeholders.
- Slow connection (>3s to first project tile): swap loops for posters
  + small "saving data" badge.
- 404: full-screen, oversized "404 — that page took a wrong turn." with
  a list of recent work and a search input.
- Error boundary: friendly copy + reload button + mailto. No stack traces.
- Form validation errors: inline, polite, suggest a fix.
- Filter empty: see Work Index spec.

ACCESSIBILITY (UX layer, not a checklist afterthought)
- All custom cursor states have a keyboard equivalent. `:focus-visible`
  rings are preserved on top of the custom cursor.
- Drawers trap focus while open; ESC closes; focus returns to the
  trigger element.
- Video loops have descriptive `aria-label` and `<track kind="descriptions">`
  where narrative.
- Carousels / marquees can be paused via a visible control AND respect
  reduced-motion.
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large display.
- Targets ≥ 44×44px on mobile.
- Skip-to-content + landmark regions.
- Screen-reader test pass: each interaction must be operable without a
  pointer.

PERFORMANCE BUDGET (motion-aware)
- LCP < 1.8s on 4G; CLS < 0.05; INP < 200ms.
- Total JS < 200kb gz; route-level splitting; WebGL / R3F lazy-loaded
  and only on routes that use it.
- Videos: AV1 master, h.264 fallback, ≤4 MB each, posterframe immediate.
- Animations only on `transform` and `opacity` (no `top/left/width/height`
  in motion paths).
- Use `will-change` sparingly and remove after animation ends.
- Cursor + scroll handlers run in a single RAF loop, not per-event.
- 60fps target on M1 / iPhone 12+; 30fps acceptable on low-end Android.
- Track real-user metrics (web-vitals.js → Plausible custom events).

DELIVERABLES (in this order)
1. Motion concept statement (200 words): the experience in one paragraph,
   then named in one phrase.
2. Cursor system spec sheet: states, sizes, easings, magnetism rules,
   labels, reduced-motion + mobile behavior.
3. Scroll system spec sheet: Lenis config, ScrollTrigger inventory per
   page, snap rules, sentinel rules.
4. Page-transition map: every from→to pair, technique, duration, easing,
   shared elements, reduced-motion fallback.
5. Homepage motion script (the section-by-section above, fleshed out
   with exact durations and easings per element).
6. Work index interaction spec: filter UX, FLIP timing, URL state,
   empty state.
7. Case study interaction spec.
8. Drawer system spec.
9. Mobile choreography spec (separate from desktop).
10. Reduced-motion designed state (per-element table: animated → static
    equivalent).
11. Empty / loading / error states catalog.
12. Component inventory with state tables (idle/hover/focus/active/
    disabled/loading) for: Nav, ProjectTile, FilterChip, Drawer,
    NewsRow, AwardItem, CTAFooter, Cursor.
13. Accessibility audit plan (axe + manual + screen-reader script).
14. Performance plan: budgets per route, lazy-loading boundaries,
    fallback waterfall.
15. 2-week / 6-week / 12-week phased ship plan.

DON'TS
- Don't propose scroll-jacking section snaps as the default.
- Don't autoplay sound, ever.
- Don't animate `top/left/width/height`.
- Don't use a magnifying-glass cursor on every link — variety, not noise.
- Don't add a custom cursor on touch devices.
- Don't show a spinner where a skeleton is possible.
- Don't degrade to nothing under reduced-motion — design the static state.
- Don't hide functionality behind animation — every interaction has a
  keyboard path.

START
Begin with deliverable #1 (motion concept). Wait for my approval before
continuing to #2.
````

---

## 4. How to use this prompt

- **For an LLM:** paste the whole `ROLE → START` block, fill `INPUT`, run, iterate per deliverable.
- **For a motion / interaction designer:** focus their attention on deliverables 2–10. Skip 12–15 unless you also want them on craft/QA.
- **For an engineer / Cursor / build agent:** start with cursor system, scroll system, transitions, FLIP filtering, and the mobile spec. Implement these as a foundation library before any page is built.
- **For yourself as a brief filter:** if a proposal doesn't address all of {cursor, scroll, transitions, drawers, FLIP, reduced-motion, mobile choreography}, it's incomplete.

---

## 5. Pre-ship checklist (motion & UX)

- [ ] Custom cursor with ≥ 4 states; magnetism on key targets; not on touch
- [ ] Lenis (or equivalent) smooth scroll without jacking
- [ ] One signature, replayable homepage interaction
- [ ] Shared-element transition from work index → case study
- [ ] FLIP filter animation on /work
- [ ] Drawers for About / Approach / Contact (URL-stateful)
- [ ] Live time / weather / now-playing element on home or footer
- [ ] Wordmark / tile / cursor idle motion (alive, not flashing)
- [ ] Designed reduced-motion state for every animated element
- [ ] Mobile choreography spec separate from desktop, fully implemented
- [ ] All interactions reachable via keyboard with visible focus
- [ ] LCP < 1.8s, INP < 200ms, 60fps scroll on M1/iPhone 12+
- [ ] No `top/left/width/height` in any animation path
- [ ] Skeleton states + designed 404 / error / empty states
- [ ] gCO2/visit footer badge, lazy media, AV1 first
