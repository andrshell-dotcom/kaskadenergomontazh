(function () {
  var header = document.getElementById("site-header");
  var menuBtn = document.getElementById("menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  var form = document.getElementById("quote-form");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.remove("bg-transparent");
      header.classList.add("bg-foreground-950/95", "backdrop-blur", "border-b", "border-background-100/10");
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove("bg-foreground-950/95", "backdrop-blur", "border-b", "border-background-100/10");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", function () {
      var open = !mobileNav.classList.contains("hidden");
      mobileNav.classList.toggle("hidden", open);
      menuBtn.setAttribute("aria-expanded", String(!open));
      var icon = menuBtn.querySelector("i");
      if (icon) icon.className = open ? "ri-menu-line text-xl" : "ri-close-line text-xl";
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        var icon = menuBtn.querySelector("i");
        if (icon) icon.className = "ri-menu-line text-xl";
      });
    });
  }

  document.querySelectorAll("#faq button[aria-expanded]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var panel = item.querySelector(".faq-panel");
      var iconWrap = btn.querySelector(".faq-icon");
      var open = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll("#faq button[aria-expanded]").forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        var otherPanel = other.parentElement.querySelector(".faq-panel");
        var otherIcon = other.querySelector(".faq-icon");
        if (otherPanel) otherPanel.classList.add("hidden");
        if (otherIcon) {
          otherIcon.className = "w-8 h-8 shrink-0 rounded-md flex items-center justify-center transition-colors bg-background-200 text-foreground-700 faq-icon";
          otherIcon.innerHTML = '<i class="ri-add-line"></i>';
        }
      });

      if (!open && panel) {
        btn.setAttribute("aria-expanded", "true");
        panel.classList.remove("hidden");
        if (iconWrap) {
          iconWrap.className = "w-8 h-8 shrink-0 rounded-md flex items-center justify-center transition-colors bg-primary-500 text-white faq-icon";
          iconWrap.innerHTML = '<i class="ri-subtract-line"></i>';
        }
      }
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.namedItem("name");
      var phone = form.elements.namedItem("phone");
      if (!name.value.trim() || !phone.value.trim()) {
        alert("Укажите имя и телефон.");
        return;
      }
      alert("Заявка принята. Мы свяжемся с вами в течение рабочего дня.");
      form.reset();
    });
  }
})();
