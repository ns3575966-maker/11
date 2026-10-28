import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroCoffeeSceneProps {
  rotateSpeed?: number;
  steamEnabled?: boolean;
  beansCount?: number;
  viewAngle?: 'hero' | 'top' | 'front' | 'cinematic';
  isInteracting?: boolean;
}

export const HeroCoffeeScene: React.FC<HeroCoffeeSceneProps> = ({
  rotateSpeed = 0.5,
  steamEnabled = true,
  beansCount = 24,
  viewAngle = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState<boolean>(false);

  // References for animation
  const cupGroupRef = useRef<THREE.Group | null>(null);
  const beansGroupRef = useRef<THREE.Group | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.8, 5.2));

  // Mouse tilt tracking
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Detect software GL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.8, 5.2);
    cameraRef.current = camera;

    // 3. Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const warmKey = new THREE.DirectionalLight(0xfff2e6, 2.5);
    warmKey.position.set(4, 6, 4);
    warmKey.castShadow = !isSoftwareGl;
    if (warmKey.shadow) {
      warmKey.shadow.mapSize.width = 1024;
      warmKey.shadow.mapSize.height = 1024;
      warmKey.shadow.bias = -0.0005;
      warmKey.shadow.normalBias = 0.02;
    }
    scene.add(warmKey);

    const coolHemi = new THREE.HemisphereLight(0xffebd8, 0x1d1310, 1.2);
    scene.add(coolHemi);

    const rimLight = new THREE.DirectionalLight(0xc8102e, 1.8);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // 5. Build Procedural 3D Coffee Cup Group
    const cupGroup = new THREE.Group();
    cupGroupPositioning(cupGroup);

    // Procedural Canvas Texture for Cup Logo
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 512;
    logoCanvas.height = 512;
    const ctx = logoCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#C8102E'; // Tim Red
      ctx.fillRect(0, 0, 512, 512);

      // Gold border rings
      ctx.strokeStyle = '#E8C580';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(256, 256, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Brand Text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Tim Hortons', 256, 230);

      ctx.fillStyle = '#E8C580';
      ctx.font = '600 24px "Outfit", sans-serif';
      ctx.fillText('INDIA CONCEPT', 256, 285);

      ctx.font = '400 18px "DM Sans", sans-serif';
      ctx.fillStyle = '#FAF6EE';
      ctx.fillText('ALWAYS FRESH • EST. 1964', 256, 325);
    }
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    // Cup Body Material
    const cupBodyMat = new THREE.MeshStandardMaterial({
      color: 0xFAF6EE,
      roughness: 0.3,
      metalness: 0.05,
    });

    // Cup Sleeve Material
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0x2A1A14,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Logo Emblem Material
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 0.2,
      metalness: 0.2,
    });

    // Lid Material
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x1A100C,
      roughness: 0.35,
      metalness: 0.15,
    });

    // Geometries
    // Cup Body
    const bodyGeom = new THREE.CylinderGeometry(1.25, 0.9, 2.7, 48);
    const bodyMesh = new THREE.Mesh(bodyGeom, cupBodyMat);
    bodyMesh.castShadow = !isSoftwareGl;
    bodyMesh.position.y = 0;
    cupGroup.add(bodyMesh);

    // Cup Sleeve
    const sleeveGeom = new THREE.CylinderGeometry(1.265, 1.08, 1.25, 48);
    const sleeveMesh = new THREE.Mesh(sleeveGeom, sleeveMat);
    sleeveMesh.position.y = -0.05;
    cupGroup.add(sleeveMesh);

    // Front Logo Badge
    const logoGeom = new THREE.CylinderGeometry(1.27, 1.27, 0.95, 48, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
    const logoMesh = new THREE.Mesh(logoGeom, logoMat);
    logoMesh.position.y = -0.05;
    cupGroup.add(logoMesh);

    // Cup Lid
    const lidBaseGeom = new THREE.CylinderGeometry(1.35, 1.28, 0.22, 48);
    const lidBaseMesh = new THREE.Mesh(lidBaseGeom, lidMat);
    lidBaseMesh.position.y = 1.45;
    cupGroup.add(lidBaseMesh);

    const lidTopGeom = new THREE.CylinderGeometry(1.22, 1.34, 0.18, 48);
    const lidTopMesh = new THREE.Mesh(lidTopGeom, lidMat);
    lidTopMesh.position.y = 1.62;
    cupGroup.add(lidTopMesh);

    // Lip Ring / Spout Rim
    const lipGeom = new THREE.TorusGeometry(1.3, 0.04, 16, 48);
    const lipMesh = new THREE.Mesh(lipGeom, lidMat);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = 1.55;
    cupGroup.add(lipMesh);

    // Contact Shadow Disk under Cup
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.7 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.4;
    cupGroup.add(shadowPlane);

    scene.add(cupGroup);
    cupGroupRef.current = cupGroup;

    // 6. Build Floating Procedural 3D Coffee Beans
    const beansGroup = new THREE.Group();
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3D2314,
      roughness: 0.45,
      metalness: 0.1,
    });

    // Create a procedural bean geometry using deformed SphereGeometry
    const beanSphere = new THREE.SphereGeometry(0.12, 16, 16);
    beanSphere.scale(1.0, 0.65, 1.6); // Bean oval shape
    const pos = beanSphere.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      // Create center crease groove along length
      if (Math.abs(x) < 0.03 && z > -0.15 && z < 0.15) {
        pos.setY(i, pos.getY(i) - 0.03);
      }
    }
    beanSphere.computeVertexNormals();

    const beanInstanced = new THREE.InstancedMesh(beanSphere, beanMat, 40);
    const dummy = new THREE.Object3D();
    const beanVelocities: { x: number; y: number; z: number; rotX: number; rotY: number }[] = [];

    for (let i = 0; i < 40; i++) {
      const radius = 2.2 + Math.random() * 2.5;
      const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.5;
      const y = (Math.random() - 0.5) * 3.5;

      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius - 0.5
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.8 + Math.random() * 0.6;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      beanInstanced.setMatrixAt(i, dummy.matrix);

      beanVelocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: 0.002 + Math.random() * 0.003,
        z: (Math.random() - 0.5) * 0.002,
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.02,
      });
    }
    beanInstanced.instanceMatrix.needsUpdate = true;
    beansGroup.add(beanInstanced);
    scene.add(beansGroup);
    beansGroupRef.current = beansGroup;

    // 7. Build Animated Rising Steam System
    const steamParticleCount = 60;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamOpacities = new Float32Array(steamParticleCount);
    const steamSpeeds: number[] = [];

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPositions[i * 3 + 1] = 1.7 + Math.random() * 1.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      steamOpacities[i] = Math.random();
      steamSpeeds.push(0.006 + Math.random() * 0.008);
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Steam texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.5, 'rgba(255, 240, 230, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const steamTex = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.55,
      map: steamTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.35,
    });

    const steamParticles = new THREE.Points(steamGeom, steamMat);
    scene.add(steamParticles);
    steamParticlesRef.current = steamParticles;

    // 8. Event Handlers
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    // 9. Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotate Cup
      if (cupGroupRef.current) {
        cupGroupRef.current.rotation.y += rotateSpeed * delta * 0.8;

        // Mouse tilt interpolation
        const targetRotX = mouseRef.current.y * 0.18;
        const targetRotZ = -mouseRef.current.x * 0.18;
        cupGroupRef.current.rotation.x = THREE.MathUtils.damp(cupGroupRef.current.rotation.x, targetRotX, 4, delta);
        cupGroupRef.current.rotation.z = THREE.MathUtils.damp(cupGroupRef.current.rotation.z, targetRotZ, 4, delta);
      }

      // Camera view angle damp
      if (cameraRef.current) {
        cameraRef.current.position.x = THREE.MathUtils.damp(cameraRef.current.position.x, targetCamPos.current.x + mouseRef.current.x * 0.3, 3, delta);
        cameraRef.current.position.y = THREE.MathUtils.damp(cameraRef.current.position.y, targetCamPos.current.y + mouseRef.current.y * 0.3, 3, delta);
        cameraRef.current.position.z = THREE.MathUtils.damp(cameraRef.current.position.z, targetCamPos.current.z, 3, delta);
        cameraRef.current.lookAt(0, 0.1, 0);
      }

      // Animate Floating Coffee Beans
      if (beansGroupRef.current) {
        beansGroupRef.current.rotation.y += rotateSpeed * delta * 0.2;
      }

      // Animate Steam
      if (steamParticlesRef.current && steamEnabled) {
        steamParticlesRef.current.visible = true;
        const positions = steamGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < steamParticleCount; i++) {
          positions[i * 3 + 1] += steamSpeeds[i];
          positions[i * 3] += Math.sin(clock.elapsedTime * 2 + i) * 0.002;

          // Reset when high enough
          if (positions[i * 3 + 1] > 3.8) {
            positions[i * 3 + 1] = 1.7;
            positions[i * 3] = (Math.random() - 0.5) * 0.4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
          }
        }
        steamGeom.attributes.position.needsUpdate = true;
      } else if (steamParticlesRef.current) {
        steamParticlesRef.current.visible = false;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update View Angle Presets
  useEffect(() => {
    switch (viewAngle) {
      case 'top':
        targetCamPos.current.set(0, 4.0, 2.5);
        break;
      case 'front':
        targetCamPos.current.set(0, 0.2, 4.5);
        break;
      case 'cinematic':
        targetCamPos.current.set(2.2, 1.2, 3.8);
        break;
      case 'hero':
      default:
        targetCamPos.current.set(0, 0.8, 5.2);
        break;
    }
  }, [viewAngle]);

  if (webglError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#2A1D17] to-[#120B09] text-[#FAF6EE] rounded-3xl border border-[#3B2A23]">
        <img
          src="/src/assets/images/hero_coffee_cinematic_1793198482313.jpg"
          alt="3D Coffee Cup Fallback Visual"
          className="w-64 h-64 object-cover rounded-2xl shadow-2xl mb-4 border border-[#FAF6EE]/10"
        />
        <h3 className="text-xl font-bold font-heading">A Better Coffee Moment</h3>
        <p className="text-sm text-[#E0D0C1] max-w-md mt-2">
          Experience our handcrafted Arabica brews, freshly baked Timbits®, and artisan cold drinks across India.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

function cupGroupPositioning(group: THREE.Group) {
  group.position.set(0, -0.2, 0);
}
