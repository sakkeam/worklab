import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { createXRStore, XR } from "@react-three/xr";
import { Suspense } from "react";

const store = createXRStore({
	offerSession: "immersive-vr",
});

export default function App() {
	return (
		<div className="w-screen h-screen">
			<Canvas>
				<XR store={store}>
					<Suspense>
						<Physics>
							<RigidBody>
								<mesh />
							</RigidBody>
						</Physics>
					</Suspense>
				</XR>
			</Canvas>
		</div>
	);
}
