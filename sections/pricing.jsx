// Pricing — three plans, hover reveal
function Pricing() {
  const plans = [
    {
      n: "01",
      name: "SEED",
      price: "3 500€",
      period: "HT / one-shot",
      tag: "7 jours · 4–5 sem.",
      desc: "Cadrer un module ou préparer une démo investisseur.",
      includes: [
        "Cadrage du problème",
        "Plans d'interface (wireframes)",
        "4 à 6 écrans finaux haute fidélité",
        "Base du système de design",
        "Fichier Figma livré et annoté",
      ],
      cta: "Démarrer avec SEED",
    },
    {
      n: "02",
      name: "GROW",
      price: "5 000€",
      period: "HT / mois",
      prefix: "Minimum 3 mois · 12 jours / mois",
      tag: "Le plus choisi",
      featured: true,
      desc: "Produit existant, itération continue avec PM.",
      includes: [
        "Disponible Slack en asynchrone",
        "Participation aux sprints",
        "Fonctionnalités designées chaque mois",
        "Specs prêtes à implémenter",
        "Corrections post-intégration",
        "Point hebdo 30 min",
      ],
      cta: "Démarrer GROW",
    },
    {
      n: "03",
      name: "SCALE",
      price: "8 000€",
      period: "HT / mois",
      prefix: "Minimum 4 mois · 16 jours / mois",
      tag: "Quasi in-house",
      desc: "Scale-up qui veut un product designer quasi interne.",
      includes: [
        "Tout ce qui est dans GROW",
        "Système de design complet",
        "Interviews utilisateurs mensuelles",
        "Contribution à la roadmap",
        "Présence physique Paris & 77",
      ],
      cta: "Démarrer SCALE",
    },
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing-head">
          <Reveal>
            <span className="section-label" aria-hidden="true">06 — Pricing</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="pricing-title">
              Des tarifs lisibles.<br />
              <em>Pas de surprises.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="pricing-intro">
              Trois offres. Vous choisissez selon votre étape. Engagement
              clair, livrables concrets.
            </p>
          </Reveal>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <PlanCard key={i} {...p} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="pricing-note">
            Tarifs adaptés selon la complexité du produit et le volume mensuel.
            Estimation gratuite en 48h.
          </p>
        </Reveal>
      </div>

      <style>{`
        .pricing { padding: 120px 0 100px; background: var(--bg); position: relative; }
        .pricing-head {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 80px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--line);
        }
        .pricing-intro {
          max-width: 520px;
        }
        .pricing-title {
          font-size: clamp(28px, 5vw, 80px);
          font-weight: 500;
          line-height: 0.95;
        }
        .pricing-title em {
          font-family: 'Clash Display', serif;
          font-style: italic;
          font-weight: 400;
          color: var(--accent);
        }
        .pricing-intro {
          font-size: 15px;
          color: var(--fg-2);
          line-height: 1.5;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .pricing-note {
          margin-top: 48px;
          margin-left: auto;
          margin-right: auto;
          font-family: 'Satoshi', sans-serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.45);
          text-align: center;
          max-width: 560px;
        }
        .pricing-sprint {
          margin-top: 56px;
          font-size: 15px;
          line-height: 1.55;
          color: var(--fg-2);
          max-width: 760px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
        }
        .pricing-sprint strong { color: var(--fg); font-weight: 500; }
        .pricing-sprint-link {
          color: var(--accent);
          border-bottom: 1px solid currentColor;
          padding-bottom: 1px;
          transition: opacity 0.3s var(--ease);
        }
        .pricing-sprint-link:hover { opacity: 0.7; }
        @media (max-width: 1024px) {
          .pricing-head { grid-template-columns: 1fr; gap: 24px; align-items: start; }
          .pricing-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .plan.is-featured { transform: none; }
          .plan.is-hover, .plan.is-featured.is-hover { transform: none; }
          .plan { padding: 28px 24px; }
          .plan-name { font-size: 32px; }
          .price-amt { font-size: 42px; }
          .pricing-sprint { font-size: 14px; margin-top: 32px; }
          .pricing-note { margin-top: 32px; font-size: 12px; }
        }
      `}</style>
    </section>
  );
}

function PlanCard({ n, name, price, period, prefix, tag, desc, includes, cta, featured }) {
  const [hover, setHover] = _useState(false);
  return (
    <Reveal
      className={`plan ${featured ? 'is-featured' : ''} ${hover ? 'is-hover' : ''}`}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="plan-top" aria-hidden="true">
          <div className="plan-n mono">{n}</div>
          <div className="plan-tag mono">{tag}</div>
        </div>
        <h3 className="plan-name">{name}</h3>
        {prefix && <div className="price-prefix mono">{prefix}</div>}
        <div className="plan-price">
          <span className="price-amt">{price}</span>
          <span className="price-period">{period}</span>
        </div>
        <p className="plan-desc">{desc}</p>
        <ul className="plan-list">
          {includes.map((item, i) => (
            <li key={i}>
              <span className="plus">+</span>
              {item}
            </li>
          ))}
        </ul>
        <a href="#contact" className={`btn ${featured ? 'btn-primary' : 'btn-ghost'} plan-cta`}>
          {cta}
          <svg className="arrow" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
      </div>

      <style>{`
        .plan {
          background: var(--bg-2);
          padding: 36px 32px;
          border-radius: 4px;
          border: 1px solid var(--line);
          transition: background 0.4s var(--ease), border-color 0.4s var(--ease), transform 0.4s var(--ease);
          cursor: pointer;
        }
        .plan.is-featured {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
          transform: translateY(-20px);
        }
        .plan.is-hover { transform: translateY(-26px); }
        .plan.is-featured.is-hover { transform: translateY(-32px); }
        .plan-top {
          display: flex;
          justify-content: space-between;
          color: var(--fg-2);
          margin-bottom: 28px;
        }
        .plan.is-featured .plan-top { color: rgba(10,10,10,0.7); }
        .plan-tag {
          font-size: 10px;
          padding: 4px 10px;
          border: 1px solid currentColor;
          border-radius: 100px;
        }
        .plan-name {
          font-size: 42px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 16px;
        }
        .price-prefix {
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--fg-2);
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .plan.is-featured .price-prefix { color: rgba(10,10,10,0.7); }
        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
        }
        .plan.is-featured .plan-price { border-color: rgba(10,10,10,0.15); }
        .price-amt {
          font-family: 'Clash Display', sans-serif;
          font-size: 56px;
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .price-period {
          font-size: 15px;
          color: var(--fg-2);
        }
        .plan.is-featured .price-period { color: rgba(10,10,10,0.7); }
        .plan-desc {
          font-size: 15px;
          line-height: 1.45;
          margin-bottom: 24px;
          color: var(--fg-2);
        }
        .plan.is-featured .plan-desc { color: rgba(10,10,10,0.8); }
        .plan-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
          flex: 1;
        }
        .plan-list li {
          font-size: 14px;
          line-height: 1.4;
          display: flex;
          gap: 12px;
          align-items: baseline;
        }
        .plus {
          color: var(--accent);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
        }
        .plan.is-featured .plus { color: var(--bg); font-weight: 700; }
        .plan-cta {
          width: 100%;
          justify-content: center;
        }
        .plan.is-featured .plan-cta {
          background: var(--bg) !important;
          color: var(--fg) !important;
        }
        .plan.is-featured .plan-cta::before {
          background: var(--fg) !important;
        }
        .plan.is-featured .plan-cta:hover {
          color: var(--bg) !important;
        }
      `}</style>
    </Reveal>
  );
}

window.Pricing = Pricing;
