import { type VRM, VRMLoaderPlugin } from "@pixiv/three-vrm";
import { useGLTF } from "@react-three/drei";
import { type JSX, useEffect } from "react";
import type * as THREE from "three";

export type Props = {
	path: string;
};

export default function AvatarModel(
	props: Props & Omit<JSX.IntrinsicElements["primitive"], "object">,
) {
	const gltf = useGLTF(props.path, true, true, (loader) => {
		// biome-ignore lint/suspicious/noExplicitAny: Incomplete types.
		loader.register((parser) => new VRMLoaderPlugin(parser as any) as any);
	});
	const vrm = gltf.userData.vrm as VRM | undefined;
	useEffect(() => {
		if (vrm) {
			vrm.scene.traverse((object) => {
				if ((object as THREE.Mesh).isMesh) {
					object.castShadow = true;
				}
			});
		}
	}, [vrm]);
	return vrm ? <primitive object={vrm.scene} {...props} /> : null;
}
