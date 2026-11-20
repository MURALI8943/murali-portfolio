export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(event) {
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  const heading = target.querySelector("h1, h2") ?? target;
  if (!heading.hasAttribute("tabindex")) {
    heading.setAttribute("tabindex", "-1");
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  heading.focus({ preventScroll: true });
  window.history.pushState(null, "", href);
}
