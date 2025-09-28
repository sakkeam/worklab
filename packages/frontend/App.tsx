import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";

const store = createXRStore({
	offerSession: "immersive-vr",
});

export default function App() {
	return (
		<div className="w-screen h-screen">
			<Canvas>
				<XR store={store} />
			</Canvas>
		</div>
	);
}
