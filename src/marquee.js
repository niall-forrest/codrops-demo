export function initMarquee(container) {
  const inner =
    (container && container.querySelector(".marquee-inner")) ||
    document.querySelector(".marquee-inner");
  if (!inner || inner.dataset.cloned) return;

  // Get the base content (first set of spans before any duplication)
  const baseHTML = inner.innerHTML;

  // Clone content until it's at least 3x the viewport width
  // so translateX(-50%) always has enough content
  const target = window.innerWidth * 3;
  while (inner.scrollWidth < target) {
    inner.innerHTML += baseHTML;
  }
  // One more duplication to ensure the second half mirrors the first
  inner.innerHTML = inner.innerHTML + inner.innerHTML;

  inner.dataset.cloned = "true";
}
