import template from "./shows.html?raw";
import { gsap } from "../../lib/index";
import { initMarquee } from "../../marquee";

let filterListeners = [];

export default function ShowsPage() {
  return template;
}

export function init(options = {}) {
  const container =
    options.container ||
    document.querySelector('[data-transition="container"]');

  // Animate content in
  const content =
    container?.querySelector(".hero_content") ||
    document.querySelector(".hero_content");

  if (content) {
    gsap.set(content, { opacity: 1 });
  }

  initMarquee(container);

  // Stagger-in the show cards
  const cards = container.querySelectorAll(".show-card");
  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.35,
    }
  );

  // Animate filter bar
  const filterBar = container.querySelector(".shows-filter-bar");
  if (filterBar) {
    gsap.fromTo(
      filterBar,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
    );
  }

  // Set up filter interactivity
  const buttons = container.querySelectorAll(".shows-filter-btn");

  buttons.forEach((btn) => {
    const handler = () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const genres = card.dataset.genre.split(",");
        const match = filter === "all" || genres.includes(filter);

        if (match) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            clearProps: "display",
            onStart() {
              card.style.display = "flex";
            },
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            ease: "power2.in",
            onComplete() {
              card.style.display = "none";
            },
          });
        }
      });
    };
    btn.addEventListener("click", handler);
    filterListeners.push({ el: btn, handler });
  });
}

export function cleanup() {
  filterListeners.forEach(({ el, handler }) =>
    el.removeEventListener("click", handler)
  );
  filterListeners = [];
}
