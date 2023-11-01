import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Mesh } from "three"

const Cube = () => {
  return(
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5}/>
      <spotLight position={[10, 15, 10]} angle={0.3}/>
      <Mesh position={[0,0,0]}>
        <boxBufferGeometry attatch="geometry" />
        <meshLambertMaterial attatch="material" color="orange" />
      </Mesh>
    </Canvas>
  );
}

export default Cube;