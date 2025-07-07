import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
//             character.traverse((child: any) => {
//   if (child.isMesh) {
//     const mesh = child as THREE.Mesh;
//     child.castShadow = true;
//     child.receiveShadow = true;
//     mesh.frustumCulled = true;

//     // === Material color change ===
//     if (Array.isArray(mesh.material)) {
//       mesh.material.forEach((mat) => {
//         if ("color" in mat) {
//           (mat as THREE.MeshStandardMaterial).color.set("rgb(245, 224, 215)");
//         }
//       });
//     } else {
//       if ("color" in mesh.material) {
//         (mesh.material as THREE.MeshStandardMaterial).color.set("rgb(83, 78, 75)");
//       }
//     }
//     // ============================
//   }
// });
character.traverse((child: any) => {
  if (child.isMesh) {
    const mesh = child as THREE.Mesh;
    child.castShadow = true;
    child.receiveShadow = true;
    mesh.frustumCulled = true;

    // Mesh name ke basis pe color set karo
    const material = Array.isArray(mesh.material)
      ? mesh.material[0] as THREE.MeshStandardMaterial
      : mesh.material as THREE.MeshStandardMaterial;

    if (!material || !material.color || typeof material.color.set !== "function") return;

    // Baal (Hair) - black
    if (mesh.name.toLowerCase().includes("hair")) {
      material.color.set("#000000");
    }
    // Eyes - realistic (usually texture hoti hai, color mat badlo)
    else if (mesh.name.toLowerCase().includes("eye")) {
      // Eyes ko as it is chhodo, ya thoda blue/green/brown set kar sakte ho
      // material.color.set("#3b2f2f"); // Example: brown
    }
    // Face/skin - skin color
    else if (mesh.name.toLowerCase().includes("face") || mesh.name.toLowerCase().includes("head") || mesh.name.toLowerCase().includes("ear") ) {
      material.color.set("rgb(245, 224, 215)");
    }
    // Shirt/chest - white
    else if (mesh.name.toLowerCase().includes("shirt") || mesh.name.toLowerCase().includes("chest") || mesh.name.toLowerCase().includes("body")) {
      material.color.set("#ffffff");
    }
    // Jeans/pants - black
    else if (mesh.name.toLowerCase().includes("jean") || mesh.name.toLowerCase().includes("pant") || mesh.name.toLowerCase().includes("trouser")) {
      material.color.set("rgb(170, 95, 168)");
    }
    // Default: kuch bhi nahi
  }
});
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
