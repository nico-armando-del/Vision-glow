// FAQ — accordion with smooth animation
function FAQ() {
  const items = [
    {
      q: "On n'a pas encore de design system. Est-ce un problème ?",
      a: "Non. C'est souvent notre point de départ. On construit le design system avec vous, en partant de ce qui existe — même si c'est peu.",
    },
    {
      q: "On a déjà un designer en interne. Pouvez-vous travailler avec lui ?",
      a: "Oui. On travaille souvent en complément d'un designer junior ou d'un dev qui fait du design. On prend en charge la direction et la cohérence, votre équipe garde la main sur l'exécution quotidienne.",
    },
    {
      q: "Quelle est la différence entre GROW et SCALE ?",
      a: "GROW, c'est pour un produit existant qu'on améliore en continu. SCALE, c'est pour construire ou refondre un produit dans son intégralité : design system complet, toute l'app, accompagnement dev direct, tests utilisateurs mensuels inclus.",
    },
    {
      q: "Peut-on commencer par SEED et passer ensuite à GROW ou SCALE ?",
      a: "Oui, et c'est souvent le bon chemin. SEED permet de valider la direction avant de s'engager sur la durée. Si on travaille bien ensemble, la transition se fait naturellement.",
    },
    {
      q: "Comment se passe le handoff avec nos développeurs ?",
      a: "On livre des fichiers Figma structurés avec design tokens, specs et annotations. On peut aussi faire un point de passation directement avec votre équipe technique si besoin. Objectif : zéro zone grise à l'intégration.",
    },
    {
      q: "Combien de temps avant de voir les premiers résultats ?",
      a: "Sur SEED, vous avez un prototype cliquable en 4 semaines. Sur GROW et SCALE, les premières livrables UI arrivent dès le premier mois, après la phase de discovery.",
    },
  ];
  const [open, setOpen] = _useState(0);

  return (
    <section className="faq" id="faq">
      <div className="container faq-inner">
        <div className="faq-left">
          <Reveal>
            <span className="section-label" aria-hidden="true">07 — FAQ</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="faq-title">
              Vos<br /><em>questions.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="faq-sub">
              Pas trouvé la réponse ? Écrivez-nous, on répond en moins de 4 heures.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="mailto:visionglow.contact@gmail.com" className="btn btn-ghost faq-cta">
              visionglow.contact@gmail.com
            </a>
          </Reveal>
        </div>

        <div className="faq-right">
          {items.map((it, i) => (
            <FAQItem
              key={i}
              q={it.q}
              a={it.a}
              n={String(i + 1).padStart(2, '0')}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .faq {
          padding: 120px 0 100px;
          background: var(--bg);
        }
        .faq-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 100px;
        }
        .faq-title {
          font-size: clamp(48px, 7vw, 120px);
          font-weight: 500;
          line-height: 0.9;
          margin: 24px 0 32px;
        }
        .faq-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .faq-sub {
          font-size: 16px;
          color: var(--fg-2);
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .faq-cta { width: fit-content; }
        .faq-right { border-top: 1px solid var(--line); }
        @media (max-width: 900px) {
          .faq { padding: 80px 0 60px; }
          .faq-inner { grid-template-columns: 1fr; gap: 32px; }
          .faq-title { font-size: clamp(40px, 12vw, 72px); }
          .faq-q { grid-template-columns: 40px 1fr 24px; gap: 12px; padding: 20px 0; }
          .faq-q-text { font-size: 18px; }
          .faq-a { padding: 0 0 24px 52px; font-size: 14px; }
        }
      `}</style>
    </section>
  );
}

function FAQItem({ q, a, n, isOpen, onClick }) {
  return (
    <div
      data-reveal
      className={`faq-item ${isOpen ? 'is-open' : ''}`}
    >
      <button onClick={onClick} className="faq-q">
        <span className="mono faq-n" aria-hidden="true">{n}</span>
        <span className="faq-q-text">{q}</span>
        <span className="faq-toggle" aria-hidden="true">
          <span className="bar bar-h" />
          <span className="bar bar-v" />
        </span>
      </button>
      <div className="faq-a-wrap">
        <p className="faq-a">{a}</p>
      </div>

      <style>{`
        .faq-item {
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .faq-q {
          width: 100%;
          display: grid;
          grid-template-columns: 60px 1fr 40px;
          gap: 24px;
          align-items: center;
          padding: 28px 0;
          text-align: left;
          color: var(--fg);
          transition: color 0.3s var(--ease), padding 0.4s var(--ease);
        }
        .faq-q:hover { color: var(--accent); padding-left: 8px; }
        .faq-item.is-open .faq-q { color: var(--accent); }
        .faq-n {
          color: var(--fg-2);
          font-size: 11px;
        }
        .faq-q-text {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.1;
        }
        .faq-toggle {
          position: relative;
          width: 18px;
          height: 18px;
          justify-self: end;
        }
        .bar {
          position: absolute;
          background: currentColor;
          left: 50%;
          top: 50%;
          transition: transform 0.5s var(--ease);
        }
        .bar-h {
          width: 18px;
          height: 1.5px;
          transform: translate(-50%, -50%);
        }
        .bar-v {
          width: 1.5px;
          height: 18px;
          transform: translate(-50%, -50%);
        }
        .faq-item.is-open .bar-v { transform: translate(-50%, -50%) rotate(90deg) scaleX(0); }
        .faq-a-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s var(--ease);
        }
        .faq-item.is-open .faq-a-wrap { max-height: 300px; }
        .faq-a {
          padding: 0 64px 32px;
          font-size: 16px;
          line-height: 1.6;
          color: var(--fg-2);
          max-width: 720px;
        }
      `}</style>
    </div>
  );
}

window.FAQ = FAQ;
