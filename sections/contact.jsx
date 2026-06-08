// Contact / Footer — giant text, form, footer
function Contact() {
  const ref = _useRef(null);
  const progress = useScrollProgress(ref, { start: window.innerHeight, end: -window.innerHeight * 0.3 });
  const [form, setForm] = _useState({ name: '', email: '', project: '', budget: '' });
  const [sent, setSent] = _useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Nouveau brief — ${form.name || 'Sans nom'}`;
    const body = [
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      `Budget envisagé : ${form.budget || 'Non précisé'}`,
      '',
      'Le projet :',
      form.project,
      '',
      '—',
      'Envoyé depuis visionglow.studio',
    ].join('\n');
    const mailto = `mailto:visionglow.contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section ref={ref} className="contact" id="contact">
      <div className="contact-giant" aria-hidden="true">
        <div
          className="contact-giant-line"
          style={{ transform: `translateX(${-progress * 120 + 60}px)` }}
        >
          PARLONS&nbsp;DE
        </div>
        <div
          className="contact-giant-line italic"
          style={{ transform: `translateX(${progress * 120 - 60}px)` }}
        >
          <em>votre produit.</em>
        </div>
      </div>

      <div className="container contact-inner">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <span className="section-label" aria-hidden="true">08 — Contact</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="contact-h">
                Votre produit a du potentiel.<br />
                <em>Le design ne devrait pas le brider.</em>
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="contact-channels">
                <ContactRow
                  label="Email"
                  value="visionglow.contact@gmail.com"
                  href="mailto:visionglow.contact@gmail.com"
                />
                <ContactRow
                  label="Téléphone"
                  value="+33 6 45 04 92 27"
                  href="tel:+33645049227"
                />
                <ContactRow
                  label="Rendez-vous"
                  value="Réserver 30 min"
                  href="https://cal.com/nico-armando-bertone/30min"
                />
                <ContactRow
                  label="Studio"
                  value="Paris · 77"
                  href="#"
                />
                <ContactRow
                  label="Réseaux"
                  value="Instagram"
                  href="https://www.instagram.com/vision_glow_agency?igsh=MTVwaGMzbnF1c3F6MA%3D%3D&utm_source=qr"
                />
              </div>
            </Reveal>
          </div>

          <div className="contact-right">
            <form className={`contact-form ${sent ? 'is-sent' : ''}`} onSubmit={onSubmit}>
              <div className="form-row">
                <label htmlFor="f-name">
                  <span className="form-label mono" aria-hidden="true">01 — Nom</span>
                  <span className="sr-only">Nom</span>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Comment vous appelle-t-on ?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="f-email">
                  <span className="form-label mono" aria-hidden="true">02 — Email</span>
                  <span className="sr-only">Email</span>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
              </div>
              <div className="form-row">
                <label htmlFor="f-project">
                  <span className="form-label mono" aria-hidden="true">03 — Le projet</span>
                  <span className="sr-only">Description du projet</span>
                  <textarea
                    id="f-project"
                    name="project"
                    rows={4}
                    required
                    placeholder="Quelques mots sur votre produit et vos enjeux..."
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                  />
                </label>
              </div>
              <div className="form-row">
                <span className="form-label mono" aria-hidden="true">04 — Budget envisagé</span>
                <div className="budget-chips">
                  {["SEED 3 500€", "GROW 5 000€/mois", "SCALE 8 000€/mois", "À définir"].map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`budget-chip ${form.budget === b ? 'is-active' : ''}`}
                      onClick={() => setForm({ ...form, budget: b })}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary contact-submit">
                {sent ? 'Reçu — réponse sous 4h ✓' : 'Envoyer le brief'}
                {!sent && (
                  <svg className="arrow" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .contact {
          padding: 140px 0 0;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .contact-giant {
          font-family: 'Clash Display', sans-serif;
          font-weight: 500;
          font-size: clamp(64px, 13vw, 220px);
          line-height: 0.88;
          letter-spacing: -0.04em;
          margin-bottom: 80px;
          color: var(--fg);
          overflow: hidden;
          white-space: nowrap;
          padding: 0 32px;
        }
        .contact-giant-line.italic em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          padding-bottom: 120px;
          border-bottom: 1px solid var(--line);
        }
        .contact-h {
          font-size: clamp(28px, 3.4vw, 52px);
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1;
          margin: 20px 0 40px;
        }
        .contact-h em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid var(--line);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-row {
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
        }
        .form-label {
          display: block;
          color: var(--fg-2);
          font-size: 11px;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          background: transparent;
          border: none;
          color: var(--fg);
          font-family: 'Satoshi', sans-serif;
          font-size: 22px;
          padding: 4px 0;
          outline: none;
          resize: none;
        }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: var(--fg-3);
        }
        .budget-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .budget-chip {
          padding: 10px 18px;
          border: 1px solid var(--line);
          border-radius: 100px;
          color: var(--fg-2);
          font-size: 13px;
          transition: all 0.3s var(--ease);
        }
        .budget-chip:hover { border-color: var(--fg); color: var(--fg); }
        .budget-chip.is-active {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
        }
        .contact-submit {
          margin-top: 32px;
          align-self: flex-start;
        }
        .contact-form.is-sent .contact-submit { background: #1F8A5B; }
        @media (max-width: 900px) {
          .contact { padding: 80px 0 0; }
          .contact-giant { font-size: clamp(40px, 9vw, 72px); margin-bottom: 40px; padding: 0; white-space: normal; }
          .contact-giant-line { transform: none !important; }
          .contact-grid { grid-template-columns: 1fr; gap: 40px; padding-bottom: 60px; }
          .contact-h { font-size: clamp(26px, 7vw, 40px); }
          .contact-form input, .contact-form textarea { font-size: 18px; }
          .contact-row { grid-template-columns: 80px 1fr; gap: 12px; }
          .cr-value { font-size: 16px; }
          .footer-mega-text { font-size: clamp(36px, 13vw, 88px); }
          .footer-bottom { grid-template-columns: 1fr; }
          .fb-col.center, .fb-col.right { text-align: left; }
        }
      `}</style>
    </section>
  );
}

function ContactRow({ label, value, href }) {
  const [hover, setHover] = _useState(false);
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="contact-row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="mono cr-label">{label}</span>
      <span className="cr-value">
        {value}
        <span className="cr-arrow">↗︎</span>
      </span>
      <style>{`
        .contact-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 1px solid var(--line);
          align-items: center;
          transition: padding 0.4s var(--ease);
        }
        .contact-row:hover { padding-left: 12px; }
        .cr-label {
          color: var(--fg-2);
          font-size: 11px;
          letter-spacing: 0.08em;
        }
        .cr-value {
          font-family: 'Clash Display', sans-serif;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: color 0.3s;
        }
        .contact-row:hover .cr-value { color: var(--accent); }
        .cr-arrow {
          display: inline-block;
          transition: transform 0.5s var(--ease);
        }
        .contact-row:hover .cr-arrow { transform: translate(4px, -4px); }
      `}</style>
    </a>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mega">
        <div className="footer-mega-text">VISION GLOW</div>
      </div>
      <div className="container footer-bottom">
        <div className="fb-col">
          <div className="mono small">
            © 2026 — <strong>Vision Glow Studio</strong> · Dirigé par Nico-Armando Bertone ·{' '}
            <a href="mailto:visionglow.contact@gmail.com">visionglow.contact@gmail.com</a>
          </div>
        </div>
        <div className="fb-col center">
          <div className="mono small">
            <span className="live-dot" /> Disponible Q3 / Q4 2026
          </div>
        </div>
        <div className="fb-col right">
          <div className="mono small">
            Studio design externalisé · Paris 75010 · Design · Dev · Community
          </div>
        </div>
      </div>
      <div className="container footer-legal">
        <a href="mentions-legales.html">Mentions Légales</a>
        <span className="sep" aria-hidden="true">·</span>
        <a href="cgu.html">CGU</a>
        <span className="sep" aria-hidden="true">·</span>
        <a href="politique-confidentialite.html">Politique de Confidentialité</a>
        <span className="sep" aria-hidden="true">·</span>
        <a href="#contact">Contact</a>
      </div>

      <style>{`
        .footer {
          padding-top: 80px;
          background: var(--bg);
          position: relative;
        }
        .footer-mega {
          padding: 0 32px;
          overflow: hidden;
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
        }
        .footer-mega-text {
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: clamp(60px, 14.5vw, 240px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: var(--accent);
          text-align: center;
          white-space: nowrap;
        }
        .footer-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          padding-top: 24px;
          padding-bottom: 32px;
          border-top: 1px solid var(--line);
        }
        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          padding: 18px 32px 32px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-2);
          border-top: 1px solid var(--line);
          margin: 0 auto;
        }
        .footer-legal a {
          color: var(--fg-2);
          padding: 4px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
        }
        .footer-legal a:hover {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .footer-legal .sep {
          color: var(--fg-3);
        }
        .fb-col.center { text-align: center; }
        .fb-col.right { text-align: right; }
        .live-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          margin-right: 6px;
          animation: pulse 2s ease-in-out infinite;
          vertical-align: middle;
        }
        .small { font-size: 11px; }
        @media (max-width: 900px) {
          .footer-bottom { grid-template-columns: 1fr; }
          .fb-col.center, .fb-col.right { text-align: left; }
          .footer-mega { padding: 0; }
        }
      `}</style>
    </footer>
  );
}

window.Contact = Contact;
window.Footer = Footer;
