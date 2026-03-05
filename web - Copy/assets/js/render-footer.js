// render-footer.js - xử lý footer chung (contact/info/form/map)

window.initFooterUI = function (siteConfig) {
  // contact links
  const footerPhone = document.getElementById("footer-phone");
  const footerEmail = document.getElementById("footer-email");
  const footerMap = document.getElementById("footer-map");
  const footerSocial = document.getElementById("footer-social");

  const hotline = siteConfig?.contact?.hotlineNumber || siteConfig?.contact?.phoneFooter || "";
  if (footerPhone && hotline) {
    const tel = hotline.replace(/[^\d+]/g, "");
    footerPhone.setAttribute("href", `tel:${tel}`);
    footerPhone.textContent = hotline;
  }

  const email = siteConfig?.contact?.email || "";
  if (footerEmail && email) {
    footerEmail.setAttribute("href", `mailto:${email}`);
    footerEmail.textContent = email;
  }

  const mapUrl = siteConfig?.social?.googleMapEmbedUrl || "";
  if (footerMap && mapUrl) footerMap.setAttribute("src", mapUrl);

  // social icons
  if (footerSocial) {
    footerSocial.innerHTML = "";
    const socials = [];
    if (siteConfig?.social?.facebookPageUrl) socials.push({href: siteConfig.social.facebookPageUrl, title: 'Facebook', icon: '<img src="/assets/img/general/fb.png" alt="Facebook">'});
    if (siteConfig?.contact?.zalo) socials.push({href: `https://zalo.me/${(siteConfig.contact.zalo||'').replace(/[^\d]/g,'')}`, title:'Zalo', icon: '<img src="/assets/img/general/zalo.png" alt="Zalo">'});
    if (siteConfig?.social?.youtubeEmbedUrl) socials.push({href: siteConfig.social.youtubeEmbedUrl, title:'YouTube', icon: '<img src="/assets/img/general/youtobe.png" alt="YouTube">'});
    if (siteConfig?.social?.tiktokUrl) socials.push({href: siteConfig.social.tiktokUrl, title:'TikTok', icon: '<img src="/assets/img/general/tiktok.png" alt="TikTok">'}); // ensure tiktok.png is added to assets/img
    socials.forEach(s => {
      const a = document.createElement('a');
      a.href = s.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = s.title;
      a.innerHTML = s.icon;
      footerSocial.appendChild(a);
    });
  }

  // consult form handling
  const form = document.getElementById('footer-consult-form');
  const msgEl = document.getElementById('consult-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = (form.querySelector('[name="phone"]')?.value || '').replace(/[^\d+]/g, '').trim();
      const name = (form.querySelector('[name="name"]')?.value || '').trim();
      if (!phone || phone.length < 7) {
        if (msgEl) msgEl.textContent = 'Vui lòng nhập số điện thoại hợp lệ.';
        return;
      }
      if (msgEl) msgEl.textContent = 'Cảm ơn! Chúng tôi sẽ liên hệ sớm.';
      form.reset();
      setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 5000);
    });
  }
};

window.renderFooterMenu = function (menuData) {
  const root = document.getElementById("footer-menu");
  if (!root) return;

  root.innerHTML = "";
  menuData.items.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href || "#";
    a.textContent = item.title;
    li.appendChild(a);
    root.appendChild(li);
  });
};
