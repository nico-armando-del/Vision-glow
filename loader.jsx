// Page loader + inter-page transition manager
const _Le = React.useEffect;
const _Ls = React.useState;
const _Lr = React.useRef;

function Loader({ onDone }) {
  // Skip immediately if already shown this session — render nothing
  const alreadyLoaded = typeof window !== 'undefined' && sessionStorage.getItem('vg-loaded-v2') === '1';
  const [count, setCount] = _Ls(0);
  const [exiting, setExiting] = _Ls(false);
  const fillRef = _Lr(null);

  _Le(() => {
    if (alreadyLoaded) {
      onDone && onDone();
      return;
    }
    sessionStorage.setItem('vg-loaded-v2', '1');

    let start = performance.now();
    const dur = 1600;
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 100));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setTimeout(() => setExiting(true), 350);
        setTimeout(() => { onDone && onDone(); }, 1100);
      }
    };
    raf = requestAnimationFrame(step);
    document.body.style.overflow = 'hidden';
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ''; };
  }, []);

  if (alreadyLoaded) return null;

  return (
    <div className={`vg-loader ${exiting ? 'is-exiting' : ''}`}>
      <div className="vg-loader-top">
        <span><span className="vg-dot" /> VISION GLOW</span>
        <span>CHARGEMENT</span>
      </div>

      <div className="vg-loader-main">
        <div className="vg-loader-pct">{String(count).padStart(3, '0')}<span>%</span></div>
        <div className="vg-loader-bar">
          <div className="vg-loader-bar-fill" ref={fillRef} />
        </div>
      </div>

      <style>{`
        .vg-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #FF4D1F;
          color: #0a0a0a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .vg-loader.is-exiting { transform: translateY(-100%); }

        .vg-loader-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .vg-dot {
          display: inline-block;
          width: 8px; height: 8px;
          background: #0a0a0a;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
          animation: vg-pulse 1s ease-in-out infinite;
        }
        @keyframes vg-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .vg-loader-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .vg-loader-pct {
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: clamp(80px, 18vw, 240px);
          line-height: 0.9;
          letter-spacing: -0.04em;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .vg-loader-pct span {
          font-size: 0.3em;
          font-weight: 500;
          padding-top: 0.5em;
          opacity: 0.7;
        }
        .vg-loader-bar {
          height: 4px;
          background: rgba(10,10,10,0.2);
          position: relative;
          width: 100%;
        }
        .vg-loader-bar-fill {
          position: absolute;
          inset: 0;
          background: #0a0a0a;
          transform: scaleX(0);
          transform-origin: left;
        }

        @media (max-width: 600px) {
          .vg-loader { padding: 16px; }
          .vg-loader-top { font-size: 10px; }
        }
      `}</style>
    </div>
  );
}

// PageTransition — handles the leaving-page cover (arrival is in <head> sync script).
function PageTransition() {
  const coverRef = _Lr(null);

  _Le(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[data-page-link]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;
      e.preventDefault();
      sessionStorage.setItem('pageTransition', '1');
      if (coverRef.current) coverRef.current.classList.add('pt-cover');
      setTimeout(() => { window.location.href = href; }, 580);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={coverRef} className="page-transition">
      <div className="pt-panel">
        <div className="pt-logo">
          <span className="pt-dot" /> Vision Glow
        </div>
      </div>
      <style>{`
        .page-transition {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
        }
        .pt-panel {
          position: absolute;
          inset: 0;
          background: var(--accent, #FF4D1F);
          transform: translateY(100%);
          transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pt-logo {
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: clamp(48px, 8vw, 120px);
          letter-spacing: -0.03em;
          color: #0a0a0a;
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          transition: opacity 0.3s 0.15s;
        }
        .pt-dot {
          width: 18px; height: 18px;
          background: #0a0a0a;
          border-radius: 50%;
          animation: vg-pulse 1s ease-in-out infinite;
        }
        .page-transition.pt-cover .pt-panel { transform: translateY(0); }
        .page-transition.pt-cover .pt-logo { opacity: 1; }
      `}</style>
    </div>
  );
}

Object.assign(window, { Loader, PageTransition });
