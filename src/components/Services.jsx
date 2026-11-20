import { CodeXml, Layers, LayoutTemplate, MousePointerClick } from "lucide-react";
import { services } from "../data/site.js";
import Reveal from "./Reveal.jsx";

const icons = {
  layout: LayoutTemplate,
  mouse: MousePointerClick,
  code: CodeXml,
  layers: Layers,
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <h2>Services</h2>
        <Reveal>
          <div className="service-list">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return (
                <article key={service.title} className="service-item">
                  {Icon ? <Icon aria-hidden="true" size={20} /> : null}
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
