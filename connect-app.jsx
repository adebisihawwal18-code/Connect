import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --white: #f5f2ee;
    --cream: #ede9e3;
    --orange: #ff5c2b;
    --orange-dim: #ff5c2b22;
    --grey: #1e1e1e;
    --mid: #3a3a3a;
    --light: #888;
  }

  body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.4rem 2.5rem;
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
  }
  .logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem;
    letter-spacing: -0.04em; color: var(--white);
  }
  .logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links a {
    color: var(--light); font-size: 0.9rem; text-decoration: none;
    transition: color 0.2s; cursor: pointer;
  }
  .nav-links a:hover { color: var(--white); }
  .btn-nav {
    background: var(--orange); color: #fff; border: none;
    padding: 0.55rem 1.3rem; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
    cursor: pointer; transition: opacity 0.2s;
  }
  .btn-nav:hover { opacity: 0.85; }

  /* HERO */
  .hero {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 6rem 2rem 4rem;
    position: relative; overflow: hidden; text-align: center;
  }
  .hero::before {
    content: '';
    position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, #ff5c2b18 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--orange-dim); border: 1px solid #ff5c2b44;
    color: var(--orange); padding: 0.35rem 1rem; border-radius: 100px;
    font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; margin-bottom: 2rem;
    animation: fadeUp 0.6s ease both;
  }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

  h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 0.95; letter-spacing: -0.04em;
    color: var(--white); margin-bottom: 1.5rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  h1 em { font-style: normal; color: var(--orange); }
  .hero-sub {
    max-width: 500px; color: var(--light); font-size: 1.05rem;
    line-height: 1.65; margin-bottom: 2.5rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }
  .hero-ctas {
    display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .btn-primary {
    background: var(--orange); color: #fff; border: none;
    padding: 0.85rem 2rem; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: transform 0.2s, opacity 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
  .btn-ghost {
    background: transparent; color: var(--white);
    border: 1px solid #333;
    padding: 0.85rem 2rem; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 400;
    cursor: pointer; transition: border-color 0.2s, transform 0.2s;
  }
  .btn-ghost:hover { border-color: #666; transform: translateY(-2px); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* CATEGORIES */
  .categories {
    display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;
    padding: 2.5rem 2rem; border-top: 1px solid #1a1a1a;
  }
  .cat-pill {
    display: flex; align-items: center; gap: 0.5rem;
    background: var(--grey); border: 1px solid #2a2a2a;
    padding: 0.55rem 1.1rem; border-radius: 100px;
    font-size: 0.85rem; color: #aaa;
    transition: all 0.2s; cursor: pointer;
  }
  .cat-pill:hover { background: #2a2a2a; color: var(--white); border-color: #444; }
  .cat-pill .icon { font-size: 1rem; }

  /* FEATURES */
  .features {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1px; background: #1a1a1a;
    border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a;
  }
  .feature {
    background: var(--black); padding: 2.5rem 2rem;
    transition: background 0.2s;
  }
  .feature:hover { background: #111; }
  .feat-icon {
    width: 42px; height: 42px; border-radius: 10px;
    background: var(--orange-dim); display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; margin-bottom: 1.2rem;
    border: 1px solid #ff5c2b33;
  }
  .feature h3 {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem;
    margin-bottom: 0.6rem; color: var(--white);
  }
  .feature p { color: var(--light); font-size: 0.88rem; line-height: 1.6; }

  /* STATS */
  .stats {
    display: flex; justify-content: center; flex-wrap: wrap; gap: 3rem;
    padding: 4rem 2rem; text-align: center;
  }
  .stat-num {
    font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800;
    color: var(--orange); line-height: 1;
  }
  .stat-label { color: var(--light); font-size: 0.85rem; margin-top: 0.4rem; }

  /* FOOTER */
  footer {
    border-top: 1px solid #1a1a1a;
    padding: 1.5rem 2.5rem;
    display: flex; justify-content: space-between; align-items: center;
    color: var(--light); font-size: 0.8rem; flex-wrap: wrap; gap: 1rem;
  }

  /* MODAL */
  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 1rem;
    backdrop-filter: blur(6px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal {
    background: var(--grey); border: 1px solid #2a2a2a;
    border-radius: 20px; width: 100%; max-width: 420px;
    padding: 2.5rem; position: relative;
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
  .modal-close {
    position: absolute; top: 1.2rem; right: 1.2rem;
    background: #2a2a2a; border: none; color: var(--light);
    width: 30px; height: 30px; border-radius: 50%; font-size: 1rem;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .modal-close:hover { background: #3a3a3a; }
  .modal h2 {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  .modal-sub { color: var(--light); font-size: 0.88rem; margin-bottom: 2rem; }
  .tabs {
    display: flex; gap: 0; margin-bottom: 2rem;
    background: #2a2a2a; border-radius: 10px; padding: 4px;
  }
  .tab {
    flex: 1; padding: 0.6rem; border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    cursor: pointer; transition: all 0.2s; background: transparent; color: var(--light);
  }
  .tab.active { background: var(--orange); color: #fff; font-weight: 500; }

  .field { margin-bottom: 1.1rem; }
  .field label { display: block; font-size: 0.8rem; color: var(--light); margin-bottom: 0.4rem; }
  .field input, .field select {
    width: 100%; background: #2a2a2a; border: 1px solid #3a3a3a;
    color: var(--white); padding: 0.75rem 1rem; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    outline: none; transition: border-color 0.2s;
    appearance: none;
  }
  .field input:focus, .field select:focus { border-color: var(--orange); }
  .field input::placeholder { color: #555; }

  .account-type {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.75rem; margin-bottom: 1.5rem;
  }
  .type-card {
    background: #2a2a2a; border: 2px solid #3a3a3a;
    border-radius: 12px; padding: 1rem; text-align: center;
    cursor: pointer; transition: all 0.2s;
  }
  .type-card.selected { border-color: var(--orange); background: var(--orange-dim); }
  .type-card .type-icon { font-size: 1.5rem; margin-bottom: 0.4rem; }
  .type-card .type-label { font-size: 0.8rem; font-weight: 500; color: var(--white); }
  .type-card .type-desc { font-size: 0.72rem; color: var(--light); margin-top: 0.2rem; }

  .btn-full {
    width: 100%; background: var(--orange); color: #fff; border: none;
    padding: 0.9rem; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
    cursor: pointer; transition: opacity 0.2s; margin-top: 0.5rem;
  }
  .btn-full:hover { opacity: 0.88; }
  .divider {
    text-align: center; color: var(--light); font-size: 0.8rem;
    margin: 1rem 0; position: relative;
  }
  .divider::before, .divider::after {
    content: ''; position: absolute; top: 50%; width: 40%; height: 1px; background: #2a2a2a;
  }
  .divider::before { left: 0; } .divider::after { right: 0; }
  .success {
    text-align: center; padding: 1rem 0;
  }
  .success .check {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--orange-dim); border: 2px solid var(--orange);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; margin: 0 auto 1.2rem;
  }
  .success h3 { font-family: 'Syne', sans-serif; font-size: 1.3rem; margin-bottom: 0.5rem; }
  .success p { color: var(--light); font-size: 0.9rem; line-height: 1.6; }
`;

const FEATURES = [
  { icon: "📍", title: "Hyperlocal Feed", desc: "See posts, events, and updates from people and businesses within your neighbourhood." },
  { icon: "🏢", title: "Business Directory", desc: "Find estate agents, shops, and services near you. Filter by rating, category, or distance." },
  { icon: "🤝", title: "Local Connections", desc: "Meet neighbours, join community groups, and build real relationships offline and online." },
  { icon: "📢", title: "Promoted Listings", desc: "Businesses get featured placement. Pay only to reach people in their local area." },
  { icon: "💬", title: "Direct Messaging", desc: "Message anyone on Connect — individuals or businesses — in one inbox." },
  { icon: "🗓️", title: "Local Events", desc: "Discover open houses, markets, meetups, and community events happening near you." },
];

const CATEGORIES = [
  { icon: "🏠", label: "Estate Agents" },
  { icon: "🛒", label: "Local Shops" },
  { icon: "🍕", label: "Restaurants" },
  { icon: "💇", label: "Beauty & Wellness" },
  { icon: "🔧", label: "Tradespeople" },
  { icon: "👥", label: "Community Groups" },
  { icon: "🎉", label: "Events" },
  { icon: "🐾", label: "Pet Services" },
];

const ACCOUNT_TYPES = [
  { icon: "👤", label: "Personal", desc: "Meet locals & explore" },
  { icon: "🏢", label: "Business", desc: "List & get discovered" },
  { icon: "🏠", label: "Estate Agent", desc: "Properties & leads" },
  { icon: "🌐", label: "Community", desc: "Groups & events" },
];

export default function ConnectApp() {
  const [modal, setModal] = useState(null); // null | 'auth'
  const [tab, setTab] = useState("signup");
  const [accountType, setAccountType] = useState("Personal");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "" });

  const handleSubmit = () => {
    if (!form.email) return;
    setSuccess(true);
  };

  const openModal = (t = "signup") => { setTab(t); setSuccess(false); setModal("auth"); };
  const closeModal = () => { setModal(null); setSuccess(false); };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* NAV */}
        <nav>
          <div className="logo">connect<span>.</span></div>
          <div className="nav-links">
            <a>How it works</a>
            <a>For Business</a>
            <a onClick={() => openModal("login")}>Log in</a>
            <button className="btn-nav" onClick={() => openModal("signup")}>Join free</button>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-tag"><span className="dot" />Now live in your area</div>
          <h1>Your neighbourhood,<br /><em>connected.</em></h1>
          <p className="hero-sub">
            Meet local businesses, estate agents, and neighbours all in one place.
            The social network built for your community — online and offline.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => openModal("signup")}>Get started — it's free</button>
            <button className="btn-ghost">List your business →</button>
          </div>
        </section>

        {/* CATEGORIES */}
        <div className="categories">
          {CATEGORIES.map(c => (
            <div className="cat-pill" key={c.label}>
              <span className="icon">{c.icon}</span>{c.label}
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <section className="features">
          {FEATURES.map(f => (
            <div className="feature" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>

        {/* STATS */}
        <section className="stats">
          {[["10k+","Local members"],["2.4k","Businesses listed"],["50+","Neighbourhoods"],["£0","To join"]].map(([n,l]) => (
            <div key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer>
          <div className="logo" style={{fontSize:"1.1rem"}}>connect<span style={{color:"#ff5c2b"}}>.</span></div>
          <span>© 2026 Connect. All rights reserved.</span>
          <span>Privacy · Terms · Contact</span>
        </footer>
      </div>

      {/* AUTH MODAL */}
      {modal && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>✕</button>

            {success ? (
              <div className="success">
                <div className="check">✓</div>
                <h3>Welcome to Connect!</h3>
                <p>Your account has been created. Check your email to verify and start exploring your neighbourhood.</p>
              </div>
            ) : (
              <>
                <h2>{tab === "signup" ? "Join Connect" : "Welcome back"}</h2>
                <p className="modal-sub">{tab === "signup" ? "Create your free account" : "Sign in to your account"}</p>

                <div className="tabs">
                  <button className={`tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Sign up</button>
                  <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Log in</button>
                </div>

                {tab === "signup" && (
                  <>
                    <p style={{fontSize:"0.8rem", color:"#888", marginBottom:"0.75rem"}}>Account type</p>
                    <div className="account-type">
                      {ACCOUNT_TYPES.map(t => (
                        <div
                          key={t.label}
                          className={`type-card ${accountType === t.label ? "selected" : ""}`}
                          onClick={() => setAccountType(t.label)}
                        >
                          <div className="type-icon">{t.icon}</div>
                          <div className="type-label">{t.label}</div>
                          <div className="type-desc">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="field">
                      <label>{accountType === "Personal" ? "Full name" : "Business name"}</label>
                      <input placeholder={accountType === "Personal" ? "Jane Smith" : "Your business name"} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                  </>
                )}

                <div className="field">
                  <label>Email address</label>
                  <input type="email" placeholder="you@email.com" onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" onChange={e => setForm({...form, password: e.target.value})} />
                </div>

                {tab === "signup" && (
                  <div className="field">
                    <label>Your area / postcode</label>
                    <input placeholder="e.g. E1 6RF or Shoreditch" onChange={e => setForm({...form, location: e.target.value})} />
                  </div>
                )}

                <button className="btn-full" onClick={handleSubmit}>
                  {tab === "signup" ? "Create my account →" : "Sign in →"}
                </button>

                <div className="divider">or</div>
                <button className="btn-full" style={{background:"#2a2a2a", color:"var(--white)"}}>
                  🌐 Continue with Google
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
