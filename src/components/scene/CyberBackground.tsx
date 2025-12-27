import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Plane, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, Scanline } from '@react-three/postprocessing';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// --- Custom Shader for Digital Terrain ---
const TerrainShaderMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 1, 0.2) },
    // Vertex Shader
    `
    varying vec2 vUv;
    uniform float time;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Simple wave displacement
      pos.z += sin(pos.x * 0.2 + time) * 2.0;
      pos.z += cos(pos.y * 0.2 + time) * 2.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      // Grid effect
      float gridX = step(0.98, fract(vUv.x * 40.0));
      float gridY = step(0.98, fract(vUv.y * 40.0));
      float grid = max(gridX, gridY);
      
      // Moving pulse
      float pulse = step(0.95, fract(vUv.y * 5.0 - time * 0.5));
      
      vec3 finalColor = color * (grid + pulse * 0.5);
      float alpha = (grid + pulse) * (1.0 - vUv.y); // Fade out at distance
      
      gl_FragColor = vec4(finalColor, alpha * 0.5);
    }
  `
);

extend({ TerrainShaderMaterial });

const DigitalTerrain = () => {
    const materialRef = useRef<any>(null);

    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.time += delta;
        }
    });

    return (
        <Plane args={[100, 100, 64, 64]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -20]}>
            {/* @ts-ignore */}
            <terrainShaderMaterial ref={materialRef} transparent side={THREE.DoubleSide} color="#33ff33" />
        </Plane>
    );
};

const ParticleField = () => {
    const ref = useRef<THREE.Points>(null!);

    const count = 3000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;      // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;  // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;  // z
        }
        return positions;
    }, [count]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y -= delta * 0.05;
    });

    return (
        <group>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#33ff33"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
};

const CyberBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ antialias: false, alpha: false }}>
                <color attach="background" args={['#050505']} />

                <fog attach="fog" args={['#050505', 10, 40]} />

                <group rotation={[0.2, 0, 0]}>
                    <ParticleField />
                    <DigitalTerrain />
                </group>

                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <Noise opacity={0.15} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <Scanline density={1.5} opacity={0.2} scrollSpeed={0.05} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default CyberBackground;
