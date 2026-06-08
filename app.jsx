// Main app — Vision Glow

function App() {
  useSmoothScroll();
  useGlobalReveal();
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "#FF4D1F",
    "animSpeed": 1,
    "showCursor": true
  }/*EDITMODE-END*/);

  _useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    const dur = 0.6 / Math.max(0.3, t.animSpeed);
    document.documentElement.style.setProperty('--duration', `${dur}s`);
  }, [t]);

  return (
    <React.Fragment>
      <PageTransition />
      <div className="grain" />
      {t.showCursor && <Cursor />}
      <Nav />
      <Hero />
      <Manifesto />
      <Services />
      <Projects />
      <Process />
      <Clients />
      <Pricing />
      <FAQ />
      <Contact />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Apparence">
          <TweakColor
            label="Accent"
            value={t.accent}
            onChange={(v) => setTweak('accent', v)}
            options={['#FF4D1F', '#CCFF00', '#5B6CFF', '#E8E4D9', '#FF3D8B']}
          />
        </TweakSection>
        <TweakSection label="Animations">
          <TweakSlider
            label="Vitesse"
            value={t.animSpeed}
            min={0.5}
            max={2}
            step={0.1}
            unit="x"
            onChange={(v) => setTweak('animSpeed', v)}
          />
          <TweakToggle
            label="Curseur custom"
            value={t.showCursor}
            onChange={(v) => setTweak('showCursor', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

function Nav() {
  const [scrolled, setScrolled] = _useState(false);
  const [open, setOpen] = _useState(false);
  _useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  _useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);
  const links = [
    { href: '#services', label: 'Services' },
    { href: 'projects.html', label: 'Projets', external: true },
    { href: '#process', label: 'Process' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
        <a href="#hero" className="nav-logo" onClick={close}>
          <span className="dot" />
          Vision Glow
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { 'data-page-link': true } : {})}>
              {l.label}{l.external ? ' ↗︎' : ''}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav-cta">Démarrer un projet ↗︎</a>
        <button
          className={`nav-burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen(!open)}
        >
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      <div className={`mnav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mnav-inner">
          <div className="mnav-meta mono">MENU — {new Date().getFullYear()}</div>
          <ul className="mnav-list">
            {links.map((l, i) => (
              <li key={l.label} style={{ transitionDelay: `${0.05 + i * 0.05}s` }}>
                <a
                  href={l.href}
                  onClick={close}
                  {...(l.external ? { 'data-page-link': true } : {})}
                >
                  <span className="mnav-n mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mnav-t">{l.label}</span>
                  <span className="mnav-arrow">↗︎</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn btn-primary mnav-cta"
            onClick={close}
            style={{ transitionDelay: `${0.05 + links.length * 0.05}s` }}
          >
            Démarrer un projet
            <svg className="arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
          <div className="mnav-foot mono">
            <a href="mailto:visionglow.contact@gmail.com" onClick={close}>visionglow.contact@gmail.com</a>
            <span>· · ·</span>
            <a href="tel:+33645049227" onClick={close}>+33 6 45 04 92 27</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
