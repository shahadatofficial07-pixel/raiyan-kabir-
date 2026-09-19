import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, isPrefersReducedMotion } from '../../utils/webgl';

// Helper to create a procedural high-res graphic design poster texture on canvas
function createPosterTexture(title: string, sub: string, accentWord: string, darkBg = true): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Background
    ctx.fillStyle = darkBg ? '#0c0c10' : '#14141a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = '#22222c';
    ctx.lineWidth = 1;
    for (let x = 80; x < canvas.width; x += 160) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 80; y < canvas.height; y += 160) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Top small label
    ctx.font = '600 24px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.letterSpacing = '6px';
    ctx.fillText('RAYHAN KABIR / STUDIO ARCHIVE', 90, 130);

    ctx.font = '500 20px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#d4af37';
    ctx.fillText('N° 01 // 2026', canvas.width - 240, 130);

    // Accent line
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(90, 160, canvas.width - 180, 2);

    // Bold large title
    ctx.font = '800 130px "Syne", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(title, 90, 360);

    ctx.font = '800 120px "Syne", sans-serif';
    ctx.fillStyle = '#d4af37';
    ctx.fillText(accentWord, 90, 490);

    // Graphic geometric composition in center
    ctx.save();
    ctx.translate(canvas.width / 2, 850);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-150, -150, 300, 300);
    ctx.stroke();

    // Rotated inner square
    ctx.rotate(Math.PI / 4);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-120, -120, 240, 240);
    ctx.restore();

    // Bottom editorial layout
    ctx.font = '600 26px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(sub, 90, 1260);

    ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('THOUGHTFUL COMPOSITION • TYPOGRAPHY • VISUAL IDENTITY', 90, 1310);
    ctx.fillText('ALL RIGHTS RESERVED • RAYHAN KABIR PORTFOLIO', 90, 1345);

    // Gold signature dot
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(canvas.width - 120, 1310, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const reducedMotion = isPrefersReducedMotion();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.05);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 8.5 : 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lighting System
    const ambientLight = new THREE.AmbientLight(0x202028, 1.8);
    scene.add(ambientLight);

    // Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    // Warm Gold Accent Light
    const goldLight = new THREE.PointLight(0xd4af37, isMobile ? 3.0 : 4.5, 18);
    goldLight.position.set(3, 1, 4);
    scene.add(goldLight);

    // Cool Rim Light
    const rimLight = new THREE.PointLight(0x406080, 2.5, 15);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    // Primary Group (shifts right on desktop to balance left text)
    const masterGroup = new THREE.Group();
    masterGroup.position.set(isMobile ? 0 : 1.3, isMobile ? -0.2 : 0, 0);
    scene.add(masterGroup);

    // 1. Central Abstract Metallic Sculpture (Luxury Torus Knot)
    const torusGeometry = new THREE.TorusKnotGeometry(1.05, 0.28, isMobile ? 80 : 160, isMobile ? 24 : 48, 2, 3);
    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2026,
      metalness: 0.94,
      roughness: 0.18,
      emissive: 0x050508,
      wireframe: false
    });
    const centralSculpture = new THREE.Mesh(torusGeometry, metallicMaterial);
    centralSculpture.position.set(0.3, 0.1, 0);
    masterGroup.add(centralSculpture);

    // 2. Gold Metallic Accent Rings
    const ringGeo = new THREE.TorusGeometry(1.65, 0.025, 16, isMobile ? 48 : 80);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.98,
      roughness: 0.25,
      emissive: 0x221a05
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, goldMaterial);
    orbitRing1.rotation.x = Math.PI / 3;
    masterGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(ringGeo, goldMaterial);
    orbitRing2.rotation.y = Math.PI / 2.5;
    orbitRing2.scale.set(1.15, 1.15, 1.15);
    masterGroup.add(orbitRing2);

    // 3. Floating Graphic Design Poster Sheets
    const posterTexture1 = createPosterTexture('VISUAL', 'EDITORIAL ART ARCHIVE', 'CADENCE', true);
    const posterTexture2 = createPosterTexture('CRAFT', 'BRANDING & TYPOGRAPHY', 'HARMONY', false);

    const posterGeo = new THREE.PlaneGeometry(1.3, 1.82);
    const posterMat1 = new THREE.MeshStandardMaterial({
      map: posterTexture1,
      metalness: 0.15,
      roughness: 0.45,
      side: THREE.DoubleSide
    });
    const poster1 = new THREE.Mesh(posterGeo, posterMat1);
    poster1.position.set(-1.4, 0.4, 0.9);
    poster1.rotation.set(0.1, 0.35, -0.08);
    masterGroup.add(poster1);

    // Thin frame border for Poster 1
    const frameGeo = new THREE.BoxGeometry(1.34, 1.86, 0.02);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x2e2f38,
      metalness: 0.85,
      roughness: 0.3
    });
    const frame1 = new THREE.Mesh(frameGeo, frameMat);
    frame1.position.copy(poster1.position);
    frame1.position.z -= 0.015;
    frame1.rotation.copy(poster1.rotation);
    masterGroup.add(frame1);

    // Secondary floating poster (further back)
    const posterMat2 = new THREE.MeshStandardMaterial({
      map: posterTexture2,
      metalness: 0.2,
      roughness: 0.4,
      side: THREE.DoubleSide
    });
    const poster2 = new THREE.Mesh(posterGeo, posterMat2);
    poster2.position.set(1.6, -0.6, -0.8);
    poster2.rotation.set(-0.15, -0.4, 0.1);
    poster2.scale.set(0.85, 0.85, 0.85);
    masterGroup.add(poster2);

    // 4. Floating Glass Panels
    const glassGeo = new THREE.BoxGeometry(1.2, 0.8, 0.03);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      metalness: 0.1,
      roughness: 0.1
    });
    const glassPanel1 = new THREE.Mesh(glassGeo, glassMat);
    glassPanel1.position.set(0.8, 1.3, 0.5);
    glassPanel1.rotation.set(0.2, -0.2, 0.1);
    masterGroup.add(glassPanel1);

    // 5. Floating Branding Cards
    const cardGeo = new THREE.BoxGeometry(0.7, 0.42, 0.015);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x111216,
      metalness: 0.6,
      roughness: 0.25
    });
    const brandingCard = new THREE.Mesh(cardGeo, cardMat);
    brandingCard.position.set(-0.6, -1.2, 1.1);
    brandingCard.rotation.set(0.3, 0.2, -0.2);
    masterGroup.add(brandingCard);

    // 6. Subtle Floating Ambient Particles
    const particleCount = isMobile ? 35 : 85;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleScales[i] = Math.random() * 0.03 + 0.015;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite using canvas
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 0.9)');
      gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.4)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
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

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      if (!reducedMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      }

      // Parallax camera shift
      camera.position.x = currentMouseX * (isMobile ? 0.3 : 0.6);
      camera.position.y = -currentMouseY * (isMobile ? 0.3 : 0.5);
      camera.lookAt(masterGroup.position.x * 0.3, 0, 0);

      // Light response
      goldLight.position.x = 3 + currentMouseX * 1.5;
      goldLight.position.y = 1 - currentMouseY * 1.5;

      // Slow, elegant floating and rotation
      const floatSpeed = reducedMotion ? 0.2 : 0.8;

      centralSculpture.rotation.x = elapsedTime * 0.18 * floatSpeed;
      centralSculpture.rotation.y = elapsedTime * 0.24 * floatSpeed;

      orbitRing1.rotation.z = elapsedTime * 0.12 * floatSpeed;
      orbitRing2.rotation.x = elapsedTime * 0.1 * floatSpeed;

      // Poster floating bobbing
      poster1.position.y = 0.4 + Math.sin(elapsedTime * 0.7 * floatSpeed) * 0.08;
      frame1.position.y = poster1.position.y;
      poster1.rotation.y = 0.35 + Math.cos(elapsedTime * 0.5 * floatSpeed) * 0.05;
      frame1.rotation.y = poster1.rotation.y;

      poster2.position.y = -0.6 + Math.cos(elapsedTime * 0.6 * floatSpeed) * 0.07;
      poster2.rotation.x = -0.15 + Math.sin(elapsedTime * 0.4 * floatSpeed) * 0.04;

      glassPanel1.position.y = 1.3 + Math.sin(elapsedTime * 0.8 * floatSpeed + 1) * 0.06;
      glassPanel1.rotation.z = 0.1 + Math.cos(elapsedTime * 0.5 * floatSpeed) * 0.03;

      brandingCard.rotation.y = 0.2 + Math.sin(elapsedTime * 0.6 * floatSpeed) * 0.08;

      // Particles slow drift
      particles.rotation.y = elapsedTime * 0.02 * floatSpeed;
      particles.rotation.x = elapsedTime * 0.01 * floatSpeed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      torusGeometry.dispose();
      metallicMaterial.dispose();
      ringGeo.dispose();
      goldMaterial.dispose();
      posterGeo.dispose();
      posterMat1.dispose();
      posterMat2.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      cardGeo.dispose();
      cardMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      posterTexture1.dispose();
      posterTexture2.dispose();
      particleTexture.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-80 h-96 rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-black shadow-2xl p-8 flex flex-col justify-between">
          <div className="text-amber-400 font-tech text-xs tracking-widest">3D STUDIO FRAMEWORK</div>
          <div className="space-y-2">
            <div className="text-4xl font-display font-bold text-white tracking-tight">RAYHAN KABIR</div>
            <div className="text-xs text-neutral-400 tracking-wider">GRAPHIC DESIGN & VISUAL CREATIVE</div>
          </div>
          <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
