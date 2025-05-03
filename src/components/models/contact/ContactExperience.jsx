import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Computer from "./Computer";

const AnimatedComputer = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3; // left-right tilt
      groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.05; // slight up-down nod
      groupRef.current.position.y = Math.sin(t * 1) * 0.1 - 1.49; // smooth bobbing
    }
  });

  return (
    <group ref={groupRef} scale={0.03} position={[0, -1.49, -2]} castShadow>
      <Computer />
    </group>
  );
};

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      <ambientLight intensity={0.5} color="#fff4e6" />
      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />
      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#ffd9b3"
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Ground Plane */}
      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#a46b2d" />
        </mesh>
      </group>

      {/* Animated 3D Computer */}
      <AnimatedComputer />
    </Canvas>
  );
};

export default ContactExperience;
