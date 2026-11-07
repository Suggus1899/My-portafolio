'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type MagazineCoverSceneProps = {
  replayKey: number;
  onComplete: () => void;
  onFallback: () => void;
};

export default function MagazineCoverScene({ replayKey, onComplete, onFallback }: MagazineCoverSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      onFallback();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
    camera.position.set(3.1, 2.5, 6.5);
    camera.lookAt(0, 0.15, 0);
    scene.add(new THREE.HemisphereLight('#fff8e8', '#52627a', 2.2));
    const light = new THREE.DirectionalLight('#ffffff', 3);
    light.position.set(-3, 5, 7);
    scene.add(light);

    const paperMaterial = new THREE.MeshStandardMaterial({ color: '#f5f1e8', roughness: 1 });
    const pages = new THREE.Mesh(new THREE.BoxGeometry(1.94, 2.64, 0.14), paperMaterial);
    pages.position.x = 0.97;
    scene.add(pages);

    const artwork = document.createElement('canvas');
    artwork.width = 512;
    artwork.height = 704;
    const context = artwork.getContext('2d');
    if (context) {
      context.fillStyle = '#20334d';
      context.fillRect(0, 0, artwork.width, artwork.height);
      context.fillStyle = '#f5f1e8';
      context.fillRect(58, 58, 396, 588);
      context.fillStyle = '#2563eb';
      context.fillRect(58, 58, 396, 20);
      context.fillStyle = '#20334d';
      context.font = '800 132px Georgia';
      context.fillText('GC', 93, 260);
      context.fillStyle = '#2563eb';
      context.fillRect(94, 300, 205, 8);
      context.fillStyle = '#718096';
      context.fillRect(94, 336, 295, 6);
      context.fillRect(94, 356, 235, 6);
      context.fillRect(94, 376, 269, 6);
      context.strokeStyle = '#c9c4b8';
      context.lineWidth = 2;
      context.strokeRect(94, 434, 295, 154);
      context.fillStyle = '#dce8f7';
      context.fillRect(96, 436, 291, 150);
      context.fillStyle = '#2563eb';
      context.beginPath();
      context.arc(337, 510, 34, 0, Math.PI * 2);
      context.fill();
    }
    const coverTexture = new THREE.CanvasTexture(artwork);
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    const coverMaterial = new THREE.MeshStandardMaterial({ color: '#315b91', roughness: 0.72 });
    const cover = new THREE.Mesh(new THREE.BoxGeometry(1.94, 2.64, 0.075), coverMaterial);
    const hinge = new THREE.Group();
    hinge.position.x = 0.02;
    hinge.add(cover);
    cover.position.x = 0.97;
    const printedFace = new THREE.Mesh(
      new THREE.PlaneGeometry(1.79, 2.48),
      new THREE.MeshBasicMaterial({ map: coverTexture, side: THREE.FrontSide })
    );
    printedFace.position.set(0.97, 0, 0.039);
    hinge.add(printedFace);
    scene.add(hinge);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    resize();

    let frame = 0;
    let startedAt = 0;
    const duration = 920;
    const animate = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      hinge.rotation.y = eased * Math.PI * 0.76;
      renderer.render(scene, camera);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else onComplete();
    };
    const loseContext = () => onFallback();
    canvas.addEventListener('webglcontextlost', loseContext);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', loseContext);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            material.dispose();
          }
        }
      });
      coverTexture.dispose();
      renderer.dispose();
    };
  }, [onComplete, onFallback, replayKey]);

  return <canvas ref={canvasRef} className="magazine-canvas" aria-hidden="true" />;
}
