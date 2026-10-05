(function () {
  const page = document.getElementById("page");
  const toggleBtn = document.getElementById("themeToggle");
  const toast = document.getElementById("toast");
  const openAvatarBtn = document.getElementById("openAvatar");
  const avatarModal = document.getElementById("avatarModal");
  const bankModal = document.getElementById("bankModal");
  const bankName = document.getElementById("bankName");
  const bankOwnerLabel = document.getElementById("bankOwnerLabel");
  const bankAccount = document.getElementById("bankAccount");
  const bankQr = document.getElementById("bankQr");
  const copyBtn = document.getElementById("copyAccountBtn");

  let toastTimer = null;
  let activeModal = null;
  let lastFocusedElement = null;
  let currentBankInfoToCopy = "";

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  toggleBtn.addEventListener("click", () => {
    setTheme(page.classList.contains("dark") ? "light" : "dark");
  });

  openAvatarBtn.addEventListener("click", () => openModal(avatarModal));

  document.querySelectorAll("[data-bank][data-account][data-qr]").forEach((button) => {
    button.addEventListener("click", () => {
      const bank = button.dataset.bank || "Ngân hàng";
      const owner = button.dataset.owner || "NGUYEN VAN CHIEN";
      const account = button.dataset.account || "";
      const qr = button.dataset.qr || "";

      bankName.textContent = bank;
      bankOwnerLabel.textContent = owner;
      bankAccount.textContent = account || "---";
      bankQr.removeAttribute("src");
      bankQr.src = qr;
      const copyOwner = button.dataset.copyOwner || owner;
      currentBankInfoToCopy = account ? [bank, account, copyOwner].join("\n") : "";

      openModal(bankModal);
    });
  });

  document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close]");
    if (!closeButton) return;

    const modal = document.getElementById(closeButton.dataset.close === "avatar" ? "avatarModal" : "bankModal");
    if (modal) closeModal(modal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeModal) closeModal(activeModal);
  });

  copyBtn.addEventListener("click", async () => {
    const copied = await copyText(currentBankInfoToCopy);
    if (navigator.vibrate) navigator.vibrate(15);
    showToast(copied ? "Đã sao chép thông tin ngân hàng." : "Trình duyệt đang chặn copy.");
  });

  function setTheme(mode) {
    const isDark = mode === "dark";
    page.classList.toggle("dark", isDark);
    toggleBtn.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#101318" : "#eef2f7");
  }

  function openModal(modal) {
    lastFocusedElement = document.activeElement;
    activeModal = modal;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = modal.querySelector(".modal__close");
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeModal = null;

    if (lastFocusedElement) lastFocusedElement.focus({ preventScroll: true });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
  }

  async function copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      return copied;
    }
  }
})();
