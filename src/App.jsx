import { useEffect, useRef, useState } from "react";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const shots = [
  ["astrodaily-today-horoscope.png", "A daily theme, overall score, and complete horoscope for your sign."],
  ["astrodaily-daily-ratings.png", "Daily ratings for love, career, money, health, mood, luck, and overall energy."],
  ["astrodaily-compatibility.png", "See how your sign aligns with any partner sign."],
  ["astrodaily-calendar.png", "Explore your personalized guidance across the calendar."],
  ["astrodaily-languages.png", "Choose from 10 languages and personalize the app theme."],
  ["astrodaily-reminders-premium.png", "Set a daily reminder and explore every Premium feature."],
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="AstroDaily home" onClick={() => setOpen(false)}>
      <img src={asset("astrodaily-logo.png")} alt="" /><span>AstroDaily</span>
    </a>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open navigation"><span></span><span></span></button>
    <nav className={open ? "open" : ""}>
      <a href="/" onClick={() => setOpen(false)}>Home</a>
      <button onClick={() => { setOpen(false); document.getElementById("features")?.scrollIntoView({behavior:"smooth"}); }}>Features</button>
      <a href="/support/" onClick={() => setOpen(false)}>Support</a>
      <button className="nav-cta" onClick={() => { setOpen(false); document.getElementById("download")?.scrollIntoView({behavior:"smooth"}); }}>Get the app</button>
    </nav>
  </header>;
}

function Footer() {
  return <footer>
    <div className="footer-brand"><img src={asset("astrodaily-logo.png")} alt="" /><div><strong>AstroDaily</strong><span>Your day, written in the stars.</span></div></div>
    <div className="footer-links"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/support/">Support</a></div>
    <p>© 2026 AstroDaily. For entertainment purposes only.</p>
  </footer>;
}

function Home() {
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
          <div className="trust-row"><span>✦ Daily guidance</span><span>✦ 10 languages</span><span>✦ Private by design</span></div>
        </div>
        <div className="hero-phone">
          <div className="phone-glow"></div>
          <div className="phone"><img src={asset(shots[0][0])} alt="AstroDaily daily horoscope screen" /></div>
          <span className="float-card card-one">Overall today <b>7.7</b></span><span className="float-card card-two">Today’s theme <b>Quiet Progress</b></span>
        </div>
      </section>

      <section className="intro" id="features"><div className="section-label">A universe in your pocket</div><h2>Guidance that feels<br/><em>made for you.</em></h2><p>AstroDaily brings the wisdom of astrology into a calm, intuitive experience you’ll want to return to every morning.</p></section>
      <section className="features-grid">
        <article className="feature feature-large"><span className="feature-icon">01</span><h3>Daily horoscope</h3><p>Start with today’s theme and overall score, then read personalized guidance made for your sign.</p><img src={asset(shots[0][0])} alt="AstroDaily today screen with theme, overall score, and daily horoscope" /></article>
        <article className="feature"><span className="feature-icon">02</span><h3>Daily ratings</h3><p>See how love, career, money, health, mood, luck, and your overall energy align today.</p><div className="meter-list"><i><b>Love</b><span><u style={{width:"93%"}}></u></span><em>93%</em></i><i><b>Career</b><span><u style={{width:"50%"}}></u></span><em>50%</em></i><i><b>Health</b><span><u style={{width:"91%"}}></u></span><em>91%</em></i><i><b>Money</b><span><u style={{width:"75%"}}></u></span><em>75%</em></i></div></article>
        <article className="feature"><span className="feature-icon">03</span><h3>Real compatibility</h3><p>Compare any two zodiac signs, then unlock a detailed look at love, communication, trust, and passion.</p><div className="compatibility"><span>♏<small>You</small></span><b>70%<small>Promising match</small></b><span>♈<small>Aries</small></span></div></article>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy"><div className="section-label">Designed for daily wonder</div><h2>Every insight,<br/><em>beautifully revealed.</em></h2><p>Move from your morning reading to the bigger picture. AstroDaily keeps every experience focused, personal, and effortless.</p>
          <div className="shot-tabs">{shots.map((shot, i) => <button key={shot[0]} className={active===i?"active":""} onClick={() => setActive(i)}><b>{String(i+1).padStart(2,"0")}</b><span>{shot[1]}</span></button>)}</div>
        </div>
        <div className="showcase"><div className="phone"><img src={asset(shots[active][0])} alt={shots[active][1]} /></div><div className="showcase-caption"><span>AstroDaily</span><p>{shots[active][1]}</p></div></div>
      </section>

      <section className="widgets">
        <div className="widgets-copy"><div className="section-label">Your stars, at a glance</div><h2>Cosmic guidance<br/><em>on your Home Screen.</em></h2><p>Stay connected to your day without opening the app. Choose a compact energy widget or a larger view with your horoscope and daily ratings.</p><div className="widget-benefits"><span>Today’s horoscope at a glance</span><span>Love, career, health, and money ratings</span><span>Available in compact and full sizes</span></div></div>
        <div className="widget-stage">
          <img className="widget-image widget-image-wide" src={asset("astrodaily-widget-large.png")} alt="Large AstroDaily Home Screen widget with horoscope and energy ratings" />
          <img className="widget-image widget-image-square" src={asset("astrodaily-widget-small.png")} alt="Compact AstroDaily Home Screen widget with today's energy" />
        </div>
      </section>

      <section className="languages">
        <div className="language-visuals"><div className="language-phone language-phone-back"><img src={asset(shots[5][0])} alt="AstroDaily notification settings and Premium features" /></div><div className="language-phone language-phone-front"><img src={asset(shots[4][0])} alt="AstroDaily language selector showing ten supported languages" /></div></div>
        <div className="language-copy"><div className="section-label">Astrology speaks every language</div><h2>Your guidance,<br/><em>in your language.</em></h2><p>Enjoy AstroDaily in 10 languages, choose a visual theme, and set a daily horoscope reminder for the time that suits you.</p><div className="language-list"><span>English</span><span>العربية</span><span>Español</span><span>Français</span><span>हिन्दी</span><span>日本語</span><span>한국어</span><span>اردو</span><span>Tiếng Việt</span><span>简体中文</span></div></div>
      </section>

      <section className="premium"><div><div className="section-label">AstroDaily Premium</div><h2>Go deeper into<br/>your <em>cosmic story.</em></h2><p>Unlock complete readings, long-range forecasts, detailed compatibility, your birth chart, lucky time, daily affirmations, and more.</p><ul><li>Full daily reading</li><li>Weekly, monthly & yearly forecasts</li><li>Love compatibility report</li><li>Birth chart & lucky time</li><li>Daily affirmation</li><li>Deep insights</li></ul><a className="primary" href="#download">Explore Premium</a></div><div className="premium-visual"><img src={asset(shots[5][0])} alt="AstroDaily reminder settings and Premium feature list" /></div></section>

      <section className="download" id="download"><img src={asset("download-logo.png")} alt="AstroDaily zodiac moon logo" /><div><div className="section-label">Your stars are waiting</div><h2>Make every day<br/>feel <em>aligned.</em></h2><p>Start your personal astrology journey with AstroDaily.</p><div className="store-badges"><button onClick={() => alert("AstroDaily is coming soon to the App Store.")} aria-label="AstroDaily coming soon to the App Store"><img src={asset("app-store.png")} alt="Download on the App Store" /></button><button onClick={() => alert("AstroDaily is coming soon to Google Play.")} aria-label="AstroDaily coming soon to Google Play"><img src={asset("google-play.png")} alt="Get it on Google Play" /></button></div></div></section>
    </main>
    <Footer/>
  </>;
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
      if (reducedMotion) draw();
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
  return <div className="app" style={{ "--cosmic-background": `url(${asset("cosmic-background.jpg")})` }}><AnimatedStars/><Header/><Home/></div>;
}
