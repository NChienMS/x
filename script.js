(function () {
  const page = document.getElementById("page");
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const toast = document.getElementById("toast");

  // Theme init
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startDark = savedTheme ? (savedTheme === "dark") : prefersDark;
  setTheme(startDark ? "dark" : "light");

  toggleBtn.addEventListener("click", () => {
    setTheme(page.classList.contains("dark") ? "light" : "dark");
  });

  function setTheme(mode) {
    const isDark = mode === "dark";
    page.classList.toggle("dark", isDark);
    localStorage.setItem("theme", mode);
    if (isDark) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  // Toast
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
  }

  // Modal helpers
  function openModal(modalEl) {
    modalEl.classList.add("show");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(modalEl) {
    modalEl.classList.remove("show");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // ✅ Chỉ bấm nút X mới đóng: event delegation chỉ bắt [data-close]
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-close]");
    if (!closeBtn) return;

    const type = closeBtn.getAttribute("data-close"); // "avatar" | "bank"
    const modal = document.getElementById(type === "avatar" ? "avatarModal" : "bankModal");
    if (modal && modal.classList.contains("show")) closeModal(modal);
  });

  // Avatar modal
  const openAvatarBtn = document.getElementById("openAvatar");
  const avatarModal = document.getElementById("avatarModal");
  openAvatarBtn.addEventListener("click", () => openModal(avatarModal));

  // Bank modal
  const bankModal = document.getElementById("bankModal");
  const bankName = document.getElementById("bankName");
  const bankOwnerLabel = document.getElementById("bankOwnerLabel");
  const bankAccount = document.getElementById("bankAccount");
  const bankQr = document.getElementById("bankQr");
  const copyBtn = document.getElementById("copyAccountBtn");

  let currentAccountToCopy = "";

  document.querySelectorAll("[data-bank][data-account][data-qr]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bank = btn.getAttribute("data-bank") || "Ngân hàng";
      const owner = btn.getAttribute("data-owner") || "—";
      const account = btn.getAttribute("data-account") || "";
      const qr = btn.getAttribute("data-qr") || "";

      bankName.textContent = bank;
      bankOwnerLabel.textContent = owner;
      bankAccount.textContent = account;

      // reset src tránh lỗi “lúc hiện lúc không”
      bankQr.removeAttribute("src");
      bankQr.setAttribute("src", qr);

      currentAccountToCopy = account;
      openModal(bankModal);
    });
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(currentAccountToCopy);
      if (navigator.vibrate) navigator.vibrate(15);
      showToast(`✅ Đã copy: ${currentAccountToCopy}`);
    } catch {
      showToast("⚠️ Không copy được (trình duyệt chặn).");
    }
  });
})();
