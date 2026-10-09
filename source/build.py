#!/usr/bin/env python3
"""Clutch Code multi-page site generator. Writes standalone pages (inline CSS/JS/logo)."""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)

ICON_T = open(os.path.join(HERE, 'icon_b64.txt')).read().strip()
ICON_W = open(os.path.join(HERE, 'icon_white_b64.txt')).read().strip()
CSS = open(os.path.join(HERE, 'base.css')).read() + open(os.path.join(HERE, 'extra.css')).read()

NAV = [('services.html', 'Services'), ('work.html', 'Work'), ('about.html', 'About')]

JS = r"""
(function(){
  // mobile menu (logo-inspired button)
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  var open = false;
  function setMenu(v){
    open = v;
    btn.classList.toggle('is-open', v);
    btn.setAttribute('aria-expanded', v ? 'true' : 'false');
    menu.classList.toggle('is-open', v);
    document.body.classList.toggle('menu-open', v);
  }
  if (btn && menu){
    btn.addEventListener('click', function(){ setMenu(!open); });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
    window.addEventListener('resize', function(){ if (window.innerWidth > 860 && open) setMenu(false); });
  }

  // home: rotating 3-service preview
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  if (tabs.length){
    var cur = 0, timer = null;
    var setTab = function(i){
      cur = i;
      tabs.forEach(function(b){ b.classList.toggle('active', +b.dataset.tab === i); });
      panels.forEach(function(p){ p.classList.toggle('active', +p.dataset.panel === i); });
    };
    var start = function(){ if (timer) clearInterval(timer); timer = setInterval(function(){ setTab((cur + 1) % tabs.length); }, 4000); };
    tabs.forEach(function(b){ b.addEventListener('click', function(){ setTab(+b.dataset.tab); start(); }); });
    start();
    var row = document.getElementById('barRow');
    if (row){ [21,29,25,36,32,44,52].forEach(function(h){ var d = document.createElement('div'); d.className = 'bar'; d.style.height = h + 'px'; row.appendChild(d); }); }
  }

  // work: filter chips
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-cats]'));
  if (chips.length){
    chips.forEach(function(c){
      c.addEventListener('click', function(){
        var f = c.dataset.filter;
        chips.forEach(function(x){ x.classList.toggle('on', x === c); });
        cards.forEach(function(card){
          var show = f === 'all' || card.dataset.cats.split(' ').indexOf(f) !== -1;
          card.classList.toggle('hide', !show);
        });
      });
    });
  }

  // contact: prefill + demo submit
  var form = document.getElementById('contactForm');
  if (form){
    var m = /[?&]interest=([a-z]+)/.exec(location.search);
    if (m){ var box = form.querySelector('input[value="' + m[1] + '"]'); if (box) box.checked = true; }
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // TODO: send the form data to your email service / backend here.
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    });
  }
})();
"""


def layout(slug, title, desc, body, active=''):
    nav_links = ''.join(
        '<a href="%s"%s>%s</a>' % (h, ' class="current"' if h == active else '', t) for h, t in NAV)
    m_links = ''.join(
        '<a href="%s" class="mlink%s">%s</a>' % (h, ' current' if h == active else '', t)
        for h, t in [('index.html', 'Home')] + NAV + [('contact.html', 'Contact')])
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__TITLE__</title>
<meta name="description" content="__DESC__">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>__CSS__</style>
</head>
<body>
<div class="grid-bg"></div>
<header>
  <nav>
    <a class="logo" href="index.html"><img src="data:image/png;base64,__ICON_W__" alt="Clutch Code"><span>CLUTCH CODE</span></a>
    <div class="navlinks">__NAV__</div>
    <div class="navcta">
      <a href="contact.html" class="btn btn-primary btn-primary-desktop">Talk to our team</a>
      <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false">
        <span class="mark"><img src="data:image/png;base64,__ICON_T__" alt=""><span class="cross"><span></span><span></span></span></span>
      </button>
    </div>
  </nav>
</header>
<div class="mobile-menu" id="mobileMenu">
  <div class="kicker">// menu</div>
  __MLINKS__
  <div class="mfoot"><a href="contact.html" class="btn btn-primary btn-lg">Talk to our team</a></div>
</div>
<main>
__BODY__
</main>
<footer>
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="logo" href="index.html"><img src="data:image/png;base64,__ICON_W__" alt="Clutch Code" style="height:20px;"><span>CLUTCH CODE</span></a>
        <p>Software, digital marketing, and branding for growing businesses.</p>
      </div>
      <div class="footer-col"><h4>Services</h4>
        <a href="services.html#software">Software Solutions</a>
        <a href="services.html#marketing">Digital Marketing</a>
        <a href="services.html#branding">Branding</a></div>
      <div class="footer-col"><h4>Company</h4>
        <a href="about.html">About</a>
        <a href="work.html">Work</a>
        <a href="contact.html">Contact</a></div>
      <div class="footer-col"><h4>Start</h4>
        <a href="contact.html">Talk to our team</a>
        <a href="contact.html?interest=branding">Request a brand review</a></div>
    </div>
    <div class="footer-bottom"><span>&copy; 2026 Clutch Code</span><span>everything clicks into place</span></div>
  </div>
</footer>
<script>__JS__</script>
</body>
</html>
"""
    for k, v in [('__TITLE__', title), ('__DESC__', desc), ('__CSS__', CSS), ('__NAV__', nav_links),
                 ('__MLINKS__', m_links), ('__BODY__', body), ('__JS__', JS),
                 ('__ICON_W__', ICON_W), ('__ICON_T__', ICON_T)]:
        html = html.replace(k, v)
    with open(os.path.join(OUT, slug), 'w') as f:
        f.write(html)


def cta(h='Tell us what you\u2019re building.', p='Software, a campaign, a brand, or all three \u2014 we\u2019ll tell you honestly what we can do and when.',
        label='Talk to our team', href='contact.html'):
    return """
<section style="padding-bottom:110px;"><div class="wrap"><div class="cta-banner">
  <h2>%s</h2><p>%s</p><a href="%s" class="btn btn-primary btn-lg">%s</a>
</div></div></section>""" % (h, p, href, label)


def faq(items):
    return '<div class="faq">' + ''.join(
        '<details class="q"><summary>%s</summary><p>%s</p></details>' % (q, a) for q, a in items) + '</div>'


def thumb(kind):
    if kind == 'software':
        return '<div class="thumb"><span class="ln" style="top:20px;width:90px"></span><span class="ln" style="top:34px;width:60px"></span>' \
               + ''.join('<span class="b" style="height:%dpx"></span>' % h for h in (26, 38, 32, 52, 44, 66)) + '</div>'
    if kind == 'marketing':
        return '<div class="thumb">' + ''.join('<span class="b" style="height:%dpx"></span>' % h for h in (22, 30, 28, 44, 52, 70, 88)) + '</div>'
    return '<div class="thumb sw">' + ''.join(
        '<span class="s" style="background:%s"></span>' % c for c in ('#5E5DE5', '#05060A', '#FFFFFF', '#8C8BF0')) + '</div>'


WORK = [
    dict(name='Horizon Retail', title='Inventory dashboard and launch campaign', cats='software marketing', kind='software',
         tags=['Software', 'Marketing'],
         challenge='Stock for three branches lived in separate spreadsheets, and nobody trusted the totals.',
         did='Built one internal dashboard, connected supplier data, then ran the launch campaign for the new ordering flow.',
         result='Weekly stock counts dropped from a full day to under an hour.'),
    dict(name='Greenleaf Organics', title='A brand identity for a regional organic grocer', cats='branding', kind='branding',
         tags=['Branding'],
         challenge='A growing grocer with three different logos across signage, bags, and social.',
         did='Defined the positioning, designed one identity system, and delivered a full brand book with print-ready files.',
         result='New identity rolled out across stores, packaging, and social in six weeks.'),
    dict(name='Brightside Caf\u00e9', title='Local search and social growth', cats='marketing', kind='marketing',
         tags=['Marketing'],
         challenge='Great coffee, but nobody outside the street knew the caf\u00e9 existed.',
         did='Fixed the local listings, set up a weekly content rhythm, and ran small, measured paid campaigns.',
         result='Map views and walk-in bookings climbed steadily across the first three months.'),
    dict(name='Northfield Clinic', title='Appointment booking portal', cats='software', kind='software',
         tags=['Software'],
         challenge='Reception staff spent most of the day on the phone confirming slots.',
         did='Built a booking portal with reminders and a simple admin view for the front desk.',
         result='Phone confirmations fell sharply, and no-shows dropped after reminders went live.'),
    dict(name='Atlas Hardware', title='Rebrand and catalogue website', cats='branding software', kind='branding',
         tags=['Branding', 'Software'],
         challenge='A 30-year-old trading name with a dated look and a paper catalogue.',
         did='Refreshed the identity, then built a searchable online catalogue in the new look.',
         result='Customers now browse and enquire online instead of phoning for prices.'),
    dict(name='Greenfield Supermarkets', title='ClutchKart rollout across three stores', cats='software', kind='software',
         tags=['Software', 'ClutchKart'],
         challenge='Paper ledgers at the counter and no live view of stock between stores.',
         did='Set up ClutchKart, imported the product list, trained the billing staff, and supported go-live week.',
         result='One dashboard for all three stores, with low-stock alerts before shelves empty.'),
]


def work_card(w):
    return """<article class="card" data-cats="%s">%s<div class="card-body">
  <div class="tags">%s</div><h3>%s</h3>
  <p><b>Challenge.</b> %s</p><p><b>What we did.</b> %s</p>
  <div class="result">%s</div></div></article>""" % (
        w['cats'], thumb(w['kind']), ''.join('<span class="tag">%s</span>' % t for t in w['tags']),
        w['name'] + ' \u2014 ' + w['title'], w['challenge'], w['did'], w['result'])


# =====================================================================  HOME
home = """
<section class="hero" style="border-top:none;"><div class="wrap hero-grid">
  <div>
    <div class="eyebrow">// software &middot; marketing &middot; branding</div>
    <h1>Everything<br>clicks into <span class="accent">place</span>.</h1>
    <p class="lede">Clutch Code builds the systems growing businesses run on \u2014 custom software, the marketing that brings people to it, and the brand that makes them stay. One team, three practices, built to work together from day one.</p>
    <div class="hero-ctas">
      <a href="contact.html" class="btn btn-primary btn-lg">Talk to our team</a>
      <a href="services.html" class="btn btn-ghost btn-lg">See what we do</a>
    </div>
    <div class="trust">one team for the software, the marketing, and the brand</div>
  </div>
  <div class="console" id="console">
    <div class="console-bar">
      <button class="tab-btn active" data-tab="0"><span class="tdot"></span>Software</button>
      <button class="tab-btn" data-tab="1"><span class="tdot"></span>Marketing</button>
      <button class="tab-btn" data-tab="2"><span class="tdot"></span>Branding</button>
    </div>
    <div class="console-body">
      <div class="panel active" data-panel="0">
        <div class="panel-kicker">// software</div><div class="panel-title">Internal dashboard \u2014 Horizon Retail</div>
        <div class="mock-window"><div class="mock-window-bar"><span></span><span></span><span></span></div>
          <div class="mock-window-body">
            <div class="stat-row"><div class="stat-chip"><div class="n">1,204</div><div class="l">ACTIVE USERS</div></div><div class="stat-chip"><div class="n">99.98%</div><div class="l">UPTIME</div></div></div>
            <svg class="sparkline" viewBox="0 0 280 40" preserveAspectRatio="none"><polyline points="0,32 35,28 70,30 105,18 140,22 175,10 210,14 245,6 280,8" fill="none" stroke="#8C8BF0" stroke-width="2"/></svg>
          </div></div>
      </div>
      <div class="panel" data-panel="1">
        <div class="panel-kicker">// marketing</div><div class="panel-title">Campaign performance \u2014 3 channels live</div>
        <div class="social-card">
          <div class="social-head"><div class="social-avatar"><img src="data:image/png;base64,__ICON_T__" alt=""></div>
            <div><div class="social-name">Horizon Retail</div><div class="social-sub">sponsored &middot; reach growing</div></div></div>
          <div class="bar-row" id="barRow"></div>
          <div class="engage-row"><span><b>8.2k</b> reach</span><span><b>412</b> clicks</span><span><b>5.0%</b> CTR</span></div>
        </div>
      </div>
      <div class="panel" data-panel="2">
        <div class="panel-kicker">// branding</div><div class="panel-title">Identity delivered \u2014 Horizon Retail</div>
        <div class="brand-row"><img src="data:image/png;base64,__ICON_T__" alt=""><span>HORIZON RETAIL</span></div>
        <div class="swatch-row"><div class="swatch" style="background:#5E5DE5;"></div><div class="swatch" style="background:#05060A;border-color:rgba(255,255,255,0.15);"></div><div class="swatch" style="background:#FFFFFF;"></div><div class="swatch" style="background:#8C8BF0;"></div></div>
        <div class="type-sample"><div><div class="aa">Aa</div><div class="meta">BOLD</div></div><div><div class="aa2">Aa</div><div class="meta">REGULAR</div></div></div>
      </div>
    </div>
  </div>
</div></section>

<section class="industries"><div class="wrap">
  <div class="kicker">// who we work with</div>
  <div class="chips">
    <span class="chip chip-static">Supermarkets &amp; retail</span><span class="chip chip-static">Caf\u00e9s &amp; restaurants</span>
    <span class="chip chip-static">Clinics &amp; healthcare</span><span class="chip chip-static">Education</span>
    <span class="chip chip-static">Real estate</span><span class="chip chip-static">Trade &amp; manufacturing</span>
    <span class="chip chip-static">Start-ups</span>
  </div>
</div></section>

<section id="services"><div class="wrap">
  <div class="section-head"><div class="kicker">// what we do</div><h2>Three practices, one team.</h2>
    <p class="section-sub">Software, marketing, and brand, handled by people who talk to each other \u2014 not three agencies you have to coordinate yourself.</p></div>
  <div class="grid c3">
    <a class="cell" href="services.html#software"><div class="num">01</div><h3>Software Solutions</h3><p>Custom web and mobile applications, internal tools, and business systems built for how your company actually operates.</p><span class="more">Explore software &rarr;</span></a>
    <a class="cell" href="services.html#marketing"><div class="num">02</div><h3>Digital Marketing</h3><p>SEO, paid campaigns, social media, and content that\u2019s measured on enquiries and sales, not impressions.</p><span class="more">Explore marketing &rarr;</span></a>
    <a class="cell" href="services.html#branding"><div class="num">03</div><h3>Branding</h3><p>Identity systems, logo design, and brand guidelines \u2014 the kind of brand book you can hand straight to a print shop.</p><span class="more">Explore branding &rarr;</span></a>
  </div>
</div></section>

<section id="why"><div class="wrap">
  <div class="section-head"><div class="kicker">// why clutch code</div><h2>Fewer handoffs. Fewer surprises.</h2>
    <p class="section-sub">Most projects go wrong in the gaps between people. We\u2019re set up to close them.</p></div>
  <div class="grid c2">
    <div class="cell"><div class="num">01</div><h3>One team, one brief</h3><p>Tell us your goals once. The people building the software, running the campaign, and designing the brand all work from the same page.</p></div>
    <div class="cell"><div class="num">02</div><h3>Plain-language everything</h3><p>No jargon in proposals, reports, or meetings. If we can\u2019t explain a decision simply, we haven\u2019t finished thinking about it.</p></div>
    <div class="cell"><div class="num">03</div><h3>Built to be measured</h3><p>Every piece of work has a number attached \u2014 enquiries, hours saved, sales, footfall \u2014 so you can see what\u2019s earning its keep.</p></div>
    <div class="cell"><div class="num">04</div><h3>We stay after launch</h3><p>Software needs maintenance, campaigns need tuning, brands need looking after. We\u2019re still here when the launch party ends.</p></div>
  </div>
</div></section>

<section id="process"><div class="wrap">
  <div class="section-head"><div class="kicker">// how we work</div><h2>We learn the business first.</h2><p class="section-sub">Most proposals skip straight to the pitch. We don\u2019t.</p></div>
  <div class="steps four">
    <div class="step"><div class="step-num">01</div><h3>Discover</h3><p>We learn how your store, team, and customers actually move before we write a line of code or copy.</p></div>
    <div class="step"><div class="step-num">02</div><h3>Plan</h3><p>A written plan with scope, timeline, and the numbers we\u2019ll track \u2014 in plain language you can sign off.</p></div>
    <div class="step"><div class="step-num">03</div><h3>Build &amp; launch</h3><p>Software gets built, campaigns get planned, brands get designed \u2014 in steps you can see along the way.</p></div>
    <div class="step"><div class="step-num">04</div><h3>Grow</h3><p>We stay on to maintain, measure, and improve \u2014 so launch day is a starting line, not a finish line.</p></div>
  </div>
</div></section>

<section id="work"><div class="wrap">
  <div class="section-head"><div class="kicker">// selected work</div><h2>Recent projects.</h2><p class="section-sub">A few examples of what \u201cone team\u201d looks like in practice.</p></div>
  <!-- SAMPLE CONTENT: replace with real projects before launch -->
  <div class="cards">__WORK3__</div>
  <div style="margin-top:34px;"><a class="btn btn-ghost" href="work.html">See all work</a></div>
</div></section>

<section><div class="wrap"><div class="quote-wrap">
  <div class="quote-mark">&ldquo;</div>
  <blockquote>We\u2019d worked with a developer, a marketing freelancer, and a designer before \u2014 separately, and it showed. Clutch Code was the first team that built the software, ran the launch campaign, and kept the brand consistent across all of it.</blockquote>
  <div class="quote-attr"><span class="name">Dana Okafor</span> &middot; Head of Operations</div>
</div></div></section>

<section id="faq"><div class="wrap">
  <div class="section-head"><div class="kicker">// questions</div><h2>Things people ask first.</h2></div>
  __FAQ__
</div></section>
""" + cta()

home = home.replace('__WORK3__', ''.join(work_card(w) for w in WORK[:3]))
home = home.replace('__FAQ__', faq([
    ('Do I have to buy all three services?', 'No. Plenty of clients start with just one \u2014 a website, a campaign, or a brand refresh. The advantage of having all three under one roof shows up when you\u2019re ready to add the next.'),
    ('How long does a typical project take?', 'It depends on scope. As a rough guide, a brand identity takes a few weeks, a marketing campaign can be live in under a month, and custom software is usually measured in months. You\u2019ll get a written timeline before anything starts.'),
    ('Do you work with small businesses?', 'Yes \u2014 most of our clients are small and mid-sized businesses. We\u2019ll scope the work to fit, and tell you honestly if something isn\u2019t worth doing yet.'),
    ('How do you price your work?', 'Projects are fixed-scope; ongoing marketing and support run monthly. We don\u2019t publish a price list because no two businesses need the same thing \u2014 you\u2019ll get a clear written quote after our first conversation.'),
    ('What happens after launch?', 'We stay on if you want us to: maintaining and improving the software, tuning campaigns against the numbers, and keeping the brand consistent as you grow. If you\u2019d rather take things in-house, we\u2019ll hand over cleanly.'),
    ('Who owns the work?', 'You do. Source code, design files, brand assets, and ad accounts are handed over to you.'),
]))
layout('index.html', 'Clutch Code \u2014 Software, Digital Marketing & Branding',
       'Clutch Code builds custom software, runs digital marketing, and designs brands for growing businesses \u2014 one team, three practices.', home)

# =====================================================================  SERVICES
def service_block(sid, kicker, h, lede, extra, deliver, fit):
    return """
<section id="%s"><div class="wrap"><div class="split">
  <div><div class="kicker">%s</div><h2>%s</h2><p class="lede">%s</p>
    <a class="btn btn-primary" href="contact.html?interest=%s">Talk to us about %s</a>%s</div>
  <div>
    <div class="panel-box"><h4>What we deliver</h4><ul class="ticks">%s</ul></div>
    <div class="panel-box"><h4>A good fit if</h4><ul class="ticks">%s</ul></div>
  </div>
</div></div></section>""" % (sid, kicker, h, lede, sid, {'software': 'software', 'marketing': 'marketing', 'branding': 'branding'}[sid],
                              extra, ''.join('<li>%s</li>' % d for d in deliver), ''.join('<li>%s</li>' % f for f in fit))

services = """
<section class="page-hero"><div class="wrap">
  <div class="eyebrow">// services</div>
  <h1>Software, marketing, and brand. Built together.</h1>
  <p class="lede">Three practices that share one brief, one plan, and one team \u2014 so what we build, how we promote it, and how it looks all point the same way.</p>
  <div class="subnav"><a class="chip" href="#software">Software Solutions</a><a class="chip" href="#marketing">Digital Marketing</a><a class="chip" href="#branding">Branding</a><a class="chip" href="#models">How we engage</a></div>
</div></section>
""" + service_block(
    'software', '// 01 \u00b7 software', 'Software Solutions',
    'Custom applications and business systems designed around how your company actually works \u2014 not the other way round.',
    '<div class="callout">Prefer something ready-made? <a href="clutchkart.html">Meet ClutchKart &rarr;</a> our supermarket and retail management platform.</div>',
    ['<b>Web applications</b> \u2014 portals, booking systems, dashboards, customer-facing products',
     '<b>Mobile apps</b> \u2014 iOS and Android, from first prototype to store release',
     '<b>Internal tools</b> \u2014 replace the spreadsheets and WhatsApp threads running your operations',
     '<b>Business systems</b> \u2014 billing, inventory, CRM, and reporting that talk to each other',
     '<b>Integrations &amp; APIs</b> \u2014 connect payment gateways, accounting tools, and the software you already use',
     '<b>Maintenance &amp; support</b> \u2014 updates, monitoring, and fixes after launch'],
    ['Your business runs on spreadsheets that only one person understands',
     'Off-the-shelf software forces workarounds your team is tired of',
     'You have an idea for a product and need it taken from sketch to launch']) + \
    service_block(
    'marketing', '// 02 \u00b7 marketing', 'Digital Marketing',
    'Marketing that\u2019s tied to enquiries and sales \u2014 planned, run, and reported on in plain numbers.',
    '',
    ['<b>SEO &amp; content</b> \u2014 be found by people already searching for what you do',
     '<b>Paid advertising</b> \u2014 Google and Meta campaigns with budgets that are tracked to the rupee',
     '<b>Social media management</b> \u2014 consistent, on-brand posting and community replies',
     '<b>Email &amp; WhatsApp campaigns</b> \u2014 keep existing customers coming back',
     '<b>Landing pages &amp; conversion</b> \u2014 turn visits into enquiries',
     '<b>Analytics &amp; reporting</b> \u2014 a monthly report you can read in five minutes'],
    ['You have a good product or service, but not enough people know about it',
     'You\u2019re spending on ads without knowing what\u2019s working',
     'Your social channels are active but not bringing in business']) + \
    service_block(
    'branding', '// 03 \u00b7 branding', 'Branding',
    'A brand that looks and sounds like one business everywhere \u2014 signage, packaging, social, and screen.',
    '',
    ['<b>Brand strategy</b> \u2014 positioning, audience, and the voice you\u2019ll speak in',
     '<b>Logo &amp; visual identity</b> \u2014 mark, colours, typography, and usage rules',
     '<b>Brand guidelines</b> \u2014 a proper brand book, not a three-page PDF',
     '<b>Packaging &amp; print</b> \u2014 cards, letterheads, labels, and signage artwork',
     '<b>Digital templates</b> \u2014 social posts, presentations, and email signatures',
     '<b>Website look &amp; feel</b> \u2014 the identity carried through to your online presence'],
    ['You\u2019re launching a new business and want to start with a strong identity',
     'You\u2019ve outgrown your first logo or your name has changed',
     'Your brand looks different on every channel']) + """
<section id="models"><div class="wrap">
  <div class="section-head"><div class="kicker">// how we engage</div><h2>Pick the model that fits.</h2><p class="section-sub">Every engagement starts with a conversation and a written plan.</p></div>
  <div class="grid c3">
    <div class="cell"><div class="num">A</div><h3>Fixed-scope project</h3><p>A defined deliverable with a clear timeline and price \u2014 a brand identity, a website, an app, a campaign launch.</p></div>
    <div class="cell"><div class="num">B</div><h3>Monthly retainer</h3><p>Ongoing marketing, content, or software support for a steady monthly fee, with a report every month.</p></div>
    <div class="cell"><div class="num">C</div><h3>Embedded team</h3><p>A dedicated group working alongside your people for larger, longer programmes of work.</p></div>
  </div>
</div></section>
""" + cta()
layout('services.html', 'Services \u2014 Clutch Code',
       'Custom software, digital marketing, and branding from one team. See what we deliver and how we work with clients.', services, 'services.html')

# =====================================================================  CLUTCHKART
ck = """
<section class="page-hero"><div class="wrap hero-split">
  <div>
    <div class="badge">// clutchkart &middot; by Clutch Code</div>
    <h1>Run the whole supermarket from one screen.</h1>
    <p class="lede">ClutchKart is our billing, inventory, and store-management platform \u2014 built for supermarkets and retail chains that are done reconciling stock by hand at midnight.</p>
    <div class="hero-ctas"><a href="contact.html?interest=clutchkart" class="btn btn-primary btn-lg">Request a demo</a><a href="#features" class="btn btn-ghost btn-lg">See features</a></div>
  </div>
  <div class="console">
    <div class="console-bar"><span class="tab-btn active" style="cursor:default;flex:none;padding:9px 14px;"><span class="tdot"></span>ClutchKart &middot; Counter 2</span></div>
    <div class="rcpt">
      <div class="row"><span>Basmati Rice 5kg</span><b>&#8377;540.00</b></div>
      <div class="row"><span>Sunflower Oil 1L</span><b>&#8377;210.00</b></div>
      <div class="row"><span>Toor Dal 1kg</span><b>&#8377;140.00</b></div>
      <div class="sep"></div>
      <div class="row"><span>Subtotal</span><b>&#8377;890.00</b></div>
      <div class="row"><span>Loyalty discount (5%)</span><b>&minus;&#8377;44.50</b></div>
      <div class="sep"></div>
      <div class="row total"><span>Total</span><b>&#8377;845.50</b></div>
      <div class="flags"><span class="flag ok">stock updated</span><span class="flag ok">3 branches in sync</span><span class="flag warn">low stock: Toor Dal &middot; 12 left</span></div>
    </div>
  </div>
</div></section>

<section id="features"><div class="wrap">
  <div class="section-head"><div class="kicker">// features</div><h2>Everything the counter, the stockroom, and the office need.</h2></div>
  <div class="grid c4">
    <div class="cell"><div class="num">01</div><h3>Point of sale</h3><p>Fast billing at the counter with barcode scanning, held bills, and returns.</p></div>
    <div class="cell"><div class="num">02</div><h3>Inventory &amp; stock</h3><p>Live stock levels per item, with low-stock alerts before the shelf empties.</p></div>
    <div class="cell"><div class="num">03</div><h3>Multi-branch</h3><p>Run one store or fifteen from the same dashboard, with per-branch reporting.</p></div>
    <div class="cell"><div class="num">04</div><h3>Reports &amp; analytics</h3><p>Daily, weekly, and monthly sales by item, category, cashier, and branch.</p></div>
    <div class="cell"><div class="num">05</div><h3>Vendors &amp; purchase orders</h3><p>Track what you\u2019ve ordered, what\u2019s arrived, and what\u2019s overdue.</p></div>
    <div class="cell"><div class="num">06</div><h3>Loyalty &amp; offers</h3><p>Points, repeat-customer discounts, and promotions applied automatically at billing.</p></div>
    <div class="cell"><div class="num">07</div><h3>Offline billing</h3><p>When the internet drops, billing continues and syncs once you\u2019re back online.</p></div>
    <div class="cell"><div class="num">08</div><h3>Tax-ready invoices</h3><p>GST-ready invoices and tax summaries, so month-end filing stops being a project.</p></div>
  </div>
</div></section>

<section><div class="wrap"><div class="split">
  <div><div class="kicker">// built for</div><h2>Stores that have outgrown the ledger.</h2>
    <p class="lede">ClutchKart suits retailers who need to see stock, sales, and suppliers in one place.</p></div>
  <div class="panel-box"><h4>A good fit for</h4><ul class="ticks">
    <li><b>Single-store supermarkets</b> moving off paper bills or basic billing software</li>
    <li><b>Neighbourhood grocery chains</b> adding second and third branches</li>
    <li><b>Multi-branch retailers</b> who need one view of stock across stores</li>
    <li><b>Wholesale-and-retail mixes</b> that bill at different price levels</li>
  </ul></div>
</div></div></section>

<section id="rollout"><div class="wrap">
  <div class="section-head"><div class="kicker">// rollout</div><h2>From first visit to go-live.</h2><p class="section-sub">We do the setup with you \u2014 you don\u2019t get a login and a manual.</p></div>
  <div class="steps four">
    <div class="step"><div class="step-num">01</div><h3>Store walkthrough</h3><p>We see how your counters, stockroom, and back office work today.</p></div>
    <div class="step"><div class="step-num">02</div><h3>Setup &amp; import</h3><p>Products, prices, suppliers, and opening stock loaded from your existing sheets.</p></div>
    <div class="step"><div class="step-num">03</div><h3>Staff training</h3><p>Hands-on sessions for cashiers and managers, on your own hardware.</p></div>
    <div class="step"><div class="step-num">04</div><h3>Go-live support</h3><p>We\u2019re on hand through the first week of real trading, and after.</p></div>
  </div>
</div></section>

<section id="faq"><div class="wrap">
  <div class="section-head"><div class="kicker">// questions</div><h2>ClutchKart FAQ.</h2></div>
  __FAQ__
</div></section>
""" + cta('See ClutchKart on your own store\u2019s data.', 'Book a demo and we\u2019ll walk through billing, stock, and reports using a sample of your product list.', 'Request a demo', 'contact.html?interest=clutchkart')
ck = ck.replace('__FAQ__', faq([
    ('Do I need special hardware?', 'No. ClutchKart runs on a standard PC or tablet and works with common barcode scanners and receipt printers. We\u2019ll check what you already have before suggesting anything new.'),
    ('What happens if the internet goes down?', 'Billing keeps working in offline mode. Sales are stored on the device and sync to your other counters and branches as soon as the connection returns.'),
    ('Can I move my existing product list across?', 'Yes. We import products, prices, suppliers, and opening stock from your spreadsheets or current billing software as part of setup.'),
    ('How many branches can it handle?', 'From one store to a full chain. Each branch has its own stock and reports, and you get a combined view on top.'),
    ('Who supports it after go-live?', 'The same team that set it up. You\u2019ll have a direct line to us for questions, fixes, and updates.'),
    ('Can ClutchKart be customised?', 'Yes. Because we build custom software too, we can adapt reports, receipts, and workflows to how your stores run.'),
]))
layout('clutchkart.html', 'ClutchKart \u2014 Supermarket & Retail Management Software | Clutch Code',
       'ClutchKart is billing, inventory, and multi-branch management software for supermarkets and retail chains, built by Clutch Code.', ck)

# =====================================================================  WORK
work = """
<section class="page-hero"><div class="wrap">
  <div class="eyebrow">// work</div>
  <h1>What \u201cone team\u201d looks like in practice.</h1>
  <p class="lede">A selection of projects across software, marketing, and branding \u2014 each with the problem we started from and what changed.</p>
  <div class="subnav">
    <button class="chip on" data-filter="all">All</button><button class="chip" data-filter="software">Software</button>
    <button class="chip" data-filter="marketing">Marketing</button><button class="chip" data-filter="branding">Branding</button>
  </div>
</div></section>
<section style="border-top:none; padding-top:24px;"><div class="wrap">
  <!-- SAMPLE CONTENT: replace project names, descriptions and results with real work before launch -->
  <div class="cards">__ALL__</div>
</div></section>
""" + cta('Want your project on this page?', 'Tell us what you\u2019re working on and we\u2019ll tell you how we\u2019d approach it.')
work = work.replace('__ALL__', ''.join(work_card(w) for w in WORK))
layout('work.html', 'Work \u2014 Clutch Code', 'Selected software, digital marketing, and branding projects by Clutch Code.', work, 'work.html')

# =====================================================================  ABOUT
about = """
<section class="page-hero"><div class="wrap">
  <div class="eyebrow">// about</div>
  <h1>A small team that dislikes handoffs.</h1>
  <p class="lede">Clutch Code is a software, digital marketing, and branding company. We exist so that businesses don\u2019t have to translate between three different vendors.</p>
</div></section>

<section><div class="wrap"><div class="split">
  <div class="prose">
    <div class="kicker">// our story</div><h2>Why one team?</h2>
    <p>Most businesses end up hiring a developer, a marketer, and a designer \u2014 separately. Then they spend months playing messenger between them, repeating the same brief and fixing things that fell into the gaps.</p>
    <p><b>We built Clutch Code to close those gaps.</b> The people building your software, running your campaigns, and designing your brand sit in the same team and work from the same plan.</p>
    <p>We also build our own product, ClutchKart, a management platform for supermarkets. It keeps us honest: we know what it takes to ship, support, and improve something real, not just advise on it.</p>
  </div>
  <div class="big-mark"><img src="data:image/png;base64,__ICON_T__" alt="Clutch Code mark"></div>
</div></div></section>

<section><div class="wrap">
  <div class="section-head"><div class="kicker">// what guides us</div><h2>Three ideas we work by.</h2></div>
  <div class="grid c3">
    <div class="cell"><div class="num">01</div><h3>Precision</h3><p>Clean geometry, sharp details, no ornament for its own sake. The small things are the job.</p></div>
    <div class="cell"><div class="num">02</div><h3>Momentum</h3><p>We ship in steps you can see. Progress you can point at beats a big reveal at the end.</p></div>
    <div class="cell"><div class="num">03</div><h3>Confidence</h3><p>We\u2019ll tell you honestly what will work, what won\u2019t, and what isn\u2019t worth doing yet.</p></div>
  </div>
</div></section>

<section><div class="wrap"><div class="split">
  <div><div class="kicker">// the mark</div><h2>Why the logo looks like that.</h2>
    <p class="lede">Two interlocking blades turn around a single point. It\u2019s the moment separate pieces lock together \u2014 software, marketing, and brand, all clicking into place.</p></div>
  <div class="panel-box"><h4>How we work</h4><ul class="ticks">
    <li><b>One lead per project</b> \u2014 a single person who knows the whole picture</li>
    <li><b>Written plans</b> \u2014 scope, timeline, and success measures before work starts</li>
    <li><b>Regular check-ins</b> \u2014 short, on a fixed day, with something to show</li>
    <li><b>Plain reporting</b> \u2014 numbers you can read without a glossary</li>
    <li><b>Clean handover</b> \u2014 you own the work and can take it elsewhere</li>
  </ul></div>
</div></div></section>

<section><div class="wrap">
  <div class="section-head"><div class="kicker">// the team</div><h2>The people behind the work.</h2></div>
  <!-- PLACEHOLDER: replace names, roles and bios with real team members -->
  <div class="team">
    <div class="person"><div class="avatar">CC</div><h3>[Name]</h3><div class="role">Founder &middot; Software Lead</div><p>Leads engineering and keeps every project grounded in how the business actually runs.</p></div>
    <div class="person"><div class="avatar">CC</div><h3>[Name]</h3><div class="role">Head of Marketing</div><p>Plans and runs campaigns, and makes sure every rupee spent is tied to a result.</p></div>
    <div class="person"><div class="avatar">CC</div><h3>[Name]</h3><div class="role">Brand &amp; Design Director</div><p>Shapes identities and keeps the look and voice consistent across every channel.</p></div>
  </div>
</div></section>
""" + cta('Let\u2019s talk about your business.', 'Tell us where you are and where you want to be \u2014 we\u2019ll take it from there.')
about = about.replace('__ICON_T__', ICON_T)
layout('about.html', 'About \u2014 Clutch Code', 'Clutch Code is one team for software, digital marketing, and branding. Learn how we work and what guides us.', about, 'about.html')

# =====================================================================  CONTACT
contact = """
<section class="page-hero" style="padding-bottom:40px;"><div class="wrap">
  <div class="eyebrow">// contact</div>
  <h1>Tell us what you\u2019re building.</h1>
  <p class="lede">Software, a campaign, a brand, or all three. Share a few details and we\u2019ll get back to you with next steps.</p>
</div></section>

<section style="border-top:none; padding-top:24px; padding-bottom:110px;"><div class="wrap"><div class="contact-grid">
  <div class="form-card">
    <form id="contactForm" novalidate>
      <div class="two">
        <div class="field"><label for="f-name">Your name</label><input type="text" id="f-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="f-email">Work email</label><input type="email" id="f-email" name="email" required autocomplete="email"></div>
      </div>
      <div class="two">
        <div class="field"><label for="f-company">Company</label><input type="text" id="f-company" name="company" autocomplete="organization"></div>
        <div class="field"><label for="f-phone">Phone (optional)</label><input type="tel" id="f-phone" name="phone" autocomplete="tel"></div>
      </div>
      <div class="field"><span class="lab">I\u2019m interested in</span>
        <div class="pick">
          <label><input type="checkbox" name="interest" value="software"><span>Software</span></label>
          <label><input type="checkbox" name="interest" value="marketing"><span>Digital marketing</span></label>
          <label><input type="checkbox" name="interest" value="branding"><span>Branding</span></label>
          <label><input type="checkbox" name="interest" value="clutchkart"><span>ClutchKart demo</span></label>
        </div></div>
      <div class="field"><label for="f-budget">Rough budget (optional)</label>
        <select id="f-budget" name="budget"><option value="">Not sure yet</option><option>Under \u20b950,000</option><option>\u20b950,000 \u2013 \u20b92,00,000</option><option>\u20b92,00,000 \u2013 \u20b910,00,000</option><option>\u20b910,00,000+</option></select></div>
      <div class="field"><label for="f-msg">What are you trying to achieve?</label><textarea id="f-msg" name="message"></textarea></div>
      <button type="submit" class="btn btn-primary btn-lg">Send message</button>
      <div class="note">We\u2019ll only use your details to reply to this enquiry.</div>
    </form>
    <div class="success" id="formSuccess">
      <img src="data:image/png;base64,__ICON_T__" alt="">
      <h3>Thanks \u2014 message received.</h3>
      <p>Someone from our team will reply within one business day.</p>
    </div>
  </div>

  <aside>
    <div class="panel-box side-steps"><h4>What happens next</h4>
      <div class="step"><div class="step-num">01</div><h3>We reply</h3><p>Within one business day, to set up a short call.</p></div>
      <div class="step"><div class="step-num">02</div><h3>We talk</h3><p>A 30-minute conversation about your goals \u2014 no sales script.</p></div>
      <div class="step" style="margin-bottom:0;"><div class="step-num">03</div><h3>You get a plan</h3><p>A written proposal with scope, timeline, and price.</p></div>
    </div>
    <div class="panel-box"><h4>Reach us directly</h4>
      <!-- PLACEHOLDER details: replace with real contact information -->
      <div class="detail"><div class="k">Email</div><div class="v">hello@clutchcode.com</div></div>
      <div class="detail"><div class="k">Phone</div><div class="v">[Phone number]</div></div>
      <div class="detail"><div class="k">Office</div><div class="v">[Office address]</div></div>
      <div class="detail" style="margin-bottom:0;"><div class="k">Hours</div><div class="v">Mon &ndash; Fri &middot; 9:00 &ndash; 18:00</div></div>
    </div>
  </aside>
</div></div></section>
"""
contact = contact.replace('__ICON_T__', ICON_T)
layout('contact.html', 'Contact \u2014 Clutch Code', 'Talk to Clutch Code about software, digital marketing, branding, or a ClutchKart demo.', contact, 'contact.html')

print('built:', sorted(os.listdir(OUT)))
