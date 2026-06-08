// Process — pinned section, 5 steps revealed as you scroll
function Process() {
  const ref = _useRef(null);
  const [activeIdx, setActiveIdx] = _useState(0);
  const [barW, setBarW] = _useState(20);

  const steps = [
    { n: "01", title: "CADRAGE", desc: "On passe du temps à comprendre le problème avant de dessiner quoi que ce soit. Problem statement validé par écrit avant d'avancer.", time: "Avant tout" },
    { n: "02", title: "DISCOVERY", desc: "On comprend les utilisateurs réels. Interviews, analyse des données, benchmark. Le design suit la compréhension, pas l'inverse.", time: "Recherche" },
    { n: "03", title: "DESIGN", desc: "Plans d'interface, puis écrans haute fidélité avec le système de design en parallèle. Ce qu'on livre peut aller directement en production.", time: "Production" },
    { n: "04", title: "HANDOFF", desc: "Specs prêtes à implémenter, disponibles pendant l'intégration, review du développement final. On reste jusqu'à la mise en ligne.", time: "Livraison" },
  ];

  _useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / total));
        const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
        setActiveIdx(idx);
        setBarW(((idx + 1) / steps.length) * 100);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="process" id="process" style={{ height: `${steps.length * 65}vh` }}>
      <div className="process-sticky">
        <div className="container process-grid">
          <div className="process-left">
            <Reveal>
              <span className="section-label" aria-hidden="true">04 — Process</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="process-title">
                Quatre phases.<br />
                <em>Aucune improvisation.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="process-ai">
                <em>L'IA produit des livrables.</em> Vision Glow produit
                des décisions. Le temps qu'on gagne sur le répétitif
                retourne dans la réflexion, les entretiens et les
                arbitrages difficiles.
              </p>
            </Reveal>
            <div className="process-counter mono" aria-hidden="true">
              <span>{String(activeIdx + 1).padStart(2, '0')}</span> / {String(steps.length).padStart(2, '0')}
            </div>
            <div className="process-progress-bar">
              <div className="bar-fill" style={{ width: `${barW}%` }} />
            </div>
          </div>

          <div className="process-right">
            {steps.map((s, i) => (
              <div key={i} className={`process-step ${i === activeIdx ? 'is-active' : ''} ${i < activeIdx ? 'is-past' : ''}`}>
                <div className="step-meta" aria-hidden="true">
                  <span className="mono">{s.n}</span>
                  <span className="mono step-time">{s.time}</span>
                </div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .process { position: relative; background: var(--bg-2); }
        .process-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          width: 100%;
          align-items: start;
          padding: 0 32px;
        }
        .process-title {
          font-size: clamp(40px, 5vw, 80px);
          font-weight: 500;
          line-height: 0.95;
          margin: 20px 0 40px;
        }
        .process-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .process-counter {
          font-size: 80px;
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: var(--fg-2);
        }
        .process-counter span { color: var(--accent); }
        .process-ai {
          margin-top: 24px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 420px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }
        .process-ai em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          color: var(--fg);
          font-weight: 400;
        }
        .process-progress-bar {
          width: 100%;
          height: 1px;
          background: var(--line);
          margin-top: 24px;
          position: relative;
          overflow: hidden;
        }
        .bar-fill {
          height: 1px;
          background: var(--accent);
          transition: width 0.7s var(--ease);
        }
        .process-right {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          max-height: 70vh;
        }
        .process-step {
          padding: 28px 0;
          border-bottom: 1px solid var(--line);
          opacity: 0.3;
          transform: translateX(-30px);
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease), padding 0.6s var(--ease);
        }
        .process-step.is-past {
          opacity: 0.5;
          transform: translateX(0);
        }
        .process-step.is-active {
          opacity: 1;
          transform: translateX(0);
          padding: 36px 0;
        }
        .step-meta {
          display: flex;
          justify-content: space-between;
          color: var(--fg-2);
          margin-bottom: 12px;
        }
        .step-title {
          font-size: clamp(24px, 2.4vw, 40px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.015em;
          margin-bottom: 8px;
          transition: color 0.4s;
        }
        .process-step.is-active .step-title { color: var(--accent); }
        .step-desc {
          font-size: 15px;
          line-height: 1.45;
          color: var(--fg-2);
          max-width: 560px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s var(--ease), opacity 0.5s var(--ease);
        }
        .process-step.is-active .step-desc {
          max-height: 200px;
          opacity: 1;
          margin-top: 8px;
        }
        @media (max-width: 900px) {
          .process { height: auto !important; }
          .process-sticky { position: relative; height: auto; padding: 80px 0 60px; }
          .process-right { max-height: none !important; }
          .process-grid { grid-template-columns: 1fr; gap: 32px; padding: 0; }
          .process-title { font-size: clamp(32px, 9vw, 52px); margin: 12px 0 24px; }
          .process-counter { font-size: 56px; }
          .process-step { opacity: 1 !important; transform: none !important; padding: 24px 0 !important; }
          .process-step .step-desc { max-height: 200px !important; opacity: 1 !important; margin-top: 8px !important; }
          .step-title { font-size: clamp(20px, 6vw, 28px); }
        }
      `}</style>
    </section>
  );
}

window.Process = Process;
