// Project detail page — reads ?id=XX from URL
const { useState: _prS, useEffect: _prE, useRef: _prR } = React;

function ProjectCursor() {
  const dot = _prR(null), ring = _prR(null);
  _prE(() => {
    let tx=0,ty=0,rx=0,ry=0;
    const onMove = (e) => { tx=e.clientX; ty=e.clientY; if (dot.current) dot.current.style.transform = `translate(${tx-4}px, ${ty-4}px)`; };
    const tick = () => {
      rx += (tx-rx)*0.15; ry += (ty-ry)*0.15;
      if (ring.current) ring.current.style.transform = `translate(${rx-18}px, ${ry-18}px)`;
      requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-cursor]');
      if (ring.current) ring.current.classList.toggle('is-hover', !!t);
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    const raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); cancelAnimationFrame(raf); };
  }, []);
  return (
    <React.Fragment>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </React.Fragment>
  );
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '01';
  return PROJECT_DATA[id] ? id : '01';
}

function getNextSlug(curr) {
  const i = PROJECT_ORDER.indexOf(curr);
  return PROJECT_ORDER[(i+1) % PROJECT_ORDER.length];
}

function ProjectPage() {
  useSmoothScroll();
  const slug = getSlug();
  const p = PROJECT_DATA[slug];
  const nextSlug = getNextSlug(slug);
  const next = PROJECT_DATA[nextSlug];
  const [mouse, setMouse] = _prS({ x:0, y:0 });

  _prE(() => {
    document.title = `${p.title} — Vision Glow`;
    const onMove = (e) => setMouse({ x: (e.clientX/window.innerWidth-0.5)*2, y: (e.clientY/window.innerHeight-0.5)*2 });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [slug]);

  _prE(() => {
    // Reveal on scroll
    const els = document.querySelectorAll('[data-reveal]');
    els.forEach(el => el.classList.remove('is-in'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  const title = p.title.replace(p.titleEm, `__EM__${p.titleEm}__EM__`);
  const titleParts = title.split('__EM__');

  return (
    <React.Fragment>
      <ProjectCursor />
      <PageTransition />

      <nav className="pr-nav">
        <a href="index.html" className="pr-nav-logo" data-page-link>Vision Glow</a>
        <a href="projects.html" data-page-link>← TOUS LES PROJETS</a>
      </nav>

      {/* HERO */}
      <header className="pr-hero">
        <div className="pr-hero-top">
          <span>VIS-{slug} / {p.category.toUpperCase()}</span>
          <span style={{textAlign:'center'}}>VISION GLOW STUDIO</span>
          <span style={{textAlign:'right'}}>{p.year}</span>
        </div>
        <h1 className="pr-hero-title" data-reveal>
          {titleParts.map((t,i) => i % 2 === 1
            ? <em key={i}>{t}</em>
            : <React.Fragment key={i}>{t}</React.Fragment>
          )}
        </h1>
        <div className="pr-hero-meta">
          <div className="pr-hero-meta-item">
            <span className="l">↳ CLIENT</span>
            <span className="v">{p.client}</span>
          </div>
          <div className="pr-hero-meta-item">
            <span className="l">↳ ANNÉE</span>
            <span className="v">{p.year}</span>
          </div>
          <div className="pr-hero-meta-item">
            <span className="l">↳ DURÉE</span>
            <span className="v">{p.duration}</span>
          </div>
          <div className="pr-hero-meta-item">
            <span className="l">↳ DOMAINE</span>
            <span className="v">{p.category}</span>
          </div>
        </div>
      </header>

      {/* FULL BLEED — single cover image */}
      <section className="pr-full pr-full-img" data-reveal>
        <img src={p.cover} alt={p.title} />
        <div className="pr-cap">FIG. 01 — VISUEL DE PRÉSENTATION</div>
      </section>

      {/* INTRO */}
      <section className="pr-intro">
        <aside className="pr-intro-side">
          <span className="l">↳ CONTEXTE</span>
          <span className="v">{p.client}</span>

          <span className="l">↳ ÉQUIPE</span>
          <span className="v list">{p.team.map((t,i) => <span key={i}>{t}</span>)}</span>

          <span className="l">↳ LIVRABLES</span>
          <span className="v list">{p.deliverables.map((d,i) => <span key={i}>— {d}</span>)}</span>
        </aside>
        <div className="pr-intro-body" data-reveal>
          {p.intro.map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="pr-quote" data-reveal>
        <span className="pr-quote-num">FIG. 02 — CITATION</span>
        <h2>« {p.quote.split(/\s+/).slice(0, -3).join(' ')} <em>{p.quote.split(/\s+/).slice(-3).join(' ')}</em> »</h2>
        <div className="pr-quote-cite">↳ <strong>{p.quoteAttr}</strong></div>
      </section>

      {/* RESULTS */}
      <section className="pr-results" data-reveal>
        <h3>↳ IMPACT MESURÉ</h3>
        <div className="pr-results-grid">
          {p.results.map((r, i) => (
            <div key={i} className="pr-results-stat">
              <span className="n">{r.n.includes('%') || r.n.startsWith('+') || r.n.startsWith('-') || r.n.startsWith('x') || r.n.startsWith('/')
                ? <React.Fragment><em>{r.n}</em></React.Fragment>
                : r.n}</span>
              <span className="l">{r.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NEXT */}
      <section className="pr-next">
        <div className="pr-next-label">↳ PROJET SUIVANT — VIS-{nextSlug}</div>
        <a href={`project.html?id=${nextSlug}`} className="next-link" data-cursor>
          {(() => {
            const t = next.title.replace(next.titleEm, `__EM__${next.titleEm}__EM__`).split('__EM__');
            return t.map((tx, i) => i % 2 === 1 ? <em key={i}>{tx}</em> : <React.Fragment key={i}>{tx}</React.Fragment>);
          })()}
          <span className="arrow">↗︎</span>
        </a>
        <div className="pr-next-meta">
          <a href="index.html" data-page-link>VISION GLOW — ACCUEIL</a>
          <a href="projects.html" data-page-link>TOUS LES PROJETS</a>
          <span>VISIONGLOW.CONTACT@GMAIL.COM</span>
        </div>
        <div className="pr-next-legal">
          <a href="mentions-legales.html">MENTIONS LÉGALES</a>
          <span aria-hidden="true">·</span>
          <a href="cgu.html">CGU</a>
          <span aria-hidden="true">·</span>
          <a href="politique-confidentialite.html">CONFIDENTIALITÉ</a>
        </div>
      </section>

      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(40px); transition: opacity .9s var(--ease), transform .9s var(--ease); }
        [data-reveal].is-in { opacity: 1; transform: translateY(0); }
        .pr-next-legal {
          display: flex; flex-wrap: wrap; justify-content: center; align-items: center;
          gap: 12px;
          margin-top: 20px; padding-top: 20px;
          border-top: 1px solid var(--line);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.1em;
          color: var(--fg-2);
        }
        .pr-next-legal a {
          color: var(--fg-2);
          border-bottom: 1px solid transparent;
          padding: 2px 0;
          transition: color .3s var(--ease), border-color .3s var(--ease);
        }
        .pr-next-legal a:hover { color: var(--accent); border-bottom-color: var(--accent); }
      `}</style>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<ProjectPage />);
