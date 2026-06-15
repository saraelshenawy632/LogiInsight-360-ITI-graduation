import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   FONTS + GLOBAL CSS
═══════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&f[]=cabinet-grotesk@400,500,700,800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:      #0b1b3a;
      --navy-mid:  #0f2347;
      --navy-card: #112754;
      --navy-deep: #07122a;
      --blue:      #1a3f7c;
      --cyan:      #4fc3f7;
      --gold:      #00c8ff;
      --gold-dim:  rgba(240,180,41,.15);
      --white:     #e8f0fb;
      --muted:     #7a9cc4;
      --border:    rgba(79,195,247,.14);
      --font-head: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--navy-deep);
      color: var(--white);
      font-family: var(--font-body);
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--navy-deep); }
    ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 3px; }

    body::before {
      content: '';
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(79,195,247,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(79,195,247,.04) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none; z-index: 0;
    }

    /* ── utils ── */
    .section { position: relative; z-index: 1; padding: 90px 24px; max-width: 1200px; margin: 0 auto; }
    .section-eyebrow { text-align: center; margin-bottom: 12px; }
    .eyebrow-pill {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(79,195,247,.08); border: 1px solid rgba(79,195,247,.25);
      color: var(--cyan); font-family: var(--font-head);
      font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
      padding: 5px 16px; border-radius: 99px;
    }
    .section-title {
      font-family: var(--font-head); font-size: clamp(1.9rem,3.5vw,2.8rem);
      font-weight: 800; text-align: center; color: var(--white);
      margin-bottom: 14px; letter-spacing: -.01em;
    }
    .section-title span { color: var(--cyan); }
    .section-sub {
      text-align: center; color: var(--muted); font-size: 1rem;
      max-width: 600px; margin: 0 auto 56px; line-height: 1.75;
    }
    .card { background: var(--navy-card); border: 1px solid var(--border); border-radius: 16px; }
    .card-hover { transition: transform .28s, box-shadow .28s, border-color .28s; }
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0,0,0,.35), 0 0 0 1px rgba(79,195,247,.2);
      border-color: rgba(79,195,247,.3);
    }
    .divider { height:1px; background: linear-gradient(90deg,transparent,rgba(79,195,247,.15),transparent); margin:0 24px; }

    /* ── NAV ── */
    nav { position: fixed; top:0; left:0; right:0; z-index: 1000; transition: background .3s; }
    nav.scrolled { background: rgba(7,18,42,.94); backdrop-filter: blur(18px); border-bottom: 1px solid var(--border); }
    .nav-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding: 16px 24px; position: relative; }
    .nav-logo { font-family:var(--font-head); font-weight:800; font-size:1.15rem; color:var(--white); text-decoration:none; display:flex; align-items:center; gap:10px; z-index: 1001; }
    .logo-mark { width:32px; height:32px; border-radius:8px; background:linear-gradient(135deg,var(--blue),var(--cyan)); display:flex; align-items:center; justify-content:center; font-size:.9rem; font-weight:800; color:#fff; font-family:var(--font-head); }
    .nav-links { display:flex; gap:24px; list-style:none; }
    .nav-links a { font-size:.85rem; font-weight:500; color:var(--muted); text-decoration:none; transition:color .2s; }
    .nav-links a:hover { color:var(--cyan); }
    .nav-actions { display:flex; gap:8px; align-items:center; z-index: 1001; }
    .nav-auth-btn {
      font-family:var(--font-head); font-weight:700; font-size:.8rem;
      padding:7px 18px; border-radius:8px; border:none; cursor:pointer;
      transition:all .2s; text-decoration:none;
    }
    .nav-auth-btn.ghost { background:transparent; border:1px solid rgba(79,195,247,.3); color:var(--cyan); }
    .nav-auth-btn.ghost:hover { background:rgba(79,195,247,.08); }
    .nav-auth-btn.fill { background:linear-gradient(135deg,#1a6fd4,#4fc3f7); color:#050e1f; }
    .nav-auth-btn.fill:hover { opacity:.9; }

    .menu-toggle {
      display: none;
      background: transparent;
      border: none;
      color: var(--white);
      cursor: pointer;
      padding: 4px;
      z-index: 1001;
    }

    @media(max-width: 900px) {
      .menu-toggle { display: block; }
      .nav-links {
        position: absolute;
        top: 100%; left: 0; right: 0;
        background: rgba(7, 18, 42, 0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        padding: 24px;
        gap: 16px;
        text-align: center;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: all 0.3s ease;
      }
      .nav-links.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
    }
    @media(max-width: 480px) {
      .nav-actions { display: none; }
    }

    /* ── HERO ── */
    #hero { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:120px 24px 80px; }
    .hero-bg { position:absolute; inset:0; background: radial-gradient(ellipse 80% 55% at 50% -10%, rgba(26,63,124,.6) 0%, transparent 65%), radial-gradient(ellipse 45% 35% at 85% 70%, rgba(79,195,247,.08) 0%, transparent 55%), var(--navy-deep); }
    .hero-content { position:relative; z-index:2; text-align:center; max-width:860px; }
    .hero-badge { display:inline-flex; align-items:center; gap:8px; background:var(--gold-dim); border:1px solid rgba(240,180,41,.35); color:var(--gold); font-family:var(--font-head); font-size:.72rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; padding:6px 18px; border-radius:99px; margin-bottom:24px; }
    .hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.3;} }
    .hero-title { font-family:var(--font-head); font-weight:800; font-size:clamp(3rem,7vw,5.2rem); line-height:1.06; color:var(--white); margin-bottom:10px; letter-spacing:-.02em; }
    .hero-title .accent { color:var(--cyan); }
    .hero-subtitle { font-family:var(--font-head); font-size:clamp(.95rem,1.8vw,1.2rem); font-weight:500; color:var(--muted); margin-bottom:24px; }
    .hero-desc { font-size:1rem; color:var(--muted); line-height:1.8; max-width:650px; margin:0 auto 44px; }
    .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#1a6fd4 0%,#4fc3f7 100%); color:#050e1f; font-family:var(--font-head); font-weight:700; font-size:.9rem; padding:13px 30px; border-radius:10px; border:none; cursor:pointer; text-decoration:none; transition:transform .2s, box-shadow .2s; box-shadow:0 4px 20px rgba(79,195,247,.3); }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(79,195,247,.45); }
    .btn-outline { display:inline-flex; align-items:center; gap:8px; background:transparent; color:var(--white); font-family:var(--font-head); font-weight:600; font-size:.9rem; padding:12px 30px; border-radius:10px; border:1px solid rgba(255,255,255,.18); cursor:pointer; text-decoration:none; transition:all .2s; }
    .btn-outline:hover { border-color:var(--cyan); color:var(--cyan); }
    .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

    /* ── OVERVIEW ── */
    .ov-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:18px; }
    .ov-card { padding:28px 22px; border-radius:16px; }
    .ov-stripe { width:36px; height:3px; border-radius:2px; background:linear-gradient(90deg,var(--cyan),var(--blue)); margin-bottom:18px; }
    .ov-card h3 { font-family:var(--font-head); font-weight:700; font-size:.95rem; margin-bottom:8px; }
    .ov-card p  { font-size:.84rem; color:var(--muted); line-height:1.6; }

    /* ── PROBLEM ── */
    .prob-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
    .prob-card { padding:24px 22px; border-radius:16px; display:flex; align-items:flex-start; gap:14px; transition:transform .28s, border-color .28s; }
    .prob-card:hover { transform:translateX(5px); border-color:rgba(240,180,41,.35) !important; }
    .prob-num { font-family:var(--font-head); font-weight:800; font-size:.75rem; color:var(--gold); border:1px solid rgba(240,180,41,.3); background:var(--gold-dim); border-radius:6px; padding:3px 9px; flex-shrink:0; margin-top:2px; }
    .prob-card h3 { font-family:var(--font-head); font-weight:700; font-size:.92rem; margin-bottom:5px; }
    .prob-card p  { font-size:.83rem; color:var(--muted); line-height:1.55; }

    /* ── ARCHITECTURE ── */
    .arch-wrap { display:flex; flex-direction:column; align-items:center; max-width:480px; margin:0 auto; }
    .arch-node { width:100%; padding:16px 26px; border-radius:12px; text-align:center; }
    .arch-node h3 { font-family:var(--font-head); font-weight:700; font-size:.95rem; }
    .arch-node p  { font-size:.8rem; color:var(--muted); margin-top:3px; }
    .arch-arrow { width:2px; height:28px; background:linear-gradient(var(--cyan),rgba(79,195,247,.08)); position:relative; }
    .arch-arrow::after { content:''; position:absolute; bottom:-5px; left:50%; transform:translateX(-50%); border:5px solid transparent; border-top-color:rgba(79,195,247,.5); }
    .arch-node.hi  { background:rgba(26,63,124,.5); border-color:rgba(79,195,247,.35) !important; }
    .arch-node.end { background:linear-gradient(135deg,rgba(26,63,124,.6),rgba(79,195,247,.12)); border-color:rgba(79,195,247,.4) !important; }

    /* ── DASHBOARDS & EMBED RESPONSIVE ── */
    .dash-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(255px,1fr)); gap:18px; margin-bottom:40px; }
    .dash-card { padding:26px 22px; border-radius:16px; cursor:pointer; }
    .dash-card.active, .dash-card:hover { border-color:rgba(79,195,247,.4) !important; box-shadow:0 12px 36px rgba(0,0,0,.3); }
    .dash-tag { display:inline-block; font-family:var(--font-head); font-weight:700; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; color:var(--cyan); background:rgba(79,195,247,.1); border:1px solid rgba(79,195,247,.2); border-radius:6px; padding:3px 10px; margin-bottom:14px; }
    .dash-card h3 { font-family:var(--font-head); font-weight:700; font-size:.95rem; margin-bottom:8px; }
    .dash-card p  { font-size:.83rem; color:var(--muted); line-height:1.6; margin-bottom:16px; }
    .btn-xs { display:inline-flex; align-items:center; gap:6px; background:transparent; border:1px solid rgba(79,195,247,.28); color:var(--cyan); font-family:var(--font-head); font-weight:600; font-size:.78rem; padding:7px 16px; border-radius:8px; cursor:pointer; text-decoration:none; transition:all .2s; }
    .btn-xs:hover { background:rgba(79,195,247,.1); }
    
    /* جعل حاوية الـ Embed متجاوبة بالكامل بنسبة عرض 16:9 */
    .embed-shell { border-radius:18px; overflow:hidden; border:1px solid var(--border); box-shadow:0 24px 80px rgba(0,0,0,.55); width: 100%; display: flex; flex-direction: column; }
    .embed-bar { background:var(--navy-card); padding:12px 18px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border); flex-shrink: 0; }
    .edot { width:9px; height:9px; border-radius:50%; }
    .embed-label { font-family:var(--font-head); font-size:.78rem; color:var(--muted); font-weight:600; margin-left:6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    
    /* رسبونزيف مخصص للأي فريم */
    .iframe-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* نسبة 16:9 التلقائية */
      height: 0;
      overflow: hidden;
      background: #07122a;
    }
    .iframe-container iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: none;
    }

    @media(max-width: 768px) {
      .iframe-container {
        padding-top: 75%; /* تحويل النسبة لـ 4:3 على الموبايل ليعطي مساحة طولية مريحة للتقرير */
      }
    }

    /* ── TECH ── */
    .tech-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(155px,1fr)); gap:16px; }
    .tech-card { padding:26px 16px; border-radius:14px; text-align:center; transition:transform .28s, border-color .28s; }
    .tech-card:hover { border-color:rgba(79,195,247,.3) !important; transform:translateY(-5px); }
    .tech-badge { display:inline-block; width:44px; height:44px; border-radius:10px; background:rgba(26,63,124,.6); border:1px solid rgba(79,195,247,.2); line-height:44px; text-align:center; font-family:var(--font-head); font-weight:800; font-size:.85rem; color:var(--cyan); margin-bottom:12px; }
    .tech-card h3 { font-family:var(--font-head); font-weight:700; font-size:.88rem; margin-bottom:3px; }
    .tech-card p  { font-size:.75rem; color:var(--muted); }

    /* ── TEAM ── */
    .team-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:20px; }
    .team-card { padding:28px 20px; border-radius:18px; text-align:center; transition:transform .28s, border-color .28s; }
    .team-card:hover { transform:translateY(-5px); border-color:rgba(79,195,247,.3) !important; }
    .team-card h3 { font-family:var(--font-head); font-weight:700; font-size:1rem; margin-bottom:2px; }
    .team-card .team-en { font-size:.75rem; color:rgba(79,195,247,.6); margin-bottom:4px; font-family:var(--font-body); letter-spacing:.03em; }
    .soc-row { display:flex; gap:8px; justify-content:center; }
    .soc-btn { padding:5px 14px; border-radius:7px; border:1px solid rgba(255,255,255,.13); color:var(--muted); font-size:.75rem; font-weight:600; cursor:pointer; text-decoration:none; transition:all .2s; font-family:var(--font-head); }
    .soc-btn:hover { border-color:var(--cyan); color:var(--cyan); }

    /* ── IMPACT ── */
    .impact-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(195px,1fr)); gap:18px; }
    .impact-card { padding:28px 20px; border-radius:16px; text-align:center; transition:transform .28s, border-color .28s; }
    .impact-card:hover { transform:translateY(-5px); border-color:rgba(240,180,41,.3) !important; }
    .impact-val { font-family:var(--font-head); font-weight:800; font-size:2rem; color:var(--gold); margin-bottom:6px; }
    .impact-card h3 { font-family:var(--font-head); font-weight:700; font-size:.9rem; margin-bottom:5px; }
    .impact-card p  { font-size:.8rem; color:var(--muted); line-height:1.55; }

    /* ── CONTACT ── */
    .res-row { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
    .res-a { display:inline-flex; align-items:center; gap:9px; padding:15px 28px; border-radius:12px; font-family:var(--font-head); font-weight:700; font-size:.9rem; text-decoration:none; transition:all .28s; }
    .res-a.solid { background:linear-gradient(135deg,#1a6fd4,#4fc3f7); color:#050e1f; box-shadow:0 4px 20px rgba(79,195,247,.28); }
    .res-a.solid:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(79,195,247,.45); }
    .res-a.ghost { border:1px solid rgba(79,195,247,.25); color:var(--white); background:rgba(79,195,247,.05); }
    .res-a.ghost:hover { border-color:var(--cyan); color:var(--cyan); }

    /* ── FOOTER ── */
    footer { position:relative; z-index:1; border-top:1px solid var(--border); padding:44px 24px; text-align:center; }
    .footer-logo { font-family:var(--font-head); font-weight:800; font-size:1.35rem; color:var(--white); margin-bottom:6px; }
    footer p { font-size:.83rem; color:var(--muted); margin-bottom:3px; }
    .fsoc-row { display:flex; gap:10px; justify-content:center; margin-top:22px; }
    .fsoc { width:36px; height:36px; border-radius:9px; border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:.7rem; font-weight:700; cursor:pointer; transition:all .2s; text-decoration:none; color:var(--muted); font-family:var(--font-head); }
    .fsoc:hover { border-color:var(--cyan); color:var(--cyan); background:rgba(79,195,247,.08); }

    /* ── REVEAL ── */
    .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }

    /* ── AUTH PAGES ── */
    .auth-page { min-height: 100vh; display: flex; position: relative; overflow: hidden; }
    .auth-left { width: 45%; background: linear-gradient(160deg, #0d2a5e 0%, #07122a 60%, #0a1f46 100%); display: flex; flex-direction: column; justify-content: space-between; padding: 48px 52px; position: relative; overflow: hidden; }
    .auth-left::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(79,195,247,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,.06) 1px, transparent 1px); background-size: 48px 48px; }
    .auth-left-glow { position: absolute; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(79,195,247,.12) 0%, transparent 70%); bottom: -80px; left: -80px; pointer-events: none; }
    .auth-left-content { position: relative; z-index: 1; }
    .auth-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 56px; }
    .auth-brand-name { font-family: var(--font-head); font-weight: 800; font-size: 1.2rem; color: var(--white); }
    .auth-headline { font-family: var(--font-head); font-weight: 800; font-size: clamp(1.8rem, 3vw, 2.6rem); line-height: 1.15; color: var(--white); margin-bottom: 20px; }
    .auth-headline span { color: var(--cyan); }
    .auth-tagline { font-size: .95rem; color: var(--muted); line-height: 1.7; margin-bottom: 48px; max-width: 340px; }
    .auth-features { display: flex; flex-direction: column; gap: 16px; }
    .auth-feat { display: flex; align-items: center; gap: 14px; font-size: .88rem; color: var(--muted); }
    .auth-feat-dot { width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0; background: rgba(79,195,247,.1); border: 1px solid rgba(79,195,247,.2); display: flex; align-items: center; justify-content: center; }
    .auth-feat-dot svg { width: 14px; height: 14px; stroke: var(--cyan); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .auth-left-footer { position: relative; z-index: 1; font-size: .75rem; color: rgba(122,156,196,.45); }
    .auth-right { flex: 1; background: var(--navy-deep); display: flex; align-items: center; justify-content: center; padding: 48px 32px; }
    .auth-box { width: 100%; max-width: 420px; }
    .auth-box-title { font-family: var(--font-head); font-weight: 800; font-size: 1.75rem; color: var(--white); margin-bottom: 6px; }
    .auth-box-sub { font-size: .9rem; color: var(--muted); margin-bottom: 36px; line-height: 1.6; }
    .auth-tabs { display: flex; background: rgba(17,39,84,.6); border: 1px solid var(--border); border-radius: 10px; padding: 4px; margin-bottom: 32px; gap: 4px; }
    .auth-tab { flex: 1; padding: 9px; border-radius: 7px; font-family: var(--font-head); font-weight: 700; font-size: .85rem; background: transparent; color: var(--muted); border: none; cursor: pointer; transition: all .2s; }
    .auth-tab.active { background: linear-gradient(135deg,#1a6fd4,#4fc3f7); color: #050e1f; }
    .auth-form { display: flex; flex-direction: column; gap: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-family: var(--font-head); font-size: .78rem; font-weight: 700; color: var(--muted); letter-spacing: .06em; text-transform: uppercase; }
    .form-input { background: rgba(17,39,84,.55); border: 1px solid rgba(79,195,247,.16); border-radius: 10px; padding: 12px 14px; font-family: var(--font-body); font-size: .9rem; color: var(--white); outline: none; transition: border-color .2s, box-shadow .2s; width: 100%; }
    .form-input::placeholder { color: rgba(122,156,196,.5); }
    .form-input:focus { border-color: rgba(79,195,247,.5); box-shadow: 0 0 0 3px rgba(79,195,247,.1); }
    .form-input-wrap { position: relative; }
    .form-input-wrap .form-input { padding-right: 42px; }
    .input-icon { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); color: var(--muted); cursor: pointer; }
    .input-icon svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; display: block; }
    .form-check { display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: .85rem; color: var(--muted); }
    .form-check input[type=checkbox] { width:16px; height:16px; accent-color: var(--cyan); cursor:pointer; }
    .form-check a { color: var(--cyan); text-decoration: none; }
    .form-check a:hover { text-decoration: underline; }
    .form-forgot { font-size: .82rem; color: var(--cyan); text-decoration: none; text-align: right; display: block; margin-top: -8px; }
    .form-forgot:hover { text-decoration: underline; }
    .btn-auth { width: 100%; padding: 14px; background: linear-gradient(135deg,#1a6fd4,#4fc3f7); color: #050e1f; font-family: var(--font-head); font-weight: 700; font-size: .95rem; border: none; border-radius: 10px; cursor: pointer; transition: transform .2s, box-shadow .2s; box-shadow: 0 4px 20px rgba(79,195,247,.28); margin-top: 4px; }
    .btn-auth:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(79,195,247,.45); }
    .auth-divider { display: flex; align-items: center; gap: 12px; margin: 4px 0; font-size: .78rem; color: var(--muted); }
    .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: rgba(79,195,247,.15); }
    .btn-social { width: 100%; padding: 11px 14px; background: rgba(17,39,84,.55); border: 1px solid rgba(79,195,247,.16); border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: var(--font-head); font-weight: 600; font-size: .85rem; color: var(--white); transition: border-color .2s, background .2s; }
    .btn-social:hover { border-color: rgba(79,195,247,.35); background: rgba(79,195,247,.06); }
    .btn-social svg { width: 18px; height: 18px; }
    .auth-switch { text-align: center; margin-top: 20px; font-size: .85rem; color: var(--muted); }
    .auth-switch button { background: none; border: none; color: var(--cyan); font-family: var(--font-head); font-weight: 700; cursor: pointer; font-size: .85rem; }
    .auth-switch button:hover { text-decoration: underline; }
    .role-select { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .role-opt { padding: 10px 14px; border-radius: 9px; cursor: pointer; border: 1px solid rgba(79,195,247,.16); background: rgba(17,39,84,.4); font-family: var(--font-head); font-weight: 600; font-size: .8rem; color: var(--muted); transition: all .2s; display: flex; align-items: center; gap: 8px; }
    .role-opt svg { width:14px; height:14px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
    .role-opt.selected { border-color: rgba(79,195,247,.5); background: rgba(79,195,247,.1); color: var(--cyan); }
    .strength-bar { height: 4px; border-radius: 2px; background: rgba(79,195,247,.1); margin-top: 6px; overflow: hidden; }
    .strength-fill { height: 100%; border-radius: 2px; transition: width .3s, background .3s; }
    .success-screen { text-align: center; padding: 24px 0; }
    .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(79,195,247,.1); border: 1px solid rgba(79,195,247,.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    .success-icon svg { width:32px; height:32px; stroke:var(--cyan); fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

    @media(max-width: 760px) {
      .auth-left { display: none; }
      .auth-right { padding: 32px 20px; }
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════ */
const IcoArrow   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IcoLink    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IcoCheck   = ({sz=16}) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:sz,height:sz}}><polyline points="20 6 9 17 4 12"/></svg>;
const IcoEye     = () => <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoEyeOff  = () => <svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IcoUser    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoChart   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IcoShield  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcoTruck   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IcoCost    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IcoDriver  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoFleet   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>;
const IcoBI      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const IcoDelay   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoRoute   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>;
const IcoRise    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IcoEyeS   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoStar    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoData    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const OVERVIEW_DATA = [
  { Icon: IcoTruck,  title: "Transportation Optimization",   desc: "Maximize route efficiency and minimize delivery times across all logistics networks." },
  { Icon: IcoFleet,  title: "Fleet Performance Monitoring",  desc: "Real-time tracking of vehicle health, utilization, and operational readiness." },
  { Icon: IcoCost,   title: "Cost Analysis",                 desc: "Granular breakdown of transportation expenses to uncover savings opportunities." },
  { Icon: IcoDriver, title: "Driver Analytics",              desc: "Evaluate driver behavior, performance scores, and compliance metrics." },
  { Icon: IcoChart,  title: "Vehicle Utilization",           desc: "Utilization heatmaps and idle-time alerts to ensure every asset earns its keep." },
  { Icon: IcoBI,     title: "Business Intelligence",         desc: "Executive-level KPI dashboards powered by DAX and Power BI." },
];
const PROBLEMS_DATA = [
  { num:"01", Icon: IcoDelay,  title: "Delivery Delays",               desc: "Recurring late shipments erode customer trust and inflate operational penalties." },
  { num:"02", Icon: IcoRoute,  title: "Inefficient Routes",             desc: "Poor routing decisions lead to fuel waste and driver overtime costs." },
  { num:"03", Icon: IcoRise,   title: "Rising Transportation Costs",    desc: "Untracked expenses spiral without real-time visibility into spend categories." },
  { num:"04", Icon: IcoEyeS,  title: "Low Fleet Visibility",           desc: "Lack of GPS and telemetry data leaves fleet managers flying blind." },
  { num:"05", Icon: IcoStar,   title: "Driver Performance Variations",  desc: "Inconsistent driver behavior creates safety risks and unpredictable service levels." },
  { num:"06", Icon: IcoData,   title: "Limited Data-Driven Decisions",  desc: "Decisions based on gut feeling rather than analytics lead to systemic inefficiencies." },
];
const ARCH_DATA = [
  { label:"Operational Systems",  desc:"ERP · TMS · GPS · WMS",           hi:false, end:false },
  { label:"SQL Server Database",  desc:"Centralized relational data store", hi:true,  end:false },
  { label:"Data Warehouse",       desc:"Star schema & fact/dimension tables",hi:false, end:false },
  { label:"ETL Processes",        desc:"SSIS – Extract, Transform, Load",   hi:true,  end:false },
  { label:"Power BI Dashboards",  desc:"Interactive reports & visuals",     hi:false, end:false },
  { label:"Business Insights",    desc:"KPIs · Trends · Decisions",         hi:false, end:true  },
];
const DASHBOARDS_DATA = [
   { tag: "Dashboard 01", title: "Global Supply Chain Control Tower", desc: "Central command dashboard tracking active revenue, purchase orders, fleet trips, and critical operational alerts." },
   { tag: "Dashboard 02", title: "Dynamic Cost-to-Serve Blueprint", desc: "Analyze production, warehousing, and transportation costs against profitability and margin performance." },
   { tag: "Dashboard 03", title: "Customer Experience & Fulfillment Tracker", desc: "Monitor customer satisfaction, OTIF performance, returns, and service quality across regions." },
   { tag: "Dashboard 04", title: "Resilience & Risk Radar", desc: "Detect supply chain risks, stock shortages, delayed shipments, and operational bottlenecks in real time." },
   { tag: "Dashboard 05", title: "Vendor Performance Scorecard", desc: "Evaluate suppliers based on lead-time accuracy, quality performance, pricing variance, and reliability." },
   { tag: "Dashboard 06", title: "Procurement Cash-Flow Forecast", desc: "Forecast future payables by linking purchase orders with expected warehouse receipt schedules." },
   { tag: "Dashboard 07", title: "Production Floor Live Monitor", desc: "Track production line utilization, output volumes, and manufacturing capacity performance." },
   { tag: "Dashboard 08", title: "End-to-End Batch Traceability Tree", desc: "Trace product batches from suppliers to customers for compliance, audits, and quality assurance." },
   { tag: "Dashboard 09", title: "Scrap Factor & Defect Pareto Analysis", desc: "Identify major causes of waste and defects to improve manufacturing efficiency." },
   { tag: "Dashboard 10", title: "Warehouse Capacity Cubage Heatmap", desc: "Visualize warehouse space utilization across storage zones and optimize inventory placement." },
   { tag: "Dashboard 11", title: "Stock-Out Proactive Risk Alerts", desc: "Detect products approaching reorder levels and prevent inventory shortages before they occur." },
   { tag: "Dashboard 12", title: "Dead Stock & Shelf-Life Expiry Tracker", desc: "Identify slow-moving inventory and monitor products approaching expiration dates." },
   { tag: "Dashboard 13", title: "Warehouse Inbound/Outbound Throughput", desc: "Measure warehouse receiving and shipping activities to improve operational efficiency." },
   { tag: "Dashboard 14", title: "Fleet Trip Operational Status Matrix", desc: "Track trip progress, delayed routes, active deliveries, and transportation performance." },
   { tag: "Dashboard 15", title: "Driver Performance & Route Profiling", desc: "Analyze driver behavior, route compliance, delivery success rates, and efficiency metrics." },
   { tag: "Dashboard 16", title: "Trip Expense Breakdown Analytics", desc: "Break down transportation costs including fuel, tolls, maintenance, and labor expenses." },
   { tag: "Dashboard 17", title: "Fleet Maintenance Schedule Optimizer", desc: "Predict vehicle maintenance needs and reduce downtime through preventive servicing insights." },
   { tag: "Dashboard 18", title: "AI Agent Actions Command Board", desc: "Monitor automated AI-driven operational actions, alerts, and workflow interventions." },
   { tag: "Dashboard 19", title: "Predictive Demand Forecasting Engine", desc: "Forecast future demand using historical sales trends, seasonality, and predictive analytics." },
   { tag: "Dashboard 20", title: "Reverse Logistics Loss Attribution", desc: "Analyze return-related costs and identify root causes across production, warehousing, and transport." }      
];
const TECH_DATA = [
  { abbr:"SQL", name:"SQL Server",      desc:"Database Engine" },
  { abbr:"DW",  name:"Data Warehouse",  desc:"Star Schema" },
  { abbr:"ETL", name:"ETL / SSIS",      desc:"Data Pipeline" },
  { abbr:"PBI", name:"Power BI",        desc:"Visualization" },
  { abbr:"DAX", name:"DAX",            desc:"Analytics Language" },
  { abbr:"RX",  name:"React.js",        desc:"Frontend" },
  { abbr:"BI",  name:"Business Intel.", desc:"Strategy Layer" },
];
const TEAM_DATA = [
  { name:"Sara El-Shenawy" },
  { name:"Rahma Osama" },
  { name:"Maram Ibrahim" },
  { name:"Mamdouh Fahim" },
  { name:"Mohamed Ayman" },
];
const IMPACT_DATA = [
  { val:"↓28%", title:"Transportation Costs",  desc:"Reduced spend via smarter route planning and vendor negotiation insights." },
  { val:"↑40%", title:"Fleet Utilization",      desc:"Assets deployed more effectively with utilization dashboards." },
  { val:"↑35%", title:"Driver Performance",     desc:"Targeted coaching driven by behavioral analytics." },
  { val:"↓22%", title:"Late Deliveries",        desc:"On-time rates improved through proactive delay detection." },
  { val:"3×",   title:"Decision Speed",         desc:"Executives act on insights in real time rather than end-of-month reports." },
  { val:"360°", title:"Operational Visibility", desc:"Every facet of logistics monitored from a single unified platform." },
];
const PBI_URL =
  "https://app.powerbi.com/reportEmbed?reportId=45550a04-5440-4a33-958b-a5af7b12c80a&autoAuth=true&ctid=061bb382-6154-4133-a318-23c308dfe636";
/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════
   AUTH COMPONENTS
═══════════════════════════════════════════════════════ */
function AuthLeft() {
  const feats = [
    { label: "Real-time supply chain analytics", Icon: IcoChart },
    { label: "Fleet & driver performance tracking", Icon: IcoTruck },
    { label: "Secure role-based access control", Icon: IcoShield },
  ];
  return (
    <div className="auth-left">
      <div className="auth-left-glow" />
      <div className="auth-left-content">
        <div className="auth-brand">
          <img src="/logo.jpg" alt="LogiInsight 360" style={{width:40, height:40, borderRadius:10, objectFit:'cover'}} />          
          <span className="auth-brand-name">LogiInsight 360</span>
        </div>
        <h2 className="auth-headline">
          Your Supply Chain,<br /><span>Fully Visible.</span>
        </h2>
        <p className="auth-tagline">
          Access real-time dashboards, fleet analytics, and driver performance insights
          powered by SQL Server and Power BI.
        </p>
        <div className="auth-features">
          {feats.map(({label, Icon}) => (
            <div className="auth-feat" key={label}>
              <div className="auth-feat-dot"><Icon /></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PasswordStrength({ password }) {
  const score = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;
  const colors = ["","#e24b4a","#f0b429","#4fc3f7","#28c840"];
  const labels = ["","Weak","Fair","Good","Strong"];
  return score > 0 ? (
    <div>
      <div className="strength-bar">
        <div className="strength-fill" style={{width:`${score*25}%`, background:colors[score]}} />
      </div>
      <span style={{fontSize:".72rem",color:colors[score],marginTop:3,display:"block"}}>{labels[score]}</span>
    </div>
  ) : null;
}

function LoginForm({ onSuccess }) {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (!email || !pw) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };
  return (
    <div className="auth-form">
      <div className="form-field">
        <label className="form-label">Work Email</label>
        <input className="form-input" type="email" placeholder="you@company.com"
          value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="form-label">Password</label>
        <div className="form-input-wrap">
          <input className="form-input" type={showPw?"text":"password"} placeholder="Enter password"
            value={pw} onChange={e => setPw(e.target.value)} />
          <span className="input-icon" onClick={() => setShowPw(v=>!v)}>
            {showPw ? <IcoEyeOff /> : <IcoEye />}
          </span>
        </div>
        <a href="/" className="form-forgot">Forgot password?</a>
      </div>
      <button className="btn-auth" onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in…" : "Sign In to Dashboard"}
      </button>
      <div className="auth-divider">or continue with</div>
      <button className="btn-social">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

function RegisterForm({ onSuccess }) {
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [role, setRole] = useState("analyst");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const handleSubmit = () => {
    if (!agree) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1400);
  };
  return (
    <div className="auth-form">
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">First Name</label>
          <input className="form-input" type="text" placeholder="Sara" />
        </div>
        <div className="form-field">
          <label className="form-label">Last Name</label>
          <input className="form-input" type="text" placeholder="El-Shennawy" />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Work Email</label>
        <input className="form-input" type="email" placeholder="you@company.com" />
      </div>
      <div className="form-field">
        <label className="form-label">Role</label>
        <div className="role-select">
          {[["analyst","Analyst",<IcoChart />],["manager","Manager",<IcoUser />]].map(([val,lbl,Ic]) => (
            <button key={val} className={`role-opt${role===val?" selected":""}`} onClick={()=>setRole(val)}>
              {Ic}{lbl}
            </button>
          ))}
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">Password</label>
        <div className="form-input-wrap">
          <input className="form-input" type={showPw?"text":"password"} placeholder="Create a strong password"
            value={pw} onChange={e=>setPw(e.target.value)} />
          <span className="input-icon" onClick={()=>setShowPw(v=>!v)}>
            {showPw ? <IcoEyeOff /> : <IcoEye />}
          </span>
        </div>
        <PasswordStrength password={pw} />
      </div>
      <label className="form-check">
        <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
        I agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>
      </label>
      <button className="btn-auth" onClick={handleSubmit} disabled={loading || !agree} style={{opacity:(!agree||loading)?.6:1}}>
        {loading ? "Creating Account…" : "Create Account"}
      </button>
      <div className="auth-divider">or sign up with</div>
      <button className="btn-social">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

function SuccessScreen({ type, onContinue }) {
  return (
    <div className="success-screen">
      <div className="success-icon">
        <IcoCheck sz={32} />
      </div>
      <h3 style={{fontFamily:"var(--font-head)",fontWeight:800,fontSize:"1.4rem",marginBottom:8}}>
        {type==="login" ? "Welcome back!" : "Account created!"}
      </h3>
      <p style={{color:"var(--muted)",fontSize:".9rem",lineHeight:1.7,marginBottom:28}}>
        {type==="login"
          ? "You're now signed in to LogiInsight 360. Your dashboards are ready."
          : "Your account is ready. You now have access to the supply chain analytics platform."}
      </p>
      <button className="btn-auth" onClick={onContinue}>
        Go to Dashboard
      </button>
    </div>
  );
}

function AuthPage({ onEnterSite }) {
  const [tab, setTab]           = useState("login");
  const [success, setSuccess]   = useState(false);
  return (
    <div className="auth-page">
      <AuthLeft />
      <div className="auth-right">
        <div className="auth-box">
          {success ? (
            <SuccessScreen type={tab} onContinue={onEnterSite} />
          ) : (
            <>
              <h2 className="auth-box-title">
                {tab === "login" ? "Sign In" : "Create Account"}
              </h2>
              <p className="auth-box-sub">
                {tab === "login"
                  ? "Access your supply chain analytics dashboard."
                  : "Join LogiInsight 360 and gain full platform access."}
              </p>
              <div className="auth-tabs">
                <button className={`auth-tab${tab==="login"?" active":""}`} onClick={()=>setTab("login")}>Sign In</button>
                <button className={`auth-tab${tab==="register"?" active":""}`} onClick={()=>setTab("register")}>Register</button>
              </div>
              {tab === "login"
                ? <LoginForm onSuccess={()=>setSuccess(true)} />
                : <RegisterForm onSuccess={()=>setSuccess(true)} />
              }
              <div className="auth-switch">
                {tab === "login"
                  ? <span>Don't have an account? <button onClick={()=>setTab("register")}>Create one</button></span>
                  : <span>Already have an account? <button onClick={()=>setTab("login")}>Sign in</button></span>
                }
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SITE COMPONENTS
═══════════════════════════════════════════════════════ */
function Nav({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    ["Overview","#overview"],
    ["Problem","#problem"],
    ["Solution","#solution"],
    ["Dashboards","#dashboards"],
    ["Team","#team"],
    ["Impact","#impact"],
    ["Contact","#contact"]
  ];

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" onClick={() => setIsOpen(false)}>
         <img src="/logo.jpg" alt="logo" style={{width:32, height:32, borderRadius:8, objectFit:'cover'}} />
         LogiInsight 360
        </a>
        
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map(([l,h]) => (
            <li key={l}>
              <a href={h} onClick={() => setIsOpen(false)}>{l}</a>
            </li>
          ))}
        </ul>
        
        <div className="nav-actions">
          <button className="nav-auth-btn ghost" onClick={() => { onOpenAuth("login"); setIsOpen(false); }}>Sign In</button>
          <button className="nav-auth-btn fill" onClick={() => { onOpenAuth("register"); setIsOpen(false); }}>Get Started</button>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

function Hero({ onOpenAuth }) {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Graduation Project
        </div>
        <h1 className="hero-title">LogiInsight <span className="accent">360</span></h1>
        <p className="hero-subtitle">End-to-End Supply Chain Analytics Platform</p>
        <p className="hero-desc">
          A comprehensive analytics platform built on SQL Server Data Warehousing and Power BI,
          helping organizations optimize logistics operations, fleet utilization, driver performance,
          and transportation costs — all from a single control tower.
        </p>
     
        <div className="hero-btns">
          <a href="#dashboards" className="btn-primary">Explore Dashboards <IcoArrow /></a>
          <button className="btn-outline" onClick={()=>onOpenAuth("register")}>Get Started Free</button>
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section id="overview">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">About The Project</span></div>
        <h2 className="section-title reveal">Centralizing <span>Logistics Intelligence</span></h2>
        <p className="section-sub reveal">
          LogiInsight 360 integrates logistics and transportation data into a unified analytics
          platform, enabling organizations to monitor performance, optimize routes, analyze costs,
          and evaluate drivers through interactive BI dashboards.
        </p>
        <div className="ov-grid">
          {OVERVIEW_DATA.map(({Icon,title,desc},i) => (
            <div className="ov-card card card-hover reveal" key={title} style={{transitionDelay:`${i*70}ms`}}>
              <div className="ov-stripe" />
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Business Challenges</span></div>
        <h2 className="section-title reveal">Problem <span>Statement</span></h2>
        <p className="section-sub reveal">
          Logistics operations are plagued by visibility gaps and data silos that prevent
          organizations from making timely, informed decisions.
        </p>
        <div className="prob-grid">
          {PROBLEMS_DATA.map(({num,Icon,title,desc},i) => (
            <div className="prob-card card reveal" key={title} style={{transitionDelay:`${i*70}ms`}}>
              <span className="prob-num">{num}</span>
              <div><h3>{title}</h3><p>{desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solution">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Architecture</span></div>
        <h2 className="section-title reveal">Our <span>Solution</span></h2>
        <p className="section-sub reveal">
          A layered data architecture transforms raw operational data into executive-grade
          business intelligence through a proven ETL → DW → BI pipeline.
        </p>
        <div className="arch-wrap">
          {ARCH_DATA.map((node,i) => (
            <div key={node.label} style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div className={`arch-node card reveal${node.hi?" hi":""}${node.end?" end":""}`} style={{transitionDelay:`${i*90}ms`}}>
                <h3>{node.label}</h3><p>{node.desc}</p>
              </div>
              {i < ARCH_DATA.length-1 && <div className="arch-arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboards() {
  const [active, setActive] = useState(0);
  return (
    <section id="dashboards">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Power BI Reports</span></div>
        <h2 className="section-title reveal">Interactive <span>Dashboards</span></h2>
        <p className="section-sub reveal">
          Four purpose-built dashboards surface the insights that matter most — from driver
          scorecards to fleet health and cost attribution.
        </p>
        <div className="dash-grid">
          {DASHBOARDS_DATA.map((d,i) => (
            <div className={`dash-card card card-hover reveal${active===i?" active":""}`} key={d.tag}
              onClick={()=>setActive(i)} style={{transitionDelay:`${i*70}ms`}}>
              <div className="dash-tag">{d.tag}</div>
              <h3>{d.title}</h3><p>{d.desc}</p>
              <a href="https://app.powerbi.com/reportEmbed?reportId=45550a04-5440-4a33-958b-a5af7b12c80a&autoAuth=true&ctid=061bb382-6154-4133-a318-23c308dfe636"
                target="_blank" rel="noopener noreferrer" className="btn-xs" onClick={e=>e.stopPropagation()}>
                Open Full Report <IcoLink />
              </a>
            </div>
          ))}
        </div>
        
        {/* شل الحاوية المعدل ليكون رسبونزيف تماماً */}
        <div className="embed-shell reveal">
          <div className="embed-bar">
            <span className="edot" style={{background:"#ff5f57"}}/><span className="edot" style={{background:"#ffbd2e"}}/><span className="edot" style={{background:"#28c840"}}/>
            <span className="embed-label">LogiInsight 360 — {DASHBOARDS_DATA[active].title}</span>
          </div>
          
          {/* حاوية الرسبونزيف للأي فريم */}
          <div className="iframe-container">
            <iframe 
              title="LogiInsight 360 Power BI" 
              src={PBI_URL}
              allowFullScreen 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section id="tech">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Technology Stack</span></div>
        <h2 className="section-title reveal">Built With <span>Industry Standards</span></h2>
        <p className="section-sub reveal">Tools selected for scalability, performance, and analytic depth.</p>
        <div className="tech-grid">
          {TECH_DATA.map((t,i) => (
            <div className="tech-card card card-hover reveal" key={t.name} style={{transitionDelay:`${i*65}ms`}}>
              <div className="tech-badge">{t.abbr}</div>
              <h3>{t.name}</h3><p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">The Team</span></div>
        <h2 className="section-title reveal">Meet <span>The Team</span></h2>
       
        <div className="team-grid">
          {TEAM_DATA.map((m,i) => (
            <div className="team-card card card-hover reveal" key={m.name} style={{transitionDelay:`${i*80}ms`}}>
              <h3>{m.name}</h3>
              <p className="team-en">{m.nameAr}</p>
              <div className="soc-row">
                <a href="/" className="soc-btn">LinkedIn</a>
                <a href="/" className="soc-btn">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section id="impact">
      <div className="section">
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Expected Results</span></div>
        <h2 className="section-title reveal">Business <span>Impact</span></h2>
        <p className="section-sub reveal">
          Projected improvements based on industry benchmarks and pilot analysis from the
          LogiInsight 360 implementation framework.
        </p>
        <div className="impact-grid">
          {IMPACT_DATA.map((c,i) => (
            <div className="impact-card card card-hover reveal" key={c.title} style={{transitionDelay:`${i*70}ms`}}>
              <div className="impact-val">{c.val}</div>
              <h3>{c.title}</h3><p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="section" style={{textAlign:"center"}}>
        <div className="section-eyebrow reveal"><span className="eyebrow-pill">Project Resources</span></div>
        <h2 className="section-title reveal">Access <span>Project Assets</span></h2>
        <p className="section-sub reveal">Live dashboard, technical documentation, and source code.</p>
        <div className="res-row reveal">
          <a href="https://app.powerbi.com/reportEmbed?reportId=45550a04-5440-4a33-958b-a5af7b12c80a&autoAuth=true&ctid=061bb382-6154-4133-a318-23c308dfe636"
            target="_blank" rel="noopener noreferrer" className="res-a solid">
            Power BI Dashboard <IcoLink />
          </a>
          <a href="https://github.com/Rahma-Osama/LogiInsight-360-ITI-Graduation-Project/blob/main/Project%20Proposal.docx" className="res-a ghost">Project Documentation</a>
          <a href="https://github.com/Rahma-Osama/LogiInsight-360-ITI-Graduation-Project" className="res-a ghost">GitHub Repository</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-logo">LogiInsight 360</div>
      <p>End-to-End Supply Chain Analytics Platform</p>
      <p style={{ color: "rgba(122,156,196,.4)", marginTop: 6, fontSize: "0.75rem" }}>
        © 2026 LogiInsight 360. Graduation Project. All rights reserved.
      </p>
      <div className="fsoc-row">
        {["in", "gh", "tw", "@"].map((s, i) => (
          <a key={i} href="/" className="fsoc">{s}</a>
        ))}
      </div>
    </footer>
  );
}

function MainSite({ onOpenAuth }) {
  useReveal();
  return (
    <>
      <Nav onOpenAuth={onOpenAuth} />
      <Hero onOpenAuth={onOpenAuth} />
      <div className="divider" />
      <Overview />
      <div className="divider" />
      <Problem />
      <div className="divider" />
      <Solution />
      <div className="divider" />
      <Dashboards />
      <div className="divider" />
      <TechStack />
      <div className="divider" />
      <Team />
      <div className="divider" />
      <Impact />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("auth");
  return (
    <>
      <GlobalStyles />
      {page === "auth"
        ? <AuthPage onEnterSite={() => setPage("main")} />
        : <MainSite onOpenAuth={() => setPage("auth")} />
      }
    </>
  );
}