/* CoHealth single-page helpers:
 * - mobile menu toggle (closes after tapping a link)
 * - scroll-spy: highlights the nav link of the section in view
 * - keeps the footer copyright year current
 */
(function () {
  "use strict";

  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.add("hidden");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
      } else {
        mobileMenu.classList.remove("hidden");
        menuToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  // Close the mobile menu after tapping any link inside it
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  // Scroll-spy: mark the nav link of the section currently in view
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            document.querySelectorAll(".nav-link").forEach(function (el) {
              el.setAttribute("data-active", el.getAttribute("data-nav") === id ? "true" : "false");
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  // ---------- Dark Mode Toggle ----------
  // Theme initialization happens in the inline <head> script (flash-free,
  // OS-aware). This section only switches the theme, fades the colors, and
  // keeps the icon / aria-label / browser-chrome color in sync.
  var themeToggle = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");
  var htmlElement = document.documentElement;
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme) {
    var isDark = theme === "dark";

    // Enable the color fade for the duration of the switch. The double
    // requestAnimationFrame guarantees the transition property is committed
    // before the colors change, so the browser actually animates them.
    htmlElement.classList.add("theme-transition");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        htmlElement.classList.toggle("dark", isDark);
      });
    });

    themeIcon.textContent = isDark ? "light_mode" : "dark_mode";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    if (themeColorMeta) themeColorMeta.setAttribute("content", isDark ? "#121412" : "#fcf9f8");

    localStorage.setItem("theme", theme);
    clearTimeout(window.__themeTransitionTimer);
    window.__themeTransitionTimer = setTimeout(function () {
      htmlElement.classList.remove("theme-transition");
    }, 400);
  }

  // Sync icon/aria/meta with the state the head script already applied
  // (no theme write, no transition).
  var startDark = htmlElement.classList.contains("dark");
  themeIcon.textContent = startDark ? "light_mode" : "dark_mode";
  themeToggle.setAttribute("aria-label", startDark ? "Switch to light mode" : "Switch to dark mode");
  if (themeColorMeta) themeColorMeta.setAttribute("content", startDark ? "#121412" : "#fcf9f8");

  // Toggle on click (state read from the DOM, not localStorage)
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(htmlElement.classList.contains("dark") ? "light" : "dark");
    });
  }

  // Keep the footer copyright year current
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
