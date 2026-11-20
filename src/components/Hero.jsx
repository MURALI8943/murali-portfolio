import { projects, site } from "../data/site.js";
import { scrollToSection } from "../lib/scrollToSection.js";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-copy">
        <div className="hero-stage">
          <img
            className="portrait"
            src="/images/profile.jpg"
            alt=""
            width="564"
            height="640"
            decoding="async"
            fetchPriority="high"
          />
          <div className="hero-mark">
            <div className="ring" aria-hidden="true">
              <div className="ring-floor" />
              <div className="ring-tilt">
                <div className="ring-band" />
                <div className="ring-sheen" />
              </div>
            </div>
            <p className="hero-hello">Hello, I'm</p>
            <h1>
              <span className="hero-display">{site.name}</span>
              <span className="hero-role">Full Stack Developer</span>
            </h1>
          </div>
        </div>
        <p className="lede">
          I build modern, responsive websites and digital experiences that
          help businesses grow.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects" onClick={scrollToSection}>
            View Projects
          </a>
          <a className="button button-quiet" href="#contact" onClick={scrollToSection}>
            Contact Me
          </a>
        </div>

        <nav className="hero-rail" aria-label="Featured projects">
          {projects.map((project, index) => (
            <a key={project.id} href={`#${project.id}`} onClick={scrollToSection}>
              <span className="rail-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="rail-frame">
                <img
                  className={project.imageFit === "contain" ? "fit-contain" : "fit-cover"}
                  src={project.cover}
                  alt=""
                  width={project.imageWidth || 1200}
                  height={project.imageHeight || 750}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
              <span className="rail-name">{project.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
