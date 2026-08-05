'use client';

import { useEffect } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const container = ref.current;
    const previously = document.activeElement as HTMLElement | null;
    const first = () => container.querySelectorAll<HTMLElement>(FOCUSABLE)[0];
    first()?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!focusable.length) { e.preventDefault(); return; }
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === focusable[0]) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); focusable[0].focus(); }
      }
    };

    container.addEventListener('keydown', trap);
    return () => {
      container.removeEventListener('keydown', trap);
      previously?.focus();
    };
  }, [active, ref]);
}
