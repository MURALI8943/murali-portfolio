import { Mail, MessageCircle } from "lucide-react";
import { emailHref, site, whatsappHref } from "../data/site.js";
import Reveal from "./Reveal.jsx";

const channels = [
  {
    label: "Email",
    href: emailHref(),
    external: false,
    detail: site.email,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: whatsappHref(),
    external: true,
    icon: MessageCircle,
    tone: "whatsapp",
  },
  ...site.social.map((item) => ({
    label: item.label,
    href: item.href,
    external: true,
  })),
];

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <Reveal className="wrap contact-band">
        <p className="eyebrow">Contact</p>
        <h2>Let's build something great together.</h2>
        <ul className="channel-list">
          {channels.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {item.icon ? (
                  <span className={`channel-icon ${item.tone || ""}`} aria-hidden="true">
                    <item.icon size={18} />
                  </span>
                ) : null}
                <span className="channel-text">
                  <span>{item.label}</span>
                  {item.detail ? <small>{item.detail}</small> : null}
                </span>
                {item.external ? (
                  <span className="visually-hidden"> (opens in a new tab)</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
