import { useRef, useState } from "react";
import { projects } from "../data/site.js";
import LiveSignal from "./LiveSignal.jsx";
import ProjectDialog from "./ProjectDialog.jsx";
import Reveal from "./Reveal.jsx";

export default function Projects() {
  const [active, setActive] = useState(null);
  const openerRef = useRef(null);

  function openDetails(event, project) {
    event.preventDefault();
    openerRef.current = event.currentTarget;
    setActive(project);
  }

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <p className="section-kicker">My work</p>
        <h2>Selected Projects</h2>
        <p className="lede">
          Websites I have built.
        </p>
        <Reveal>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project" key={project.id} id={project.id}>
                <div className="project-media">
                  <img
                    className={project.imageFit === "contain" ? "fit-contain" : undefined}
                    src={project.cover}
                    alt={
                      project.demonstration
                        ? `${project.name} demonstration preview. Not a screenshot of a live website.`
                        : `${project.name} homepage`
                    }
                    width={project.imageWidth || 1200}
                    height={project.imageHeight || 750}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="project-copy" id={`${project.id}-detail`}>
                  <p className="project-label">
                    <span className="project-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="project-kind">{project.category}</span>
                  </p>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <ul className="tech-list" aria-label="Technologies">
                    {project.technologies.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="project-actions">
                    {project.liveUrl ? (
                      <a
                        className="button button-primary live-cue"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LiveSignal />
                        <span className="live-word">Live</span>
                        View website
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                    <a
                      className={
                        project.liveUrl ? "button button-quiet" : "button button-primary"
                      }
                      href={`#${project.id}-detail`}
                      onClick={(event) => openDetails(event, project)}
                    >
                      View details
                    </a>
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
              </article>
            ))}
          </div>
        </Reveal>
      </div>

      {active ? (
        <ProjectDialog
          key={active.id}
          project={active}
          openerRef={openerRef}
          onClose={() => setActive(null)}
        />
      ) : null}
    </section>
  );
}
