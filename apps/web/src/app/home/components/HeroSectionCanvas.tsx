"use client";

import { Canvas } from "@react-three/fiber";
import { Text, Plane, useTexture } from "@react-three/drei";
import { Suspense } from "react";

export default function HeroSectionCanvas() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 100, position: [0, 0, 10] }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Suspense fallback={null}>
        <HeroContent />
      </Suspense>
    </Canvas>
  );
}

function HeroContent() {
  const profileTexture = useTexture("/profile.png");

  return (
    <>
      {/* Title Text */}
      <Text
        position={[-2.5, 0.5, 0]}
        fontSize={0.4}
        color="#EDEDED"
        anchorX="left"
        anchorY="bottom"
        maxWidth={3.5}
      >
        Hey, I’m Jenish 👋
      </Text>

      {/* Subtitle Text */}
      <Text
        position={[-2.5, -0.2, 0]}
        fontSize={0.18}
        color="#A0A0A0"
        anchorX="left"
        anchorY="top"
        maxWidth={4}
      >
        A system designer, builder & writer — crafting experiences in code,
        infra, and words.
      </Text>

      {/* Profile Image at Bottom-Right */}
      <Plane args={[1.5, 1.5]} position={[3.2, -2.3, 0]}>
        <meshBasicMaterial map={profileTexture} transparent />
      </Plane>
    </>
  );
}
