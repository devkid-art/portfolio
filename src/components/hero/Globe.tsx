'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import landDots from '@/content/land-dots.json';
import { GLOBE_CENTER, LABELLED, lngLat, ROUTES } from './routes';

const D2R = Math.PI / 180;
const R = 1;
const SEGMENTS = 96;
const RADIAL = 6;

function toVec(lng: number, lat: number, r = R) {
  const phi = lat * D2R;
  const theta = lng * D2R;
  return new THREE.Vector3(r * Math.cos(phi) * Math.sin(theta), r * Math.sin(phi), r * Math.cos(phi) * Math.cos(theta));
}

/** Great-circle arc lifted above the surface, higher for longer routes. */
function arcCurve(a: [number, number], b: [number, number]) {
  const va = toVec(...a).normalize();
  const vb = toVec(...b).normalize();
  const angle = va.angleTo(vb);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const v = va
      .clone()
      .multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
      .add(vb.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)));
    points.push(v.multiplyScalar(R + Math.sin(Math.PI * t) * 0.075 * angle));
  }
  return new THREE.CatmullRomCurve3(points);
}

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string) => s.getPropertyValue(name).trim() || '#888';
  return { surface: get('--color-surface'), indigo: get('--color-indigo'), accent: get('--color-accent') };
}

function useThemeColors() {
  const [colors, setColors] = useState(readColors);
  useEffect(() => {
    const observer = new MutationObserver(() => setColors(readColors()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return colors;
}

function Scene({ colors }: { colors: ReturnType<typeof readColors> }) {
  const spin = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const list = landDots as [number, number][];
    const positions = new Float32Array(list.length * 3);
    list.forEach(([lng, lat], i) => {
      const v = toVec(lng, lat, R * 1.002);
      positions.set([v.x, v.y, v.z], i * 3);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const arcs = useMemo(
    () =>
      ROUTES.map((route, i) => {
        const geometry = new THREE.TubeGeometry(
          arcCurve(lngLat(route.from), lngLat(route.to)),
          SEGMENTS,
          route.primary ? 0.0085 : 0.004,
          RADIAL,
          false,
        );
        geometry.setDrawRange(0, 0);
        return { ...route, geometry, total: geometry.index?.count ?? 0, delay: route.primary ? 0.25 : 1.1 + i * 0.3 };
      }),
    [],
  );

  const markers = useMemo(() => LABELLED.map((id) => toVec(...lngLat(id), R * 1.004)), []);

  useEffect(
    () => () => {
      dots.dispose();
      arcs.forEach((a) => a.geometry.dispose());
    },
    [dots, arcs],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // A slow sway around the Africa–China view, never a full spin that would hide the routes.
    if (spin.current) spin.current.rotation.y = -GLOBE_CENTER.lng * D2R + Math.sin(t * 0.16) * 0.32;
    for (const arc of arcs) {
      const p = THREE.MathUtils.clamp((t - arc.delay) / 1.5, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      // Index count must stay a multiple of one ring of triangles (RADIAL * 6).
      const step = RADIAL * 6;
      arc.geometry.setDrawRange(0, Math.floor((eased * arc.total) / step) * step);
    }
  });

  return (
    <group rotation={[GLOBE_CENTER.lat * D2R, 0, 0]}>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[R * 0.995, 64, 48]} />
          <meshBasicMaterial color={colors.surface} />
        </mesh>
        <points geometry={dots}>
          <pointsMaterial color={colors.indigo} size={0.024} sizeAttenuation transparent opacity={0.62} />
        </points>
        {arcs.map((arc) => (
          <mesh key={`${arc.from}-${arc.to}`} geometry={arc.geometry}>
            <meshBasicMaterial color={arc.primary ? colors.accent : colors.indigo} transparent opacity={arc.primary ? 1 : 0.7} />
          </mesh>
        ))}
        {markers.map((v, i) => (
          <mesh key={i} position={v}>
            <sphereGeometry args={[0.02, 16, 12]} />
            <meshBasicMaterial color={colors.accent} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Globe({ active, onReady }: { active: boolean; onReady: () => void }) {
  const colors = useThemeColors();
  return (
    <Canvas
      aria-hidden="true"
      frameloop={active ? 'always' : 'never'}
      flat
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.15], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={() => onReady()}
    >
      <Scene colors={colors} />
    </Canvas>
  );
}
