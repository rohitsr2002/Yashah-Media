import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const AnimatedRoom = ({ isMobile }) => {
  const groupRef = useRef();
  const clock = new THREE.Clock();

  useFrame(() => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15 - 3.5;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.7 : 1}
      position={[0, -3.5, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <Room />
      
      {/* Wall-mounted Frame Group */}
      <group position={[0.5, 4.5, -2.5]} rotation={[0, Math.PI / 25, 0]}>
        {/* Frame Structure */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 1.5, 0.2]} />
          <meshStandardMaterial 
            color="#2a2a2a"
            metalness={0.5}
            roughness={0.6}
          />
        </mesh>

        {/* Text Panel */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[2.3, 1.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* 3D Text */}
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          letterSpacing={0.05}
        >
          YASHAH MEDIA 
          <meshStandardMaterial
            metalness={0.7}
            roughness={0.3}
            color="#ffffff"
          />
        </Text>
      </group>
    </group>
  );
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // ... (keep existing zoom and scroll logic)

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      {/* Improved Lighting for Wall Visibility */}
      <ambientLight intensity={1.5} />
      <spotLight
        position={[3, 5, -2]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffe6cc"
      />
      
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={isMobile ? 50 : 100} />
        <AnimatedRoom isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;