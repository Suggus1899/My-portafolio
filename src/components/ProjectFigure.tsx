'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ProjectFigureProps = {
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
};

export default function ProjectFigure({ src, alt, caption, featured = false }: ProjectFigureProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!featured || !figureRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(figureRef.current);
    return () => observer.disconnect();
  }, [featured]);

  return (
    <figure ref={figureRef} className={`project-figure${featured && entered ? ' project-figure--entered' : ''}`}>
      <Image src={src} alt={alt} width={1200} height={675} sizes="(max-width: 768px) 100vw, 720px" />
      {featured && (
        <svg aria-hidden="true" className="project-figure__trace" viewBox="0 0 1200 675" preserveAspectRatio="none">
          <rect x="3" y="3" width="1194" height="669" pathLength="3776" />
        </svg>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
