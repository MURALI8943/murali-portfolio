import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/scrollToSection.js";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 640;
      setVisible((current) => (current === next ? current : next));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToTop() {
    const hero = document.getElementById("top");
    const heading = hero?.querySelector("h1");
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    if (heading) {
      if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  return (
    visible ? (
      <button type="button" className="to-top" onClick={goToTop}>
        <ArrowUp aria-hidden="true" size={18} />
        Top
      </button>
    ) : null
  );
}
