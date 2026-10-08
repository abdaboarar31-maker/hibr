const $ = (s, r = document) => r.querySelector(s);
const money = n => n + CURRENCY;
const catOf = id => CATS.find(c => c.id === id);
const bookOf = id => BOOKS.find(b => b.id === +id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const list = k => { const v = load(k, []); return Array.isArray(v) ? v : []; };

let cart = list('hibr-cart2').filter(id => bookOf(id));
let lib = list('hibr-lib');
let wish = list('hibr-wish');
const subtotal = () => cart.reduce((s, id) => s + bookOf(id).p, 0);

const FILL = {
  ar: 'عبّي كل الحقول المطلوبة بشكل صحيح',
  en: 'Please fill in all required fields correctly',
  fr: 'Veuillez remplir correctement tous les champs',
  es: 'Completa correctamente todos los campos'
};

const COPY = {
  ar: '© حقوق النشر محفوظة لعبد أبو عرار',
  en: '© All rights reserved — Abd Abu Arar',
  fr: '© Tous droits réservés — Abd Abu Arar',
  es: '© Todos los derechos reservados — Abd Abu Arar'
};
const REDIR = {
  ar: 'جاري تحويلك لبوابة الدفع...',
  en: 'Redirecting to the payment gateway...',
  fr: 'Redirection vers la passerelle de paiement...',
  es: 'Redirigiendo a la pasarela de pago...'
};
/* ---------- أدوات ---------- */
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2400);
}

function confetti() {
  const colors = ['#ff4d8d', '#ffc533', '#1fd1a5', '#6240e8', '#ffffff'];
  for (let i = 0; i < 70; i++) {
    const d = document.createElement('div');
    d.className = 'cf';
    d.style.cssText = `left:${Math.random() * 100}vw;background:${colors[i % 5]};` +
      `animation-duration:${1.8 + Math.random() * 1.6}s;animation-delay:${Math.random() * .4}s`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 4000);
  }
}

function drawCart() {
  $('#items').innerHTML = cart.length ? cart.map(id => {
    const b = bookOf(id);
    return `<div class="item"><div class="t">${b.t}<small>${money(b.p)}</small></div>
      <button class="rm" data-rm="${b.id}" aria-label="remove">✕</button></div>`;
  }).join('') : `<p class="empty">${t('cartEmpty')}</p>`;
  $('#cartTotal').textContent = money(subtotal());
  $('#cartCount').textContent = cart.length;
  $('#goPay').classList.toggle('off', !cart.length);
  store('hibr-cart2', cart);
}

function openCart(open) {
  $('#cart').classList.toggle('open', open);
  $('#overlay').classList.toggle('show', open);
}

/* ---------- الرأس والتذييل ---------- */
function layout() {
  const opts = Object.entries(LANGS).map(([k, v]) =>
    `<option value="${k}" ${k === LANG ? 'selected' : ''}>${v.name}</option>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="top">
    <a class="brand" href="#/"><img src="logo.svg" alt="" width="42" height="42"><span>حِبر</span></a>
    <nav class="nav"><a href="#/">${t('home')}</a><a href="#/library">${t('library')}</a></nav>
    <select id="lang" class="lang" aria-label="Language">${opts}</select>
    <button id="cartBtn" class="cart-btn" aria-label="${t('cart')}">🛒 <span class="ct">${t('cart')}</span> <b id="cartCount">0</b></button>
  </header>`);
  document.body.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="foot-brand"><img src="logo.svg" alt="" width="34" height="34"><b>حِبر</b></div>
    <p>${t('tagline')}</p>
    <p class="credit">${t('credit')} <b>عبد أبو عرار</b></p>
  </footer>
  <div id="overlay" class="overlay"></div>
  <aside id="cart" class="cart" aria-label="${t('cart')}">
    <div class="cart-head"><h3>${t('cart')}</h3><button id="closeCart" aria-label="close">✕</button></div>
    <div id="items" class="items"></div>
    <div class="cart-foot">
      <div class="line big"><span>${t('total')}</span><b id="cartTotal">0</b></div>
      <a id="goPay" class="btn full" href="#/checkout">${t('checkout')}</a>
    </div>
  </aside>
  <div id="toast" class="toast" role="status"></div>`);
}

/* ---------- بطاقة الكتاب ---------- */
function card(b) {
  const c = catOf(b.c), own = lib.includes(b.id);
  return `
  <article class="card">
    <div class="cover" style="--h:${c.hue}">
      <button class="heart ${wish.includes(b.id) ? 'on' : ''}" data-heart="${b.id}" aria-label="favorite">♥</button>
      <i>${c.icon}</i><b>${b.t}</b><em>PDF</em>
    </div>
    <div class="info">
      <h4>${b.t}</h4>
           <small>${b.a} · ${t('c_' + b.c)}</small>
      <small style="display:block;opacity:.7;font-size:.75rem;margin-top:2px">${COPY[LANG] || COPY.ar}</small>
      <div class="row"><span class="price">${money(b.p)}</span>
      ${own ? `<a class="add dl" href="${b.file}" download>${t('download')}</a>`
            : `<button class="add" data-add="${b.id}">${t('add')}</button>`}</div>
    </div>
  </article>`;
}

const matches = q => {
  const s = q.toLowerCase();
  return BOOKS.filter(b => (b.t + ' ' + b.a + ' ' + t('c_' + b.c)).toLowerCase().includes(s));
};

/* ---------- الرئيسية ---------- */
function homePage() {
  $('#app').innerHTML = `
  <section class="hero"><div class="hero-in">
    <div class="hero-txt">
      <h1>${t('heroH')}</h1><p>${t('heroP')}</p>
      <form id="hform" class="hsearch" autocomplete="off">
        <input id="hs" type="search" placeholder="${t('heroSearch')}" enterkeyhint="search">
        <button class="sbtn" type="submit" aria-label="search">🔎</button>
        <div id="hres" class="hres"></div>
      </form>
      <button type="button" class="btn" data-go="sections">${t('browse')}</button>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="fl" style="--rot:-9deg;top:10px;inset-inline-start:0;background:linear-gradient(145deg,#ff4d8d,#b3125a)">🎨</div>
      <div class="fl" style="--rot:6deg;top:60px;inset-inline-start:110px;background:linear-gradient(145deg,#ffc533,#f08a00);animation-delay:-1.6s">📖</div>
      <div class="fl" style="--rot:-3deg;top:120px;inset-inline-start:215px;background:linear-gradient(145deg,#1fd1a5,#0a8f77);animation-delay:-3s">💻</div>
    </div>
  </div></section>

  <section class="wrap" id="sections"><h2 class="sec">${t('allCats')}</h2>
    <div class="tiles">${CATS.map(c => `
      <a class="tile" href="#/c/${c.id}" style="--h:${c.hue}">
        <span class="ico">${c.icon}</span><b>${t('c_' + c.id)}</b>
        <small>${BOOKS.filter(b => b.c === c.id).length} ${t('booksN')}</small>
      </a>`).join('')}</div>
  </section>

  <section class="wrap"><h2 class="sec">${t('featured')}</h2>
    <div class="grid">${BOOKS.filter((b, i) => i % 4 === 0).slice(0, 8).map(card).join('')}</div>
  </section>

  <section class="wrap"><h2 class="sec">${t('how')}</h2>
    <div class="steps">
      <div class="step"><b class="n">1</b><span>${t('s1')}</span></div>
      <div class="step"><b class="n">2</b><span>${t('s2')}</span></div>
      <div class="step"><b class="n">3</b><span>${t('s3')}</span></div>
    </div>
  </section>`;

  const hs = $('#hs'), hr = $('#hres');
  hs.addEventListener('input', () => {
    const q = hs.value.trim();
    if (!q) { hr.innerHTML = ''; return; }
    const m = matches(q).slice(0, 5);
    hr.innerHTML = m.length ? m.map(b =>
      `<a href="#/c/${b.c}">${catOf(b.c).icon} ${b.t}<small>${b.a}</small></a>`).join('')
      : `<p>${t('noRes')}</p>`;
  });
  $('#hform').addEventListener('submit', e => {
    e.preventDefault();
    const q = hs.value.trim();
    if (q) location.hash = '#/search/' + encodeURIComponent(q);
  });
}

/* ---------- نتائج البحث ---------- */
function searchPage(q) {
  const items = matches(q);
  $('#app').innerHTML = `<div class="wrap"><h1 class="sec">🔎 ${esc(q)} (${items.length})</h1>
    ${items.length ? `<div class="grid">${items.map(card).join('')}</div>`
      : `<div class="panel center"><p>${t('noRes')}</p><a class="btn" href="#/">${t('shop')}</a></div>`}</div>`;
}

/* ---------- صفحة القسم ---------- */
function categoryPage(id) {
  const cat = catOf(id) || CATS[0];
  const n = BOOKS.filter(b => b.c === cat.id).length;
  document.title = t('c_' + cat.id) + ' — حِبر';
  $('#app').innerHTML = `
  <div class="wrap">
    <div class="cat-head" style="--h:${cat.hue}"><span class="ico">${cat.icon}</span>
      <div><h1>${t('c_' + cat.id)}</h1><p>${n} ${t('booksN')}</p></div></div>
    <nav class="chips">${CATS.map(c =>
      `<a href="#/c/${c.id}" class="${c.id === cat.id ? 'on' : ''}">${c.icon} ${t('c_' + c.id)}</a>`).join('')}</nav>
    <div class="tools">
      <input id="q" type="search" placeholder="${t('search')}">
      <select id="sort">
        <option value="def">${t('sortDef')}</option><option value="low">${t('sortLow')}</option>
        <option value="high">${t('sortHigh')}</option><option value="az">${t('sortAz')}</option>
      </select>
    </div>
    <div id="grid" class="grid"></div>
    <p id="empty" class="empty" hidden>${t('noRes')}</p>
  </div>`;

  function show() {
    const q = $('#q').value.trim().toLowerCase();
    const items = BOOKS.filter(b => b.c === cat.id && (b.t + ' ' + b.a).toLowerCase().includes(q));
    const s = $('#sort').value;
    if (s === 'low') items.sort((a, b) => a.p - b.p);
    if (s === 'high') items.sort((a, b) => b.p - a.p);
    if (s === 'az') items.sort((a, b) => a.t.localeCompare(b.t, LANG));
    $('#grid').innerHTML = items.map(card).join('');
    $('#empty').hidden = items.length > 0;
  }
  $('#q').addEventListener('input', show);
  $('#sort').addEventListener('change', show);
  show();
}

/* ---------- مكتبتي ---------- */
function libraryPage() {
  const mine = lib.map(bookOf).filter(Boolean);
  const favs = wish.map(bookOf).filter(Boolean);
  const block = (title, items, emptyMsg) => `
    <h2 class="sec">${title}</h2>
    ${items.length ? `<div class="grid">${items.map(card).join('')}</div>`
      : `<div class="panel center"><p>${emptyMsg}</p><a class="btn" href="#/">${t('shop')}</a></div>`}`;
  $('#app').innerHTML = `<div class="wrap">${block(t('bought'), mine, t('libEmpty'))}
    <div class="gap"></div>${block(t('favT'), favs, t('favEmpty'))}</div>`;
}

/* ---------- الدفع ---------- */
function checkoutPage() {
  const ids = [...cart];
  if (!ids.length) {
    $('#app').innerHTML = `<div class="wrap"><div class="panel center"><p>${t('emptyCheckout')}</p>
      <a class="btn" href="#/">${t('shop')}</a></div></div>`;
    return;
  }
  const PAYS = [['card', '💳', t('pay_card')], ['paypal', '🅿️', 'PayPal'], ['apple', '🍎', 'Apple Pay'],
    ['google', '🔵', 'Google Pay'], ['bank', '🏦', t('pay_bank')], ['wallet', '📱', t('pay_wallet')],
    ['crypto', '₿', t('pay_crypto')]];

  $('#app').innerHTML = `
  <div class="wrap"><h1 class="sec">${t('checkout')}</h1>
  <div id="layout" class="co-layout">
    <form id="form" class="panel" novalidate>
      <h3>1. ${t('details')}</h3>
      <div class="fields">
        <label>${t('name')}<input name="name" autocomplete="name"></label>
        <label>${t('email')}<input name="email" type="email" autocomplete="email"></label>
        <label class="full">${t('country')}<input name="country" autocomplete="country-name"></label>
        <p class="note full">${t('emailNote')}</p>
      </div>
      <h3>2. ${t('payTitle')}</h3>
      <div class="pay many">${PAYS.map(([v, i, n], k) => `
        <label class="opt"><input type="radio" name="pay" value="${v}" ${k ? '' : 'checked'}><span>${i} ${n}</span></label>`).join('')}</div>
      <div id="payBox" class="fields"></div>
      <button class="btn full" type="submit">${t('confirm')}</button>
    </form>
    <aside class="panel sum"><h3>${t('summary')}</h3>
      ${ids.map(id => { const b = bookOf(id); return `<div class="line"><span>${b.t}</span><b>${money(b.p)}</b></div>`; }).join('')}
      <div class="line big"><span>${t('total')}</span><b>${money(subtotal())}</b></div>
    </aside>
  </div>
  <div id="done" class="panel center" hidden></div></div>`;

  const form = $('#form');

  function payBox() {
    const v = new FormData(form).get('pay');
    $('#payBox').innerHTML = v === 'card'
      ? `<p class="note full">${t('demoNote')}</p>
         <label class="full">${t('cardNum')}<input id="cn" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000"></label>
         <label>${t('exp')}<input id="ce" inputmode="numeric" maxlength="5" placeholder="MM/YY"></label>
         <label>${t('cvv')}<input id="cc" inputmode="numeric" maxlength="4" placeholder="CVV"></label>`
      : `<p class="note full">${v === 'bank' ? t('bankNote') : t('redirectNote')} ${t('demoNote')}</p>`;
  }
  form.addEventListener('change', e => { if (e.target.name === 'pay') payBox(); });
  form.addEventListener('input', e => {
    const el = e.target;
    if (el.id === 'cn') el.value = el.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (el.id === 'ce') {
      let v = el.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      el.value = v;
    }
    if (el.id === 'cc') el.value = el.value.replace(/\D/g, '');
  });
  payBox();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const name = String(f.get('name') || '').trim();
    const email = String(f.get('email') || '').trim();
    const pay = f.get('pay');
    let ok = name.length > 0 && /^\S+@\S+\.\S+$/.test(email);
    if (pay === 'card') {
      ok = ok && $('#cn').value.replace(/\s/g, '').length >= 13
        && /^\d{2}\/\d{2}$/.test($('#ce').value) && /^\d{3,4}$/.test($('#cc').value);
    }
    if (!ok) { toast(FILL[LANG] || FILL.ar); return; }
    
    if (pay !== 'card' && !form.dataset.go) {
      form.dataset.go = '1';
      form.querySelector('button[type="submit"]').disabled = true;
      toast(REDIR[LANG] || REDIR.ar);
      setTimeout(() => form.requestSubmit(), 1800);
      return;
    }

    const no = 'HB-' + String(Date.now()).slice(-6);
    const orders = list('hibr-orders');
    orders.push({ no, name, email, country: f.get('country'), pay, total: subtotal(), items: ids });
    store('hibr-orders', orders);
    lib = [...new Set([...lib, ...ids])];
    store('hibr-lib', lib);
    cart = []; drawCart();

    $('#layout').hidden = true;
    const d = $('#done'); d.hidden = false;
    d.innerHTML = `<div class="check">✓</div><h2>${t('thanks')}</h2><p id="doneMsg"></p>
      <div class="dls">${ids.map(id => { const b = bookOf(id);
        return `<a class="btn" href="${b.file}" download>⬇️ ${b.t}</a>`; }).join('')}</div>
      <a href="#/library"><u>${t('library')}</u></a>`;
    $('#doneMsg').textContent = t('doneMsg').replace('{name}', name).replace('{no}', no);
    window.scrollTo(0, 0);
    confetti();
  });
}

/* ---------- التنقل بين الصفحات ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const parts = h.split('/');
  let arg = parts.slice(1).join('/');
  try { arg = decodeURIComponent(arg); } catch (e) {}
  document.title = 'حِبر';
  if (parts[0] === 'c') categoryPage(arg);
  else if (parts[0] === 'search') searchPage(arg);
  else if (parts[0] === 'checkout') checkoutPage();
  else if (parts[0] === 'library') libraryPage();
  else homePage();
  window.scrollTo(0, 0);
}

/* ---------- تشغيل ---------- */
layout();
drawCart();

document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { const el = document.getElementById(go.dataset.go); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }

  const add = e.target.closest('[data-add]');
  if (add) {
    const id = +add.dataset.add;
    if (cart.includes(id)) toast(t('already'));
    else {
      cart.push(id); drawCart(); toast(t('added'));
      const btn = $('#cartBtn'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
    }
    return;
  }
  const heart = e.target.closest('[data-heart]');
  if (heart) {
    const id = +heart.dataset.heart;
    wish = wish.includes(id) ? wish.filter(i => i !== id) : [...wish, id];
    store('hibr-wish', wish);
    heart.classList.toggle('on', wish.includes(id));
    return;
  }
  const rm = e.target.closest('[data-rm]');
  if (rm) { cart = cart.filter(i => i !== +rm.dataset.rm); drawCart(); return; }

  if (e.target.closest('#cartBtn')) openCart(true);
  if (e.target.closest('#closeCart') || e.target.id === 'overlay' || e.target.closest('#goPay')) openCart(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });
$('#lang').addEventListener('change', e => {
  try { localStorage.setItem('hibr-lang', e.target.value); } catch (err) {}
  location.reload();
});
window.addEventListener('hashchange', route);
route();
