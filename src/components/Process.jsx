import { steps } from "../data/site.js";
import Reveal from "./Reveal.jsx";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <h2>Process</h2>
        <Reveal>
          <ol className="process-list">
            {steps.map((step, index) => (
              <li key={step.title}>
                <p className="step-index">{String(index + 1).padStart(2, "0")}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
