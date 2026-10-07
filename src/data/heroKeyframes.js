/**
 * The Hero journey lives ENTIRELY inside the 2.5D scroll experience —
 * HeroParallaxScene only ever sees a single 0..1 progress number
 * (driven by GSAP/ScrollTrigger, see HeroScrollController.jsx) and
 * interpolates between the two keyframes here that bracket it.
 *
 * The list below intentionally has SEVEN points marking the boundaries
 * of the six cinematic phases requested for the journey:
 *
 *   0.00 → 0.15  PHASE 1  Arrival     (establishing view, very light drift)
 *   0.15 → 0.35  PHASE 2  Enter World (camera "dollies" forward into the world)
 *   0.35 → 0.55  PHASE 3  Story       (arrive at the Story landmark)
 *   0.55 → 0.75  PHASE 4  Science     (arrive at the Science landmark)
 *   0.75 → 0.95  PHASE 5  Video       (cinematic final approach)
 *   0.95 → 1.00  PHASE 6  End         (slow to a stop, hold still)
 *
 * `at` — where in the 0..1 Hero-local progress range this keyframe is
 *        fully "arrived at". Uneven spacing is deliberate: Story gets
 *        more room to read than the brief Arrival→Enter hop.
 * `ease` — a GSAP ease name (gsap.parseEase) describing how the scene
 *        accelerates/decelerates through the segment that STARTS at
 *        this keyframe — each phase gets its own cinematic curve
 *        instead of one uniform curve for the whole journey.
 * `camera` — NOT a real 3D camera. This is the 2.5D "camera simulation"
 *        described in the brief (section 9): a single shared
 *        pan/zoom/rotate state (`x`, `y` in px-equivalent units,
 *        `scale`, `rotate` in degrees) that HeroParallaxScene applies
 *        to every depth layer, each multiplied by that layer's own
 *        DEPTH_FACTORS (see below) — background barely moves,
 *        foreground moves a lot, giving the illusion of a camera
 *        moving through a layered illustration without any real 3D.
 *
 * Both HeroWaypointOverlay.jsx (waypoint text) and
 * HeroScrollController.jsx (dwell points) key off `id`/`at` only, so
 * they stay correct no matter how the `camera` values above are tuned.
 */
/**
 * SCENE-TO-SCENE TRANSITION — one timing for every stop-to-stop move
 * (desktop wheel step, touch scroll-snap, page-level scene snap).
 * Per-segment `ease` below is 'none' on purpose: the smooth cinematic
 * curve is applied ONCE per step (SCENE_EASE over SCENE_DURATION), so
 * a step never stutters at the intermediate keyframes it passes.
 */
export const SCENE_DURATION = 1.0 // seconds per scene stop (was 0.7 — felt too abrupt)
export const SCENE_EASE = 'power3.inOut'
export const HERO_HOLD = 1.3 // seconds the Hero autoplay rests on each stop so its text can be read

export const HERO_KEYFRAMES = [
  {
    id: 'arrival',
    at: 0,
    // Phase 1 — establishing view: scale 1, nothing displaced.
    ease: 'sine.inOut',
    camera: { x: 0, y: 0, scale: 1, rotate: 0 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 112, y: 12, rotate: -20, scale: 0.7, opacity: 0 },
  },
  {
    id: 'arrivalSettle',
    at: 0.15,
    // Phase 2 — the camera starts to approach (scale ~1.03).
    ease: 'power1.inOut',
    camera: { x: 0, y: -8, scale: 1.03, rotate: 0 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 100, y: 10, rotate: -20, scale: 0.8, opacity: 0 },
  },
  {
    id: 'enterWorld',
    at: 0.35,
    // Phase 3 — drifts left while still closing in (~1.05).
    ease: 'power2.inOut',
    camera: { x: -60, y: -14, scale: 1.05, rotate: -0.5 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 82, y: 8, rotate: -22, scale: 0.9, opacity: 1 },
  },
  {
    id: 'story',
    at: 0.55,
    // Phase 4 — Story landmark: a little closer, pan to the right.
    ease: 'power2.inOut',
    camera: { x: 100, y: -18, scale: 1.065, rotate: 0.7 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 58, y: 7, rotate: -16, scale: 1, opacity: 1 },
  },
  {
    id: 'science',
    at: 0.75,
    // Phase 5 — Science landmark: subtle pan back to the left.
    ease: 'none',
    camera: { x: -110, y: -24, scale: 1.06, rotate: -0.8 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 34, y: 13, rotate: -24, scale: 1.1, opacity: 1 },
  },
  {
    id: 'video',
    at: 0.95,
    // Phase 6 — final framing, easing all the way to a stop.
    ease: 'none',
    camera: { x: 40, y: -32, scale: 1.08, rotate: 0.5 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: 14, y: 8, rotate: -18, scale: 1.2, opacity: 1 },
  },
  {
    id: 'end',
    at: 1,
    // Identical to `video` on purpose: nowhere further to go, it just
    // holds the final framing.
    ease: 'none',
    camera: { x: 40, y: -32, scale: 1.08, rotate: 0.5 },
    // Rocket path — % of the stage (centre point), css rotate (deg), scale, opacity.
    rocket: { x: -14, y: -4, rotate: -22, scale: 1.4, opacity: 0 },
  },
]

/**
 * How much of the shared `camera` state (above) each depth layer
 * actually receives — this IS the parallax. 0 = layer never moves/
 * scales/rotates relative to the camera; 1 = moves exactly as much as
 * the raw camera value.
 *
 * Ordered back-to-front: background < distant < midground <
 * foreground. `focal` is only used if a separate character cut-out
 * is ever supplied (see HERO_FOCAL in heroAssets.js); it is kept
 * subtle so the character stays the visual anchor of the frame.
 * `rotate` is tiny on purpose: a small tilt on near layers reads as
 * "camera banking"; a big one would make the whole world look crooked.
 */
export const DEPTH_FACTORS = {
  // x/y — how much of the camera PAN the layer receives. Ordered per
  // the brief: background 0.05–0.10, distant 0.10–0.20, midground
  // 0.20–0.35, foreground 0.35–0.50, focal 0.15–0.25.
  //
  // scale — how much of the camera APPROACH the layer receives. This
  // is deliberately not the same ramp as x/y: the whole picture grows
  // only a little (background), while near things grow more, so the
  // move reads as a camera getting closer through layers instead of
  // one image being enlarged.
  //
  // rotate — only near layers tilt a hair ("camera banking").
  background: { x: 0.08, y: 0.06, scale: 0.5, rotate: 0 },
  distant: { x: 0.16, y: 0.12, scale: 0.7, rotate: 0 },
  midground: { x: 0.28, y: 0.2, scale: 1, rotate: 0.1 },
  foreground: { x: 0.45, y: 0.34, scale: 1.6, rotate: 0.4 },
  focal: { x: 0.2, y: 0.14, scale: 0.9, rotate: 0 },
  // The rocket's own flight path lives in each keyframe's `rocket`; this
  // is only the extra parallax the whole rocket layer gets from the camera.
  rocket: { x: 0.5, y: 0.35, scale: 1.2, rotate: 0 },
}

// The progress values the Hero actually stops at (one wheel step / one
// snap each). 'end' is only the exit pose played while leaving the Hero.
export const HERO_STOPS = HERO_KEYFRAMES.filter((f) =>
  ['arrival', 'story', 'science', 'video'].includes(f.id),
).map((f) => f.at)
