import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, isPrefersReducedMotion } from '../../utils/webgl';

interface FeaturedMockupSceneProps {
  imageUrl: string;
  onExplore: () => void;
}

export const FeaturedMockupScene: React.FC<FeaturedMockupSceneProps> = ({ imageUrl, onExplore }) => {
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
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0x282832, 2.2);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 5.0, 15, Math.PI / 4, 0.3);
    keySpot.position.set(3, 4, 5);
    scene.add(keySpot);

    const goldRim = new THREE.PointLight(0xd4af37, 3.5, 8);
    goldRim.position.set(-3, -2, 2);
    scene.add(goldRim);

    // 3D Poster Mockup Group
    const group = new THREE.Group();
    scene.add(group);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const posterTexture = textureLoader.load(imageUrl);
    posterTexture.generateMipmaps = true;
    posterTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Poster Board Geometry
    const posterWidth = 2.2;
    const posterHeight = 3.08;
    const posterDepth = 0.05;

    // Backplate (Matte Dark Titanium Chassis)
    const backplateGeo = new THREE.BoxGeometry(posterWidth + 0.12, posterHeight + 0.12, posterDepth);
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0x141419,
      metalness: 0.9,
      roughness: 0.25
    });
    const backplate = new THREE.Mesh(backplateGeo, backplateMat);
    group.add(backplate);

    // Front Artwork Plane
    const artworkGeo = new THREE.PlaneGeometry(posterWidth, posterHeight);
    const artworkMat = new THREE.MeshStandardMaterial({
      map: posterTexture,
      metalness: 0.05,
      roughness: 0.3
    });
    const artwork = new THREE.Mesh(artworkGeo, artworkMat);
    artwork.position.z = posterDepth / 2 + 0.005;
    group.add(artwork);

    // Metallic Edge Trim (Gold luxury accent along top & bottom)
    const trimGeo = new THREE.BoxGeometry(posterWidth + 0.14, 0.02, posterDepth + 0.01);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2
    });
    const topTrim = new THREE.Mesh(trimGeo, trimMat);
    topTrim.position.set(0, (posterHeight + 0.12) / 2, 0);
    group.add(topTrim);

    const bottomTrim = new THREE.Mesh(trimGeo, trimMat);
    bottomTrim.position.set(0, -(posterHeight + 0.12) / 2, 0);
    group.add(bottomTrim);

    // Floating Glass Reflection Sheet in front
    const glassGeo = new THREE.PlaneGeometry(posterWidth, posterHeight);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const glassCover = new THREE.Mesh(glassGeo, glassMat);
    glassCover.position.z = posterDepth / 2 + 0.02;
    group.add(glassCover);

    // Subtle initial rotation
    group.rotation.y = -0.15;
    group.rotation.x = 0.05;

    // Mouse Interaction
    let targetRotY = -0.15;
    let targetRotX = 0.05;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = -0.15 + x * 0.4;
      targetRotX = 0.05 - y * 0.3;
    };

    const onPointerLeave = () => {
      targetRotY = -0.15;
      targetRotX = 0.05;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);

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

      // Smooth rotation toward mouse
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      // Gentle floating oscillation
      group.position.y = Math.sin(delta * 1.2 * speed) * 0.08;
      group.position.z = Math.cos(delta * 0.9 * speed) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      backplateGeo.dispose();
      backplateMat.dispose();
      artworkGeo.dispose();
      artworkMat.dispose();
      trimGeo.dispose();
      trimMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      posterTexture.dispose();
    };
  }, [imageUrl]);

  if (!hasWebGL) {
    return (
      <div
        onClick={onExplore}
        className="w-full h-[420px] rounded-2xl overflow-hidden border border-neutral-800 relative group cursor-pointer"
      >
        <img
          src={imageUrl}
          alt="Featured Graphic Design Project"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
    );
  }

  return (
    <div
      onClick={onExplore}
      className="relative w-full h-[440px] md:h-[560px] cursor-pointer group flex items-center justify-center"
      title="Click to explore featured project details"
    >
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-neutral-900/90 text-white border border-amber-400/40 text-xs font-tech px-4 py-2 rounded-full tracking-wider shadow-xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
        CLICK TO EXPLORE FULL PROJECT →
      </div>
    </div>
  );
};
