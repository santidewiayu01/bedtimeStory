/**
 * The camera journey lives ENTIRELY inside the Hero — HeroCamera only
 * ever sees a single 0..1 progress number (driven by GSAP ScrollTrigger,
 * see HeroScrollController.jsx) and interpolates between the two
 * keyframes here that bracket it.
 *
 * The list below intentionally has SEVEN points marking the boundaries
 * of the six cinematic phases requested for the journey:
 *
 *   0.00 → 0.15  PHASE 1  Arrival     (establishing view, very light drift)
 *   0.15 → 0.35  PHASE 2  Enter World (dolly forward into the world)
 *   0.35 → 0.55  PHASE 3  Story       (arrive at the Story landmark)
 *   0.55 → 0.75  PHASE 4  Science     (arrive at the Science landmark)
 *   0.75 → 0.95  PHASE 5  Video       (cinematic final approach)
 *   0.95 → 1.00  PHASE 6  End         (slow to a stop, hold still)
 *
 * `at` — where in the 0..1 Hero-local progress range this keyframe is
 *        fully "arrived at". Uneven spacing is deliberate: Story gets
 *        more room to read than the brief Arrival→Enter hop.
 * `position` / `lookAt` — plain {x,y,z}, not THREE.Vector3 (HeroCamera
 *        feeds them straight into Vector3.lerpVectors).
 * `fov`  — narrows slightly stage to stage for a subtle "closing in on
 *        the landmark" feel.
 * `ease` — a GSAP ease name (gsap.parseEase) describing how the camera
 *        accelerates/decelerates through the segment that STARTS at
 *        this keyframe. This is what gives each phase its own
 *        cinematic character instead of one uniform curve for the
 *        whole journey (e.g. Phase 1 barely eases at all, Phase 5
 *        decelerates hard into its landmark, Phase 6 eases all the way
 *        to a dead stop).
 *
 * Positions are loosely tied to WAYPOINTS in WorldPlaceholder.jsx —
 * keep the two in sync so the camera actually arrives facing the thing
 * it's supposed to (Story house / Science lab / Video building).
 */
export const HERO_KEYFRAMES = [
  {
    id: 'arrival',
    at: 0,
    position: { x: 0, y: 3.6, z: 11 },
    lookAt: { x: 0, y: 1, z: -2 },
    fov: 55,
    // Phase 1 — establishing view, almost no motion yet.
    ease: 'sine.inOut',
  },
  {
    id: 'arrivalSettle',
    at: 0.15,
    position: { x: 0, y: 3.3, z: 9.6 },
    lookAt: { x: 0, y: 1, z: -2.4 },
    fov: 54,
    // Phase 2 — subtle dolly forward, world starts to open up.
    ease: 'power1.inOut',
  },
  {
    id: 'enterWorld',
    at: 0.35,
    position: { x: 0, y: 2.2, z: 6 },
    lookAt: { x: 0, y: 1, z: -3 },
    fov: 50,
    // Phase 3 — turns toward the Story landmark.
    ease: 'power2.inOut',
  },
  {
    id: 'story',
    at: 0.55,
    position: { x: -2.6, y: 2, z: 0.5 },
    lookAt: { x: -4.2, y: 1.2, z: -3 },
    fov: 47,
    // Phase 4 — crosses toward Science with a lighting/depth shift.
    ease: 'power2.inOut',
  },
  {
    id: 'science',
    at: 0.75,
    position: { x: 2.4, y: 2.3, z: -4 },
    lookAt: { x: 4.4, y: 1.6, z: -8 },
    fov: 45,
    // Phase 5 — more cinematic final approach, decelerating in.
    ease: 'power3.out',
  },
  {
    id: 'video',
    at: 0.95,
    position: { x: -0.4, y: 2.4, z: -9 },
    lookAt: { x: -2, y: 1.5, z: -13 },
    fov: 44,
    // Phase 6 — ease all the way down to a complete stop.
    ease: 'power2.out',
  },
  {
    id: 'end',
    at: 1,
    // Identical to `video` on purpose: Phase 6 has nowhere further to
    // go, it just holds the final hero position.
    position: { x: -0.4, y: 2.4, z: -9 },
    lookAt: { x: -2, y: 1.5, z: -13 },
    fov: 44,
    ease: 'power2.out',
  },
]
