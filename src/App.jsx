import { useEffect, useRef, useState } from "react";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const shots = [
  ["WhatsApp Image 2026-07-11 at 11.01.48 AM.jpeg", "A complete daily horoscope, written for your sign."],
  ["WhatsApp Image 2026-07-11 at 11.02.02 AM.jpeg", "Your energy for love, career, health, and money."],
  ["WhatsApp Image 2026-07-11 at 11.02.17 AM.jpeg", "See the chemistry between any two zodiac signs."],
  ["WhatsApp Image 2026-07-11 at 11.02.35 AM.jpeg", "Explore the days, weeks, and months ahead."],
  ["WhatsApp Image 2026-07-11 at 11.02.57 AM.jpeg", "Unlock a deeper, distraction-free experience."],
];

const pageCopy = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "Your privacy matters to us. This policy explains what AstroDaily may collect, why it is used, and the choices available to you.",
    sections: [
      ["Information we collect", "AstroDaily may collect information you provide, such as your name, date of birth, zodiac preferences, and messages sent to support. We may also receive basic device, app performance, and usage information."],
      ["How we use information", "We use information to personalize readings, provide compatibility and calendar features, improve app reliability, respond to support requests, and protect the service from misuse."],
      ["Sharing and service providers", "We do not sell your personal information. Limited information may be processed by trusted service providers that help us operate, analyze, secure, or support AstroDaily, subject to appropriate safeguards."],
      ["Data retention and security", "We keep information only for as long as needed for the purposes described here or to meet legal obligations. We use reasonable administrative and technical measures to protect it."],
      ["Your choices", "You may update app profile details, limit device permissions, or contact us to request access, correction, or deletion where applicable. Some data may be retained when required by law."],
      ["Children’s privacy", "AstroDaily is not directed to children under 13, and we do not knowingly collect personal information from children under 13."],
      ["Changes to this policy", "We may update this policy as the app evolves. Material changes will be reflected here with a revised effective date."],
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    intro: "These terms govern your use of AstroDaily. By using the app or website, you agree to these terms.",
    sections: [
      ["Using AstroDaily", "You may use AstroDaily for personal, non-commercial purposes in accordance with these terms and applicable laws. You are responsible for the information you provide and for keeping your device secure."],
      ["Entertainment purpose", "Astrology readings, compatibility scores, forecasts, and related content are provided for entertainment and general reflection only. They are not medical, legal, financial, psychological, or other professional advice."],
      ["Subscriptions and purchases", "Premium features may require a paid subscription or in-app purchase. Prices, billing periods, renewals, trials, cancellations, and refunds are handled through the app store shown at purchase and are subject to that store’s terms."],
      ["Acceptable use", "You may not misuse, disrupt, reverse engineer, copy, resell, or attempt unauthorized access to AstroDaily, its content, or related systems."],
      ["Intellectual property", "AstroDaily, its visual identity, original content, and software are owned by or licensed to us and are protected by applicable intellectual property laws."],
      ["Availability and disclaimers", "We work to keep AstroDaily available and accurate, but the service is provided as available without guarantees that it will always be uninterrupted, error-free, or suitable for a particular purpose."],
      ["Limitation of liability", "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, or consequential losses arising from your use of, or inability to use, AstroDaily."],
      ["Changes", "We may update the service or these terms. Continued use after an update means you accept the revised terms."],
    ],
  },
};

function Header({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const go = (page) => { setOpen(false); onNavigate(page); };
  return <header className="site-header">
    <button className="brand" onClick={() => go("home")} aria-label="AstroDaily home">
      <img src={asset("astrodaily-logo.png")} alt="" /><span>AstroDaily</span>
    </button>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open navigation"><span></span><span></span></button>
    <nav className={open ? "open" : ""}>
      <button onClick={() => go("home")}>Home</button>
      <button onClick={() => { go("home"); setTimeout(() => document.getElementById("features")?.scrollIntoView({behavior:"smooth"}), 20); }}>Features</button>
      <button onClick={() => go("support")}>Support</button>
      <button className="nav-cta" onClick={() => { go("home"); setTimeout(() => document.getElementById("download")?.scrollIntoView({behavior:"smooth"}), 20); }}>Get the app</button>
    </nav>
  </header>;
}

function Footer({ onNavigate }) {
  return <footer>
    <div className="footer-brand"><img src={asset("astrodaily-logo.png")} alt="" /><div><strong>AstroDaily</strong><span>Your day, written in the stars.</span></div></div>
    <div className="footer-links"><button onClick={() => onNavigate("privacy")}>Privacy</button><button onClick={() => onNavigate("terms")}>Terms</button><button onClick={() => onNavigate("support")}>Support</button></div>
    <p>© 2026 AstroDaily. For entertainment purposes only.</p>
  </footer>;
}

function Home({ onNavigate }) {
  const [active, setActive] = useState(0);
  return <>
    <main>
      <section className="hero">
        <div className="hero-orbit" aria-hidden="true"><img src={asset("astrodaily-logo.png")} alt="" /></div>
        <div className="hero-copy">
          <div className="eyebrow"><span>✦</span> Personal astrology, every day</div>
          <h1>Your day, written<br/>in the <em>stars.</em></h1>
          <p>Personalized horoscopes, meaningful compatibility, and cosmic guidance—beautifully designed for your everyday life.</p>
          <div className="hero-actions"><a className="primary" href="#download">Discover AstroDaily</a><a className="secondary" href="#experience">Explore the app</a></div>
          <div className="trust-row"><span>✦ Daily guidance</span><span>✦ 12 zodiac signs</span><span>✦ Private by design</span></div>
        </div>
        <div className="hero-phone">
          <div className="phone-glow"></div>
          <div className="phone"><img src={asset(shots[0][0])} alt="AstroDaily daily horoscope screen" /></div>
          <span className="float-card card-one">Today’s energy <b>88%</b></span><span className="float-card card-two">Lucky number <b>44</b></span>
        </div>
      </section>

      <section className="intro" id="features"><div className="section-label">A universe in your pocket</div><h2>Guidance that feels<br/><em>made for you.</em></h2><p>AstroDaily brings the wisdom of astrology into a calm, intuitive experience you’ll want to return to every morning.</p></section>
      <section className="features-grid">
        <article className="feature feature-large"><span className="feature-icon">01</span><h3>Daily horoscope</h3><p>A thoughtful, personalized reading to help you move through the day with clarity and intention.</p><img src={asset(shots[0][0])} alt="Daily horoscope in AstroDaily" /></article>
        <article className="feature"><span className="feature-icon">02</span><h3>Energy insights</h3><p>See how love, career, health, and money align today.</p><div className="meter-list"><i><b>Love</b><span><u style={{width:"88%"}}></u></span><em>88%</em></i><i><b>Career</b><span><u style={{width:"92%"}}></u></span><em>92%</em></i><i><b>Health</b><span><u style={{width:"69%"}}></u></span><em>69%</em></i></div></article>
        <article className="feature"><span className="feature-icon">03</span><h3>Real compatibility</h3><p>Explore your connection with every sign through love, trust, passion, and communication.</p><div className="compatibility"><span>♈<small>You</small></span><b>83%<small>Strong potential</small></b><span>♌<small>Leo</small></span></div></article>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy"><div className="section-label">Designed for daily wonder</div><h2>Every insight,<br/><em>beautifully revealed.</em></h2><p>Move from your morning reading to the bigger picture. AstroDaily keeps every experience focused, personal, and effortless.</p>
          <div className="shot-tabs">{shots.map((shot, i) => <button key={shot[0]} className={active===i?"active":""} onClick={() => setActive(i)}><b>{String(i+1).padStart(2,"0")}</b><span>{shot[1]}</span></button>)}</div>
        </div>
        <div className="showcase"><div className="phone"><img src={asset(shots[active][0])} alt={shots[active][1]} /></div><div className="showcase-caption"><span>AstroDaily</span><p>{shots[active][1]}</p></div></div>
      </section>

      <section className="widgets">
        <div className="widgets-copy"><div className="section-label">Your stars, at a glance</div><h2>Cosmic guidance<br/><em>on your Home Screen.</em></h2><p>Stay connected to your day without opening the app. AstroDaily widgets bring your horoscope and energy insights directly to your Home Screen.</p><div className="widget-benefits"><span>Live daily insights</span><span>Beautiful at every size</span><span>Always one glance away</span></div></div>
        <div className="widget-stage">
          <div className="widget-wide"><div className="widget-top"><span className="widget-mark">AD</span><span>Saturday, July 11</span><b>Aries</b></div><div className="widget-wide-body"><div><small>DAILY HOROSCOPE</small><h3>Take the initiative.</h3><p>Your ideas are ready for action. Focus on one clear priority and let momentum carry you forward.</p></div><strong>♈</strong></div></div>
          <div className="widget-square"><div className="energy-orb"><span>TODAY’S</span><b>ENERGY</b><em>84%</em></div><div className="energy-categories"><i><span>Love</span><b>88%</b></i><i><span>Career</span><b>92%</b></i><i><span>Health</span><b>69%</b></i><i><span>Money</span><b>87%</b></i></div></div>
        </div>
      </section>

      <section className="languages">
        <div className="language-visuals"><div className="language-phone language-phone-back"><img src={asset("10-languages.jpeg")} alt="AstroDaily language selector showing ten supported languages" /></div><div className="language-phone language-phone-front"><img src={asset("language-home-screen.jpeg")} alt="AstroDaily daily horoscope localized in Simplified Chinese" /></div></div>
        <div className="language-copy"><div className="section-label">Astrology speaks every language</div><h2>Your guidance,<br/><em>in your language.</em></h2><p>Enjoy the complete AstroDaily experience in 10 languages. From daily readings to compatibility and forecasts, every insight feels natural and personal.</p><div className="language-list"><span>English</span><span>العربية</span><span>Español</span><span>Français</span><span>हिन्दी</span><span>日本語</span><span>한국어</span><span>اردو</span><span>Tiếng Việt</span><span>简体中文</span></div></div>
      </section>

      <section className="premium"><div><div className="section-label">AstroDaily Premium</div><h2>Go deeper into<br/>your <em>cosmic story.</em></h2><p>Unlock complete readings, long-range forecasts, detailed compatibility, your birth chart, and more—with no ads.</p><ul><li>Full daily reading</li><li>Weekly, monthly & yearly forecasts</li><li>Love compatibility report</li><li>Birth chart & lucky time</li></ul><a className="primary" href="#download">Explore Premium</a></div><div className="premium-visual"><img src={asset(shots[4][0])} alt="AstroDaily premium features" /></div></section>

      <section className="download" id="download"><img src={asset("download-logo.png")} alt="AstroDaily zodiac moon logo" /><div><div className="section-label">Your stars are waiting</div><h2>Make every day<br/>feel <em>aligned.</em></h2><p>Start your personal astrology journey with AstroDaily.</p><div className="store-badges"><button onClick={() => alert("AstroDaily is coming soon to the App Store.")} aria-label="AstroDaily coming soon to the App Store"><img src={asset("app-store.png")} alt="Download on the App Store" /></button><button onClick={() => alert("AstroDaily is coming soon to Google Play.")} aria-label="AstroDaily coming soon to Google Play"><img src={asset("google-play.png")} alt="Get it on Google Play" /></button></div></div></section>
    </main>
    <Footer onNavigate={onNavigate}/>
  </>;
}

function LegalPage({ type, onNavigate }) {
  const page = pageCopy[type];
  return <><main className="subpage"><section className="subpage-hero"><div className="eyebrow">✦ {page.eyebrow}</div><h1>{page.title}</h1><p>{page.intro}</p><span>Effective July 11, 2026</span></section><section className="legal-card">{page.sections.map(([title, text],i)=><article key={title}><b>{String(i+1).padStart(2,"0")}</b><div><h2>{title}</h2><p>{text}</p></div></article>)}<div className="legal-contact">Questions about these terms? <button onClick={()=>onNavigate("support")}>Contact support</button>.</div></section></main><Footer onNavigate={onNavigate}/></>;
}

function Support({ onNavigate }) {
  const [sent,setSent]=useState(false);
  const supportEmail="support@astrodailyapp.com";
  const submit=(e)=>{
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const body=`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href=`mailto:${supportEmail}?subject=AstroDaily%20Support&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <><main className="subpage support-page"><section className="subpage-hero"><div className="eyebrow">✦ We’re here to help</div><h1>How can we<br/><em>support you?</em></h1><p>Find a quick answer below or send us a message. We’ll get back to you as soon as possible.</p></section><section className="support-layout"><div className="faq"><div className="section-label">Frequently asked</div>{[["How do I manage my subscription?","Subscriptions are managed through the Apple App Store or Google Play account used to purchase AstroDaily."],["How do I update my birth details?","Open Profile in the app to update your name, birth date, time, location, or zodiac preferences."],["Can I restore a Premium purchase?","Yes. Open the Premium screen and choose Restore Purchases while signed in to the original app store account."],["How is my horoscope created?","AstroDaily combines your profile details with astrological patterns to create personalized, reflective content for entertainment." ]].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div><div className="contact-card"><div className="section-label">Contact us</div><h2>Send a message</h2><p>Prefer email? Reach us directly at <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>{sent?<div className="success"><b>Message ready ✦</b><p>Your email app will open so you can send your note to AstroDaily support.</p><a className="primary" href={`mailto:${supportEmail}?subject=AstroDaily%20Support`}>Open email app</a></div>:<form onSubmit={submit}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" required type="email" placeholder="you@example.com"/></label><label>How can we help?<textarea name="message" required rows="5" placeholder="Tell us what happened..."/></label><button className="primary" type="submit">Send message</button></form>}</div></section></main><Footer onNavigate={onNavigate}/></>;
}

function AnimatedStars() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;
    let stars = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reset = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(115, Math.max(55, Math.floor(width / 12)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.35,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.55 + 0.3,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        if (!reducedMotion) {
          star.x += star.vx;
          star.y += star.vy;
          star.pulse += 0.012;
          if (star.x < -5) star.x = width + 5;
          if (star.x > width + 5) star.x = -5;
          if (star.y < -5) star.y = height + 5;
          if (star.y > height + 5) star.y = -5;
        }
        const glow = star.alpha + Math.sin(star.pulse) * 0.16;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 224, 255, ${Math.max(0.12, glow)})`;
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i += 1) {
        for (let j = i + 1; j < stars.length; j += 1) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 108) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(174, 151, 255, ${(1 - distance / 108) * 0.16})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    reset();
    draw();
    window.addEventListener("resize", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", reset);
    };
  }, []);
  return <canvas ref={canvasRef} className="animated-stars" aria-hidden="true" />;
}

export function App() {
  const getPage=()=>location.hash.replace("#/","")||"home";
  const [page,setPage]=useState(getPage());
  useEffect(()=>{const f=()=>{setPage(getPage());scrollTo(0,0)};addEventListener("hashchange",f);return()=>removeEventListener("hashchange",f)},[]);
  const navigate=(p)=>{location.hash=`#/${p}`;setPage(p);scrollTo(0,0)};
  return <div className="app" style={{ "--cosmic-background": `url(${asset("cosmic-background.jpg")})` }}><AnimatedStars/><Header onNavigate={navigate}/>{page==="home"?<Home onNavigate={navigate}/>:page==="support"?<Support onNavigate={navigate}/>:<LegalPage type={page==="terms"?"terms":"privacy"} onNavigate={navigate}/>}</div>;
}
