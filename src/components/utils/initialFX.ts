import { gsap } from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 0.5,
  });

  gsap.fromTo(
    ".hero-badge",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-title .hero-line",
    { opacity: 0, y: 60, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.12, delay: 0.5, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-subtitle",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-description",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-cta-group",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-stats",
    { opacity: 0 },
    { opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
  );

  gsap.fromTo(
    ".scroll-indicator",
    { opacity: 0 },
    { opacity: 1, duration: 0.6, delay: 1.4, ease: "power3.out" }
  );
}