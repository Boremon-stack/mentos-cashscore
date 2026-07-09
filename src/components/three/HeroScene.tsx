"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function CashflowCore() {
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.18;
      coreRef.current.rotation.x += delta * 0.06;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.6, 4]} />
          <MeshDistortMaterial
            color="#2bff9e"
            emissive="#0f5c3a"
            roughness={0.15}
            metalness={0.4}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
      </Float>
      <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 120]} />
        <meshStandardMaterial color="#3d6bff" emissive="#3d6bff" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, 0.4, 0]}>
        <torusGeometry args={[3.1, 0.012, 16, 120]} />
        <meshStandardMaterial color="#2bff9e" emissive="#2bff9e" emissiveIntensity={0.8} />
      </mesh>
      <Sparkles count={60} scale={6} size={2} speed={0.3} color="#2bff9e" opacity={0.6} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1.4} color="#2bff9e" />
          <pointLight position={[-5, -3, 2]} intensity={1.2} color="#3d6bff" />
          <CashflowCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
