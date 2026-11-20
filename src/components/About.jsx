import { highlights } from "../data/site.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal className="wrap about-grid">
        <div>
          <h2>About</h2>
          <p className="lede">
            I'm a Full Stack Developer focused on building clean, responsive
            and user-friendly web applications.
          </p>
          <p className="about-note">
            I shape the interface, then connect the frontend, server, and
            database when a project needs them.
          </p>
        </div>
        <ul className="highlight-list">
          {highlights.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
