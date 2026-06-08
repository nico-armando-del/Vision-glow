// Manifesto — sticky/pinned section with text reveal word by word and giant text following scroll
function Manifesto() {
  const ref = _useRef(null);
  const progress = useScrollProgress(ref, { start: window.innerHeight, end: -window.innerHeight * 0.5 });

  return (
    <section ref={ref} className="manifesto" id="manifesto">
      {/* Giant scrolling background text */}
      <div className="manifesto-bg-text" aria-hidden="true">
        <div
          className="big-word"
          style={{ transform: `translateX(${-progress * 600}px)` }}
        >
          VISION&nbsp;—&nbsp;GLOW&nbsp;—&nbsp;VISION&nbsp;—&nbsp;GLOW
        </div>
      </div>

      <div className="manifesto-inner container">
        <Reveal as="div" className="manifesto-head">
          <span className="section-label" aria-hidden="true">01 — Manifesto</span>
          <div className="mono manifesto-meta">Studio fondé en <time dateTime="2019">2019</time> · Paris</div>
        </Reveal>

        <div className="manifesto-body">
          <h2 className="manifesto-title">
            <WordReveal>Le design ne sert pas à faire joli.</WordReveal>
            <WordReveal delay={0.15} className="italic-line">
              Il sert à faire performer votre produit.
            </WordReveal>
          </h2>

          <div className="manifesto-stats">
            <Stat n="50+" label="Produits améliorés" i={0} />
            <Stat n="4 sem" label="Livraison SEED" i={1} />
            <Stat n="100%" label="Designers seniors" i={2} />
            <Stat n="100%" label="Pilotage in-house" i={3} />
          </div>

          <div className="manifesto-cols">
            <Reveal delay={0.2}>
              <p className="manifesto-p">
                Un mauvais UX freine votre acquisition. Il augmente votre
                churn. Il ralentit votre équipe dev. On ne livre pas des
                maquettes — on vous aide à construire un produit qui performe.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="manifesto-p">
                Le design n'est pas une étape de production. C'est une
                décision business. On travaille avec les fondateurs et CPO qui
                l'ont compris — et qui veulent un partenaire long terme, pas
                un prestataire one-shot.
              </p>
            </Reveal>
          </div>

          {/* Chaos collage */}
          <div className="manifesto-chaos" aria-hidden="true">
            <div className="ch ch-1 tex-card tex-1"><span className="label" aria-hidden="true">VIS-001</span></div>
            <div className="ch ch-2 tex-card tex-3"><span className="label" aria-hidden="true">VIS-002</span></div>
            <div className="ch ch-3 tex-card tex-5"><span className="label" aria-hidden="true">VIS-003</span></div>
            <div className="ch ch-4 tex-card tex-2"><span className="label" aria-hidden="true">VIS-004</span></div>
            <div className="ch ch-5 tex-card tex-4"><span className="label" aria-hidden="true">VIS-005</span></div>
            <div className="ch ch-6 tex-card tex-6"><span className="label" aria-hidden="true">VIS-006</span></div>
            <div className="ch ch-quote">
              <span className="mono small">[ MANIFESTO ]</span>
              <p>On comprend<br/>avant de dessiner.<br/><em>Toujours.</em></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .manifesto {
          position: relative;
          padding: 120px 0 100px;
          background: var(--bg);
          overflow: hidden;
        }
        .manifesto-bg-text {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: clamp(120px, 22vw, 360px);
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(245,241,234,0.05);
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          line-height: 0.85;
        }
        .big-word { will-change: transform; }
        .manifesto-inner { position: relative; z-index: 1; }
        .manifesto-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 80px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
        }
        .manifesto-meta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--fg-2);
          letter-spacing: 0.06em;
        }
        .manifesto-title {
          font-size: clamp(40px, 6.4vw, 110px);
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.025em;
          max-width: 1100px;
          margin-bottom: 60px;
        }
        .manifesto-title .italic-line {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
          display: block;
          margin-top: 12px;
        }
        .manifesto-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 80px;
          margin-left: auto;
          max-width: 1100px;
          padding-left: 12%;
        }
        .manifesto-p {
          font-size: 18px;
          line-height: 1.55;
          color: var(--fg-2);
        }
        .manifesto-p::first-letter {
          font-size: 1.4em;
          color: var(--fg);
        }

        .manifesto-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .stat {
          padding: 40px 24px;
          border-right: 1px solid var(--line);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease), background 0.4s var(--ease);
        }
        .stat.is-in { opacity: 1; transform: translateY(0); }
        .stat {
          transition: background 0.4s var(--ease);
        }
        .stat:last-child { border-right: none; }
        .stat:hover { background: var(--accent); color: var(--bg); }
        .stat:hover .stat-label { color: var(--bg); }
        .stat-num {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(40px, 5vw, 76px);
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--fg-2);
          margin-top: 12px;
          transition: color 0.4s var(--ease);
        }

        .manifesto-chaos {
          position: relative;
          margin-top: 140px;
          height: 480px;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }
        .ch {
          position: absolute;
          will-change: transform;
        }
        .ch.tex-card {
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .ch-1 { width: 240px; height: 300px; top: 0; left: 2%; transform: rotate(-7deg); }
        .ch-2 { width: 180px; height: 240px; top: 60px; left: 22%; transform: rotate(4deg); z-index: 2; }
        .ch-3 { width: 280px; height: 200px; top: 220px; left: 14%; transform: rotate(-3deg); }
        .ch-4 { width: 220px; height: 280px; top: 30px; right: 24%; transform: rotate(6deg); }
        .ch-5 { width: 160px; height: 220px; top: 180px; right: 8%; transform: rotate(-8deg); z-index: 2; }
        .ch-6 { width: 200px; height: 160px; top: 280px; right: 30%; transform: rotate(3deg); }
        .ch-quote {
          position: absolute;
          top: 110px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 3;
          mix-blend-mode: difference;
          color: var(--fg);
        }
        .ch-quote p {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1.05;
          font-weight: 500;
          margin-top: 16px;
          letter-spacing: -0.02em;
        }
        .ch-quote em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .ch-quote .mono { color: var(--fg-2); letter-spacing: 0.08em; }

        @media (max-width: 900px) {
          .manifesto { padding: 80px 0 60px; }
          .manifesto-chaos { display: none; }
          .manifesto-title { font-size: clamp(32px, 9vw, 56px); margin-bottom: 40px; }
          .manifesto-head { margin-bottom: 40px; flex-direction: column; align-items: start; gap: 12px; }
          .manifesto-meta { font-size: 10px; }
          .manifesto-cols { grid-template-columns: 1fr; gap: 24px; padding-left: 0; margin-bottom: 60px; }
          .manifesto-stats { grid-template-columns: repeat(2, 1fr); }
          .stat:nth-child(2) { border-right: none; }
          .stat:nth-child(1), .stat:nth-child(2) { border-bottom: 1px solid var(--line); }
          .stat-num { font-size: 36px; }
        }
      `}</style>
    </section>
  );
}

function Stat({ n, label, i = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('is-in'), i * 90);
          io.disconnect();
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="stat" data-cursor>
      <div className="stat-num">{n}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

window.Manifesto = Manifesto;
