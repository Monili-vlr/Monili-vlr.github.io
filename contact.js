/* MoniliAI contact box, shared by every MoniliAI site.
   - Any link with data-mai-contact="Topic" opens the box over the page (the link still works
     without JavaScript: it points to https://monili-vlr.github.io/#contact).
   - <div data-mai-contact-inline data-topic="..."></div> shows the box inside the page.
   - window.MAIContact.open({ topic, message }) opens it from code.
   Messages are delivered by FormSubmit (formsubmit.co) to the MoniliAI mailbox; the address is
   never written in the pages. To change where messages go, change ENDPOINT only. */
(() => {
  'use strict';
  if (window.MAIContact) return;
  const ENDPOINT = 'https://formsubmit.co/ajax/monili.vlr@gmail.com';
  const PRIVACY = 'https://monili-vlr.github.io/#privacy-contact';

  const css = `
.maic{--c-bg:#FFFFFF;--c-fg:#14151C;--c-mute:#5C6070;--c-line:#DCDCE6;--c-field:#F6F6FA;--c-ok:#0E8F72;--c-err:#C2334D;
  --c-holo:linear-gradient(100deg,#5EEAD4 0%,#A5B4FC 34%,#F0ABFC 66%,#FDBA74 100%);
  position:relative;box-sizing:border-box;width:100%;max-width:560px;margin:0 auto;padding:28px 28px 24px;border-radius:20px;
  background:var(--c-bg);color:var(--c-fg);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:left;
  box-shadow:0 30px 80px -20px rgba(10,12,30,.45),0 0 0 1px var(--c-line);overflow:hidden}
.maic *{box-sizing:border-box}
.maic::before{content:"";position:absolute;inset:0 0 auto;height:4px;background:var(--c-holo)}
.maic h2{margin:0 0 4px;font:700 24px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:-.01em;color:var(--c-fg)}
.maic .maic-sub{margin:0 0 18px;color:var(--c-mute);font-size:14.5px}
.maic form{display:grid;gap:12px}
.maic .maic-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.maic label{display:grid;gap:5px;font-size:13px;font-weight:600;color:var(--c-fg)}
.maic input,.maic textarea,.maic select{width:100%;padding:11px 13px;border-radius:12px;border:1px solid var(--c-line);background:var(--c-field);
  color:var(--c-fg);font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;outline:none;transition:border-color .15s,box-shadow .15s}
.maic textarea{min-height:130px;resize:vertical}
.maic input:focus,.maic textarea:focus,.maic select:focus{border-color:#6366F1;box-shadow:0 0 0 3px rgba(99,102,241,.18)}
.maic .maic-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}
.maic .maic-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-top:4px}
.maic .maic-note{flex:1 1 220px;margin:0;font-size:12.5px;color:var(--c-mute)}
.maic .maic-note a{color:inherit;text-decoration:underline;text-underline-offset:2px}
.maic button[type=submit]{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border:0;border-radius:999px;cursor:pointer;
  background:#14151C;color:#fff;font:700 15px system-ui,-apple-system,"Segoe UI",sans-serif;position:relative}
.maic button[type=submit]::after{content:"";position:absolute;inset:-2px;border-radius:inherit;padding:2px;background:var(--c-holo);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.9}
.maic button[type=submit]:disabled{opacity:.6;cursor:wait}
.maic .maic-msg{margin:0;font-size:14px;font-weight:600}
.maic .maic-msg.ok{color:var(--c-ok)} .maic .maic-msg.err{color:var(--c-err)}
.maic .maic-done{display:grid;gap:8px;padding:18px 0 6px;text-align:center}
.maic .maic-done b{font-size:20px}
.maic .maic-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid var(--c-line);background:var(--c-bg);
  color:var(--c-fg);font:400 20px/1 system-ui,sans-serif;cursor:pointer;display:grid;place-items:center}
dialog.maic-dlg{border:0;padding:16px;background:transparent;width:min(600px,100vw);max-width:100vw;max-height:100dvh;overflow:auto}
dialog.maic-dlg::backdrop{background:rgba(8,10,20,.62);backdrop-filter:blur(3px)}
@media (max-width:520px){.maic{padding:24px 18px 18px;border-radius:16px}.maic .maic-row{grid-template-columns:1fr}.maic h2{font-size:21px}}
@media (prefers-color-scheme:dark){.maic:not(.maic-light){--c-bg:#16171F;--c-fg:#F1F1F6;--c-mute:#A3A6B6;--c-line:#2C2E3B;--c-field:#1E202A;--c-ok:#3FD0B0;--c-err:#FF7A8E}
  .maic:not(.maic-light) button[type=submit]{background:#F1F1F6;color:#14151C}}`;
  const st = document.createElement('style'); st.id = 'maic-css'; st.textContent = css; document.head.appendChild(st);

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let n = 0;

  function card(opts = {}) {
    const id = 'maic' + (++n), topic = opts.topic || 'MoniliAI';
    const box = document.createElement('div'); box.className = 'maic' + (opts.light ? ' maic-light' : '');
    box.innerHTML = `
      ${opts.closable ? '<button type="button" class="maic-x" aria-label="Close">&times;</button>' : ''}
      <h2 id="${id}-h">Write to MoniliAI</h2>
      <p class="maic-sub">About: <b>${esc(topic)}</b>. We answer by email, usually within two working days.</p>
      <form novalidate aria-labelledby="${id}-h">
        <div class="maic-row">
          <label>Name<input name="name" autocomplete="name" maxlength="120"></label>
          <label>Your email<input name="email" type="email" autocomplete="email" required maxlength="200"></label>
        </div>
        <label>Message<textarea name="message" required maxlength="5000"></textarea></label>
        <input class="maic-hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="maic-foot">
          <p class="maic-note">Your email is used only to answer you. <a href="${PRIVACY}" target="_blank" rel="noopener">How we handle it</a>.</p>
          <button type="submit">Send <span aria-hidden="true">→</span></button>
        </div>
        <p class="maic-msg" role="status" aria-live="polite"></p>
      </form>`;
    const form = box.querySelector('form'), msg = box.querySelector('.maic-msg'), btn = box.querySelector('button[type=submit]');
    if (opts.message) form.message.value = opts.message;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      msg.className = 'maic-msg'; msg.textContent = '';
      const email = form.email.value.trim(), text = form.message.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.className = 'maic-msg err'; msg.textContent = 'Please write a valid email, so we can answer you.'; form.email.focus(); return; }
      if (!text) { msg.className = 'maic-msg err'; msg.textContent = 'Please write a message.'; form.message.focus(); return; }
      if (form._honey.value) return; // a bot filled the hidden field
      btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
      try {
        const r = await fetch(ENDPOINT, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: form.name.value.trim() || '(no name)', email, message: text, topic, page: location.href,
            _subject: `MoniliAI · ${topic}`, _replyto: email, _template: 'table', _captcha: 'false' })
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'not sent');
        form.replaceWith(Object.assign(document.createElement('div'), { className: 'maic-done', innerHTML: '<b>Thank you, message sent.</b><span>We will answer at ' + esc(email) + '.</span>' }));
      } catch (err) {
        const why = String(err && err.message || '');
        msg.className = 'maic-msg err';
        msg.textContent = /activat/i.test(why)
          ? 'The contact box is waiting for its one-time activation by MoniliAI. Please try again later.'
          : 'The message could not be sent right now' + (why && why !== 'not sent' && !/fetch/i.test(why) ? ' (' + why.slice(0, 120) + ')' : '') + '. Please try again in a moment.';
        btn.disabled = false; btn.firstChild.textContent = 'Send ';
      }
    });
    return box;
  }

  function open(opts = {}) {
    const dlg = document.createElement('dialog'); dlg.className = 'maic-dlg';
    const box = card({ ...opts, closable: true }); dlg.appendChild(box); document.body.appendChild(dlg);
    const close = () => { dlg.close(); };
    dlg.addEventListener('close', () => dlg.remove());
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });
    box.querySelector('.maic-x').addEventListener('click', close);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    setTimeout(() => (opts.message ? box.querySelector('input[name=email]') : box.querySelector('input[name=name]')).focus(), 30);
    return dlg;
  }

  function mount() {
    document.querySelectorAll('[data-mai-contact-inline]').forEach(el => { if (!el.querySelector('.maic')) el.replaceChildren(card({ topic: el.dataset.topic, light: 'light' in el.dataset })); });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('[data-mai-contact]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0) return;
    e.preventDefault(); open({ topic: a.dataset.maiContact || 'MoniliAI' });
  });
  window.MAIContact = { open, mount };
  mount(); if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
})();
