(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var ids = ["intro", "partnership", "case-plan", "case-example", "contact"];
  var byNav = {};
  var links = document.querySelectorAll(".sidebar-link[data-nav]");
  for (var j = 0; j < links.length; j++) {
    var a = links[j];
    var k = a.getAttribute("data-nav");
    if (k) byNav[k] = a;
  }
  if (!Object.keys(byNav).length) return;

  function setActive(id) {
    for (var key in byNav) {
      if (Object.prototype.hasOwnProperty.call(byNav, key)) {
        byNav[key].classList.toggle("is-active", key === id);
      }
    }
  }

  var offsetY = 100;

  function onScroll() {
    var active = "intro";
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      var r = el.getBoundingClientRect();
      if (r.top <= offsetY) active = ids[i];
    }
    setActive(active);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
})();

(function () {
  var lb = document.getElementById("photo-lightbox");
  if (!lb) return;
  var lbImg = lb.querySelector(".lightbox__img");
  if (!lbImg) return;
  var triggers = document.querySelectorAll(".js-photo-lightbox");
  if (!triggers.length) return;

  var lastFocus = null;

  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.removeAttribute("hidden");
    document.body.classList.add("lightbox-open");
    setTimeout(function () {
      var close = lb.querySelector(".lightbox__close");
      if (close) close.focus();
    }, 0);
  }

  function closeLightbox() {
    if (lb.hasAttribute("hidden")) return;
    lb.setAttribute("hidden", "hidden");
    lbImg.removeAttribute("src");
    lbImg.alt = "";
    document.body.classList.remove("lightbox-open");
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function (e) {
      e.preventDefault();
      var im = e.currentTarget.querySelector("img");
      if (!im) return;
      var src = im.getAttribute("data-lightbox-full") || im.getAttribute("src");
      if (!src) return;
      openLightbox(src, im.getAttribute("alt") || "");
    });
    triggers[i].addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      var im = e.currentTarget.querySelector("img");
      if (!im) return;
      var src = im.getAttribute("data-lightbox-full") || im.getAttribute("src");
      if (!src) return;
      openLightbox(src, im.getAttribute("alt") || "");
    });
  }

  lb.addEventListener("click", function (e) {
    if (e.target === lb) return;
    if (e.target.classList && e.target.classList.contains("lightbox__scrim")) {
      closeLightbox();
    }
    if (e.target.classList && e.target.classList.contains("lightbox__close")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lb.hasAttribute("hidden")) {
      e.preventDefault();
      closeLightbox();
    }
  });
})();
