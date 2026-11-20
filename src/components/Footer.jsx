import { MapPin, Phone } from "lucide-react";
import { site } from "../data/site.js";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <p className="footer-brand">
          <span className="footer-name">{site.name}</span>
          <span className="footer-role">{site.role}</span>
        </p>
        <ul className="footer-facts">
          <li>
            <a href={site.locationHref} target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" size={18} />
              <span>
                <span className="footer-kicker">Location</span>
                {site.location}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
          <li>
            <a href={site.phoneHref}>
              <Phone aria-hidden="true" size={18} />
              <span>
                <span className="footer-kicker">Call</span>
                {site.phone}
              </span>
            </a>
          </li>
        </ul>
        <div className="footer-end">
          <ul>
            {site.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p>© {year}</p>
        </div>
      </div>
    </footer>
  );
}
