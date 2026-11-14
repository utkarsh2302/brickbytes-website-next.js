"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PLOT_FILL, PLOT_H, PLOT_W, samplePlots, type SamplePlot } from "./SitePlan";

// The homepage's 3D model: the site plan from SitePlan.tsx built as a paper
// architect's model. Flat colours from the brand palette, 1px ink edges, no
// textures or model files. One world unit is 40 site-plan units, and the
// plan's centre (260, 200) is the origin, so plan north is world -z.
const UNIT = 40;
const PLAN_CENTRE = { x: 260, y: 200 };
const PLOT_THICKNESS = 0.08;

const INK = "#1c1a17";
const ORANGE = "#ff5a1f";
const HOVER = "#f3e9dc";
const BOARD = "#fbf9f5";
const ROAD = "#e4ddd2";
const WOOD = "#d6bf9f";

// Camera: starts straight down (the paper plan), settles at TILT radians from
// vertical, and tilts a little further as the hero scrolls away.
const TILT = 0.92;
const START_AZIMUTH = -0.55;
const MAX_DRAG = 1.2;

// The canvas renders on demand: each moving value eases towards its target and
// asks for another frame until it arrives, so an idle scene costs nothing.
// Delta is capped so the first frame after a pause doesn't jump.
function settle(current: number, target: number, lambda: number, delta: number, invalidate: () => void) {
  const next = THREE.MathUtils.damp(current, target, lambda, Math.min(delta, 0.05));
  if (Math.abs(next - target) < 0.0005) return target;
  invalidate();
  return next;
}

function toWorld(plot: SamplePlot) {
  return {
    x: (plot.x + PLOT_W / 2 - PLAN_CENTRE.x) / UNIT,
    z: (plot.y + PLOT_H / 2 - PLAN_CENTRE.y) / UNIT,
  };
}

// Shared geometry: every plot, villa and tree reuses these.
const plotBox = new THREE.BoxGeometry(PLOT_W / UNIT, PLOT_THICKNESS, PLOT_H / UNIT);
const plotEdges = new THREE.EdgesGeometry(plotBox);
const villaGround = new THREE.BoxGeometry(1.1, 0.5, 1.2);
const villaGroundEdges = new THREE.EdgesGeometry(villaGround);
const villaUpper = new THREE.BoxGeometry(0.75, 0.4, 0.7);
const villaUpperEdges = new THREE.EdgesGeometry(villaUpper);
const treeCrown = new THREE.IcosahedronGeometry(0.24, 0);
const boardBox = new THREE.BoxGeometry(14, 0.4, 11);
const boardEdges = new THREE.EdgesGeometry(boardBox);

// The brand pin (the logo's plot shape: a three-quarter circle with one square
// corner), extruded and turned so the square corner points at the plot.
function makePinGeometry() {
  const radius = 0.5;
  const shape = new THREE.Shape();
  shape.moveTo(-radius, 0);
  shape.absarc(0, 0, radius, Math.PI, -Math.PI / 2, true);
  shape.lineTo(-radius, -radius);
  shape.lineTo(-radius, 0);
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.38, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
  geometry.translate(0, 0, -0.1);
  return geometry;
}
const pinGeometry = makePinGeometry();
const PIN_TIP_DEPTH = 0.5 * Math.SQRT2;

// Trees around the edge of the board, clear of the plots.
const trees: [number, number][] = [
  ...[-5.2, -3.6, -2, 2, 3.6, 5.2].flatMap((x): [number, number][] => [
    [x, -5],
    [x, 5],
  ]),
  ...[-3.4, -1.2, 1.2, 3.4].flatMap((z): [number, number][] => [
    [-6.5, z],
    [6.5, z],
  ]),
];

function Edges({ geometry, opacity = 0.4 }: { geometry: THREE.BufferGeometry; opacity?: number }) {
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={INK} transparent opacity={opacity} />
    </lineSegments>
  );
}

// Booked plots carry a built villa: a ground floor and a smaller upper floor.
function Villa() {
  return (
    <group position-y={PLOT_THICKNESS}>
      <mesh geometry={villaGround} position-y={0.25} castShadow receiveShadow>
        <meshLambertMaterial color="#ffffff" />
        <Edges geometry={villaGroundEdges} opacity={0.35} />
      </mesh>
      <mesh geometry={villaUpper} position={[-0.12, 0.7, -0.18]} castShadow>
        <meshLambertMaterial color="#ffffff" />
        <Edges geometry={villaUpperEdges} opacity={0.35} />
      </mesh>
    </group>
  );
}

type PlotProps = {
  plot: SamplePlot;
  selected: boolean;
  hovered: boolean;
  animate: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
};

function Plot({ plot, selected, hovered, animate, onHover, onSelect }: PlotProps) {
  const group = useRef<THREE.Group>(null);
  const { x, z } = toWorld(plot);
  const lift = selected ? 0.22 : hovered ? 0.32 : 0;

  useFrame(({ invalidate }, delta) => {
    if (!group.current) return;
    group.current.position.y = animate ? settle(group.current.position.y, lift, 10, delta, invalidate) : lift;
  });

  // A drag that ends over a plot turns the model; it doesn't select the plot.
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 6) return;
    event.stopPropagation();
    onSelect(plot.id);
  };

  return (
    <group ref={group} position={[x, 0, z]}>
      <mesh
        geometry={plotBox}
        position-y={PLOT_THICKNESS / 2}
        castShadow
        receiveShadow
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(plot.id);
        }}
        onPointerOut={() => onHover(null)}
        onClick={handleClick}
      >
        <meshLambertMaterial color={selected ? ORANGE : hovered ? HOVER : PLOT_FILL[plot.status]} />
        <Edges geometry={plotEdges} />
      </mesh>
      {plot.status === "Booked" && <Villa />}
    </group>
  );
}

function Pin({ plot, animate }: { plot: SamplePlot; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { x, z } = toWorld(plot);
  const restingHeight = PLOT_THICKNESS + 0.22 + 0.2 + PIN_TIP_DEPTH;

  useFrame(({ invalidate }, delta) => {
    const pin = group.current;
    if (!pin) return;
    pin.position.x = animate ? settle(pin.position.x, x, 8, delta, invalidate) : x;
    pin.position.z = animate ? settle(pin.position.z, z, 8, delta, invalidate) : z;
  });

  return (
    <group ref={group} position={[x, restingHeight, z]}>
      <mesh geometry={pinGeometry} rotation-z={Math.PI / 4} castShadow>
        <meshLambertMaterial color={INK} />
      </mesh>
    </group>
  );
}

// Moves the camera: the opening tilt from plan to 3D, a little more tilt as
// the hero scrolls away, and horizontal drags to turn the model. Vertical
// swipes stay with the page (touch-action: pan-y on the wrapper), so the model
// never traps scrolling on a phone.
function CameraRig({ animate }: { animate: boolean }) {
  const { camera, size, gl, invalidate } = useThree();
  const view = useRef({ polar: animate ? 0.02 : TILT, azimuth: animate ? 0 : START_AZIMUTH });
  const dragAzimuth = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;
    let lastX: number | null = null;
    const start = (event: PointerEvent) => {
      lastX = event.clientX;
    };
    const move = (event: PointerEvent) => {
      if (lastX === null) return;
      const turned = dragAzimuth.current - (event.clientX - lastX) * 0.006;
      dragAzimuth.current = THREE.MathUtils.clamp(turned, -MAX_DRAG, MAX_DRAG);
      lastX = event.clientX;
      invalidate();
    };
    const end = () => {
      lastX = null;
    };
    const scroll = () => invalidate();

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointerleave", end);
    canvas.addEventListener("pointercancel", end);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      canvas.removeEventListener("pointerdown", start);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", end);
      canvas.removeEventListener("pointerleave", end);
      canvas.removeEventListener("pointercancel", end);
      window.removeEventListener("scroll", scroll);
    };
  }, [gl, invalidate]);

  useFrame((_, delta) => {
    // Pull back on narrow screens so the whole board stays in frame.
    const aspect = size.width / size.height;
    const radius = Math.max(29, 36 / Math.min(aspect, 1.3));
    const scrolled = Math.min(window.scrollY / window.innerHeight, 1);
    const targetPolar = TILT + scrolled * 0.25;
    const targetAzimuth = START_AZIMUTH + dragAzimuth.current;

    view.current.polar = animate ? settle(view.current.polar, targetPolar, 1.6, delta, invalidate) : targetPolar;
    view.current.azimuth = animate ? settle(view.current.azimuth, targetAzimuth, 4, delta, invalidate) : targetAzimuth;
    camera.position.setFromSphericalCoords(radius, view.current.polar, view.current.azimuth);
    camera.lookAt(0, -0.6, 0);
  });

  return null;
}

export type HeroSceneProps = {
  selectedId: string;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
  onReady: () => void;
};

export default function HeroScene({ selectedId, onSelect, reducedMotion, onReady }: HeroSceneProps) {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const animate = !reducedMotion;
  const selectedPlot = samplePlots.find((plot) => plot.id === selectedId) ?? samplePlots[0];

  // Render only while the model is on screen: no GPU work once scrolled past.
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      className={`h-full w-full touch-pan-y select-none ${hoveredId ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}`}
    >
      <Canvas
        flat
        shadows
        dpr={[1, 2]}
        frameloop={visible ? "demand" : "never"}
        camera={{ fov: 30, near: 1, far: 80, position: [0, 24, 0.5] }}
        onCreated={onReady}
        aria-hidden
      >
        <hemisphereLight args={["#fffaf2", "#e6d3bc", 2.2]} />
        <directionalLight
          position={[-6, 12, 7]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-bias={-0.0005}
        />
        <CameraRig animate={animate} />

        <mesh geometry={boardBox} position-y={-0.2} receiveShadow>
          <meshLambertMaterial color={BOARD} />
          <Edges geometry={boardEdges} opacity={0.3} />
        </mesh>
        {/* The two roads the plots front: east-west and north-south */}
        <mesh position={[0, 0.005, 0]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[13, 0.8]} />
          <meshLambertMaterial color={ROAD} />
        </mesh>
        <mesh position={[-0.1, 0.006, 0]} rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[1.2, 10]} />
          <meshLambertMaterial color={ROAD} />
        </mesh>

        {samplePlots.map((plot) => (
          <Plot
            key={plot.id}
            plot={plot}
            selected={plot.id === selectedId}
            hovered={plot.id === hoveredId}
            animate={animate}
            onHover={setHoveredId}
            onSelect={onSelect}
          />
        ))}

        {trees.map(([x, z]) => (
          <group key={`${x}:${z}`} position={[x, 0, z]}>
            <mesh position-y={0.32} geometry={treeCrown} castShadow>
              <meshLambertMaterial color={WOOD} flatShading />
            </mesh>
          </group>
        ))}

        <Pin plot={selectedPlot} animate={animate} />
      </Canvas>
    </div>
  );
}
