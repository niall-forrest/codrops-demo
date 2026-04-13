import template from "./stories.html?raw";
import { gsap } from "../../lib/index";
import { initMarquee } from "../../marquee";

export default function StoriesPage() {
  return template;
}

export function init(options = {}) {
  const container =
    options.container ||
    document.querySelector('[data-transition="container"]');

  const content =
    container?.querySelector(".hero_content") ||
    document.querySelector(".hero_content");

  if (content) {
    gsap.set(content, { opacity: 1 });
  }

  initMarquee(container);

  // Stagger-in story cards
  const cards = container.querySelectorAll(".story-card");
  gsap.fromTo(
    cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.3,
    }
  );
}

export function cleanup() {}
