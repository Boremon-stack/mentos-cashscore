"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Text } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group, Mesh } from "three";

function OrbitNode({
  radius,
  speed,
  tiltX,
  tiltZ,
  phase,
  size,
  color,
}: {
  radius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  phase: number;
  size: number;
  color: string;
}) {
  const spinRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * speed;
  });
  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={spinRef} rotation={[0, phase, 0]}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function CashflowCore() {
  const coreRef = useRef<Mesh>(null);
  const glyphGroupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.15;
    if (glyphGroupRef.current) glyphGroupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.6, 96, 96]} />
          <MeshDistortMaterial
            color="#d5b893"
            emissive="#4a3729"
            roughness={0.08}
            metalness={0.65}
            distort={0.08}
            speed={1}
          />
        </mesh>
        <group ref={glyphGroupRef}>
          <Text position={[0, 0, 1.72]} fontSize={1.5} color="#25344f" anchorX="center" anchorY="middle" fontWeight={700}>
            ₹
          </Text>
          <Text
            position={[0, 0, -1.72]}
            rotation={[0, Math.PI, 0]}
            fontSize={1.5}
            color="#25344f"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            ₹
          </Text>
        </group>

        <OrbitNode radius={2.5} speed={0.5} tiltX={0.3} tiltZ={0.1} phase={0} size={0.16} color="#d5b893" />
        <OrbitNode radius={2.9} speed={-0.35} tiltX={-0.25} tiltZ={0.6} phase={2.1} size={0.13} color="#617891" />
        <OrbitNode radius={2.2} speed={0.65} tiltX={0.8} tiltZ={-0.4} phase={4.2} size={0.11} color="#ece0cd" />
      </Float>
      <Sparkles count={50} scale={6} size={2} speed={0.3} color="#d5b893" opacity={0.5} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1.4} color="#d5b893" />
          <pointLight position={[-5, -3, 2]} intensity={1.2} color="#617891" />
          <CashflowCore />
        </Suspense>
      </Canvas>
    </div>
  );
}
