import { useRef, useState } from "react";
import { education } from "../data/site.js";
import ResumeDialog from "./ResumeDialog.jsx";
import Reveal from "./Reveal.jsx";

export default function Education() {
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);

  function openResume(event) {
    openerRef.current = event.currentTarget;
    setOpen(true);
  }

  return (
    <section className="section" id="education">
      <Reveal className="wrap">
        <div className="education-head">
          <h2>Education</h2>
          <button ref={openerRef} type="button" className="button button-primary" onClick={openResume}>
            View resume
          </button>
        </div>
        <ol className="education-list">
          {education.map((item) => (
            <li key={item.degree}>
              <p className="education-years">{item.years}</p>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              <p className="education-score">{item.score}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      {open ? <ResumeDialog openerRef={openerRef} onClose={() => setOpen(false)} /> : null}
    </section>
  );
}
