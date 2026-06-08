// Clients / Testimonials — marquee logos + testimonials with reveal
function Clients() {
  const logos = [
    "PACKLER", "HOMY EXPERT", "ANTHEA LOUNGE", "N DANCE CENTER", "BRÛLE JOUR",
    "SABLE", "DENTECLAIR", "WRITE OR DIE", "PAWW", "SG",
  ];

  const testimonials = [
    {
      quote: "On avait une idée précise mais aucun design. Vision Glow a transformé Packler en une app que les gens téléchargent sans qu'on ait à expliquer. Les conversions ont doublé.",
      author: "Antoine Vasseur",
      role: "Co-fondateur, Packler",
      tex: "tex-7",
    },
    {
      quote: "L'assurance, c'est complexe. Vision Glow a réussi à rendre HomyExpert lisible, rassurant, presque évident. C'est rare sur un sujet aussi technique.",
      author: "Romain Delcourt",
      role: "Fondateur, Homy Expert",
      tex: "tex-5",
    },
    {
      quote: "Je voulais un univers, pas un site. Vision Glow a saisi l'ambiance d'Anthea Lounge dès le premier call et l'a traduite mieux que je n'aurais pu l'expliquer.",
      author: "Anthéa Paulmier",
      role: "Fondatrice, Anthea Lounge",
      tex: "tex-1",
    },
  ];

  return (
    <section className="clients" id="clients">
      {/* Marquee logos */}
      <div className="clients-marquee-wrap">
        <div className="marquee">
          <div className="marquee-track">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="marquee-logo">
                <span className="ml-dot">◆</span>
                {l}
              </span>
            ))}
          </div>
          <div className="marquee-track" aria-hidden="true">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="marquee-logo">
                <span className="ml-dot">◆</span>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container clients-inner">
        <div className="clients-head">
          <Reveal>
            <span className="section-label" aria-hidden="true">05 — Clients</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="clients-title">
              Ils nous font<br /><em>confiance.</em>
            </h2>
          </Reveal>
        </div>

        <div className="testimonials">
          {testimonials.map((t, i) => (
            <Testimonial key={i} {...t} idx={i} />
          ))}
        </div>
      </div>

      {/* Marquee reverse */}
      <div className="clients-marquee-wrap bottom">
        <div className="marquee" data-reverse>
          <div className="marquee-track">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="marquee-logo accent">
                {l}
                <span className="ml-dot">●</span>
              </span>
            ))}
          </div>
          <div className="marquee-track" aria-hidden="true">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="marquee-logo accent">
                {l}
                <span className="ml-dot">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .clients {
          background: var(--bg);
          padding: 100px 0 60px;
          position: relative;
          overflow: hidden;
        }
        .clients-marquee-wrap {
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 28px 0;
          margin-bottom: 100px;
        }
        .clients-marquee-wrap.bottom {
          margin-top: 100px;
          margin-bottom: 0;
        }
        .marquee-logo {
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          font-size: clamp(28px, 4vw, 56px);
          letter-spacing: -0.02em;
          color: var(--fg);
          display: inline-flex;
          align-items: center;
          gap: 32px;
        }
        .marquee-logo.accent {
          color: transparent;
          -webkit-text-stroke: 1px var(--fg);
        }
        .marquee-logo:hover {
          color: var(--accent);
        }
        .marquee-logo.accent:hover {
          color: var(--accent);
          -webkit-text-stroke-color: var(--accent);
        }
        .ml-dot {
          color: var(--accent);
          font-size: 0.5em;
        }
        .clients-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 80px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--line);
        }
        .clients-title {
          font-size: clamp(36px, 5vw, 80px);
          font-weight: 500;
          line-height: 0.95;
        }
        .clients-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .testimonials {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        @media (max-width: 900px) {
          .testimonials { grid-template-columns: 1fr; }
          .clients-head { flex-direction: column; align-items: start; gap: 16px; }
        }
      `}</style>
    </section>
  );
}

function Testimonial({ quote, author, role, tex, idx }) {
  const [hover, setHover] = _useState(false);
  return (
    <Reveal
      delay={idx * 0.1}
      className={`testimonial ${hover ? 'is-hover' : ''}`}
      data-cursor
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div className={`t-img tex-card ${tex}`}>
          <span className="label" aria-hidden="true">CLI-{String(idx + 1).padStart(2, '0')}</span>
        </div>
        <blockquote className="t-quote">"{quote}"</blockquote>
        <div className="t-author">
          <div className="t-author-name">{author}</div>
          <div className="t-author-role mono">{role}</div>
        </div>
      </div>
      <style>{`
        .testimonial {
          background: var(--bg-2);
          padding: 0;
          border-radius: 4px;
          overflow: hidden;
          transition: background 0.4s var(--ease), transform 0.4s var(--ease);
          cursor: pointer;
        }
        .testimonial.is-hover {
          background: var(--bg-3);
          transform: translateY(-6px);
        }
        .t-img {
          height: 260px;
          width: 100%;
          transition: filter 0.5s var(--ease);
        }
        .testimonial.is-hover .t-img { filter: saturate(1.3) contrast(1.1); }
        .t-quote {
          font-family: 'Clash Display', sans-serif;
          font-size: 22px;
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: -0.01em;
          padding: 32px 28px 24px;
          flex: 1;
        }
        .t-author {
          padding: 0 28px 28px;
          border-top: 1px solid var(--line);
          margin: 0 28px;
          padding-top: 20px;
        }
        .t-author-name {
          font-weight: 500;
          font-size: 15px;
          margin-bottom: 2px;
        }
        .t-author-role {
          font-size: 11px;
          color: var(--fg-2);
          letter-spacing: 0.05em;
        }
      `}</style>
    </Reveal>
  );
}

window.Clients = Clients;
