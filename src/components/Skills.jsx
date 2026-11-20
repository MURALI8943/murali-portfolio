import {
  Boxes,
  Braces,
  CodeXml,
  Cylinder,
  Database,
  FileCode,
  GitBranch,
  GitFork,
  MousePointer2,
  Palette,
  Route,
  Server,
  SquareCode,
  Terminal,
} from "lucide-react";
import { skillGroups } from "../data/site.js";
import Reveal from "./Reveal.jsx";

const icons = {
  HTML: FileCode,
  CSS: Palette,
  JavaScript: Braces,
  "React.js": CodeXml,
  "Node.js": Server,
  "Express.js": Route,
  Python: Terminal,
  Django: Boxes,
  PostgreSQL: Database,
  MySQL: Cylinder,
  Git: GitBranch,
  GitHub: GitFork,
  "VS Code": SquareCode,
  Cursor: MousePointer2,
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <h2>Skills</h2>
        <Reveal>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <section key={group.title} aria-labelledby={group.title}>
                <h3 id={group.title}>{group.title}</h3>
                <ul className="badges">
                  {group.items.map((item) => {
                    const Icon = icons[item];
                    return (
                      <li key={item}>
                        {Icon ? <Icon aria-hidden="true" size={16} /> : null}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
