'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true; s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147463.profitablecpmratenetwork.com/aaf41c051d0e3fc438aac32f87878108/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-aaf41c051d0e3fc438aac32f87878108" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
