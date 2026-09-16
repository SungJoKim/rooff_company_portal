"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileLayout = window.matchMedia("(max-width: 900px)");

function closeMenu(returnFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (returnFocus) menuButton.focus();
}

if (menuButton && navigation) {
  menuButton.hidden = false;
  document.documentElement.classList.add("menu-ready");
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
  });
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !mobileLayout.matches) return;
    closeMenu();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  mobileLayout.addEventListener("change", () => {
    const focusWillBeHidden =
      mobileLayout.matches && navigation.contains(document.activeElement);
    closeMenu(focusWillBeHidden);
  });
}

const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");
if (copyButton && copyStatus && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("mypet0415@gmail.com");
      copyStatus.textContent = "이메일 주소를 복사했습니다.";
    } catch {
      copyStatus.textContent =
        "복사하지 못했습니다. 위 이메일 주소를 직접 선택해 복사해 주세요.";
    }
  });
}

const year = document.querySelector("#copyright-year");
if (year) year.textContent = String(Math.max(2026, new Date().getFullYear()));
