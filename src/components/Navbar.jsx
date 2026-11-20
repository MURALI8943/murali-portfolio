import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, sectionIds, site } from "../data/site.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { scrollToSection } from "../lib/scrollToSection.js";

const leftIds = ["about", "education", "skills"];
const rightIds = ["services", "projects", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const left = nav.filter((item) => leftIds.includes(item.id));
  const right = nav.filter((item) => rightIds.includes(item.id));

  useEffect(() => {
    function onScroll() {
      const next = window.scrollY > 24;
      setScrolled((current) => (current === next ? current : next));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    firstLinkRef.current?.focus();

    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      if (document.querySelector("[role='dialog']")) return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    function onResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function handleClick(event) {
    setOpen(false);
    scrollToSection(event);
  }

  function link(item, ref) {
    return (
      <a
        ref={ref}
        href={item.href}
        aria-current={active === item.id ? "location" : undefined}
        onClick={handleClick}
      >
        {item.label}
      </a>
    );
  }

  return (
    <header className={scrolled || open ? "site-header is-solid" : "site-header"}>
      <nav aria-label="Primary">
        <div className="header-bar wrap">
          <ul className="nav-side nav-left">
            {left.map((item) => (
              <li key={item.id}>{link(item)}</li>
            ))}
          </ul>

          <a className="logo" href="#top" onClick={handleClick}>
            <span className="logo-mark" aria-hidden="true">
              M
            </span>
            <span className="visually-hidden">{site.name}, home</span>
          </a>

          <div className="nav-right-cluster">
            <ul className="nav-side nav-right">
              {right.map((item) => (
                <li key={item.id}>{link(item)}</li>
              ))}
              <li>
                <a className="hire-link" href="#contact" onClick={handleClick}>
                  Hire me
                </a>
              </li>
            </ul>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              <span className="visually-hidden">
                {open ? "Close menu" : "Open menu"}
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <ul id="mobile-menu" className="mobile-menu wrap">
            {nav.map((item, index) => (
              <li key={item.id}>{link(item, index === 0 ? firstLinkRef : undefined)}</li>
            ))}
            <li>
              <a href="#contact" onClick={handleClick}>
                Hire me
              </a>
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
