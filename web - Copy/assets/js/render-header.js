// render-header.js - Render menu + xử lý dropdown + mobile menu

function createMenuItem(item) {
  const li = document.createElement("li");
  li.className = "nav__item";

  const a = document.createElement("a");
  a.className = "nav__link";
  a.href = item.href || "#";
  a.textContent = item.title;
  li.appendChild(a);

  if (item.children && item.children.length) {
    li.classList.add("has-children");

    // Nút mở submenu cho mobile
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "submenu-toggle";
    btn.setAttribute("aria-label", "Mở danh mục con");
    btn.innerHTML = "▾";
    li.appendChild(btn);

    const ul = document.createElement("ul");
    ul.className = "nav__submenu";

    item.children.forEach((c) => {
      const cli = document.createElement("li");
      const ca = document.createElement("a");
      ca.href = c.href || "#";
      ca.textContent = c.title;
      cli.appendChild(ca);
      ul.appendChild(cli);
    });

    li.appendChild(ul);
  }

  return li;
}

function createMobileMenuItem(item) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = item.href || "#";
  a.textContent = item.title;
  
  li.appendChild(a);
  
  // If has children, create submenu structure
  if (item.children && item.children.length) {
    li.setAttribute("data-has-children", "true");
    
    // Prevent navigation for parent items
    a.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // prevent drawer click listener from closing

      // close any other open siblings
      const parentList = li.parentElement;
      if (parentList) {
        parentList.querySelectorAll(":scope > li.open").forEach((sib) => {
          if (sib !== li) sib.classList.remove("open");
        });
      }

      li.classList.toggle("open");
    });
    
    // Create submenu
    const ul = document.createElement("ul");
    ul.className = "mobile-submenu";
    
    item.children.forEach((c) => {
      const cli = document.createElement("li");
      const ca = document.createElement("a");
      ca.href = c.href || "#";
      ca.textContent = c.title;
      cli.appendChild(ca);
      ul.appendChild(cli);
    });
    
    li.appendChild(ul);
  }
  
  return li;
}

function isMobileToggleVisible() {
  const toggleBtn = document.getElementById("btn-menu-mobile");
  if (!toggleBtn) return false;
  return window.getComputedStyle(toggleBtn).display !== "none";
}

function renderMobileMenuLogo() {
  const mobileNav = document.getElementById("mobile-nav");
  if (!mobileNav) return;

  const existing = mobileNav.querySelector(".mobile-nav__brand");
  if (existing) existing.remove();

  if (!isMobileToggleVisible()) return;

  const brandItem = document.createElement("li");
  brandItem.className = "mobile-nav__brand";

  const brandText = document.createElement("div");
  brandText.className = "mobile-nav__brand-text";
  brandText.textContent = "ĐÁ MỸ NGHỆ QUANG LUYẾN";

  brandItem.appendChild(brandText);
  mobileNav.prepend(brandItem);
}

window.renderHeaderMenu = function (menuData) {
  const root = document.getElementById("mainMenu");
  if (!root) return;

  root.innerHTML = "";
  menuData.items.forEach((item) => root.appendChild(createMenuItem(item)));

  // Cũng render menu cho mobile drawer
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileNav) {
    mobileNav.innerHTML = "";
    menuData.items.forEach((item) => mobileNav.appendChild(createMobileMenuItem(item)));
    renderMobileMenuLogo();
  }
};

window.initHeaderUI = function (siteConfig) {
  // render follow-us icons in header if element present
  const headerSocial = document.getElementById('header-social');
  if (headerSocial && siteConfig) {
    headerSocial.innerHTML = '';
    const socials = [];
    if (siteConfig.social?.facebookPageUrl) socials.push({href: siteConfig.social.facebookPageUrl, title:'Facebook', icon:'<img src="/assets/img/general/fb.png" alt="Facebook">'});
    if (siteConfig.contact?.zalo) socials.push({href:`https://zalo.me/${(siteConfig.contact.zalo||'').replace(/[\D]/g,'')}`, title:'Zalo', icon:'<img src="/assets/img/general/zalo.png" alt="Zalo">'});
    if (siteConfig.social?.youtubeEmbedUrl) socials.push({href: siteConfig.social.youtubeEmbedUrl, title:'YouTube', icon:'<img src="/assets/img/general/youtobe.png" alt="YouTube">'});
    if (siteConfig.social?.tiktokUrl) socials.push({href: siteConfig.social.tiktokUrl, title:'TikTok', icon:'<img src="/assets/img/general/tiktok.png" alt="TikTok">'});
    socials.forEach(s=>{
      const a=document.createElement('a');
      a.href=s.href; a.target='_blank'; a.rel='noopener'; a.title=s.title;
      a.innerHTML=s.icon;
      headerSocial.appendChild(a);
    });
  }

  // Mobile drawer control
  const drawer = document.getElementById("mobile-drawer");
  const toggleBtn = document.getElementById("btn-menu-mobile");
  const closeBtn = document.getElementById("btn-close-drawer");
  const body = document.body;
  
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener("click", () => {
      renderMobileMenuLogo();
      drawer.removeAttribute("hidden");
      body.classList.add("drawer-open");
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => {
      drawer.setAttribute("hidden", "");
      body.classList.remove("drawer-open");
    });
  }

  // Close menu khi click link trong drawer
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) {
        drawer.setAttribute("hidden", "");
        body.classList.remove("drawer-open");
      }
    });
  }

  // Close drawer khi click outside/backdrop
  document.addEventListener("click", (e) => {
    if (!drawer || drawer.hasAttribute("hidden")) return;
    if (!drawer.contains(e.target) && e.target !== toggleBtn) {
      drawer.setAttribute("hidden", "");
      body.classList.remove("drawer-open");
    }
  });

  // Submenu toggle for mobile (if needed)
  document.querySelectorAll(".submenu-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const li = btn.closest(".nav__item");
      if (!li) return;
      li.classList.toggle("open");
    });
  });

  // scroll listener to fix header-menu after topbar scrolls
  const headerTop = document.querySelector(".header-top");
  const menuBar = document.querySelector(".header-menu");
  if (headerTop && menuBar) {
    const offset = headerTop.offsetHeight;
    window.addEventListener("scroll", () => {
      if (window.scrollY >= offset) {
        menuBar.classList.add("fixed");
      } else {
        menuBar.classList.remove("fixed");
      }
    });
  }

  const slider = document.getElementById("header-slider");
  if (slider) {
    const track = slider.querySelector(".header-slider__track");
    const dots = Array.from(slider.querySelectorAll(".header-slider__dot"));
    const prevArrow = slider.querySelector(".header-slider__arrow--prev");
    const nextArrow = slider.querySelector(".header-slider__arrow--next");
    const baseSlides = Array.from(slider.querySelectorAll(".header-slider__slide"));
    let slides = [...baseSlides];
    let activeIndex = baseSlides.findIndex((slide) => slide.classList.contains("is-active"));
    let autoPlayId = null;
    let pointerStartX = 0;
    let pointerCurrentX = 0;
    let activePointerId = null;
    let isDragging = false;
    let currentIndex = 0;
    let isAnimating = false;

    if (activeIndex < 0) activeIndex = 0;
    if (!track || !baseSlides.length) return;

    if (baseSlides.length > 1) {
      const firstClone = baseSlides[0].cloneNode(true);
      const lastClone = baseSlides[baseSlides.length - 1].cloneNode(true);
      firstClone.setAttribute("aria-hidden", "true");
      lastClone.setAttribute("aria-hidden", "true");
      track.insertBefore(lastClone, baseSlides[0]);
      track.appendChild(firstClone);
      slides = Array.from(track.querySelectorAll(".header-slider__slide"));
      currentIndex = activeIndex + 1;
    } else {
      currentIndex = activeIndex;
    }

    const updateDots = (index) => {
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    };

    const getRealIndex = (trackIndex) => {
      if (baseSlides.length <= 1) return 0;
      if (trackIndex === 0) return baseSlides.length - 1;
      if (trackIndex === slides.length - 1) return 0;
      return trackIndex - 1;
    };

    const setTrackPosition = (trackIndex, offsetPx, useTransition) => {
      const sliderWidth = slider.clientWidth || 1;
      track.style.transition = useTransition ? "transform 0.45s ease" : "none";
      track.style.transform = `translateX(${(-trackIndex * sliderWidth) + offsetPx}px)`;
    };

    const syncActiveSlide = () => {
      activeIndex = getRealIndex(currentIndex);
      updateDots(activeIndex);
    };

    const startAutoPlay = () => {
      if (baseSlides.length < 2) return;
      clearInterval(autoPlayId);
      autoPlayId = window.setInterval(() => {
        showSlide(currentIndex + 1);
      }, 4000);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayId);
      autoPlayId = null;
    };

    const revealControls = () => {
      slider.classList.add("is-active");
    };

    const hideControls = () => {
      if (isDragging) return;
      slider.classList.remove("is-active");
    };

    const showNextSlide = () => {
      showSlide(currentIndex + 1);
    };

    const showPrevSlide = () => {
      showSlide(currentIndex - 1);
    };

    const showSlide = (trackIndex, useTransition = true) => {
      if (useTransition && isAnimating) return;

      const maxIndex = slides.length - 1;
      const safeIndex = Math.max(0, Math.min(trackIndex, maxIndex));

      currentIndex = safeIndex;
      isAnimating = useTransition;
      setTrackPosition(currentIndex, 0, useTransition);
      syncActiveSlide();
    };

    const beginDrag = (clientX, pointerId) => {
      if (baseSlides.length < 2 || isAnimating) return;
      activePointerId = pointerId;
      isDragging = true;
      revealControls();
      pointerStartX = clientX;
      pointerCurrentX = clientX;
      stopAutoPlay();
      track.style.transition = "none";
    };

    const moveDrag = (clientX) => {
      if (!isDragging) return;
      pointerCurrentX = clientX;
      setTrackPosition(currentIndex, pointerCurrentX - pointerStartX, false);
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;

      const deltaX = pointerCurrentX - pointerStartX;
      const sliderWidth = slider.clientWidth || 1;
      const minSwipeDistance = Math.min(120, sliderWidth * 0.18);

      if (Math.abs(deltaX) >= minSwipeDistance) {
        if (deltaX < 0) showNextSlide();
        else showPrevSlide();
      } else {
        showSlide(currentIndex);
      }

      activePointerId = null;
      startAutoPlay();
    };

    Array.from(track.querySelectorAll(".header-slider__slide img")).forEach((image) => {
      image.setAttribute("draggable", "false");
      image.addEventListener("dragstart", (event) => event.preventDefault());
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        revealControls();
        showSlide(baseSlides.length > 1 ? index + 1 : index);
        startAutoPlay();
      });
    });

    if (prevArrow) {
      prevArrow.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      prevArrow.addEventListener("click", (event) => {
        event.stopPropagation();
        revealControls();
        stopAutoPlay();
        showPrevSlide();
        startAutoPlay();
      });
    }

    if (nextArrow) {
      nextArrow.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      nextArrow.addEventListener("click", (event) => {
        event.stopPropagation();
        revealControls();
        stopAutoPlay();
        showNextSlide();
        startAutoPlay();
      });
    }

    slider.addEventListener("mouseenter", () => {
      revealControls();
      stopAutoPlay();
    });
    slider.addEventListener("mouseleave", () => {
      hideControls();
      if (!isDragging) startAutoPlay();
    });
    slider.addEventListener("pointerdown", () => {
      revealControls();
    });

    slider.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      beginDrag(event.clientX, event.pointerId);
      if (activePointerId === null) return;
      slider.setPointerCapture(event.pointerId);
    });

    slider.addEventListener("pointermove", (event) => {
      if (event.pointerId !== activePointerId) return;
      moveDrag(event.clientX);
    });

    slider.addEventListener("pointerup", (event) => {
      if (event.pointerId !== activePointerId) return;
      if (slider.hasPointerCapture(event.pointerId)) {
        slider.releasePointerCapture(event.pointerId);
      }
      endDrag();
      revealControls();
    });

    slider.addEventListener("pointercancel", (event) => {
      if (event.pointerId !== activePointerId) return;
      if (slider.hasPointerCapture(event.pointerId)) {
        slider.releasePointerCapture(event.pointerId);
      }
      showSlide(currentIndex);
      activePointerId = null;
      isDragging = false;
      revealControls();
      startAutoPlay();
    });

    track.addEventListener("transitionend", () => {
      if (!isAnimating) return;
      isAnimating = false;
      if (baseSlides.length <= 1) return;

      if (currentIndex === 0) {
        currentIndex = baseSlides.length;
        setTrackPosition(currentIndex, 0, false);
      } else if (currentIndex === slides.length - 1) {
        currentIndex = 1;
        setTrackPosition(currentIndex, 0, false);
      }

      syncActiveSlide();
    });

    window.addEventListener("resize", () => {
      setTrackPosition(currentIndex, 0, false);
    });

    showSlide(currentIndex, false);
    startAutoPlay();
  }

  window.addEventListener("resize", () => {
    renderMobileMenuLogo();
  });
};

