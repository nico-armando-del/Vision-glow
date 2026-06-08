// Projects — horizontal scrolling gallery (pinned)
function Projects() {
  const sectionRef = _useRef(null);
  const trackRef = _useRef(null);
  const hintFillRef = _useRef(null);
  const [trackW, setTrackW] = _useState(0);

  _useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackW(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  _useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!sectionRef.current || !trackRef.current) return;
        const r = sectionRef.current.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / total));
        trackRef.current.style.transform = `translateX(${-p * trackW}px)`;
        if (hintFillRef.current) hintFillRef.current.style.width = `${p * 100}%`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [trackW]);

  const projects = [
    { n: "01", client: "Packler",        type: "App de déménagement à la demande", year: "2026", img: "uploads/iPhone 1.jpg",                                              tag: "APP" },
    { n: "02", client: "SG",              type: "Refonte page d'accueil app bancaire", year: "2026", img: "uploads/Holding iPhone 16 Pro Mockup Skin Pack V1 02.jpg",       tag: "UX" },
    { n: "03", client: "N Dance Center",  type: "Site sur-mesure association de danse", year: "2025", img: "uploads/iPhone 17 Pro Max Tech Editorial Mockup 2.jpg",         tag: "WEB" },
    { n: "04", client: "Brûle-jour",      type: "E-commerce maison de bougies", year: "2025", img: "uploads/iPhone 17 Pro Max Tech Editorial Mockup 3.jpg",                 tag: "E-COM" },
    { n: "05", client: "Homy Expert",     type: "App d'optimisation d'assurance", year: "2025", img: "uploads/Phone Mockup_5 qwed.jpg",                                     tag: "APP" },
    { n: "06", client: "Sable",           type: "Concept d'épargne automatique", year: "2025", img: "uploads/SC_01.jpg",                                                    tag: "APP" },
    { n: "07", client: "Denteclair",      type: "Site visibilité & RDV pour cabinets dentaires", year: "2024", img: "uploads/pasted-1778787929867-0.png",                   tag: "WEB" },
    { n: "08", client: "Write or Die",    type: "App de productivité d'écriture", year: "2024", img: "uploads/pasted-1778787945895-0.png",                                 tag: "APP" },
    { n: "09", client: "Anthéa Lounge",   type: "Site & booking prothésiste ongulaire", year: "2024", img: "uploads/pasted-1778787937302-0.png",                            tag: "WEB" },
    { n: "10", client: "Paww",            type: "App de bien-être animal", year: "2024", img: "uploads/1.jpg",                                                              tag: "APP" },
  ];

  return (
    <section ref={sectionRef} className="projects" id="projects" style={{ height: `${trackW + window.innerHeight + 100}px` }}>
      <div className="projects-sticky">
        <div className="projects-head container">
          <Reveal>
            <span className="section-label" aria-hidden="true">03 — Projets</span>
          </Reveal>
          <div className="projects-head-right">
            <Reveal delay={0.1}>
              <h2 className="projects-title">
                Sélection<br />
                <em>récente.</em>
              </h2>
            </Reveal>
            <div className="projects-scroll-hint mono" aria-hidden="true">
              <span>↔ DÉFILEMENT HORIZONTAL</span>
              <div className="hint-track"><div ref={hintFillRef} className="hint-fill" /></div>
            </div>
          </div>
        </div>

        <div className="projects-viewport">
          <div ref={trackRef} className="projects-track">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
            <div className="project-end">
              <div>
                <div className="mono small" aria-hidden="true">FIN DE LA SÉLECTION</div>
                <h3 className="end-title">Voir tout<br /><em>le portfolio →</em></h3>
                <a href="#contact" className="btn btn-primary">Demander l'accès</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .projects {
          position: relative;
          background: var(--bg);
        }
        .projects-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .projects-head {
          padding-top: 80px;
          padding-bottom: 24px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 60px;
          align-items: end;
        }
        .projects-head-right {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: end;
        }
        .projects-title {
          font-size: clamp(32px, 3.8vw, 60px);
          font-weight: 500;
          line-height: 0.95;
        }
        .projects-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .projects-scroll-hint {
          color: var(--fg-2);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-align: right;
        }
        .hint-track {
          width: 200px;
          height: 1px;
          background: var(--line);
          margin-top: 10px;
          position: relative;
          overflow: hidden;
        }
        .hint-fill {
          height: 1px;
          background: var(--accent);
          transition: width 0.1s linear;
        }
        .projects-viewport {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .projects-track {
          display: flex;
          gap: 24px;
          padding: 0 32px 40px;
          height: 100%;
          align-items: stretch;
          will-change: transform;
        }
        .project-end {
          min-width: 540px;
          display: flex;
          align-items: center;
          padding: 0 60px;
        }
        .end-title {
          font-size: 56px;
          font-weight: 500;
          line-height: 0.95;
          margin: 16px 0 32px;
        }
        .end-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        @media (max-width: 1024px) {
          .projects-head {
            width: 100%;
            margin: 0;
            max-width: none;
            grid-template-columns: 1fr;
            gap: 20px;
            padding-left: 0;
            padding-right: 0;
          }
          .projects-head-right { grid-template-columns: 1fr; gap: 16px; }
          .projects-scroll-hint { text-align: left; }
          .projects-scroll-hint .hint-track { margin-top: 6px; }
          .projects-track { padding-left: 0; padding-right: 16px; }
        }
        @media (max-width: 900px) {
          .projects-track { gap: 16px; padding-bottom: 40px; }
          .project-end { min-width: 360px; padding: 0 24px; }
          .end-title { font-size: 36px; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ n, client, type, year, img, tag }) {
  const [hover, setHover] = _useState(false);
  return (
    <a
      href={`project.html?id=${n}`}
      data-page-link
      className={`project-card ${hover ? 'is-hover' : ''}`}
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="project-img">
        <img src={img} alt={client} loading="lazy" />
        <span className="project-tag">{tag}</span>
        <div className="project-overlay">
          <span className="view-btn">Voir le projet ↗︎</span>
        </div>
      </div>
      <div className="project-meta">
        <div className="project-meta-row">
          <span className="mono small">{n}</span>
          <span className="mono small">{year}</span>
        </div>
        <h3 className="project-client">{client}</h3>
        <p className="project-type">{type}</p>
      </div>

      <style>{`
        .project-card {
          flex-shrink: 0;
          width: 460px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          cursor: pointer;
          height: 100%;
          max-height: 620px;
          text-decoration: none;
          color: inherit;
        }
        .project-card:nth-child(even) {
          align-self: flex-end;
          transform: translateY(-4%);
        }
        .project-img {
          position: relative;
          flex: 1;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.6s var(--ease);
          background: #0f0f0f;
        }
        .project-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s var(--ease);
        }
        .project-card.is-hover .project-img img {
          transform: scale(1.04);
        }
        .project-tag {
          position: absolute;
          top: 14px; left: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          padding: 6px 10px;
          background: rgba(10,10,10,0.65);
          color: #f5f1ea;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          z-index: 2;
        }
        .project-card.is-hover .project-img {
          transform: scale(0.98);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.55);
          backdrop-filter: blur(6px);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s var(--ease);
        }
        .project-card.is-hover .project-overlay {
          opacity: 1;
        }
        .view-btn {
          padding: 14px 24px;
          background: var(--accent);
          color: var(--bg);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 100px;
          transform: translateY(10px);
          transition: transform 0.5s var(--ease) 0.1s;
        }
        .project-card.is-hover .view-btn { transform: translateY(0); }
        .project-meta {
          padding: 0 4px;
        }
        .project-meta-row {
          display: flex;
          justify-content: space-between;
          color: var(--fg-2);
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line);
        }
        .project-client {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
          transition: color 0.3s;
        }
        .project-card.is-hover .project-client { color: var(--accent); }
        .project-type {
          font-size: 14px;
          color: var(--fg-2);
        }
        .mono.small { font-size: 11px; }
        @media (max-width: 900px) {
          .project-card {
            width: 280px;
            max-height: none;
            height: auto;
            transform: none !important;
          }
          .project-card:nth-child(even) { align-self: stretch; transform: none; }
          .project-img { aspect-ratio: 4/5; flex: none; }
          .project-client { font-size: 22px; }
          .project-type { font-size: 13px; }
        }
      `}</style>
    </a>
  );
}

window.Projects = Projects;
