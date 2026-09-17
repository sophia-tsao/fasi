import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { TextureLoader, BackSide, AdditiveBlending } from 'three'

// Soft atmospheric glow: brightest at the silhouette edge, fading outward so
// there's no hard ring — mimics light diffusing through an atmosphere.
const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const atmosphereFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  uniform float uIntensity;
  uniform float uPower;
  uniform float uEdge;
  uniform vec3 uLightDir;
  void main() {
    float facing = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    // Rises toward the silhouette, but the smoothstep pulls it back to 0 at the
    // very outer edge so the glow dissolves into black instead of ending on a line.
    float rim = pow(1.0 - facing, uPower) * smoothstep(0.0, uEdge, facing);
    // Uneven brightness, as if a dim light sat behind one side of the Earth.
    float side = 0.15 + 0.85 * smoothstep(-0.7, 1.0, dot(vNormal, uLightDir));
    gl_FragColor = vec4(1.0, 1.0, 1.0, rim * side * uIntensity);
  }
`

// threejs.org serves these textures with CORS enabled, so they load fine in-browser.
const EARTH_DAY = 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
const EARTH_SPEC = 'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'
const EARTH_CLOUDS = 'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'

function Globe() {
  const earthRef = useRef()
  const cloudRef = useRef()
  const [dayMap, specMap, cloudMap] = useLoader(TextureLoader, [
    EARTH_DAY,
    EARTH_SPEC,
    EARTH_CLOUDS,
  ])

  useFrame((_, delta) => {
    // Slow, steady spin.
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.065
  })

  return (
    <group rotation={[0.35, 0, 0.15]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={dayMap}
          specularMap={specMap}
          shininess={12}
        />
      </mesh>

      {/* Cloud layer, spinning slightly faster for parallax. */}
      <mesh ref={cloudRef} scale={1.01}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={cloudMap} transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {/* Thin, uneven atmosphere — just enough to read the Earth's edge in the dark. */}
      <mesh scale={1.13}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={{
            uIntensity: { value: 0.3 },
            uPower: { value: 3.5 },
            uEdge: { value: 0.35 },
            uLightDir: { value: [0.7, 0.4, 0.6] },
          }}
          transparent
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// Fallback shown while textures load: a shaded blue sphere.
function GlobeFallback() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 48, 48]} />
      <meshPhongMaterial color="#12305c" shininess={8} />
    </mesh>
  )
}

export default function Earth() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#fff6e8" />

      <Stars radius={120} depth={60} count={4000} factor={3} saturation={0} fade speed={0.5} />

      <Suspense fallback={<GlobeFallback />}>
        <Globe />
      </Suspense>
    </Canvas>
  )
}
