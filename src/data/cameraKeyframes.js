/**
 * Camera keyframes for the scroll-driven immersive world.
 *
 * Each stop represents where the camera "arrives" once the matching
 * homepage section is in view. SceneCamera interpolates smoothly
 * between these positions based on scroll progress — it never jumps.
 *
 * `position`  — where the camera sits in world space.
 * `lookAt`    — the point the camera aims at.
 * `fov`       — field of view, slightly narrows as we travel deeper
 *               into the world for a subtle "zooming in" feel.
 *
 * Positions loosely follow the same waypoints used by WorldPlaceholder
 * (see WORLD_WAYPOINTS) so the camera path always matches where the
 * placeholder islands/buildings are placed.
 *
 * The "learning" stop is a prepared-but-unused waypoint for a future
 * homepage section — do not remove it, later work will hook a real
 * section into it.
 */
export const CAMERA_KEYFRAMES = {
  hero: {
    position: { x: 0, y: 1.6, z: 10 },
    lookAt: { x: 0, y: 0.8, z: 0 },
    fov: 50,
  },
  story: {
    position: { x: 3.2, y: 2.3, z: 2.5 },
    lookAt: { x: 4.5, y: 1.2, z: -4 },
    fov: 48,
  },
  science: {
    position: { x: 7.6, y: 2.8, z: -5 },
    lookAt: { x: 9.2, y: 1.6, z: -11 },
    fov: 46,
  },
  video: {
    position: { x: 11.8, y: 3.1, z: -13 },
    lookAt: { x: 13.6, y: 1.8, z: -19 },
    fov: 45,
  },
  // Prepared for the next homepage section — not yet built.
  learning: {
    position: { x: 15.4, y: 3.4, z: -21 },
    lookAt: { x: 17.2, y: 2, z: -27 },
    fov: 44,
  },
}

// Ordered list used by SceneCamera to find which two keyframes to
// interpolate between for a given scroll progress value.
export const CAMERA_STOP_ORDER = [
  'hero',
  'story',
  'science',
  'video',
  'learning',
]
