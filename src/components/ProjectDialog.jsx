import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ProjectDialog({ project, openerRef, onClose }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = `${project.id}-dialog-title`;

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
      const focusable = [
        ...root.querySelectorAll("a[href], button:not([disabled])"),
      ];
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
        aria-label="Close project dialog"
        onClick={onClose}
      />
      <div
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog-toolbar">
          <p className="project-kind">{project.category}</p>
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

        {project.demonstration ? <p className="demo-label">Demonstration</p> : null}
        <h3 id={titleId}>{project.name}</h3>

        <img
          className={
            project.imageFit === "contain" ? "dialog-cover fit-contain" : "dialog-cover"
          }
          src={project.cover}
          alt={
            project.demonstration
              ? `${project.name} demonstration preview. Not a screenshot of a live website.`
              : `${project.name} homepage`
          }
          width={project.imageWidth || 1200}
          height={project.imageHeight || 750}
        />
        {project.demonstration ? (
          <p className="dialog-caption">
            Demonstration preview. This is not a screenshot of a published website.
          </p>
        ) : null}

        <div className="dialog-copy">
          <h4>Overview</h4>
          <p>{project.overview}</p>
          <h4>Purpose</h4>
          <p>{project.purpose}</p>
          <h4>My role</h4>
          <p>{project.role}</p>
          {project.features?.length ? (
            <>
              <h4>Main features</h4>
              <ul className="detail-list">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          <h4>Technologies</h4>
          <ul className="tech-list" aria-label="Technologies">
            {project.technologies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="project-actions">
          {project.liveUrl ? (
            <a
              className="button button-primary live-cue"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Live Website
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="dialog-caption">
              A live website is not published for this demonstration.
            </span>
          )}
          {project.repoUrl ? (
            <a
              className="button button-quiet"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source code
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : null}
        </p>
      </div>
    </div>,
    document.body,
  );
}
