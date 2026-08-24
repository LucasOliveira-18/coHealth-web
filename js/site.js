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

  // Keep the footer copyright year current
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
