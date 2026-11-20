import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, PointsMaterial } from "three";
import { useActiveSection } from "../hooks/useActiveSection.js";

const SCENE_IDS = ["top", "about", "education", "skills", "services", "projects", "process", "contact"];

const MOODS = {
  top: { a: "#9eb6ff", b: "#ff8a4c", amp: 0.1, speed: 0.42, freq: 4.6 },
  about: { a: "#cbb6ff", b: "#9eb6ff", amp: 0.07, speed: 0.26, freq: 3.1 },
  education: { a: "#d7c8ff", b: "#9eb6ff", amp: 0.06, speed: 0.24, freq: 3.2 },
  skills: { a: "#7ddec8", b: "#9eb6ff", amp: 0.12, speed: 0.48, freq: 6.4 },
  services: { a: "#ff8a4c", b: "#cbb6ff", amp: 0.09, speed: 0.34, freq: 3.8 },
  projects: { a: "#ffb086", b: "#3d5bff", amp: 0.11, speed: 0.4, freq: 5.4 },
  process: { a: "#9eb6ff", b: "#7ddec8", amp: 0.06, speed: 0.22, freq: 2.8 },
  contact: { a: "#d7c8ff", b: "#7ddec8", amp: 0.08, speed: 0.3, freq: 3.6 },
};

const SPARK_COUNT = 42;
const SPARKS = Array.from({ length: SPARK_COUNT }, () => ({
  x: (Math.random() - 0.5) * 9.4,
  y: Math.random() * 5.8,
  phase: Math.random() * Math.PI * 2,
  speed: 0.12 + Math.random() * 0.28,
  sway: 0.12 + Math.random() * 0.4,
}));

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAmp;
uniform float uSpeed;
uniform float uFreq;
uniform float uDir;

void main() {
  float t = uTime * uSpeed * uDir;
  float flow = sin(vUv.x * uFreq + t) * uAmp;
  float flow2 = cos(vUv.x * uFreq * 0.58 - t * 0.75) * uAmp * 0.7;
  float y = vUv.y + flow + flow2;
  float bandA = exp(-pow((y - 0.66) * 6.4, 2.0));
  float bandB = exp(-pow((y - 0.34) * 8.2, 2.0));
  float thread = exp(-pow((y - 0.5 + sin(vUv.x * 2.4 + t) * 0.045) * 18.0, 2.0));
  vec3 color = mix(uColorA, uColorB, clamp(vUv.x * 0.8 + flow + 0.18, 0.0, 1.0));
  float alpha = bandA * 0.7 + bandB * 0.42 + thread * 0.62;
  alpha *= smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
  alpha *= smoothstep(0.0, 0.04, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
  gl_FragColor = vec4(color, alpha);
}
`;

function Silk({ active, narrow, dir, scale, offset }) {
  const uniforms = useRef(null);
  const aimA = useRef(null);
  const aimB = useRef(null);
  if (!uniforms.current) {
    uniforms.current = {
      uTime: { value: 0 },
      uColorA: { value: new Color("#9eb6ff") },
      uColorB: { value: new Color("#ff8a4c") },
      uAmp: { value: 0.08 },
      uSpeed: { value: 0.35 },
      uFreq: { value: 4 },
      uDir: { value: dir },
    };
    aimA.current = new Color();
    aimB.current = new Color();
  }

  useFrame((_, delta) => {
    const mood = MOODS[active] || MOODS.top;
    const sheet = uniforms.current;
    const damp = narrow ? 0.62 : 1;
    sheet.uTime.value += delta;
    aimA.current.set(mood.a);
    aimB.current.set(mood.b);
    const blend = 1 - 0.001 ** delta;
    sheet.uColorA.value.lerp(aimA.current, blend);
    sheet.uColorB.value.lerp(aimB.current, blend);
    const follow = Math.min(1, delta * 1.5);
    sheet.uAmp.value += (mood.amp * damp - sheet.uAmp.value) * follow;
    sheet.uSpeed.value += (mood.speed - sheet.uSpeed.value) * follow;
    sheet.uFreq.value += (mood.freq - sheet.uFreq.value) * follow;
  });

  return (
    <mesh scale={scale} position={offset}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        uniforms={uniforms.current}
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </mesh>
  );
}

function Drift({ active, narrow }) {
  const points = useRef(null);
  const material = useRef(null);
  const tint = useRef(null);
  const geometry = useRef(null);
  if (!geometry.current) {
    const attribute = new BufferAttribute(new Float32Array(SPARK_COUNT * 3), 3);
    const nextGeometry = new BufferGeometry();
    nextGeometry.setAttribute("position", attribute);
    geometry.current = nextGeometry;
    material.current = new PointsMaterial({
      color: "#f4efe6",
      size: 0.04,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });
    tint.current = new Color();
  }

  useEffect(
    () => () => {
      material.current.dispose();
      geometry.current.dispose();
    },
    [],
  );

  useFrame(({ clock }, delta) => {
    const mood = MOODS[active] || MOODS.top;
    const attribute = geometry.current.getAttribute("position");
    const dots = attribute.array;
    material.current.size = narrow ? 0.03 : 0.042;
    tint.current.set(mood.a);
    material.current.color.lerp(tint.current, 1 - 0.001 ** delta);
    const time = clock.elapsedTime;
    const limit = narrow ? 24 : SPARK_COUNT;
    for (let index = 0; index < SPARK_COUNT; index += 1) {
      const spark = SPARKS[index];
      const visible = index < limit;
      const y = ((spark.y + time * spark.speed) % 5.8) - 2.9;
      dots[index * 3] = visible ? spark.x + Math.sin(time * 0.32 + spark.phase) * spark.sway : 0;
      dots[index * 3 + 1] = visible ? y : -12;
      dots[index * 3 + 2] = visible ? Math.sin(spark.phase) * 0.35 : 0;
    }
    attribute.needsUpdate = true;
  });

  return <points ref={points} geometry={geometry.current} material={material.current} />;
}

export default function SectionScene() {
  const [reduce, setReduce] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const active = useActiveSection(SCENE_IDS);
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 719px)").matches);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 719px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setNarrow(query.matches);
    const onMotion = () => setReduce(motion.matches);
    query.addEventListener("change", onChange);
    motion.addEventListener("change", onMotion);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", onChange);
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (reduce) return null;

  const mood = active || "top";

  return (
    <div className="section-scene" aria-hidden="true">
      <Canvas
        dpr={narrow ? 1 : [1, 1.15]}
        camera={{ position: [0, 0, 4.4], fov: 48 }}
        frameloop={hidden ? "never" : "always"}
        performance={{ min: 0.6 }}
        gl={{
          alpha: true,
          antialias: false,
          stencil: false,
          powerPreference: "low-power",
        }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Silk
          active={mood}
          narrow={narrow}
          dir={1}
          scale={narrow ? [4.6, 3.2, 1] : [7.4, 4.3, 1]}
          offset={[0, 0.15, 0]}
        />
        {narrow ? null : (
          <Silk
            active={mood}
            narrow={false}
            dir={-1}
            scale={[6.6, 3.5, 1]}
            offset={[0, -0.15, -0.35]}
          />
        )}
        <Drift active={mood} narrow={narrow} />
      </Canvas>
    </div>
  );
}
