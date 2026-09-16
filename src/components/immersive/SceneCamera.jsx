import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { CAMERA_KEYFRAMES, CAMERA_STOP_ORDER } from '../../data/cameraKeyframes'
import { useScrollProgressRef } from './ScrollController'

// Smoothstep easing so movement eases in/out of each segment instead
// of feeling linear/mechanical.
function ease(t) {
  return t * t * (3 - 2 * t)
}

// Finds which two named keyframes the current scroll progress sits
// between, plus how far along that segment we are (0-1).
function getSegment(progress, stops) {
  for (let i = 0; i < CAMERA_STOP_ORDER.length - 1; i += 1) {
    const fromKey = CAMERA_STOP_ORDER[i]
    const toKey = CAMERA_STOP_ORDER[i + 1]
    const isLastSegment = i === CAMERA_STOP_ORDER.length - 2
    if (progress <= stops[toKey] || isLastSegment) {
      const span = Math.max(stops[toKey] - stops[fromKey], 0.0001)
      const t = THREE.MathUtils.clamp((progress - stops[fromKey]) / span, 0, 1)
      return { fromKey, toKey, t }
    }
  }
  return { fromKey: 'hero', toKey: 'story', t: 0 }
}

/**
 * Moves the default R3F camera along the CAMERA_KEYFRAMES path based
 * on scroll progress. Movement is smoothed with frame-rate independent
 * damping so it never feels jumpy, even if scroll events arrive in
 * bursts.
 *
 * On top of the base position/lookAt/fov interpolation, two small
 * cinematic touches make the ride feel less like a rigid lerp:
 *  - a slow vertical "bob" (glide, not shake)
 *  - a gentle roll/bank when the camera is moving sideways, like a
 *    plane banking into a turn
 * Both are intentionally small (a few degrees / fractions of a unit)
 * — enough to feel alive, not enough to disorient.
 */
function SceneCamera() {
  const { camera } = useThree()
  const scrollRef = useScrollProgressRef()

  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0))
  const previousX = useRef(0)
  const bank = useRef(0)

  useFrame((state, delta) => {
    const { progress, stops } = scrollRef.current
    const { fromKey, toKey, t } = getSegment(progress, stops)
    const from = CAMERA_KEYFRAMES[fromKey]
    const to = CAMERA_KEYFRAMES[toKey]
    const et = ease(t)

    targetPosition.current.lerpVectors(from.position, to.position, et)
    targetLookAt.current.lerpVectors(from.lookAt, to.lookAt, et)

    // Frame-rate independent damping (~feels the same at 30fps or 120fps).
    const smoothing = 1 - Math.pow(0.0025, delta)

    camera.position.lerp(targetPosition.current, smoothing)
    currentLookAt.current.lerp(targetLookAt.current, smoothing)

    // Gentle vertical bob — reads as gliding rather than rigidly
    // locked to a rail.
    const bob = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
    camera.lookAt(
      currentLookAt.current.x,
      currentLookAt.current.y + bob,
      currentLookAt.current.z,
    )

    // Bank slightly into sideways movement — derived from horizontal
    // velocity this frame, heavily damped so it eases in/out instead
    // of snapping. Clamped to ~±5° so it stays subtle, never dizzying.
    const velocityX = delta > 0 ? (camera.position.x - previousX.current) / delta : 0
    previousX.current = camera.position.x
    const targetBank = THREE.MathUtils.clamp(-velocityX * 0.15, -0.09, 0.09)
    bank.current = THREE.MathUtils.lerp(bank.current, targetBank, 0.04)
    camera.rotateZ(bank.current)

    const targetFov = THREE.MathUtils.lerp(from.fov, to.fov, et)
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, smoothing)
      camera.updateProjectionMatrix()
    }
  })

  return null
}

export default SceneCamera
