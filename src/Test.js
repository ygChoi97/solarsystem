import React, { Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import planetData from "./planetData";
import "./styles.css";
import sunTexture from "./textures/2k_sun.jpg";
import { ratio } from "./planetData";
export default function App() {
  return (
    <>
      <a
        href="https://medium.com/geekculture/build-3d-apps-with-react-animated-solar-system-part-1-c4c394a8574c"
        className="article-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Step by step guide to how I build this
      </a>
      <Canvas camera={{ position: [0, 20, 25], fov: 75 }}>
      <Suspense fallback={null}>
        <Sun />
        {planetData.map((planet) => (
          <Planet planet={planet} key={planet.id} />
        ))}
        <Lights />
        <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}
function Sun() {
  const texture = useLoader(THREE.TextureLoader, sunTexture);
  return (
    <mesh>
      <sphereGeometry args={[1392700/2*ratio, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
function Planet({ planet: { xRadius, zRadius, size, speed, offset, rotationSpeed, textureMap } }) {
    const planetRef = React.useRef();
    const texture = useLoader(THREE.TextureLoader, textureMap);
    useFrame(({clock})=>{
        const t = clock.getElapsedTime()*speed+offset;
        const x = xRadius*Math.sin(t);
        const z = zRadius*Math.cos(t);

        planetRef.current.position.x = x;
        planetRef.current.position.z = z;
        planetRef.current.rotation.y += rotationSpeed;
        
    })
  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
    </line>
  );
}
