'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147462.profitablecpmratenetwork.com/bd/40/5d/bd405db31b64295bc64990b16faca31f.js", "https://pl29147464.profitablecpmratenetwork.com/9c/de/9d/9cde9d81a8789a6bdcd373642cb56af2.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
