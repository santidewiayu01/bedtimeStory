# Placeholder model folder

Reserved for the final `.glb` / `.gltf` assets from the Modeling &
Animation team (hero world, houses, science building, video building,
trees, floating objects, etc).

No final assets are included yet — the current homepage uses simple
primitive-geometry placeholders defined in
`src/components/immersive/WorldPlaceholder.jsx`.

## How to swap a placeholder for a real asset later

1. Drop the exported file here, e.g. `hero-island.glb`.
2. In `WorldPlaceholder.jsx`, load it with drei's loader hook:
   ```jsx
   import { useGLTF } from '@react-three/drei'

   function HeroIsland(props) {
     const { scene } = useGLTF('/models/placeholders/hero-island.glb')
     return <primitive object={scene} {...props} />
   }
   ```
3. Replace the corresponding placeholder `<group position={...}>` block
   with the new component, keeping the same `position` prop so the
   camera path and layout don't need to change.
4. Call `useGLTF.preload('/models/placeholders/hero-island.glb')`
   near the top of the file if you want it to start loading early.
