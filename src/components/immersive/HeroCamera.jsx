import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useRef } from 'react'
import * as THREE from 'three'
import { HERO_KEYFRAMES } from '../../data/heroKeyframes'

// Finds the pair of HERO_KEYFRAMES bracketing `progress` (via their
// `at` values), the local t between them, and the GSAP ease that
// segment should use — each phase gets its own cinematic curve (see
// heroKeyframes.js) instead of one uniform easing for the whole
// journey.
function getSegment(progress) {
  const n = HERO_KEYFRAMES.length
  for (let i = 0; i < n - 1; i += 1) {
    const from = HERO_KEYFRAMES[i]
    const to = HERO_KEYFRAMES[i + 1]
    if (progress <= to.at || i === n - 2) {
      const span = Math.max(to.at - from.at, 0.0001)
      const t = THREE.MathUtils.clamp((progress - from.at) / span, 0, 1)
      return { from, to, t }
    }
  }
  return { from: HERO_KEYFRAMES[0], to: HERO_KEYFRAMES[1], t: 0 }
}

const easeCache = new Map()
function getEase(name) {
  if (!easeCache.has(name)) {
    easeCache.set(name, gsap.parseEase(name || 'power1.inOut'))
  }
  return easeCache.get(name)
}

/**
 * Moves the default R3F camera through HERO_KEYFRAMES based on
 * `progressRef.current` — the Hero's own local scroll progress, driven
 * by GSAP ScrollTrigger (see HeroScrollController.jsx). This is the
 * ONLY thing HeroCamera depends on for its macro path: no section
 * refs, no whole-page offsets. Once progress reaches 1 (the "end"
 * keyframe, identical to "video"), there's nowhere further to
 * interpolate to, so the camera simply holds still — Phase 6 satisfied
 * without any extra logic.
 *
 * `motionScale` (0..1) dampens how far the camera actually travels
 * from its Phase-1 "arrival" position toward each target — 1 is the
 * full desktop journey, smaller values shorten/soften it for mobile
 * and prefers-reduced-motion (see ImmersiveScene.jsx for how it's
 * derived) without changing the keyframe data itself.
 *
 * Two small cinematic touches sit on top of the base interpolation: a
 * slow vertical bob (glide, not shake) and a gentle roll/bank when
 * moving sideways — both intentionally tiny, enough to feel alive
 * without disorienting anyone, and both scaled down alongside
 * `motionScale`.
 */
function HeroCamera({ progressRef, motionScale = 1 }) {
  const { camera } = useThree()

  const basePosition = useRef(
    new THREE.Vector3(
      HERO_KEYFRAMES[0].position.x,
      HERO_KEYFRAMES[0].position.y,
      HERO_KEYFRAMES[0].position.z,
    ),
  )
  const baseLookAt = useRef(
    new THREE.Vector3(
      HERO_KEYFRAMES[0].lookAt.x,
      HERO_KEYFRAMES[0].lookAt.y,
      HERO_KEYFRAMES[0].lookAt.z,
    ),
  )
  const rawPosition = useRef(new THREE.Vector3())
  const rawLookAt = useRef(new THREE.Vector3())
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const currentLookAt = useRef(new THREE.Vector3(0, 1, -2))
  const previousX = useRef(0)
  const bank = useRef(0)

  useFrame((state, delta) => {
    const progress = progressRef.current ?? 0
    const { from, to, t } = getSegment(progress)
    const et = getEase(from.ease)(t)

    rawPosition.current.lerpVectors(from.position, to.position, et)
    rawLookAt.current.lerpVectors(from.lookAt, to.lookAt, et)

    // Scale the journey's amplitude down from the Phase-1 arrival pose
    // rather than the raw interpolated point — this shortens/softens
    // the whole trip proportionally (mobile, reduced motion) without
    // ever touching the keyframe data or the phase timing above.
    targetPosition.current.lerpVectors(basePosition.current, rawPosition.current, motionScale)
    targetLookAt.current.lerpVectors(baseLookAt.current, rawLookAt.current, motionScale)

    // Frame-rate independent damping (~feels the same at 30fps or 120fps).
    const smoothing = 1 - Math.pow(0.0025, delta)

    camera.position.lerp(targetPosition.current, smoothing)
    currentLookAt.current.lerp(targetLookAt.current, smoothing)

    // Gentle vertical bob — reads as gliding, not rigidly rail-locked.
    const bob = Math.sin(state.clock.elapsedTime * 0.6) * 0.05 * motionScale
    camera.lookAt(
      currentLookAt.current.x,
      currentLookAt.current.y + bob,
      currentLookAt.current.z,
    )

    // Bank slightly into sideways movement, heavily damped so it eases
    // in/out instead of snapping. Clamped to a small angle — subtle,
    // never dizzying.
    const velocityX = delta > 0 ? (camera.position.x - previousX.current) / delta : 0
    previousX.current = camera.position.x
    const targetBank = THREE.MathUtils.clamp(-velocityX * 0.12, -0.08, 0.08) * motionScale
    bank.current = THREE.MathUtils.lerp(bank.current, targetBank, 0.04)
    camera.rotateZ(bank.current)

    const rawFov = THREE.MathUtils.lerp(from.fov, to.fov, et)
    const targetFov = THREE.MathUtils.lerp(HERO_KEYFRAMES[0].fov, rawFov, motionScale)
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, smoothing)
      camera.updateProjectionMatrix()
    }
  })

  return null
}

export default HeroCamera
