// Shared hooks/helpers for Vision Glow — GSAP + Lenis edition
const { useEffect, useRef, useState, useLayoutEffect } = React;

if (window.gsap && window.ScrollTrigger && !window.__gsapRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  window.__gsapRegistered = true;
}

// Init Lenis + sync with GSAP ticker
function useSmoothScroll() {
  useEffect(() => {
    if (window.__lenisInited || !window.Lenis) return;
    window.__lenisInited = true;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }, []);
}

// Global reveal via ScrollTrigger.batch on [data-reveal] elements
function useGlobalReveal() {
  useEffect(() => {
    if (!window.gsap) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-reveal]');
      els.forEach((el) => {
        const mode = el.getAttribute('data-reveal') || 'up';
        let from = { autoAlpha: 0, y: 40 };
        if (mode === 'clip') from = { clipPath: 'inset(0 0 100% 0)', autoAlpha: 1, y: 0 };
        if (mode === 'clip-right') from = { clipPath: 'inset(0 100% 0 0)', autoAlpha: 1, y: 0 };
        gsap.set(el, from);
        gsap.to(el, {
          ...Object.fromEntries(
            Object.keys(from).map((k) => [k, k === 'autoAlpha' ? 1 : k === 'clipPath' ? 'inset(0 0 0 0)' : 0])
          ),
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Refresh after layout settles
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    return () => ctx.revert();
  }, []);
}

// Mouse position normalized
function useMouse() {
  const [m, setM] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const onMove = (e) => {
      setM({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return m;
}

// WordReveal — IntersectionObserver-based for max reliability
function WordReveal({ children, className = '', tag = 'span', delay = 0 }) {
  const Tag = tag;
  const ref = useRef(null);
  const flatten = (c) => {
    if (c == null || c === false) return '';
    if (typeof c === 'string' || typeof c === 'number') return String(c);
    if (Array.isArray(c)) return c.map(flatten).join('');
    if (c.props && c.props.children) return flatten(c.props.children);
    return '';
  };
  const text = flatten(children);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const reveal = () => {
      el.classList.add('is-visible');
      el.style.setProperty('--wr-delay', `${delay}s`);
    };
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      requestAnimationFrame(reveal);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`word-reveal ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="word" style={{ marginRight: '0.25em' }}>
          <span style={{ transitionDelay: `calc(var(--wr-delay, 0s) + ${i * 0.04}s)` }}>{w}</span>
        </span>
      ))}
    </Tag>
  );
}

// Generic reveal wrapper — emits data-reveal so useGlobalReveal handles it
function Reveal({ children, as = 'div', mode = 'up', className = '', delay = 0, ...rest }) {
  const Tag = as;
  return (
    <Tag data-reveal={mode === 'up' ? '' : mode} className={className} style={{ ...rest.style }} {...rest}>
      {children}
    </Tag>
  );
}

// Custom cursor
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    loop();
    const handleEnter = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) {
        ringRef.current?.classList.add('is-hover');
      }
    };
    const handleLeave = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) {
        ringRef.current?.classList.remove('is-hover');
      }
    };
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </React.Fragment>
  );
}

// Backwards-compat shims (replaced by GSAP, but referenced in some sections)
function useReveal() { return useRef(null); }
function useScrollY() { return 0; }
function useScrollProgress() { return 0; }

Object.assign(window, {
  useSmoothScroll, useGlobalReveal, useReveal, useScrollY, useScrollProgress,
  useMouse, WordReveal, Reveal, Cursor,
});
