"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group } from "three";

type Variant = "upi" | "emi" | "salary";

function UpiGeo() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[0.9, 0.24, 160, 20, 2, 3]} />
        <meshStandardMaterial color="#6fbfa0" emissive="#234a3c" emissiveIntensity={0.6} roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function EmiGeo() {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.z += delta * 0.4;
    if (inner.current) inner.current.rotation.z -= delta * 0.7;
  });
  return (
    <group>
      <group ref={outer}>
        <mesh>
          <torusGeometry args={[1.05, 0.16, 24, 64]} />
          <meshStandardMaterial color="#e28b5c" emissive="#7a4a2e" emissiveIntensity={0.7} roughness={0.25} metalness={0.6} />
        </mesh>
      </group>
      <group ref={inner}>
        <mesh position={[0, 0, 0.05]}>
          <torusGeometry args={[0.55, 0.09, 20, 48]} />
          <meshStandardMaterial color="#6fbfa0" emissive="#234a3c" emissiveIntensity={0.6} roughness={0.25} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function SalaryGeo() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  const coins = [0, 1, 2, 3];
  return (
    <group ref={ref}>
      {coins.map((i) => (
        <mesh key={i} position={[0, i * 0.32 - 0.5, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.16, 48]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6fbfa0" : "#e28b5c"}
            emissive={i % 2 === 0 ? "#234a3c" : "#7a4a2e"}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

const GEO: Record<Variant, () => React.JSX.Element> = {
  upi: UpiGeo,
  emi: EmiGeo,
  salary: SalaryGeo,
};

export default function FeatureOrb({ variant }: { variant: Variant }) {
  const Geo = GEO[variant];
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.4], fov: 40 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={1.3} color="#6fbfa0" />
          <pointLight position={[-3, -2, 2]} intensity={1} color="#e28b5c" />
          <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1}>
            <Geo />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
