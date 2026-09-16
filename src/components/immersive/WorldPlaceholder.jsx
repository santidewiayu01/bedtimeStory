import { Cloud, Instance, Instances, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Waypoints matching HERO_KEYFRAMES' `lookAt` targets in
 * ../../data/heroKeyframes.js — keep the two in sync so the camera
 * always arrives facing the right placeholder area. This world is
 * scoped to the immersive Hero ONLY (see ImmersiveHero.jsx) — there
 * is no longer a "learning"/5th stop reaching out toward the rest of
 * the homepage; the journey starts and ends entirely inside Hero.
 *
 * ⚠️ PLACEHOLDER GEOMETRY ONLY.
 * Everything below is built from primitive Three.js geometry
 * (boxes, cones, spheres, cylinders) as a stand-in for final art from
 * the Modeling & Animation team. To swap in real assets later:
 *   1. Drop the .glb/.gltf file into public/models/placeholders/
 *   2. Load it with useGLTF('/models/placeholders/xxx.glb')
 *   3. Replace the relevant <group position={...}> contents below
 *      with the loaded scene — keep the same `position` prop so the
 *      camera path and layout don't need to change.
 * No characters or final Minilemon art are included here.
 */
const WAYPOINTS = {
  hero: [0, 0, 0],
  story: [-4.2, 0, -3],
  science: [4.4, 0, -8],
  video: [-2, 0, -13],
}

const COLORS = {
  islandGreen: '#2f9e6a',
  islandGreenDark: '#22794f',
  purple: '#8b7cf6',
  purpleDark: '#452d82',
  yellow: '#ffc93c',
  mint: '#34c78e',
  coral: '#ff7a59',
  wood: '#7a5230',
  roof: '#c85a3a',
  path: '#e8d9a8',
  peak: '#1b1440',
  peakLit: '#2e2364',
  window: '#ffe27a',
  mascot: '#ffc93c',
  mascotAccent: '#452d82',
}

/** Simple flattened-cylinder island/platform. */
function Island({ position, radius = 3, color = COLORS.islandGreen }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.25, 0]} receiveShadow={false} castShadow={false}>
        <cylinderGeometry args={[radius, radius * 1.08, 0.5, 24]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[radius * 0.98, radius, 0.1, 24]} />
        <meshStandardMaterial color={COLORS.islandGreenDark} roughness={0.9} />
      </mesh>
    </group>
  )
}

/** Box body + cone roof — a generic small house shape, with a door and
 *  a glowing window so it reads as an actual dwelling, not just a box. */
function HousePlaceholder({ position, scale = 1, roofColor = COLORS.roof }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1, 1.2]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1, 0.8, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.6} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.28, 0.61]}>
        <boxGeometry args={[0.32, 0.56, 0.04]} />
        <meshStandardMaterial color={COLORS.peak} roughness={0.7} />
      </mesh>
      {/* Glowing window — small emissive accent, cheap and reads well
          from a distance without needing a real light source. */}
      <mesh position={[0.35, 0.62, 0.61]}>
        <boxGeometry args={[0.22, 0.22, 0.03]} />
        <meshStandardMaterial
          color={COLORS.window}
          emissive={COLORS.window}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  )
}

/** Box building + sphere dome — reads as a "science lab" silhouette. */
function ScienceBuildingPlaceholder({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 1.6, 1.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[1, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={COLORS.mint} roughness={0.4} />
      </mesh>
    </group>
  )
}

/** Box building + a rotated cone "play button" — reads as "video hall". */
function VideoBuildingPlaceholder({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[2.2, 1.8, 1.8]} />
        <meshStandardMaterial color="#2a1f4d" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.9, 0.95]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <coneGeometry args={[0.4, 0.35, 3]} />
        <meshStandardMaterial color={COLORS.coral} emissive={COLORS.coral} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

/** Cone + cylinder tree, rendered via instancing for cheap repetition. */
function TreeCluster({ positions }) {
  return (
    <Instances limit={positions.length} range={positions.length}>
      <coneGeometry args={[0.5, 1.1, 8]} />
      <meshStandardMaterial color={COLORS.islandGreenDark} roughness={0.8} />
      {positions.map((pos, i) => (
        <Instance key={i} position={pos} />
      ))}
    </Instances>
  )
}

/** Small rotating icosahedrons drifting near a waypoint. */
function FloatingObjects({ center, count = 3, color = COLORS.yellow }) {
  const groupRef = useRef(null)
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        offset: [
          (Math.sin(i * 2.1) * 1.8) + center[0],
          1.6 + Math.cos(i * 1.4) * 0.6 + center[1],
          (Math.cos(i * 2.7) * 1.8) + center[2],
        ],
        speed: 0.3 + i * 0.15,
      })),
    [center, count],
  )

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    group.children.forEach((mesh, i) => {
      mesh.rotation.x = state.clock.elapsedTime * items[i].speed
      mesh.rotation.y = state.clock.elapsedTime * items[i].speed * 0.7
      mesh.position.y = items[i].offset[1] + Math.sin(state.clock.elapsedTime * items[i].speed + i) * 0.2
    })
  })

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.offset}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

/** Flattened, slightly-transparent spheres standing in for clouds. */
function SimpleClouds({ positions }) {
  return positions.map((pos, i) => (
    <mesh key={i} position={pos} scale={[1.6, 0.5, 1]}>
      <sphereGeometry args={[0.9, 12, 10]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.35} roughness={1} />
    </mesh>
  ))
}

/** A distant sphere + tilted ring — reads as "simple planet" from the reference art. */
function SimplePlanet({ position }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshStandardMaterial color={COLORS.purple} roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.08, 8, 48]} />
        <meshStandardMaterial color={COLORS.yellow} roughness={0.5} />
      </mesh>
    </group>
  )
}

/** Thin boxes strung between two waypoints — a simple connecting path. */
function PathSegment({ from, to }) {
  const mid = [(from[0] + to[0]) / 2, -0.05, (from[2] + to[2]) / 2]
  const dx = to[0] - from[0]
  const dz = to[2] - from[2]
  const length = Math.hypot(dx, dz)
  const angle = Math.atan2(dx, dz)

  return (
    <mesh position={mid} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.9, 0.05, length]} />
      <meshStandardMaterial color={COLORS.path} roughness={1} />
    </mesh>
  )
}

/**
 * Big, low-detail silhouettes placed far off to the side of the main
 * path. They barely grow/shrink as the camera moves past (true distant
 * parallax) and exist purely to (a) establish that the world is much
 * bigger than the handful of islands the camera visits, and (b) give
 * the background more depth than "empty space + stars". Skipped at
 * low quality — they're the least essential layer, performance-wise.
 */
function DistantPeaks({ positions }) {
  return positions.map(([x, z, height, lit], i) => (
    <mesh key={i} position={[x, height / 2, z]}>
      <coneGeometry args={[height * 0.55, height, 5]} />
      <meshStandardMaterial
        color={lit ? COLORS.peakLit : COLORS.peak}
        roughness={1}
      />
    </mesh>
  ))
}

/**
 * Small warm-lit accent light dropped near a waypoint so each area has
 * a slightly different mood while the overall scene stays lit by the
 * same global ambient/directional pair — this is what gives Story,
 * Science and Video their own "feel" as the camera arrives.
 */
function AreaMood({ position, color, intensity = 1.4 }) {
  return (
    <pointLight
      position={position}
      color={color}
      intensity={intensity}
      distance={9}
      decay={2}
    />
  )
}

/**
 * Temporary focal placeholder standing in for the final Minilemon
 * character — deliberately abstract (stacked capsule/sphere "seed"
 * shape, no face, no final design) so it can't be mistaken for
 * finished character art. It marks the exact spot, scale and facing
 * direction a real GLB character should occupy: centered on the Hero
 * island, facing the camera's default look direction (+Z), standing
 * on a soft fake contact-shadow (a dark, flattened, transparent disc
 * — cheap stand-in for a real shadow map, which we deliberately skip
 * here for performance).
 */
function MascotPlaceholder({ position }) {
  return (
    <group position={position}>
      {/* Fake contact shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.32, 0.45, 6, 12]} />
        <meshStandardMaterial color={COLORS.mascot} roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color={COLORS.mascot} roughness={0.5} />
      </mesh>
      {/* Small accent (backpack/cap stand-in) so it reads as a
          "character slot", not just a blob — still fully abstract. */}
      <mesh position={[0, 0.62, -0.28]}>
        <boxGeometry args={[0.3, 0.32, 0.14]} />
        <meshStandardMaterial color={COLORS.mascotAccent} roughness={0.6} />
      </mesh>
    </group>
  )
}

/**
 * Full placeholder world. `quality="low"` (used on small screens)
 * trims object counts and skips the priciest decorative bits while
 * keeping the same waypoint layout, so the camera path never changes.
 */
function WorldPlaceholder({ quality = 'high' }) {
  const isLow = quality === 'low'

  const treePositions = useMemo(() => {
    const base = [
      [-1.8, 0.2, 1.4],
      [1.7, 0.2, 1.6],
      [-2.6, 0.2, -1.6],
      [2.4, 0.2, -4.8],
      [-1.6, 0.2, -6.6],
      [3.1, 0.2, -9.6],
      [-3.2, 0.2, -11.8],
    ]
    return isLow ? base.slice(0, 4) : base
  }, [isLow])

  const cloudPositions = useMemo(() => {
    const base = [
      [-3, 4.2, -1],
      [3, 4.6, -6],
      [-2.4, 5, -10],
      [2, 5.2, -14],
    ]
    return isLow ? base.slice(0, 2) : base
  }, [isLow])

  // Large, low-poly silhouettes flanking the route — establishes scale
  // (the world feels bigger than the handful of landmarks the camera
  // visits) and gives the background real depth instead of empty
  // space. Skipped at low quality (least essential layer).
  const distantPeaks = useMemo(() => {
    if (isLow) return []
    return [
      [-7, 6, 6.5, false],
      [-8.5, -5, 7.5, true],
      [-7.5, -11, 6, false],
      [-8, -16, 7.5, true],
      [7.5, 5, 7, true],
      [9, -4, 6.5, false],
      [8, -10, 6, true],
      [8.5, -15.5, 7, false],
    ]
  }, [isLow])

  return (
    <group>
      <Stars
        radius={60}
        depth={30}
        count={isLow ? 800 : 2200}
        factor={2.4}
        saturation={0}
        fade
        speed={0.4}
      />

      {/* HERO */}
      <Island position={WAYPOINTS.hero} radius={3.2} />
      <HousePlaceholder position={[-0.9, 0, 0.6]} scale={0.9} />
      <HousePlaceholder position={[1.1, 0, -0.3]} scale={0.75} roofColor={COLORS.purple} />
      {/* Temporary character slot — see MascotPlaceholder docblock. */}
      <MascotPlaceholder position={[0, 0, 1.9]} />

      {/* STORY — purple accent light gives this area its own mood */}
      <Island position={WAYPOINTS.story} radius={2.6} color={COLORS.purpleDark} />
      <HousePlaceholder position={[WAYPOINTS.story[0] - 0.7, 0, WAYPOINTS.story[2] + 0.5]} scale={0.85} />
      <AreaMood
        position={[WAYPOINTS.story[0], 2.2, WAYPOINTS.story[2]]}
        color={COLORS.purple}
      />

      {/* SCIENCE (placeholder building — final asset pending) — mint accent */}
      <Island position={WAYPOINTS.science} radius={2.6} color="#dfe6f2" />
      <ScienceBuildingPlaceholder position={WAYPOINTS.science} />
      <AreaMood
        position={[WAYPOINTS.science[0], 2.6, WAYPOINTS.science[2]]}
        color={COLORS.mint}
      />

      {/* VIDEO (placeholder building — final asset pending) — coral accent */}
      <Island position={WAYPOINTS.video} radius={2.6} color="#f4e3c2" />
      <VideoBuildingPlaceholder position={WAYPOINTS.video} />
      <AreaMood
        position={[WAYPOINTS.video[0], 2.4, WAYPOINTS.video[2]]}
        color={COLORS.coral}
      />

      {/* Path connecting every stop — Island → Story House → Science
          Lab → Video Building, one continuous route the camera
          visibly travels along. */}
      <PathSegment from={WAYPOINTS.hero} to={WAYPOINTS.story} />
      <PathSegment from={WAYPOINTS.story} to={WAYPOINTS.science} />
      <PathSegment from={WAYPOINTS.science} to={WAYPOINTS.video} />

      <TreeCluster positions={treePositions} />
      <SimpleClouds positions={cloudPositions} />
      <DistantPeaks positions={distantPeaks} />

      <FloatingObjects center={WAYPOINTS.hero} count={isLow ? 2 : 3} color={COLORS.yellow} />
      <FloatingObjects center={WAYPOINTS.science} count={isLow ? 0 : 3} color={COLORS.mint} />

      {!isLow && (
        <>
          <SimplePlanet position={[6, 4.2, -5]} />
          <Cloud position={[-5, 3.4, -12]} opacity={0.25} speed={0.15} segments={12} bounds={[3, 1, 1]} />
        </>
      )}
    </group>
  )
}

export default WorldPlaceholder
