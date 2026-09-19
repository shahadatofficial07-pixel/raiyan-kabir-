import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, isPrefersReducedMotion } from '../../utils/webgl';

interface AbstractBackgroundObjectProps {
  type?: 'torus' | 'octahedron' | 'ring';
  opacity?: number;
}

export const AbstractBackgroundObject: React.FC<AbstractBackgroundObjectProps> = ({
  type = 'torus',
  opacity = 0.25
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const reducedMotion = isPrefersReducedMotion();

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x303038, 1.5);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xd4af37, 2.5);
    light.position.set(4, 5, 4);
    scene.add(light);

    let geometry: THREE.BufferGeometry;
    if (type === 'octahedron') {
      geometry = new THREE.OctahedronGeometry(2.2, 0);
    } else if (type === 'ring') {
      geometry = new THREE.TorusGeometry(2.4, 0.35, 16, 60);
    } else {
      geometry = new THREE.TorusKnotGeometry(1.8, 0.45, 100, 16);
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x1f2026,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: true,
      transparent: true,
      opacity: opacity
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();
      const speed = reducedMotion ? 0.2 : 0.6;

      mesh.rotation.x = delta * 0.12 * speed;
      mesh.rotation.y = delta * 0.18 * speed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [type, opacity]);

  if (!hasWebGL) return null;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
