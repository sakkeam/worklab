import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import AvatarModel from "./AvatarModel";

const store = createXRStore({
	offerSession: "immersive-vr",
});

export default function App() {
	return (
		<div className="w-screen h-screen">
			<Canvas shadows>
				<XR store={store}>
					<color attach={"background"} args={["#9bc0f9"]} />
					<fogExp2 attach={"fog"} args={["#9bc0f9", 0.015625]} />
					<ambientLight color={"#ffffff"} intensity={1} />
					<directionalLight
						color={"#ffffff"}
						intensity={1}
						castShadow
						position={[-8, 8, 8]}
					/>
					<directionalLight
						color={"#ffffff"}
						intensity={0.25}
						castShadow
						position={[8, 4, 8]}
					/>
					<directionalLight
						color={"#ffffff"}
						intensity={0.5}
						castShadow
						position={[0, 2, -8]}
					/>
					<PerspectiveCamera position={[8, 2, 8]} fov={30} makeDefault />
					<CameraControls />
					<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
						<planeGeometry args={[256, 256]} />
						<meshStandardMaterial opacity={0.5} transparent color={"#ffffff"} />
					</mesh>
					<AvatarModel
						position={[0, 0, -2]}
						rotation={[0, Math.PI, 0]}
						path="/models/AliciaSolid.vrm"
					/>
				</XR>
			</Canvas>
		</div>
	);
}
