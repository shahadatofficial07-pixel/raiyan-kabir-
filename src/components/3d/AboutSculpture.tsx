import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, isPrefersReducedMotion } from '../../utils/webgl';

export const AboutSculpture: React.FC = () => {
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

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222228, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 4.0, 10);
    goldPoint.position.set(-3, -2, 3);
    scene.add(goldPoint);

    const group = new THREE.Group();
    scene.add(group);

    // Central faceted crystal (Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x18181f,
      metalness: 0.95,
      roughness: 0.18,
      flatShading: true
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    group.add(crystal);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Dual orbiting metallic rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.25
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.0, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x6b7280,
      metalness: 0.9,
      roughness: 0.3
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 2.3;
    group.add(ring2);

    // Floating design markers
    const markerGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const markerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2
    });
    const marker1 = new THREE.Mesh(markerGeo, markerMat);
    marker1.position.set(1.9, 0.5, 0.4);
    group.add(marker1);

    const marker2 = new THREE.Mesh(markerGeo, ringMat1);
    marker2.position.set(-1.8, -0.6, -0.5);
    group.add(marker2);

    // Mouse tilt interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = x;
      targetY = y;
    };

    container.addEventListener('pointermove', onPointerMove);

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
      const speed = reducedMotion ? 0.3 : 1.0;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      group.rotation.y = delta * 0.25 * speed + mouseX * 0.8;
      group.rotation.x = delta * 0.15 * speed + mouseY * 0.6;

      crystal.rotation.y = -delta * 0.3 * speed;
      crystal.rotation.z = delta * 0.2 * speed;

      ring1.rotation.z = delta * 0.4 * speed;
      ring2.rotation.x = -delta * 0.3 * speed;

      const scale = 1 + Math.sin(delta * 2) * 0.04;
      core.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      markerGeo.dispose();
      markerMat.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-80 md:h-[450px] rounded-2xl border border-neutral-800/80 bg-neutral-900/50 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-400/10">
            <span className="font-display font-bold text-2xl text-amber-400">RK</span>
          </div>
          <div className="text-sm font-tech text-neutral-300 tracking-wider">3D SCULPTURAL IDENTITY</div>
          <div className="text-xs text-neutral-500 max-w-xs">Precision geometric visual language engineered for international branding.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] md:h-[480px] rounded-2xl border border-neutral-800/60 bg-gradient-to-b from-neutral-900/40 to-[#08080a] overflow-hidden flex items-center justify-center group cursor-grab active:cursor-grabbing shadow-2xl">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none text-[10px] font-tech text-neutral-400 bg-neutral-950/80 px-3 py-1.5 rounded-full border border-neutral-800 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
        INTERACTIVE 3D OBJECT
      </div>
    </div>
  );
};
