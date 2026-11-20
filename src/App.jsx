import { lazy, Suspense, useEffect, useState } from "react";
import About from "./components/About.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Contact from "./components/Contact.jsx";
import Education from "./components/Education.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Process from "./components/Process.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Skills from "./components/Skills.jsx";

const SectionScene = lazy(() => import("./components/SectionScene.jsx"));

function BackgroundScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 500);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <SectionScene />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <BackgroundScene />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
