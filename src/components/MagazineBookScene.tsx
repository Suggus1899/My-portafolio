'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';

export type MagazineBookTransform = { scale: number; x: number; y: number };
export type MagazineBookSceneHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};
export type MagazineBookSceneProps = {
  page: number;
  opened: boolean;
  interactionRef: RefObject<HTMLDivElement | null>;
  onUnavailable: () => void;
  onTransformChange?: (transform: MagazineBookTransform) => void;
  onTurnComplete?: () => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const TURN_DURATION = 680;
const INTERACTIVE = 'a, button, input, textarea, select, [contenteditable="true"], [role="dialog"], [role="listbox"]';

/** The parent positions its HTML pages over the paper and applies the reported transform. */
const MagazineBookScene = forwardRef<MagazineBookSceneHandle, MagazineBookSceneProps>(
  function MagazineBookScene({ page, opened, interactionRef, onUnavailable, onTransformChange, onTurnComplete }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const actionsRef = useRef<MagazineBookSceneHandle | null>(null);
    const turnRef = useRef<((direction: number) => void) | null>(null);
    const lastPageRef = useRef(page);
    const callbacksRef = useRef({ onUnavailable, onTransformChange, onTurnComplete });

    useEffect(() => {
      callbacksRef.current = { onUnavailable, onTransformChange, onTurnComplete };
    }, [onUnavailable, onTransformChange, onTurnComplete]);

    useImperativeHandle(ref, () => ({
      zoomIn: () => actionsRef.current?.zoomIn(),
      zoomOut: () => actionsRef.current?.zoomOut(),
      resetZoom: () => actionsRef.current?.resetZoom(),
    }), []);

    useEffect(() => {
      if (!opened) return;
      const canvas = canvasRef.current;
      const surface = interactionRef.current;
      if (!canvas || !surface) return;

      let renderer: THREE.WebGLRenderer;
      try {
        const context = canvas.getContext('webgl2', { alpha: true, antialias: true });
        if (!context) throw new Error('WebGL 2 unavailable');
        renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        callbacksRef.current.onUnavailable();
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 0.1, 40);
      camera.position.z = 10;
      scene.add(new THREE.HemisphereLight('#ffffff', '#8190a6', 2.2));
      const light = new THREE.DirectionalLight('#ffffff', 2);
      light.position.set(-2, 5, 7);
      scene.add(light);

      const coverMaterial = new THREE.MeshStandardMaterial({ color: '#1a304d', roughness: 0.86 });
      const paperMaterial = new THREE.MeshStandardMaterial({ color: '#f6f2e8', roughness: 1 });
      const leafMaterial = new THREE.MeshStandardMaterial({ color: '#fbf8f0', roughness: 0.94 });
      const spineMaterial = new THREE.MeshStandardMaterial({ color: '#254774', roughness: 0.86 });
      const book = new THREE.Group();
      scene.add(book);

      const back = new THREE.Mesh(new THREE.BoxGeometry(5.03, 3.55, 0.1), coverMaterial);
      back.position.z = -0.17;
      book.add(back);
      const left = new THREE.Mesh(new THREE.BoxGeometry(2.42, 3.36, 0.15), paperMaterial);
      const right = new THREE.Mesh(new THREE.BoxGeometry(2.42, 3.36, 0.15), paperMaterial);
      left.position.set(-1.22, 0, -0.035);
      right.position.set(1.22, 0, -0.035);
      book.add(left, right);
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.42, 0.18), spineMaterial);
      spine.position.z = 0.01;
      book.add(spine);

      const hinge = new THREE.Group();
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(2.42, 3.36, 0.015), leafMaterial);
      leaf.position.x = 1.21;
      hinge.add(leaf);
      hinge.position.z = 0.075;
      hinge.visible = false;
      book.add(hinge);

      let width = 0;
      let height = 0;
      let spanX = 1;
      let spanY = 1;
      let scale = 1;
      let offsetX = 0;
      let offsetY = 0;
      let mobile = false;
      let turnFrame = 0;
      let turnToken = 0;
      let unavailable = false;

      const render = () => renderer.render(scene, camera);
      const notify = () => callbacksRef.current.onTransformChange?.({ scale, x: offsetX, y: offsetY });
      const syncCamera = () => {
        camera.zoom = scale;
        camera.position.x = -offsetX * spanX / (Math.max(width, 1) * scale);
        camera.position.y = offsetY * spanY / (Math.max(height, 1) * scale);
        camera.updateProjectionMatrix();
        render();
        notify();
      };
      const clampOffset = () => {
        const maxX = width * (scale - 1) / 2;
        const maxY = height * (scale - 1) / 2;
        offsetX = THREE.MathUtils.clamp(offsetX, -maxX, maxX);
        offsetY = THREE.MathUtils.clamp(offsetY, -maxY, maxY);
      };
      const setZoom = (next: number, clientX: number, clientY: number) => {
        if (!width || !height) return;
        const rect = surface.getBoundingClientRect();
        const x = clientX - rect.left - width / 2;
        const y = clientY - rect.top - height / 2;
        const target = THREE.MathUtils.clamp(next, MIN_ZOOM, MAX_ZOOM);
        const ratio = target / scale;
        offsetX = x - (x - offsetX) * ratio;
        offsetY = y - (y - offsetY) * ratio;
        scale = target;
        clampOffset();
        syncCamera();
      };
      const center = () => {
        const rect = surface.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      };
      actionsRef.current = {
        zoomIn: () => { const point = center(); setZoom(scale * 1.25, point.x, point.y); },
        zoomOut: () => { const point = center(); setZoom(scale / 1.25, point.x, point.y); },
        resetZoom: () => { scale = 1; offsetX = 0; offsetY = 0; syncCamera(); },
      };

      const resize = () => {
        const rect = surface.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        if (!width || !height) return;
        mobile = window.matchMedia('(max-width: 767px)').matches;
        const aspect = width / height;
        spanY = Math.max(3.7, (mobile ? 2.85 : 5.32) / aspect);
        spanX = spanY * aspect;
        camera.left = -spanX / 2;
        camera.right = spanX / 2;
        camera.top = spanY / 2;
        camera.bottom = -spanY / 2;
        left.visible = !mobile;
        right.position.x = mobile ? 0 : 1.22;
        back.scale.x = mobile ? 0.515 : 1;
        spine.position.x = mobile ? -1.25 : 0;
        hinge.position.x = mobile ? -1.21 : 0;
        clampOffset();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height, false);
        syncCamera();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(surface);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      resize();

      const turn = (direction: number, opening = false) => {
        cancelAnimationFrame(turnFrame);
        const token = ++turnToken;
        let started = 0;
        hinge.visible = true;
        leaf.material = opening ? coverMaterial : leafMaterial;
        const start = direction > 0 ? 0 : -Math.PI;
        const end = direction > 0 ? -Math.PI : 0;
        hinge.rotation.y = start;
        const animate = (now: number) => {
          if (token !== turnToken) return;
          if (!started) started = now;
          const progress = Math.min((now - started) / TURN_DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          hinge.rotation.y = start + (end - start) * eased;
          render();
          if (progress < 1) turnFrame = requestAnimationFrame(animate);
          else {
            hinge.visible = false;
            render();
            callbacksRef.current.onTurnComplete?.();
          }
        };
        turnFrame = requestAnimationFrame(animate);
      };
      turnRef.current = (direction) => turn(direction);
      turn(1, true);

      const interactiveTarget = (target: EventTarget | null) => target instanceof Element && !!target.closest(INTERACTIVE);
      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey || event.metaKey || interactiveTarget(event.target)) return;
        event.preventDefault();
        setZoom(scale * Math.exp(-event.deltaY * 0.0015), event.clientX, event.clientY);
      };
      let drag: { x: number; y: number; id: number } | null = null;
      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'touch' || event.button !== 0 || scale <= 1 || interactiveTarget(event.target)) return;
        drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
        surface.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!drag || drag.id !== event.pointerId) return;
        offsetX += event.clientX - drag.x;
        offsetY += event.clientY - drag.y;
        drag.x = event.clientX;
        drag.y = event.clientY;
        clampOffset();
        syncCamera();
      };
      const onPointerEnd = (event: PointerEvent) => {
        if (drag?.id === event.pointerId) drag = null;
      };
      let pinch: { distance: number; centerX: number; centerY: number } | null = null;
      const touchMetrics = (touches: TouchList) => {
        const first = touches[0];
        const second = touches[1];
        return {
          distance: Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY),
          centerX: (first.clientX + second.clientX) / 2,
          centerY: (first.clientY + second.clientY) / 2,
        };
      };
      let pan: { x: number; y: number } | null = null;
      const onTouchStart = (event: TouchEvent) => {
        if (interactiveTarget(event.target)) return;
        if (event.touches.length === 1 && scale > 1) {
          pan = { x: event.touches[0].clientX, y: event.touches[0].clientY };
          event.preventDefault();
          return;
        }
        if (event.touches.length !== 2) return;
        pan = null;
        pinch = touchMetrics(event.touches);
        event.preventDefault();
      };
      const onTouchMove = (event: TouchEvent) => {
        if (pan && event.touches.length === 1) {
          event.preventDefault();
          const { clientX, clientY } = event.touches[0];
          offsetX += clientX - pan.x;
          offsetY += clientY - pan.y;
          pan = { x: clientX, y: clientY };
          clampOffset();
          syncCamera();
          return;
        }
        if (!pinch || event.touches.length !== 2) return;
        event.preventDefault();
        const next = touchMetrics(event.touches);
        offsetX += next.centerX - pinch.centerX;
        offsetY += next.centerY - pinch.centerY;
        setZoom(scale * next.distance / Math.max(pinch.distance, 1), next.centerX, next.centerY);
        pinch = next;
      };
      const onTouchEnd = (event: TouchEvent) => {
        if (event.touches.length < 2) pinch = null;
        if (!event.touches.length) pan = null;
      };
      const onContextLost = (event: Event) => {
        event.preventDefault();
        if (!unavailable) {
          unavailable = true;
          callbacksRef.current.onUnavailable();
        }
      };
      surface.addEventListener('wheel', onWheel, { passive: false });
      surface.addEventListener('pointerdown', onPointerDown);
      surface.addEventListener('pointermove', onPointerMove);
      surface.addEventListener('pointerup', onPointerEnd);
      surface.addEventListener('pointercancel', onPointerEnd);
      surface.addEventListener('touchstart', onTouchStart, { passive: false });
      surface.addEventListener('touchmove', onTouchMove, { passive: false });
      surface.addEventListener('touchend', onTouchEnd);
      surface.addEventListener('touchcancel', onTouchEnd);
      canvas.addEventListener('webglcontextlost', onContextLost);

      return () => {
        turnToken += 1;
        cancelAnimationFrame(turnFrame);
        observer.disconnect();
        surface.removeEventListener('wheel', onWheel);
        surface.removeEventListener('pointerdown', onPointerDown);
        surface.removeEventListener('pointermove', onPointerMove);
        surface.removeEventListener('pointerup', onPointerEnd);
        surface.removeEventListener('pointercancel', onPointerEnd);
        surface.removeEventListener('touchstart', onTouchStart);
        surface.removeEventListener('touchmove', onTouchMove);
        surface.removeEventListener('touchend', onTouchEnd);
        surface.removeEventListener('touchcancel', onTouchEnd);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        actionsRef.current = null;
        turnRef.current = null;
        scene.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
        coverMaterial.dispose();
        paperMaterial.dispose();
        leafMaterial.dispose();
        spineMaterial.dispose();
        renderer.dispose();
        // Browsers cap live WebGL contexts (~16); release ours instead of waiting for GC.
        renderer.forceContextLoss();
      };
    }, [opened, interactionRef]);

    useEffect(() => {
      if (page !== lastPageRef.current && opened) turnRef.current?.(page > lastPageRef.current ? 1 : -1);
      lastPageRef.current = page;
    }, [opened, page]);

    if (!opened) return null;
    return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
  },
);

export default MagazineBookScene;
