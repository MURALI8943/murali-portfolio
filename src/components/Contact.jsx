import { Mail } from "lucide-react";
import { emailHref, site, whatsappHref } from "../data/site.js";
import Reveal from "./Reveal.jsx";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.98.58 3.82 1.58 5.4L2 22l4.92-1.63a9.9 9.9 0 0 0 5.12 1.41h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.77 14.02c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.18-4.93-4.37-.14-.2-1.16-1.55-1.16-2.95 0-1.4.74-2.09 1-2.37.26-.28.57-.35.76-.35h.55c.18 0 .41-.06.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.1.2-.15.31-.3.48-.15.16-.31.36-.44.49-.15.14-.3.29-.13.57.17.28.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.14.46.12.63-.07.17-.2.73-.85.93-1.14.2-.28.4-.24.67-.14.28.1 1.75.82 2.05.97.3.15.5.22.57.34.08.13.08.74-.16 1.42z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
      />
    </svg>
  );
}

const channels = [
  {
    label: "Email",
    href: emailHref(),
    external: false,
    detail: site.email,
    tone: "email",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: whatsappHref(),
    external: true,
    detail: site.phone,
    tone: "whatsapp",
    icon: WhatsAppIcon,
  },
  {
    label: "GitHub",
    href: site.social[0].href,
    external: true,
    detail: "MURALI8943",
    tone: "github",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: site.social[1].href,
    external: true,
    detail: "murali-kalakala",
    tone: "linkedin",
    icon: LinkedInIcon,
  },
];

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <Reveal className="wrap contact-band">
        <p className="eyebrow">Contact</p>
        <h2>Let's build something great together.</h2>
        <ul className="channel-list">
          {channels.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  className={`channel-card channel-${item.tone}`}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <span className={`channel-icon ${item.tone}`} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <span className="channel-text">
                    <span>{item.label}</span>
                    {item.detail ? <small>{item.detail}</small> : null}
                  </span>
                  {item.external ? (
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
