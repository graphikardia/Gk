import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import "./styles/TechStack.css";

const textureLoader = new THREE.TextureLoader();

const marketingTools = [
  { name: "Figma", url: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", what: "UI/UX Design Tool", why: "Creates stunning user interfaces and prototypes", where: "Web apps, mobile apps, presentations" },
  { name: "Adobe Photoshop", url: "https://cdn-icons-png.flaticon.com/512/596/596837.png", what: "Image Editing Software", why: "Industry-standard photo manipulation", where: "Photo retouching, digital art, marketing materials" },
  { name: "Adobe Illustrator", url: "https://cdn-icons-png.flaticon.com/512/5968/5968522.png", what: "Vector Graphics Editor", why: "Creates scalable vector graphics", where: "Logos, icons, illustrations, branding" },
  { name: "Adobe Premiere Pro", url: "https://cdn-icons-png.flaticon.com/512/5968/5968559.png", what: "Video Editing Software", why: "Professional video production", where: "YouTube, ads, films, social media content" },
  { name: "After Effects", url: "https://cdn-icons-png.flaticon.com/512/5968/5968472.png", what: "Motion Graphics Tool", why: "Creates stunning animations and VFX", where: "Intro videos, motion logos, visual effects" },
  { name: "Canva", url: "https://cdn-icons-png.flaticon.com/512/1256/1256586.png", what: "Online Design Platform", why: "Quick and easy design creation", where: "Social posts, presentations, flyers" },
  { name: "Meta Business", url: "https://cdn-icons-png.flaticon.com/512/733/733221.png", what: "Social Media Manager", why: "Manages all Meta platforms", where: "Facebook, Instagram ads and insights" },
  { name: "Google Analytics", url: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", what: "Analytics Platform", why: "Tracks website performance", where: "Traffic analysis, user behavior, conversions" },
  { name: "Google Ads", url: "https://cdn-icons-png.flaticon.com/512/2504/2504941.png", what: "Advertising Platform", why: "Creates targeted ads", where: "Search ads, display ads, YouTube ads" },
  { name: "WordPress", url: "https://cdn-icons-png.flaticon.com/512/174/174881.png", what: "CMS Platform", why: "Builds websites easily", where: "Blogs, business sites, e-commerce" },
  { name: "HubSpot", url: "https://cdn-icons-png.flaticon.com/512/5968/5968891.png", what: "Marketing CRM", why: "Manages customer relationships", where: "Email marketing, lead gen, automation" },
  { name: "Mailchimp", url: "https://cdn-icons-png.flaticon.com/512/3256/3259945.png", what: "Email Marketing Tool", why: "Creates email campaigns", where: "Newsletters, automated emails, promotions" },
  { name: "SEMrush", url: "https://cdn-icons-png.flaticon.com/512/5966/5966290.png", what: "SEO Tool", why: "Analyzes search rankings", where: "Keyword research, competitor analysis" },
  { name: "Ahrefs", url: "https://cdn-icons-png.flaticon.com/512/1256/1257448.png", what: "SEO Platform", why: "Backlink analysis", where: "Link building, content research" },
  { name: "CapCut", url: "https://cdn-icons-png.flaticon.com/512/4624/4624991.png", what: "Video Editor App", why: "Quick mobile video editing", where: "TikTok, Reels, short-form content" },
];

const imageUrls = marketingTools.map((tool) => tool.url);
const textures = imageUrls.map((url) => {
  const texture = textureLoader.load(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
});

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(15)].map((_, i) => ({
  scale: [0.8, 1, 1.2, 0.9, 1.1][i % 5],
  textureIndex: i % marketingTools.length,
  position: [
    Math.sin(i * 0.8) * 8,
    Math.cos(i * 0.6) * 5,
    (i - 7) * 0.5
  ] as [number, number, number]
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  textureIndex: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  toolData: typeof marketingTools[0];
  onSelect: (tool: typeof marketingTools[0]) => void;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  textureIndex: _textureIndex,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  toolData,
  onSelect,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
        onClick={() => onSelect(toolData)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedTool, setSelectedTool] = useState<typeof marketingTools[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = document.getElementById("work")?.getBoundingClientRect().top || 0;
      setIsActive(window.scrollY > threshold - 500);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="toolkit">
      <div className="techstack-header">
        <span className="techstack-label">✦ My Toolkit</span>
        <h2>Click on a Tool</h2>
        <p>Explore the tools that power my creative work</p>
      </div>

      {selectedTool && (
        <div className="tool-modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="tool-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTool(null)}>×</button>
            <div className="modal-icon">
              <img src={selectedTool.url} alt={selectedTool.name} />
            </div>
            <h3>{selectedTool.name}</h3>
            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-label">What</span>
                <span className="detail-value">{selectedTool.what}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Why</span>
                <span className="detail-value">{selectedTool.why}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Where</span>
                <span className="detail-value">{selectedTool.where}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[props.textureIndex]}
              isActive={isActive}
              toolData={marketingTools[i]}
              onSelect={setSelectedTool}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
