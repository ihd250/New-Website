menuBtn = document.getElementById("menu-btn");
navLinks = document.getElementById("nav-links");
menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

window.addEventListener("scroll", () => {
  const navBar = document.querySelector("nav");

  if (window.innerWidth > 768) {
    if (window.scrollY > 60) {
      navBar.classList.add("scrolled");
    } else if (window.scrollY < 20) {
      navBar.classList.remove("scrolled");
    }
  }
});

const scrollRevealOption = {
  distance: "50px",
  origin: "left",
  duration: 1500,
};

if (window.innerWidth > 1023) {
  ScrollReveal().reveal(".header__content div", {
    ...scrollRevealOption,
  });
} else {
  ScrollReveal().reveal(".header__content div", {
    ...scrollRevealOption,
    origin: "bottom",
  });
}

if (window.innerWidth > 1023) {
  ScrollReveal().reveal(".services__card:nth-child(1)", {
    ...scrollRevealOption,
    duration: "1000",
    origin: "bottom",
  });

  ScrollReveal().reveal(".services__card:nth-child(2)", {
    ...scrollRevealOption,
    duration: "1000",
    origin: "bottom",
    delay: "500",
  });

  ScrollReveal().reveal(".services__card:nth-child(3)", {
    ...scrollRevealOption,
    duration: "1000",
    origin: "bottom",
    delay: "1000",
  });

  ScrollReveal().reveal(".services__card:nth-child(4)", {
    ...scrollRevealOption,
    duration: "1000",
    origin: "bottom",
    delay: "1500",
  });
} else {
  ScrollReveal().reveal(".services__container h2", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: "500",
  });

  ScrollReveal().reveal(".services__card:nth-child(1)", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: "500",
  });

  ScrollReveal().reveal(".services__card", {
    ...scrollRevealOption,
    origin: "bottom",
  });
}

ScrollReveal().reveal(".about__container:nth-child(1)", {
  ...scrollRevealOption,
  origin: "bottom",
});

ScrollReveal().reveal(".about__content", {
  ...scrollRevealOption,
  origin: "bottom",
});

if (window.innerWidth > 1023) {
  ScrollReveal().reveal(".about__data", {
    ...scrollRevealOption,
    origin: "bottom",
  });
} else {
  ScrollReveal().reveal(".about__data", {
    ...scrollRevealOption,
    origin: "bottom",
  });
}

ScrollReveal().reveal(".affiliates__grid", {
  ...scrollRevealOption,
  origin: "bottom",
});

ScrollReveal().reveal(".reviews__container h2", {
  ...scrollRevealOption,
  origin: "bottom",
});

ScrollReveal().reveal(".swiper", {
  ...scrollRevealOption,
  origin: "bottom",
});

const slides = document.querySelectorAll(".header__image img");
let current = 0;
const slideInterval = 5000;

function showNextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(showNextSlide, slideInterval);

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  autoplay: true,
  disableOnInteraction: true,
  speed: 500,

  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

// const swiper = new Swiper(".swiper", {
//   slidesPerView: "auto",
//   spaceBetween: 0,
//   loop: true,
//   autoplay: true,
//   disableOnInteraction: true,
//   speed: 500,
// });

// document.querySelectorAll(".faq__trigger").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const panel = btn.nextElementSibling;
//     const item = btn.closest(".faq__item");
//     const expanded = btn.getAttribute("aria-expanded") === "true";

//     // toggle current
//     btn.setAttribute("aria-expanded", String(!expanded));
//     item.classList.toggle("is-open", !expanded);
//     panel.hidden = expanded;
//   });
// });

// document.querySelectorAll(".faq__panel").forEach(p => p.removeAttribute("hidden"));

// document.querySelectorAll(".faq__trigger").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const item = btn.closest(".faq__item");
//     const open = item.classList.toggle("is-open");
//     btn.setAttribute("aria-expanded", String(open));
//   });
// });

// Make sure panels are not "hidden" so CSS can animate max-height/opacity
document
  .querySelectorAll(".faq__panel")
  .forEach((p) => p.removeAttribute("hidden"));

// Toggle only a class + aria; animation handled entirely by CSS
document.querySelectorAll(".faq__trigger").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq__item");
    const open = item.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".process__card"));
  const tabs = Array.from(document.querySelectorAll(".process__tab"));

  if (!cards.length || !tabs.length) return;

  let activeIndex = 0;
  layoutStack(activeIndex);
  updateTabs(activeIndex);

  // Clicking a card brings it to top
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      activeIndex = index;
      layoutStack(activeIndex);
      updateTabs(activeIndex);
    });
  });

  // Clicking a tab brings corresponding card to top
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = Number(tab.dataset.index);
      activeIndex = index;
      layoutStack(activeIndex);
      updateTabs(activeIndex);
    });
  });

  function layoutStack(active) {
    const n = cards.length;

    cards.forEach((card, idx) => {
      // 0 = top card, 1 = next, etc.
      const offset = (idx - active + n) % n;

      // Each card under the top is shifted further
      // right and down, so you see edges on the
      // right and bottom.
      const translateX = offset * 24; // right per layer
      const translateY = offset * 24; // down per layer

      card.style.transform = `translate(${translateX}px, ${translateY}px)`;
      card.style.zIndex = String(n - offset);

      card.classList.toggle("is-active", offset === 0);
    });
  }

  function updateTabs(active) {
    tabs.forEach((tab, idx) => {
      tab.classList.toggle("is-active", idx === active);
    });
  }
});

const PROJECTS = [
  {
    title: "Modern Addition",
    cover: "assets/centurion-1.jpg",
    images: [
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
  {
    title: "Custom Home",
    cover: "assets/front1.jpg",
    images: [
      { src: "assets/front1.jpg", alt: "Custom home exterior" },
      {
        src: "assets/duncanfront1.jpg",
        alt: "Custom home floor plan",
      },
      { src: "assets/front1.jpg", alt: "Custom home exterior" },
      { src: "assets/dh-front1new.jpg", alt: "Custom home exterior" },
    ],
  },
  {
    title: "Renovation",
    cover: "assets/orion1.jpg",
    images: [
      {
        src: "assets/orion1.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
  {
    title: "Renovation",
    cover: "assets/orion1.jpg",
    images: [
      {
        src: "assets/orion1.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
  {
    title: "Modern Addition",
    cover: "assets/centurion-1.jpg",
    images: [
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/front1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/dh-front1new.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
  {
    title: "Custom Home",
    cover: "assets/front1.jpg",
    images: [
      { src: "assets/front1.jpg", alt: "Custom home exterior" },
      {
        src: "assets/duncanfront1.jpg",
        alt: "Custom home floor plan",
      },
      { src: "assets/front1.jpg", alt: "Custom home exterior" },
      { src: "assets/dh-front1new.jpg", alt: "Custom home exterior" },
    ],
  },
  {
    title: "Renovation",
    cover: "assets/orion1.jpg",
    images: [
      {
        src: "assets/orion1.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
  {
    title: "Renovation",
    cover: "assets/04-exteriorcover.jpg",
    images: [
      {
        src: "assets/04-exterior.jpg",
        alt: "Modern addition exterior view",
      },
      {
        src: "assets/Corten-new.jpg",
        alt: "Modern addition floor plan",
      },
      {
        src: "assets/centurion-1.jpg",
        alt: "Modern addition elevation drawing",
      },
      {
        src: "assets/house19-front1.jpg",
        alt: "Modern addition elevation drawing",
      },
    ],
  },
];

const gridEl = document.getElementById("portfolioGrid");

const lightboxEl = document.getElementById("lightbox");
const titleEl = document.getElementById("lightboxTitle");
const mainImgEl = document.getElementById("lightboxMainImg");
const thumbsEl = document.getElementById("lightboxThumbs");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let activeProjectIndex = 0;
let activeImageIndex = 0;
let lastFocusedEl = null;

function renderGrid(projects) {
  if (!gridEl) return;

  gridEl.innerHTML = projects
    .map((p, i) => {
      const safeTitle = escapeHtml(p.title);
      return `
      <button class="portfolio-item" type="button" data-project-index="${i}" aria-label="Open ${safeTitle}">
        <img class="portfolio-item__img" src="${p.cover}" alt="${safeTitle}" loading="lazy" />
      </button>
    `;
    })
    .join("");

  gridEl.addEventListener("click", (e) => {
    const item = e.target.closest("[data-project-index]");
    if (!item) return;
    openLightbox(Number(item.dataset.projectIndex), 0);
  });
}

// function preloadProjectImages(project) {
//   project.images.forEach((img) => {
//     const pre = new Image();
//     pre.src = img.src;

//     // Helps reduce first-swap jank in many browsers
//     if (pre.decode) pre.decode().catch(() => {});
//   });
// }

const imageCache = new Map(); // src -> Promise

function preloadSrc(src) {
  if (!src) return Promise.resolve();
  if (imageCache.has(src)) return imageCache.get(src);

  const p = new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    } else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });

  imageCache.set(src, p);
  return p;
}

function preloadProjectImages(project) {
  project.images.forEach((img) => preloadSrc(img.src));
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    } else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });
}

// Preload the FIRST lightbox image for each project (lightweight)
function warmPortfolioCache(projects, limit = Infinity) {
  const list = projects.slice(0, limit);

  // run when the browser is idle (won’t block initial load)
  const run = async () => {
    for (const p of list) {
      const first = p?.images?.[0]?.src;
      if (first) await preloadImage(first);
    }
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 1500 });
  } else {
    setTimeout(run, 300);
  }
}

function openLightbox(projectIndex, imageIndex) {
  lastFocusedEl = document.activeElement;

  activeProjectIndex = projectIndex;
  activeImageIndex = imageIndex;

  const project = PROJECTS[activeProjectIndex];
  preloadProjectImages(project);
  titleEl.textContent = project.title;

  lightboxEl.classList.add("is-open");
  lightboxEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  renderThumbs(project);
  setMainImage(project, activeImageIndex);

  // focus close button for accessibility
  const closeBtn = lightboxEl.querySelector("[data-close]");
  closeBtn?.focus();
}

function closeLightbox() {
  lightboxEl.classList.remove("is-open");
  lightboxEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");

  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

function renderThumbs(project) {
  thumbsEl.innerHTML = project.images
    .map((img, i) => {
      const isActive = i === activeImageIndex ? "is-active" : "";
      const safeAlt = escapeHtml(img.alt || project.title);
      return `
      <button class="lightbox__thumb-btn ${isActive}" type="button" data-thumb-index="${i}" aria-label="View image ${
        i + 1
      }">
        <img class="lightbox__thumb" src="${
          img.src
        }" alt="${safeAlt}" loading="lazy" />
      </button>
    `;
    })
    .join("");

  thumbsEl.onclick = (e) => {
    const btn = e.target.closest("[data-thumb-index]");
    if (!btn) return;
    const idx = Number(btn.dataset.thumbIndex);
    activeImageIndex = idx;
    setMainImage(project, idx);
    updateActiveThumb();
    keepActiveThumbInView();
  };
}

function setMainImage(project, idx) {
  const img = project.images[idx];
  mainImgEl.src = img.src;
  mainImgEl.alt = img.alt || project.title;
}

function updateActiveThumb() {
  thumbsEl.querySelectorAll(".lightbox__thumb-btn").forEach((btn) => {
    const idx = Number(btn.dataset.thumbIndex);
    btn.classList.toggle("is-active", idx === activeImageIndex);
    keepActiveThumbInView();
  });
}

function keepActiveThumbInView() {
  if (!thumbsEl) return;

  const active = thumbsEl.querySelector(".lightbox__thumb-btn.is-active");
  if (!active) return;

  // Keep it visible and nicely positioned in the strip
  active.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

function nextImage() {
  const project = PROJECTS[activeProjectIndex];
  activeImageIndex = (activeImageIndex + 1) % project.images.length;
  setMainImage(project, activeImageIndex);
  updateActiveThumb();
}

function prevImage() {
  const project = PROJECTS[activeProjectIndex];
  activeImageIndex =
    (activeImageIndex - 1 + project.images.length) % project.images.length;
  setMainImage(project, activeImageIndex);
  updateActiveThumb();
}

// Close events
lightboxEl?.addEventListener("click", (e) => {
  const closeEl = e.target.closest("[data-close]");
  if (closeEl) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  const isOpen = lightboxEl.classList.contains("is-open");
  if (!isOpen) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

nextBtn?.addEventListener("click", nextImage);
prevBtn?.addEventListener("click", prevImage);

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// INIT
renderGrid(PROJECTS);
warmPortfolioCache(PROJECTS);
