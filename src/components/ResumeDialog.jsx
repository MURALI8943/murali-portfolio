import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { resume } from "../data/site.js";

export default function ResumeDialog({ openerRef, onClose }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = "resume-dialog-title";

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const opener = openerRef.current;
    const root = rootRef.current;
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !root) return;
      const focusable = [...root.querySelectorAll("a[href], button:not([disabled])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    document.body.style.overflow = "hidden";
    appRoot?.setAttribute("inert", "");
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      appRoot?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus({ preventScroll: true });
    };
  }, [openerRef]);

  return createPortal(
    <div className="dialog-root" ref={rootRef}>
      <button
        type="button"
        className="dialog-backdrop"
        aria-label="Close resume"
        onClick={onClose}
      />
      <div
        className="dialog-panel resume-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog-toolbar">
          <h3 id={titleId}>Resume</h3>
          <button
            ref={closeRef}
            type="button"
            className="button button-quiet"
            onClick={onClose}
          >
            <X aria-hidden="true" size={18} />
            Close
          </button>
        </div>
        <iframe className="resume-frame" src={resume.href} title={resume.label} />
        <p className="project-actions">
          <a className="button button-quiet" href={resume.href} target="_blank" rel="noreferrer">
            Open resume
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </div>,
    document.body,
  );
}
