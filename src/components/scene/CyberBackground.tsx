import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
    const ref = useRef<THREE.Points>(null!);
    const { mouse, viewport } = useThree();

    // Create particles
    const count = 2000;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Random positions - spread wide but focused in center Z
            positions[i * 3] = (Math.random() - 0.5) * 15;      // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;  // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Constant slow rotation
        ref.current.rotation.x -= delta / 50;
        ref.current.rotation.y -= delta / 60;

        // Mouse interaction - slightly tilt the whole field based on mouse position
        // Lerp for smooth movement
        const targetX = (mouse.y * viewport.height) / 100; // subtle
        const targetY = (mouse.x * viewport.width) / 100;

        ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.02;
        ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.02;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#33ff33" // Neon Green
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

// Add a secondary layer of "Data Streams" or floating bits for more depth
const DataDebris = () => {
    const ref = useRef<THREE.Points>(null!);

    const count = 100;
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 10;
            p[i * 3 + 1] = (Math.random() - 0.5) * 10;
            p[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return p;
    }, [count]);

    useFrame((state, delta) => {
        if (!ref.current) return;
        // Make these float upwards like data stream
        ref.current.position.y += delta * 0.2;
        if (ref.current.position.y > 5) {
            ref.current.position.y = -5;
        }
    });

    return (
        <group>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
}

const CyberBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
                {/* <color attach="background" args={['#000000']} />  Background is transparent to layer over CSS bg */}
                <ParticleField />
                <DataDebris />
            </Canvas>
        </div>
    );
};

export default CyberBackground;
