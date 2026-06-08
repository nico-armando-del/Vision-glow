// Services — pinned section with sticky title and animated service rows on hover
function Services() {
  const services = [
    {
      n: "01",
      title: "SEED",
      desc: "Validez votre concept avant de développer. Discovery, design system fondation, 6 à 8 écrans Figma, prototype interactif. Livraison 4 semaines.",
      deliverables: ["Discovery", "Design system", "Figma", "Prototype"],
      tex: "tex-3",
    },
    {
      n: "02",
      title: "GROW",
      desc: "Votre produit grandit, le design doit suivre. Audit UX + nouvelles features chaque mois + handoff dev propre. Engagement 3 mois minimum.",
      deliverables: ["Audit UX", "Features mensuelles", "Handoff dev", "Point hebdo"],
      tex: "tex-5",
    },
    {
      n: "03",
      title: "SCALE",
      desc: "Vous repartez de zéro ou refondez tout. Design system complet, toute l'app designée, accompagnement dev, tests utilisateurs mensuels. Engagement 4 mois minimum.",
      deliverables: ["Design system complet", "App entière", "Tests utilisateurs", "Accompagnement dev"],
      tex: "tex-1",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-head container">
        <Reveal>
          <span className="section-label" aria-hidden="true">02 — Services</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="services-title">
            Trois offres.<br />
            <em>Un seul studio.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="services-intro">
            Pas d'account manager. Pas de brief qui se perd. Vous travaillez
            directement avec les designers qui produisent votre produit.
          </p>
        </Reveal>
      </div>

      <div className="services-list">
        {services.map((s, i) => (
          <ServiceRow key={i} {...s} index={i} />
        ))}
      </div>

      <style>{`
        .services {
          padding: 120px 0 40px;
          background: var(--bg);
          position: relative;
        }
        .services-head {
          margin-bottom: 100px;
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .services-title {
          font-size: clamp(40px, 6vw, 96px);
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.025em;
        }
        .services-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .services-intro {
          font-size: 16px;
          line-height: 1.5;
          color: var(--fg-2);
          padding-top: 8px;
        }
        .services-list {
          border-top: 1px solid var(--line);
        }
        @media (max-width: 900px) {
          .services-head { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </section>
  );
}

function ServiceRow({ n, title, desc, deliverables, tex, index }) {
  const [hover, setHover] = _useState(false);
  const ref = _useRef(null);
  const [mp, setMp] = _useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMp({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      className={`service-row ${hover ? 'is-hover' : ''}`}
      data-reveal
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
    >
      <div className="container service-row-inner">
        <div className="service-n mono">{n}</div>
        <h3 className="service-title">{title}</h3>
        <p className="service-desc">{desc}</p>
        <div className="service-deliverables">
          {deliverables.map((d, i) => (
            <span key={i} className="chip">{d}</span>
          ))}
        </div>
        <div className="service-arrow">
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
            <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </div>
      </div>

      {/* Floating preview that follows cursor — constrained to right edge so it never covers the title */}
      <div
        className={`service-preview tex-card ${tex}`}
        style={{
          left: Math.max(mp.x, window.innerWidth ? window.innerWidth * 0.62 : 800),
          top: mp.y,
          opacity: hover ? 0.92 : 0,
          transform: `translate(-50%, -50%) scale(${hover ? 1 : 0.7}) rotate(${hover ? -3 : 0}deg)`,
        }}
        aria-hidden="true"
      >
        <span className="label" aria-hidden="true">VIS-{String(index + 1).padStart(2, '0')}</span>
      </div>

      <style>{`
        .service-row {
          position: relative;
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          transition: background 0.5s var(--ease);
        }
        .service-row.is-hover { background: var(--bg-2); }
        .service-row-inner {
          display: grid;
          grid-template-columns: 60px 1.2fr 1.5fr 1.5fr 60px;
          gap: 40px;
          align-items: center;
          padding: 56px 32px;
          position: relative;
          z-index: 2;
        }
        .service-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--fg-2);
          letter-spacing: 0.06em;
        }
        .service-title {
          font-size: clamp(28px, 3.4vw, 52px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.02em;
          transition: transform 0.5s var(--ease), color 0.4s;
        }
        .service-row.is-hover .service-title {
          transform: translateX(8px);
          color: var(--accent);
        }
        .service-desc {
          font-size: 15px;
          line-height: 1.45;
          color: var(--fg-2);
          max-width: 380px;
        }
        .service-deliverables {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          font-size: 11px;
          padding: 6px 12px;
          border: 1px solid var(--line);
          border-radius: 100px;
          color: var(--fg-2);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.04em;
          transition: all 0.3s var(--ease);
        }
        .service-row.is-hover .chip {
          border-color: var(--fg);
          color: var(--fg);
        }
        .service-arrow {
          justify-self: end;
          color: var(--fg-2);
          transition: transform 0.5s var(--ease), color 0.3s;
        }
        .service-row.is-hover .service-arrow {
          transform: rotate(-45deg);
          color: var(--accent);
        }
        .service-preview {
          position: absolute;
          width: 200px;
          height: 260px;
          border-radius: 8px;
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.4s var(--ease), transform 0.6s var(--ease), left 0.3s var(--ease), top 0.3s var(--ease);
          mix-blend-mode: screen;
        }
        @media (max-width: 900px) {
          .services { padding: 80px 0 20px; }
          .services-head { grid-template-columns: 1fr; gap: 20px; margin-bottom: 40px; }
          .services-title { font-size: clamp(32px, 9vw, 56px); }
          .service-row-inner {
            grid-template-columns: auto 1fr;
            gap: 12px 20px;
            padding: 32px 20px;
          }
          .service-title { font-size: clamp(22px, 6vw, 32px); grid-column: 2; }
          .service-n { grid-column: 1; }
          .service-desc, .service-deliverables { grid-column: 1 / -1; }
          .service-arrow { display: none; }
          .service-preview { display: none; }
          .service-row { cursor: pointer; opacity: 1 !important; transform: none !important; visibility: visible !important; clip-path: none !important; }
        }
      `}</style>
    </div>
  );
}

window.Services = Services;
