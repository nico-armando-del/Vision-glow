// Hero — immersive, parallax, giant type
const { useEffect: _useEffect, useRef: _useRef, useState: _useState } = React;

function Hero() {
  const ref = _useRef(null);
  const progress = useScrollProgress(ref, { start: window.innerHeight, end: -window.innerHeight });
  const mouse = useMouse();

  // parallax values
  const parX = (mouse.x - 0.5) * 30;
  const parY = (mouse.y - 0.5) * 30;
  const scrollOffset = progress * 200;

  return (
    <section ref={ref} className="hero" id="hero">
      <div className="hero-bg">
        {/* abstract texture layers */}
        <div
          className="hero-tex tex-3"
          style={{
            transform: `translate(${parX * 0.6}px, ${parY * 0.6 + scrollOffset * 0.4}px) scale(${1 + progress * 0.2})`,
            opacity: 0.65,
          }}
        />
        <div
          className="hero-tex tex-9"
          style={{
            transform: `translate(${-parX * 0.3}px, ${-parY * 0.3 + scrollOffset * 0.6}px)`,
            opacity: 0.4,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      <div className="hero-grid">
        {/* corner timestamps & coords */}
        <div className="hero-meta tl" aria-hidden="true">
          <div className="mono">[ FR–PAR–2026 ]</div>
          <div className="mono">48.8566° N / 2.3522° E</div>
        </div>
        <div className="hero-meta tr" aria-hidden="true">
          <div className="mono">v.026 — studio</div>
          <div className="mono">{new Date().toLocaleDateString('fr-FR')}</div>
        </div>
        <div className="hero-meta bl" aria-hidden="true">
          <div className="mono small">↓ SCROLL POUR EXPLORER</div>
        </div>
        <div className="hero-meta br" aria-hidden="true">
          <div className="mono small">SEED / GROW / SCALE</div>
        </div>

        <div className="hero-center">
          <div className="hero-pretitle" aria-hidden="true">
            <span className="dot-anim" />
            <span className="mono">DISPONIBLE — Q3 / Q4 2026</span>
          </div>

          <h1 className="hero-title" aria-label="Vision Glow — Studio de product design externalisé pour startups et scale-ups. SaaS, apps et plateformes.">
            <span className="line line-1">
              <span className="line-inner">Studio de</span>
            </span>
            <span className="line line-2">
              <span className="line-inner">
                product design<span className="comma">,</span>
              </span>
            </span>
            <span className="line line-3 italic">
              <span className="line-inner">
                <em>externalisé.</em>
              </span>
            </span>
          </h1>

          <div className="hero-mark" aria-hidden="true">
            <div className="hero-mark-num">VG/26</div>
            <div className="hero-mark-bar" />
            <div className="hero-mark-label mono">
              <span>STUDIO</span>
              <span>PRODUCT</span>
              <span>DESIGN</span>
            </div>
          </div>

          <div className="hero-sub-row">
            <div className="hero-sub">
              <p>
                On conçoit et améliore les produits digitaux des startups et
                scale-ups qui n'ont pas de designer senior en interne.
                Résultat : un produit qui convertit mieux, retient plus,
                s'utilise sans friction.
              </p>
            </div>
            <div className="hero-actions">
              <a href="#pricing" className="btn btn-primary">
                Voir nos offres
                <svg className="arrow" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
              <a href="https://cal.com/nico-armando-bertone/30min" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Prendre un appel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — tied to global scroll progress */}
      <ScrollIndicator />

      <style>{`
        .hero {
          height: 100vh;
          min-height: 720px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
        }
        .hero-bg {
          position: absolute;
          inset: -20%;
          z-index: 0;
        }
        .hero-tex {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
        }
        .hero-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          padding: 90px 32px 60px;
          display: grid;
          grid-template-rows: auto 1fr auto;
        }
        .hero-meta {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--fg-2);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hero-meta.tl { top: 80px; left: 32px; }
        .hero-meta.tr { top: 80px; right: 32px; text-align: right; }
        .hero-meta.bl { bottom: 32px; left: 32px; }
        .hero-meta.br { bottom: 32px; right: 32px; text-align: right; }
        @media (max-width: 1200px) {
          .hero-meta.tl, .hero-meta.tr { display: none; }
        }
        .hero-meta .small { font-size: 11px; }

        .hero-center {
          grid-row: 2;
          align-self: center;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          position: relative;
        }

        .hero-pretitle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          border: 1px solid var(--line);
          border-radius: 100px;
          margin-bottom: 32px;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--fg);
        }
        .dot-anim {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(255,77,31,0.7);
          animation: dot-pulse 1.6s infinite;
        }
        @keyframes dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,77,31,0.7); }
          70% { box-shadow: 0 0 0 12px rgba(255,77,31,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,31,0); }
        }

        .hero-title {
          position: relative;
          font-size: clamp(56px, 10vw, 152px);
          font-weight: 500;
          line-height: 0.84;
          letter-spacing: -0.045em;
          color: var(--fg);
          max-width: 1500px;
        }
        .hero-title .line {
          display: block;
          overflow: hidden;
          padding-top: 0.2em;
          margin-top: -0.2em;
          padding-bottom: 0.3em;
          margin-bottom: -0.3em;
          white-space: nowrap;
        }
        .hero-title .line-2 { padding-left: 0; }
        .hero-title .line-3 { padding-left: 14%; }
        .hero-title .comma { color: var(--accent); }
        .hero-title .line-inner {
          display: block;
          animation: line-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform: translateY(110%);
        }
        .hero-title .line:nth-child(1) .line-inner { animation-delay: 0.1s; }
        .hero-title .line:nth-child(2) .line-inner { animation-delay: 0.22s; }
        .hero-title .line:nth-child(3) .line-inner { animation-delay: 0.34s; }
        .hero-title .italic em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }

        .hero-mark {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
          opacity: 0;
          animation: fade-in 1s ease 0.8s forwards;
        }
        .hero-mark-num {
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          font-size: clamp(36px, 5vw, 72px);
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: var(--accent);
        }
        .hero-mark-bar {
          width: 80px;
          height: 1px;
          background: var(--line);
        }
        .hero-mark-label {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--fg-2);
        }
        @media (max-width: 1100px) {
          .hero-mark { display: none; }
          .hero-title .line-3 { padding-left: 8%; }
        }

        @keyframes line-up {
          to { transform: translateY(0); }
        }

        .hero-sub-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: end;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
          opacity: 0;
          animation: fade-in 1s ease 1s forwards;
        }
        @keyframes fade-in { to { opacity: 1; } }

        .hero-sub p {
          font-size: 17px;
          line-height: 1.4;
          color: var(--fg-2);
          max-width: 560px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: transparent;
          z-index: 200;
          pointer-events: none;
        }
        .scroll-bar {
          position: absolute;
          inset: 0;
        }
        .scroll-bar-fill {
          height: 2px;
          background: var(--accent);
          width: 0;
          transition: width 0.12s linear;
          box-shadow: 0 0 12px rgba(255,90,46,0.5);
        }

        @media (max-width: 1024px) {
          .hero-grid { padding: 90px 16px 60px; }
          .hero-meta.tl { left: 16px; }
          .hero-meta.tr { right: 16px; }
          .hero-meta.bl { left: 16px; }
          .hero-meta.br { right: 16px; }
        }
        @media (max-width: 900px) {
          .hero { min-height: 640px; padding: 0; }
          .hero-grid { padding: 80px 16px 60px; }
          .hero-sub-row { grid-template-columns: 1fr; gap: 24px; }
          .hero-actions { justify-content: flex-start; }
          .hero-meta.tr, .hero-meta.br { display: none; }
          .hero-meta.tl { top: 60px; left: 16px; }
          .hero-meta.bl { bottom: 24px; left: 16px; }
          .hero-pretitle { margin-bottom: 20px; font-size: 10px; }
          .hero-title { font-size: clamp(40px, 12vw, 78px); letter-spacing: -0.035em; }
          .hero-title .line { white-space: normal; }
          .hero-title .line-3 { padding-left: 0; }
          .hero-actions .btn { padding: 14px 20px; font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;

function ScrollIndicator() {
  const fillRef = _useRef(null);
  _useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) fillRef.current.style.width = `${p * 100}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scroll-indicator">
      <div className="scroll-bar"><div ref={fillRef} className="scroll-bar-fill" /></div>
    </div>
  );
}
