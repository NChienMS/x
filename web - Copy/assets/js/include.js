// Shared layout bootstrap.

async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Khong tai duoc ${url}`);
  el.innerHTML = await res.text();
}

async function loadJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Khong tai duoc JSON: ${url}`);
  return res.json();
}

function setByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function escapeHTML(value) {
  return String(value ?? "")
    .normalize("NFC")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function bindSiteData(siteConfig, assetsConfig) {
  document.querySelectorAll("[data-site]").forEach((node) => {
    const path = node.getAttribute("data-site");
    const val = setByPath(siteConfig, path);
    if (val !== undefined) node.textContent = val;
  });

  document.querySelectorAll("[data-site-href]").forEach((node) => {
    const path = node.getAttribute("data-site-href");
    const val = setByPath(siteConfig, path);
    if (val === undefined) return;

    if (path === "contact.email") {
      node.setAttribute("href", `mailto:${val}`);
      return;
    }

    node.setAttribute("href", val);
  });

  document.querySelectorAll("[data-site-src]").forEach((node) => {
    const path = node.getAttribute("data-site-src");
    const val = setByPath(siteConfig, path);
    if (val !== undefined) node.setAttribute("src", val);
  });

  document.querySelectorAll("[data-asset]").forEach((node) => {
    const key = node.getAttribute("data-asset");
    const val = assetsConfig[key];
    if (!val) return;

    if (node.tagName === "IMG") node.setAttribute("src", val);
    else node.style.backgroundImage = `url('${val}')`;
  });

  const hotline = setByPath(siteConfig, "contact.hotlineNumber");
  if (hotline) {
    const tel = hotline.replace(/[^\d+]/g, "");
    document.querySelectorAll("[data-hotline]").forEach((node) => {
      node.setAttribute("href", `tel:${tel}`);
      if (!node.textContent) node.textContent = hotline;
    });
  }

  const zalo = setByPath(siteConfig, "contact.zalo");
  if (zalo) {
    const zaloNum = zalo.replace(/[^\d]/g, "");
    document.querySelectorAll("[data-site-href='contact.zalo']").forEach((node) => {
      node.setAttribute("href", `https://zalo.me/${zaloNum}`);
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-hotline]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("vibrating");
      setTimeout(() => btn.classList.remove("vibrating"), 500);
    });
  });
}

function createSidebarMenu(menuData, pathname) {
  const items = menuData?.items || [];

  return items.map((item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const isTopActive = pathname === item.href || item.children?.some((child) => child.href === pathname);

    return `
      <li class="${hasChildren ? "has-children" : ""}">
        ${hasChildren ? `
          <div class="sidebar-menu__parent">
            <a class="sidebar-menu__link ${isTopActive ? "is-active" : ""}" href="${item.href}">${escapeHTML(item.title)}</a>
            <button class="sidebar-menu__toggle ${isTopActive ? "is-open" : ""}" type="button" aria-expanded="${isTopActive ? "true" : "false"}" aria-label="Mo danh muc ${escapeHTML(item.title)}">
              <span></span>
            </button>
          </div>
          <ul class="sidebar-submenu ${isTopActive ? "is-open" : ""}">
            ${item.children.map((child) => `
              <li>
                <a class="${pathname === child.href ? "is-active" : ""}" href="${child.href}">${escapeHTML(child.title)}</a>
              </li>
            `).join("")}
          </ul>
        ` : `
          <a class="sidebar-menu__link ${isTopActive ? "is-active" : ""}" href="${item.href}">${escapeHTML(item.title)}</a>
        `}
      </li>
    `;
  }).join("");
}

function initSidebarAccordion() {
  document.querySelectorAll(".sidebar-menu__toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const item = button.closest("li");
      const submenu = item?.querySelector(".sidebar-submenu");
      if (!submenu) return;

      const willOpen = !submenu.classList.contains("is-open");
      submenu.classList.toggle("is-open", willOpen);
      button.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });
}

function initCatalogGrids() {
  document.querySelectorAll("[data-catalog-grid]").forEach((root) => {
    if (root.dataset.catalogReady === "true") return;

    const scriptId = root.getAttribute("data-source");
    const dataNode = scriptId ? document.getElementById(scriptId) : null;
    if (!dataNode) return;

    let items = [];
    try {
      items = JSON.parse(dataNode.textContent || "[]");
    } catch (error) {
      console.error("Invalid catalog data", error);
      return;
    }

    const pageSize = Number(root.getAttribute("data-page-size")) || 12;
    const listEl = root.querySelector(".catalog-grid");
    const paginationEl = root.querySelector(".catalog-pagination");
    if (!listEl || !paginationEl) return;

    root.dataset.catalogReady = "true";

    let currentPage = 1;
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

    const renderPage = (page) => {
      currentPage = Math.max(1, Math.min(page, totalPages));
      const startIndex = (currentPage - 1) * pageSize;
      const pageItems = items.slice(startIndex, startIndex + pageSize);

      listEl.innerHTML = pageItems.map((item) => `
        <article class="catalog-card">
          <a class="catalog-card__image-link" href="${escapeHTML(item.href || "#")}">
            <img src="${escapeHTML(item.image || "")}" alt="${escapeHTML(item.name || "")}">
          </a>
          <div class="catalog-card__body">
            <h2 class="catalog-card__title">
              <a class="catalog-card__text-link" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.name || "")}</a>
            </h2>
            <div class="catalog-card__code">
              <a class="catalog-card__text-link" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.code || "")}</a>
            </div>
            <div class="catalog-card__price">${item.price ? escapeHTML(item.price) : "&nbsp;"}</div>
            <a class="catalog-card__button" href="${escapeHTML(item.href || "#")}">Xem thong tin</a>
          </div>
        </article>
      `).join("");

      if (totalPages <= 1) {
        paginationEl.innerHTML = "";
        return;
      }

      paginationEl.innerHTML = Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return `<button class="catalog-pagination__button ${pageNumber === currentPage ? "is-active" : ""}" type="button" data-page="${pageNumber}">${pageNumber}</button>`;
      }).join("");

      paginationEl.querySelectorAll("[data-page]").forEach((button) => {
        button.addEventListener("click", () => {
          renderPage(Number(button.getAttribute("data-page")));
        });
      });
    };

    renderPage(1);
  });
}

function buildHomeIntro(siteConfig) {
  const phone = siteConfig?.contact?.hotlineNumber || "";
  const tel = phone.replace(/[^\d+]/g, "");
  const email = siteConfig?.contact?.email || "";
  const address = siteConfig?.contact?.addressFooter || "";

  return `
    <article class="page-intro">
      <h1>Đá mỹ nghệ Quang Luyến</h1>
      <p class="page-intro__lead">Đá mỹ nghệ Quang Luyến chuyên chế tác và thi công các hạng mục đá tự nhiên, tập trung vào độ bền, sự cân đối và vẻ đẹp tinh xảo trong từng sản phẩm.</p>
      <p>Chúng tôi xuất phát từ xưởng sản xuất trực tiếp tại Ninh Bình, luôn chú trọng chất lượng thi công thực tế và tính đồng bộ của mỗi công trình khi bàn giao.</p>
      <p>Đơn vị nhận tư vấn, thiết kế và thi công nhiều dòng sản phẩm như lăng mộ đá, mộ đá, khu lăng thờ, cột đá, lan can đá, cuốn thư đá, đồ thờ đá, linh vật đá và các hạng mục kiến trúc tâm linh.</p>
      <p>Mỗi hạng mục đều được tính toán theo nhu cầu thực tế để bảo đảm công năng, thẩm mỹ và độ ổn định lâu dài.</p>
      <p>Với tinh thần làm nghề bằng uy tín và sự chỉn chu, Đá mỹ nghệ Quang Luyến cam kết mang đến sản phẩm đá tự nhiên bền đẹp, đúng yêu cầu và đúng tiến độ.</p>
      <div class="page-intro__contact-title">Thông tin liên hệ</div>
      <ul>
        <li><strong>Đá mỹ nghệ Quang Luyến</strong></li>
        <li>Địa chỉ: ${escapeHTML(address)}</li>
        <li>Điện thoại/Zalo: <a href="tel:${escapeHTML(tel)}">${escapeHTML(phone)}</a></li>
        <li>Email: <a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a></li>
      </ul>
    </article>
  `;
}

function createSidebar(siteConfig, menuData, normalizedPath) {
  return `
    <section class="sidebar-card">
      <h2 class="sidebar-card__title">Danh mức chính</h2>
      <div class="sidebar-card__body">
        <ul class="sidebar-menu">${createSidebarMenu(menuData, normalizedPath)}</ul>
      </div>
    </section>
    <section class="sidebar-card">
      <h2 class="sidebar-card__title">Liên hệ nhanh</h2>
      <ul class="sidebar-contact">
        <li>
          <strong>Điện thoại</strong>
          <a href="tel:${escapeHTML((siteConfig?.contact?.hotlineNumber || "").replace(/[^\d+]/g, ""))}">${escapeHTML(siteConfig?.contact?.hotlineNumber || "")}</a>
        </li>
        <li>
          <strong>Email</strong>
          <a href="mailto:${escapeHTML(siteConfig?.contact?.email || "")}">${escapeHTML(siteConfig?.contact?.email || "")}</a>
        </li>
        <li>
          <strong>Địa chỉ</strong>
          <span>${escapeHTML(siteConfig?.contact?.addressFooter || "")}</span>
        </li>
      </ul>
    </section>
  `;
}

function initProjectShowcaseLayout(main, menuData, siteConfig, normalizedPath) {
  const intro = main.querySelector(".project-page-intro");
  const list = main.querySelector(".project-page-list");
  if (!intro || !list) return false;

  main.dataset.layoutReady = "true";
  main.className = "page-main";
  main.removeAttribute("style");

  const section = document.createElement("section");
  section.className = "page-section page-section--content";

  const container = document.createElement("div");
  container.className = "container";

  const inner = document.createElement("div");
  inner.className = "col-inner page-content";

  const introWrap = document.createElement("section");
  introWrap.className = "project-page-intro-wrap";
  introWrap.appendChild(intro);

  const layout = document.createElement("div");
  layout.className = "page-layout layout layout--sidebar";

  const sidebar = document.createElement("aside");
  sidebar.className = "page-sidebar layout__aside";
  sidebar.innerHTML = createSidebar(siteConfig, menuData, normalizedPath);

  const primary = document.createElement("section");
  primary.className = "page-primary page-primary--project layout__main";
  primary.appendChild(list);

  layout.appendChild(sidebar);
  layout.appendChild(primary);
  inner.appendChild(introWrap);
  inner.appendChild(layout);
  container.appendChild(inner);
  section.appendChild(container);
  main.replaceChildren(section);
  return true;
}

function getProductDetailData(main) {
  const dataNode = document.getElementById("product-detail-data");
  if (dataNode) {
    try {
      const parsed = JSON.parse(dataNode.textContent || "{}");
      const images = Array.isArray(parsed.images) && parsed.images.length
        ? parsed.images.map((image, index) => {
            if (typeof image === "string") {
              return {
                src: image,
                alt: `${parsed.title || "Sản phẩm"} ảnh ${index + 1}`
              };
            }

            return {
              src: image.src || "",
              alt: image.alt || `${parsed.title || "Sản phẩm"} ảnh ${index + 1}`
            };
          }).filter((image) => image.src)
        : [];

      return {
        title: parsed.title || "",
        code: parsed.code || "",
        price: parsed.price || "",
        dimensions: parsed.dimensions || "",
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        priceLabel: parsed.priceLabel || "",
        priceNote: parsed.priceNote || "",
        material: parsed.material || "",
        constructionTime: parsed.constructionTime || "",
        warranty: parsed.warranty || "",
        projectType: parsed.projectType || "",
        itemCategory: parsed.itemCategory || "",
        style: parsed.style || "",
        highlights: Array.isArray(parsed.highlights) ? parsed.highlights.filter(Boolean) : [],
        commitment: parsed.commitment || "",
        thumbLabels: Array.isArray(parsed.thumbLabels) ? parsed.thumbLabels : [],
        detailContent: Array.isArray(parsed.detailContent)
          ? parsed.detailContent.filter(Boolean)
          : (parsed.detailContent ? [parsed.detailContent] : []),
        images: images.length ? images : [
          { src: "/assets/img/general/slide1.jpg", alt: `${parsed.title || "Sản phẩm"} ảnh 1` },
          { src: "/assets/img/general/slide2.jpg", alt: `${parsed.title || "Sản phẩm"} ảnh 2` },
          { src: "/assets/img/general/slide3.jpg", alt: `${parsed.title || "Sản phẩm"} ảnh 3` }
        ]
      };
    } catch (error) {
      console.error("Invalid product detail data", error);
    }
  }

  const heading = main.querySelector("h1");
  const paragraphs = Array.from(main.querySelectorAll("p")).map((node) => node.textContent.trim()).filter(Boolean);
  const codeText = paragraphs.find((text) => /^(Mã|Ma)\s*sản phẩm:/i.test(text)) || "";
  const priceText = paragraphs.find((text) => /^Giá/i.test(text)) || "";
  const dimensionsText = paragraphs.find((text) => /^(Kích thước|Kich thuoc):/i.test(text)) || "";
  const codeMatch = (heading?.textContent || "").match(/([A-Z]{2,}-\d+)/i);

  return {
    title: heading?.textContent?.trim() || "Thông tin sản phẩm",
    code: codeText.replace(/^(Mã|Ma)\s*sản phẩm:\s*/i, "") || codeMatch?.[1] || "",
    price: priceText.replace(/^Giá(?: tham khảo)?:\s*/i, ""),
    dimensions: dimensionsText.replace(/^(Kích thước|Kich thuoc):\s*/i, ""),
    tags: ["Thi công trực tiếp", "Giá tại xưởng"],
    priceLabel: "",
    priceNote: "",
    material: "",
    constructionTime: "",
    warranty: "",
    projectType: "",
    itemCategory: "",
    style: "",
    highlights: [],
    commitment: "",
    thumbLabels: [],
    detailContent: [],
    images: [
      { src: "/assets/img/general/slide1.jpg", alt: `${heading?.textContent?.trim() || "Sản phẩm"} ảnh 1` },
      { src: "/assets/img/general/slide2.jpg", alt: `${heading?.textContent?.trim() || "Sản phẩm"} ảnh 2` },
      { src: "/assets/img/general/slide3.jpg", alt: `${heading?.textContent?.trim() || "Sản phẩm"} ảnh 3` }
    ]
  };
}

function getAutoCategoryLinks(pathname, menuData, data) {
  const topCategoryMap = {
    "khu-lang-mo-da": { label: "Khu lăng mộ đá", href: "/pages/khu-lang-mo-da.html" },
    "mau-mo-da-dep": { label: "Mẫu mộ đá đẹp", href: "/pages/mau-mo-da-dep.html" },
    "da-my-nghe": { label: "Đá mỹ nghệ", href: "/pages/da-my-nghe.html" },
    "do-tho-da": { label: "Đồ thờ đá", href: "/pages/do-tho-da.html" },
    "con-vat-da": { label: "Con vật đá", href: "/pages/con-vat-da.html" },
    "san-pham-khac": { label: "Sản phẩm khác", href: "/pages/san-pham-khac.html" },
    "tu-van-san-pham": { label: "Tư vấn sản phẩm", href: "/pages/tu-van-san-pham.html" }
  };

  const links = [];
  const safePath = String(pathname || "").split(/[?#]/)[0];
  const pathSegments = safePath.split("/").filter(Boolean);
  const pagesIndex = pathSegments.indexOf("pages");
  const sectionSlug = pagesIndex >= 0 ? pathSegments[pagesIndex + 1] : "";

  if (sectionSlug && topCategoryMap[sectionSlug]) {
    links.push(topCategoryMap[sectionSlug]);
  }

  const menuItems = Array.isArray(menuData?.items) ? menuData.items : [];
  const normalizedPath = safePath.toLowerCase();
  const parentItem = menuItems.find((item) => {
    const href = String(item?.href || "").toLowerCase();
    if (!href) return false;
    if (href === normalizedPath) return true;
    const hrefPrefix = href.replace(/\.html$/, "/");
    return normalizedPath.startsWith(hrefPrefix);
  });

  if (parentItem?.href && parentItem?.title) {
    const exists = links.some((link) => link.href === parentItem.href);
    if (!exists) {
      links.push({
        label: parentItem.title,
        href: parentItem.href
      });
    }

    const childItem = (Array.isArray(parentItem.children) ? parentItem.children : [])
      .find((item) => String(item?.href || "").toLowerCase() === normalizedPath);

    if (childItem?.href && childItem?.title) {
      links.push({
        label: childItem.title,
        href: childItem.href
      });
    }
  }

  if (!links.length && data?.projectType) {
    links.push({ label: data.projectType, href: "#" });
  }

  return links;
}

function buildProductBreadcrumb(data, menuData) {
  const categoryLinks = getAutoCategoryLinks(window.location.pathname || "", menuData, data);
  const crumbs = [
    { label: "Trang chủ", href: "/index.html" },
    ...categoryLinks
  ];

  const currentLabel = data?.code ? `${data.title} (${data.code})` : (data?.title || "Chi tiết sản phẩm");

  const linksMarkup = crumbs
    .map((item) => `<a href="${escapeHTML(item.href || "#")}">${escapeHTML(item.label || "")}</a>`)
    .join('<span class="page-breadcrumb__sep">/</span>');

  return `
    <nav class="page-breadcrumb" aria-label="Breadcrumb">
      ${linksMarkup}
      <span class="page-breadcrumb__sep">/</span>
      <span class="page-breadcrumb__current">${escapeHTML(currentLabel)}</span>
    </nav>
  `;
}

function mountCategoryLinksSlot(main, inner, breadcrumbMarkup) {
  const externalSlots = Array.from(document.querySelectorAll(".categoryLinks"))
    .filter((slot) => !main.contains(slot));

  if (externalSlots.length) {
    externalSlots.forEach((slot) => {
      slot.innerHTML = breadcrumbMarkup;
    });
    return;
  }

  const defaultSlot = document.createElement("div");
  defaultSlot.className = "categoryLinks";
  defaultSlot.innerHTML = breadcrumbMarkup;
  inner.appendChild(defaultSlot);
}

function normalizePath(pathname) {
  const safePath = String(pathname || "/index.html").split(/[?#]/)[0];
  if (safePath === "/") return "/index.html";
  return safePath;
}

function findTopMenuItem(menuData, pathname) {
  const items = Array.isArray(menuData?.items) ? menuData.items : [];
  let best = null;
  let bestLen = -1;

  items.forEach((item) => {
    const href = String(item?.href || "");
    if (!href) return;
    const exact = pathname === href;
    const prefix = href.replace(/\.html$/, "/");
    const nested = pathname.startsWith(prefix);
    if (!exact && !nested) return;
    if (href.length > bestLen) {
      best = item;
      bestLen = href.length;
    }
  });

  return best;
}

function findAutoChildItem(topItem, pathname) {
  const children = Array.isArray(topItem?.children) ? topItem.children : [];
  const exactChild = children.find((child) => String(child?.href || "") === pathname);
  if (exactChild) return exactChild;

  const autoRules = [
    {
      pattern: /^\/pages\/khu-lang-mo-da\/xkl-\d+\.html$/i,
      childHref: "/pages/khu-lang-mo-da/khuon-vien-lang-mo-dep.html"
    }
  ];

  const rule = autoRules.find((item) => item.pattern.test(pathname));
  if (!rule) return null;
  return children.find((child) => String(child?.href || "") === rule.childHref) || null;
}

function buildAutoBreadcrumbFromPath(menuData) {
  const pathname = normalizePath(window.location.pathname);
  const crumbs = [{ label: "Trang chủ", href: "/index.html" }];
  const topItem = findTopMenuItem(menuData, pathname);

  if (!topItem) {
    const heading = document.querySelector("main h1")?.textContent?.trim() || document.title || "Trang hiện tại";
    crumbs.push({ label: heading });
    return crumbs;
  }

  if (topItem.href !== "/index.html") {
    crumbs.push({ label: topItem.title || "", href: topItem.href || "#" });
  }

  const child = findAutoChildItem(topItem, pathname);
  if (child && child.href !== pathname) {
    crumbs.push({ label: child.title || "", href: child.href || "#" });
  }

  const heading = document.querySelector("main h1")?.textContent?.trim() || document.title || "";
  const currentLabel = heading || (child?.title ? String(child.title) : pathname.split("/").pop() || "Trang hiện tại");
  crumbs.push({ label: currentLabel });
  return crumbs;
}

function initCategoryLinksPlaceholders(menuData) {
  document.querySelectorAll(".categoryLinks").forEach((slot) => {
    if (slot.dataset.ready === "true") return;

    const raw = (slot.getAttribute("data-breadcrumb") || "").trim();
    if (!raw && slot.innerHTML.trim()) return;

    let crumbs = [];
    if (!raw || raw.toLowerCase() === "auto") {
      crumbs = buildAutoBreadcrumbFromPath(menuData);
    } else {
      try {
        crumbs = JSON.parse(raw);
      } catch (error) {
        console.error("Invalid breadcrumb data", error);
        return;
      }
    }

    if (!Array.isArray(crumbs) || !crumbs.length) return;

    const visibleCrumbs = crumbs.slice(0, -1);
    if (!visibleCrumbs.length) {
      slot.innerHTML = "";
      slot.dataset.ready = "true";
      return;
    }

    const links = visibleCrumbs
      .map((item) => `<a href="${escapeHTML(item?.href || "#")}">${escapeHTML(item?.label || "")}</a>`)
      .join('<span class="page-breadcrumb__sep">/</span>');
    slot.innerHTML = `
      <nav class="page-breadcrumb" aria-label="Breadcrumb">
        ${links}
      </nav>
    `;
    slot.dataset.ready = "true";
  });
}

function buildProductDetailMarkup(data, menuData) {
  const price = data.price || "Liên hệ";
  const dimensions = data.dimensions || "Đang cập nhật";
  const mainImage = data.images[0];
  const title = data.code ? `${data.title} (${data.code})` : data.title;
  const tags = Array.isArray(data.tags) && data.tags.length ? data.tags : ["Mẫu mới", "Thi công trực tiếp", "Giá tại xưởng"];
  const categoryLinks = getAutoCategoryLinks(window.location.pathname || "", menuData, data);
  const priceLabel = data.priceLabel || "Giá tham khảo";
  const priceNote = data.priceNote || "Giá có thể thay đổi theo chất liệu, kích thước, hạng mục và địa hình thi công.";
  const material = data.material || "Đá xanh Ninh Bình (tùy chọn)";
  const warranty = data.warranty || "10 năm";
  const projectType = data.projectType || "Khu lăng mộ đá";
  const itemCategory = data.itemCategory || "....";
  const style = data.style || "....";
  const highlights = Array.isArray(data.highlights) && data.highlights.length ? data.highlights : [
    "Thiết kế cân đối, bố cục đồng bộ, bền chắc lâu dài.",
    "Hỗ trợ chỉnh sửa theo diện tích thực tế của gia đình.",
    "Vận chuyển và lắp đặt toàn quốc."
  ];
  const commitment = data.commitment || "Cam kết: thi công trực tiếp tại xưởng - đá chuẩn - đúng tiến độ - hỗ trợ tận nơi.";
  const detailContent = Array.isArray(data.detailContent) && data.detailContent.length
    ? data.detailContent
    : ["Đoạn mô tả chi tiết 1..."];

  return `
    <section class="product-detail">
      <div class="product-detail__layout layout layout--split">
        <section class="product-detail__gallery layout__left">
          <div class="product-detail__main-image">
            <img src="${escapeHTML(mainImage.src)}" alt="${escapeHTML(mainImage.alt)}" data-product-main-image>
          </div>
          <div class="product-detail__thumbs">
            ${data.images.map((image, index) => `
              <button class="product-detail__thumb ${index === 0 ? "is-active" : ""}" type="button" data-product-thumb="${escapeHTML(image.src)}" data-product-thumb-alt="${escapeHTML(image.alt)}" aria-label="Xem ảnh ${index + 1}">
                <img class="product-detail__thumb-image" src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}">
              </button>
            `).join("")}
          </div>
        </section>

        <section class="product-detail__info layout__right">
          <h1 class="fw-bold">${escapeHTML(title)}</h1>
          <section class="product-detail__price-box">
            <div class="product-detail__price-label fw-extrabold">${escapeHTML(priceLabel)}</div>
            <div class="product-detail__price-value fw-black">${escapeHTML(price)}</div>
            <p class="product-detail__price-note">${escapeHTML(priceNote)}</p>
          </section>

          <section class="product-detail__desc-box">
            <div class="product-detail__desc-row"><span class="fw-semibold">Loại công trình:</span> ${escapeHTML(projectType)}</div>
            <div class="product-detail__desc-row"><span class="fw-semibold">Hạng mục:</span> ${escapeHTML(itemCategory)}</div>
            <div class="product-detail__desc-row"><span class="fw-semibold">Phong cách:</span> ${escapeHTML(style)}</div>
            <div class="product-detail__desc-row"><span class="fw-semibold">Chất liệu:</span> ${escapeHTML(material)}</div>
            <div class="product-detail__desc-row"><span class="fw-semibold">Bảo hành:</span> ${escapeHTML(warranty)}</div>
          </section>

          <ul class="product-detail__highlights">
            ${highlights.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
          </ul>

          <button class="product-detail__quote-button quote-request-trigger fw-bold" type="button" data-product-name="${escapeHTML(title)}">Gửi yêu cầu báo giá</button>
          <div class="product-detail__actions">
            <a class="product-detail__action product-detail__action--call fw-bold" href="#" role="button">Gọi tư vấn</a>
            <a class="product-detail__action product-detail__action--zalo fw-bold" href="#" role="button">Chat Zalo</a>
          </div>

          <div class="product-detail__tags">
            <p class="product-detail__tag-line">
              <span class="fw-semibold">Danh mục:</span>
              ${categoryLinks.map((item) => `<a class="product-detail__tag" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.label)}</a>`).join(", ")}
            </p>
            <p class="product-detail__tag-line">
              <span class="fw-semibold">Thẻ:</span>
              ${tags.map((tag) => `<a class="product-detail__tag" href="#">${escapeHTML(tag)}</a>`).join(", ")}
            </p>
          </div>
        </section>
      </div>
      <section class="product-detail__content-full">
        <h2 class="fw-bold">Nội dung chi tiết</h2>
        ${detailContent.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      </section>
    </section>
  `;
}

function initProductGalleries() {
  document.querySelectorAll(".product-detail").forEach((root) => {
    const mainWrap = root.querySelector(".product-detail__main-image");
    let mainImage = root.querySelector("[data-product-main-image]");
    const thumbs = Array.from(root.querySelectorAll("[data-product-thumb]"));
    if (!thumbs.length) return;

    if ((!mainImage || !mainImage.getAttribute("src")) && mainWrap) {
      const firstThumb = thumbs[0];
      const fallbackImg = firstThumb.querySelector("img");
      const firstSrc = firstThumb.getAttribute("data-product-thumb") || fallbackImg?.getAttribute("src") || "";
      const firstAlt = firstThumb.getAttribute("data-product-thumb-alt") || fallbackImg?.getAttribute("alt") || "";

      if (firstSrc) {
        const image = document.createElement("img");
        image.setAttribute("src", firstSrc);
        image.setAttribute("alt", firstAlt);
        image.setAttribute("data-product-main-image", "");
        mainWrap.innerHTML = "";
        mainWrap.appendChild(image);
        mainImage = image;
      }

      thumbs.forEach((node, index) => {
        node.classList.toggle("is-active", index === 0);
      });
    }

    if (!mainImage) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const nextSrc = thumb.getAttribute("data-product-thumb");
        const nextAlt = thumb.getAttribute("data-product-thumb-alt") || mainImage.getAttribute("alt") || "";
        if (!nextSrc) return;

        mainImage.setAttribute("src", nextSrc);
        mainImage.setAttribute("alt", nextAlt);
        thumbs.forEach((node) => node.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });
    });
  });
}

function initInlineProductGalleryData() {
  document.querySelectorAll("[data-gallery-source]").forEach((root) => {
    if (root.dataset.galleryReady === "true") return;

    const sourceId = root.getAttribute("data-gallery-source") || "product-gallery-data";
    const dataNode = sourceId ? document.getElementById(sourceId) : null;
    if (!dataNode) return;

    let images = [];
    try {
      images = JSON.parse(dataNode.textContent || "[]");
    } catch (error) {
      console.error("Invalid gallery data", error);
      return;
    }

    if (!Array.isArray(images) || !images.length) return;

    const normalized = images
      .map((item, index) => {
        if (typeof item === "string") {
          return { src: item, alt: `Ảnh ${index + 1}` };
        }
        return {
          src: item?.src || "",
          alt: item?.alt || `Ảnh ${index + 1}`
        };
      })
      .filter((item) => item.src);

    if (!normalized.length) return;

    const mainWrap = root.querySelector(".product-detail__main-image");
    const thumbsWrap = root.querySelector(".product-detail__thumbs");
    if (!mainWrap || !thumbsWrap) return;

    mainWrap.innerHTML = "";
    thumbsWrap.innerHTML = normalized.map((image, index) => `
      <button class="product-detail__thumb ${index === 0 ? "is-active" : ""}" type="button" data-product-thumb="${escapeHTML(image.src)}" data-product-thumb-alt="${escapeHTML(image.alt)}" aria-label="Xem ảnh ${index + 1}">
        <img class="product-detail__thumb-image" src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}">
      </button>
    `).join("");

    root.dataset.galleryReady = "true";
  });
}

function initInlineProductDetailSections() {
  document.querySelectorAll("[data-product-sections-source]").forEach((root) => {
    if (root.dataset.sectionsReady === "true") return;

    const sourceId = root.getAttribute("data-product-sections-source") || "product-detail-sections-data";
    const dataNode = document.getElementById(sourceId);
    if (!dataNode) return;

    let data = {};
    try {
      data = JSON.parse(dataNode.textContent || "{}");
    } catch (error) {
      console.error("Invalid product detail sections data", error);
      return;
    }

    const priceBox = root.querySelector('[data-product-slot="price-box"]');
    if (priceBox) {
      priceBox.innerHTML = `
        <div class="product-detail__price-label fw-extrabold">${escapeHTML(data.priceLabel || "Giá tham khảo")}</div>
        <div class="product-detail__price-value fw-black">${escapeHTML(data.priceValue || "Liên hệ")}</div>
        <p class="product-detail__price-note">${escapeHTML(data.priceNote || "")}</p>
      `;
    }

    const descBox = root.querySelector('[data-product-slot="desc-box"]');
    if (descBox) {
      const rows = Array.isArray(data.descRows) ? data.descRows : [];
      descBox.innerHTML = rows.map((row) => `
        <div class="product-detail__desc-row"><span class="fw-semibold">${escapeHTML(row?.label || "")}:</span> ${escapeHTML(row?.value || "")}</div>
      `).join("");
    }

    const highlights = root.querySelector('[data-product-slot="highlights"]');
    if (highlights) {
      const items = Array.isArray(data.highlights) ? data.highlights : [];
      highlights.innerHTML = items.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
    }

    const tagLine = root.querySelector('[data-product-slot="tag-line"]');
    if (tagLine) {
      const label = data.tagLineLabel || "Thẻ";
      const tags = Array.isArray(data.tags) ? data.tags : [];
      const links = tags.map((tag) => `<a class="product-detail__tag" href="${escapeHTML(tag?.href || "#")}">${escapeHTML(tag?.label || "")}</a>`).join(", ");
      tagLine.innerHTML = `<span class="fw-semibold">${escapeHTML(label)}:</span>${links ? ` ${links}` : ""}`;
    }

    const contentFull = root.querySelector('[data-product-slot="content-full"]');
    if (contentFull) {
      const title = data.contentTitle || "Nội dung chi tiết";
      const blocks = Array.isArray(data.contentBlocks) ? data.contentBlocks : [];
      const paragraphs = Array.isArray(data.contentParagraphs) ? data.contentParagraphs : [];
      const blockMarkup = blocks.map((block) => {
        const type = String(block?.type || "").toLowerCase();
        if (type === "image") {
          const src = escapeHTML(block?.src || "");
          if (!src) return "";
          const alt = escapeHTML(block?.alt || "");
          return `<p><img src="${src}" alt="${alt}"></p>`;
        }

        if (type === "link") {
          const href = escapeHTML(block?.href || "#");
          const label = escapeHTML(block?.label || href);
          return `<p><a href="${href}" target="_blank" rel="noopener">${label}</a></p>`;
        }

        const text = escapeHTML(block?.text || "");
        return text ? `<p>${text}</p>` : "";
      }).join("");

      const paragraphMarkup = paragraphs.map((text) => `<p>${escapeHTML(text)}</p>`).join("");
      contentFull.innerHTML = `
        <h2 class="fw-bold">${escapeHTML(title)}</h2>
        ${blockMarkup || paragraphMarkup}
      `;
    }

    root.dataset.sectionsReady = "true";
  });
}

function buildDefaultContactModule(siteConfig) {
  const companyName = siteConfig?.brand?.companyLine2 || siteConfig?.brand?.companyShort || "Ten co so";
  const address = siteConfig?.contact?.addressFooter || "";
  const phone = siteConfig?.contact?.hotlineNumber || siteConfig?.contact?.phoneFooter || "";
  const phoneTel = String(phone || "").replace(/[^\d+]/g, "");
  const zalo = siteConfig?.contact?.zalo || phone;
  const zaloDigits = String(zalo || "").replace(/[^\d]/g, "");

  return {
    leadBefore: "Quy khach can tu van thong tin mien phi nhan",
    leadActionText: "TAI DAY",
    leadAfter: ", hoac lien he theo thong tin",
    companyName: companyName,
    items: [
      { key: "company", label: "Ten co so", display: companyName, href: "#", icon: "/assets/img/general/logo.png" },
      { key: "address", label: "Dia chi", display: address || "Xem ban do", href: siteConfig?.social?.googleMapUrl || siteConfig?.social?.googleMapEmbedUrl || "#", icon: "/assets/img/general/logo.png" },
      { key: "phone", label: "Goi", display: phone || "", href: phoneTel ? `tel:${phoneTel}` : "#", icon: "/assets/img/general/call.png" },
      { key: "zalo", label: "Zalo", display: zalo || phone || "", href: zaloDigits ? `https://zalo.me/${zaloDigits}` : "#", icon: "/assets/img/general/zalo.png" },
      { key: "tiktok", label: "TikTok", display: "/tiktok", href: siteConfig?.social?.tiktokUrl || "#", icon: "/assets/img/general/tiktok.png" },
      { key: "youtube", label: "YouTube", display: "/youtube", href: siteConfig?.social?.youtubeUrl || siteConfig?.social?.youtubeEmbedUrl || "#", icon: "/assets/img/general/youtobe.png" },
      { key: "facebook", label: "Facebook", display: "/facebook", href: siteConfig?.social?.facebookPageUrl || "#", icon: "/assets/img/general/fb.png" }
    ]
  };
}

function resolveContactModule(siteConfig) {
  const configured = siteConfig?.contactModule || {};
  const fallback = buildDefaultContactModule(siteConfig);
  const items = Array.isArray(configured.items) && configured.items.length ? configured.items : fallback.items;

  return {
    leadBefore: configured.leadBefore || fallback.leadBefore,
    leadActionText: configured.leadActionText || fallback.leadActionText,
    leadAfter: configured.leadAfter || fallback.leadAfter,
    companyName: configured.companyName || fallback.companyName,
    items: items
  };
}

function buildContactItemMarkup(item) {
  const display = escapeHTML(item?.display || "");
  const href = String(item?.href || "").trim();
  const icon = String(item?.icon || "").trim();
  const opensExternal = String(item?.target || "").toLowerCase() === "_blank" || /^https?:\/\//i.test(href);
  const rel = opensExternal ? ' rel="noopener"' : "";
  const target = opensExternal ? ' target="_blank"' : "";
  const iconMarkup = icon ? `<img class="product-contact-card__item-icon" src="${escapeHTML(icon)}" alt="${display}">` : "";
  const textMarkup = `<span class="product-contact-card__item-id">${display}</span>`;
  const content = `${iconMarkup}${textMarkup}`;

  if (!href) {
    return `
      <li class="product-contact-card__item">
        <span class="product-contact-card__item-link is-static">${content}</span>
      </li>
    `;
  }

  return `
    <li class="product-contact-card__item">
      <a class="product-contact-card__item-link" href="${escapeHTML(href)}"${target}${rel}>${content}</a>
    </li>
  `;
}

function buildProductContactCardMarkup(siteConfig) {
  const moduleData = resolveContactModule(siteConfig);
  const itemsMarkup = moduleData.items
    .filter((item) => String(item?.key || "").toLowerCase() !== "company")
    .map((item) => buildContactItemMarkup(item))
    .join("");

  return `
    <section class="product-contact-card">
      <p class="product-contact-card__lead">
        ${escapeHTML(moduleData.leadBefore)}
        <a href="#global-consult-section" data-scroll-consult>${escapeHTML(moduleData.leadActionText)}</a>
        ${escapeHTML(moduleData.leadAfter)}
      </p>
      <div class="product-contact-card__name">${escapeHTML(moduleData.companyName)}</div>
      <ul class="product-contact-card__list">
        ${itemsMarkup}
      </ul>
    </section>
  `;
}

function initProductContactCards(siteConfig) {
  document.querySelectorAll(".product-detail").forEach((root) => {
    const placeholder = root.querySelector('[data-product-slot="contact-card"]');
    const existingCard = root.querySelector(".product-contact-card:not([data-product-slot='contact-card'])");
    if (!placeholder && existingCard) return;

    if (placeholder) {
      placeholder.outerHTML = buildProductContactCardMarkup(siteConfig);
      return;
    }

    const target = root.querySelector(".product-detail__content-full");
    const wrapper = document.createElement("div");
    wrapper.innerHTML = buildProductContactCardMarkup(siteConfig);
    const card = wrapper.firstElementChild;
    if (!card) return;

    if (target) {
      target.insertAdjacentElement("afterend", card);
    } else {
      root.appendChild(card);
    }
  });

  if (document.body.dataset.productContactScrollReady === "true") return;
  document.body.dataset.productContactScrollReady = "true";

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-scroll-consult]");
    if (!trigger) return;

    const consultSection = document.getElementById("global-consult-section");
    if (!consultSection) return;
    event.preventDefault();
    consultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initFontWeightUtilities() {
  const map = [
    { selector: ".sidebar-card__title", cls: "fw-bold" },
    { selector: ".sidebar-submenu a.is-active", cls: "fw-bold" },
    { selector: ".page-intro__lead", cls: "fw-bold" },
    { selector: ".page-intro__contact-title", cls: "fw-bold" },
    { selector: ".project-page-intro__label", cls: "fw-semibold" },
    { selector: ".catalog-card__title", cls: "fw-bold" },
    { selector: ".catalog-card__code", cls: "fw-bold" },
    { selector: ".catalog-card__price", cls: "fw-bold" },
    { selector: ".catalog-card__button", cls: "fw-bold" },
    { selector: ".product-detail__info h1", cls: "fw-bold" },
    { selector: ".product-detail__code", cls: "fw-bold" },
    { selector: ".product-detail__price-label", cls: "fw-extrabold" },
    { selector: ".product-detail__price-value", cls: "fw-black" },
    { selector: ".product-detail__spec-card p", cls: "fw-extrabold" },
    { selector: ".product-detail__quote-button", cls: "fw-bold" },
    { selector: ".product-detail__action", cls: "fw-bold" },
    { selector: ".product-detail__commitment", cls: "fw-bold" },
    { selector: ".catalog-pagination__button", cls: "fw-bold" },
    { selector: ".header-text", cls: "fw-bold" },
    { selector: ".brand__title", cls: "fw-bold" },
    { selector: ".header-right .follow-us", cls: "fw-semibold" },
    { selector: ".hotline-link", cls: "fw-black" },
    { selector: ".nav__link", cls: "fw-bold" },
    { selector: ".nav__submenu a", cls: "fw-medium" },
    { selector: ".header-slogan__inner", cls: "fw-bold" },
    { selector: ".mobile-nav a", cls: "fw-semibold" },
    { selector: ".mobile-submenu a", cls: "fw-medium" },
    { selector: ".mobile-drawer .btn-close-drawer", cls: "fw-bold" },
    { selector: ".mobile-nav a[data-has-children]", cls: "fw-bold" },
    { selector: ".footer-title", cls: "fw-bold" },
    { selector: ".embed-placeholder", cls: "fw-bold" }
  ];

  map.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((node) => node.classList.add(cls));
  });
}

function initImagePreviewLightbox() {
  if (document.getElementById("image-preview-lightbox")) return;

  const lightbox = document.createElement("div");
  lightbox.id = "image-preview-lightbox";
  lightbox.className = "image-preview-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="image-preview-lightbox__backdrop" data-image-preview-close></div>
    <div class="image-preview-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Xem truoc anh">
      <button class="image-preview-lightbox__close" type="button" data-image-preview-close aria-label="Dong">x</button>
      <img class="image-preview-lightbox__img" src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);

  const previewImg = lightbox.querySelector(".image-preview-lightbox__img");
  if (!previewImg) return;

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove("image-preview-open");
  };

  const open = (src, alt) => {
    if (!src) return;
    previewImg.setAttribute("src", src);
    previewImg.setAttribute("alt", alt || "");
    lightbox.hidden = false;
    document.body.classList.add("image-preview-open");
  };

  lightbox.querySelectorAll("[data-image-preview-close]").forEach((node) => {
    node.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-product-main-image]");
    if (!target) return;
    open(target.getAttribute("src"), target.getAttribute("alt"));
  });
}

function initQuoteModal() {
  const scrollToConsult = () => {
    const consultSection = document.getElementById("global-consult-section");
    if (!consultSection) return;
    consultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".quote-request-trigger, button, a");
    if (!trigger) return;

    const text = normalize(trigger.textContent || "");
    const shouldScroll =
      trigger.classList.contains("quote-request-trigger") ||
      text.includes("gui yeu cau bao gia") ||
      text.includes("gui yeu cau tu van");

    if (!shouldScroll) return;
    if (trigger.closest("#global-consult-section")) return;
    event.preventDefault();
    scrollToConsult();
  });
}

function initProductDetailLayout(main, menuData) {
  const data = getProductDetailData(main);

  main.dataset.layoutReady = "true";
  main.className = "page-main";
  main.removeAttribute("style");

  const section = document.createElement("section");
  section.className = "page-section page-section--content";

  const container = document.createElement("div");
  container.className = "container";

  const inner = document.createElement("div");
  inner.className = "col-inner page-content";
  const breadcrumbMarkup = buildProductBreadcrumb(data, menuData);
  mountCategoryLinksSlot(main, inner, breadcrumbMarkup);

  const layout = document.createElement("div");
  layout.className = "layout layout--full";

  const primary = document.createElement("section");
  primary.className = "page-primary page-primary--product page-primary--product-detail layout__main";
  primary.innerHTML = buildProductDetailMarkup(data, menuData);

  layout.appendChild(primary);
  inner.appendChild(layout);
  container.appendChild(inner);
  section.appendChild(container);
  main.replaceChildren(section);
}

function initPageLayout(menuData, siteConfig) {
  const main = document.querySelector("main");
  if (!main || main.dataset.layoutReady === "true") return;

  const pathname = window.location.pathname || "/index.html";
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const isHomePage = normalizedPath === "/index.html" || normalizedPath.endsWith("/index.html");
  const hasProductDetailData = Boolean(document.getElementById("product-detail-data"));

  if (main.dataset.layout === "project-showcase") {
    const handled = initProjectShowcaseLayout(main, menuData, siteConfig, normalizedPath);
    if (handled) return;
  }

  if (hasProductDetailData) {
    initProductDetailLayout(main, menuData);
    return;
  }

  const originalNodes = Array.from(main.childNodes);

  main.dataset.layoutReady = "true";
  main.className = "page-main";
  main.removeAttribute("style");

  const section = document.createElement("section");
  section.className = "page-section page-section--content";

  const container = document.createElement("div");
  container.className = "container";

  const inner = document.createElement("div");
  inner.className = "col-inner page-content";

  const layout = document.createElement("div");
  layout.className = "page-layout layout layout--sidebar";

  const sidebar = document.createElement("aside");
  sidebar.className = "page-sidebar layout__aside";
  sidebar.innerHTML = createSidebar(siteConfig, menuData, normalizedPath);

  const primary = document.createElement("section");
  primary.className = "page-primary layout__main";

  if (isHomePage) {
    primary.innerHTML = buildHomeIntro(siteConfig);
  } else {
    originalNodes.forEach((node) => {
      primary.appendChild(node);
    });
  }

  layout.appendChild(sidebar);
  layout.appendChild(primary);
  inner.appendChild(layout);
  container.appendChild(inner);
  section.appendChild(container);
  main.replaceChildren(section);
}

function initGlobalConsultSection() {
  const section = document.getElementById("global-consult-section");
  if (!section) return;
  if (section.dataset.ready === "true") return;

  section.dataset.ready = "true";
  const form = section.querySelector(".global-consult__form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const phone = (form.querySelector('[name=\"phone\"]')?.value || "").replace(/[^\d+]/g, "").trim();
      if (!phone || phone.length < 7) return;
      form.reset();
    });
  }
}
async function bootstrapSharedLayout() {
  await loadPartial("#appHeader", "/partials/header.html");
  await loadPartial("#appHeaderSlider", "/partials/header-slider.html");
  await loadPartial("#appHeaderSlogan", "/partials/header-slogan.html");
  await loadPartial("#appGlobalConsult", "/partials/global-consult.html");
  await loadPartial("#appFooter", "/partials/footer.html");

  const [siteConfig, menuData, assetsConfig] = await Promise.all([
    loadJSON("/data/site.config.json"),
    loadJSON("/data/menu.json"),
    loadJSON("/data/assets.json")
  ]);

  const contactModule = resolveContactModule(siteConfig);
  window.siteContactModule = contactModule;
  window.getSiteContactItem = function (key) {
    return contactModule.items.find((item) => String(item?.key || "") === String(key || "")) || null;
  };

  bindSiteData(siteConfig, assetsConfig);

  if (window.renderHeaderMenu) window.renderHeaderMenu(menuData);
  if (window.renderFooterMenu) window.renderFooterMenu(menuData);

  if (window.initHeaderUI) window.initHeaderUI(siteConfig);
  if (window.initFooterUI) window.initFooterUI(siteConfig);

  initPageLayout(menuData, siteConfig);
  initCategoryLinksPlaceholders(menuData);
  initGlobalConsultSection();
  initSidebarAccordion();
  initCatalogGrids();
  initInlineProductGalleryData();
  initInlineProductDetailSections();
  initProductGalleries();
  initProductContactCards(siteConfig);
  initImagePreviewLightbox();
  initQuoteModal();
  initFontWeightUtilities();
}

document.addEventListener("DOMContentLoaded", () => {
  bootstrapSharedLayout().catch((err) => {
    console.error(err);
  });
});






