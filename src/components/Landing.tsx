import { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./styles/Landing.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Landing = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const ctx = gsap.context(() => {
      const badge = document.querySelector(".hero-badge");
      const title = document.querySelector(".hero-title .hero-line");
      const subtitle = document.querySelector(".hero-subtitle");
      const description = document.querySelector(".hero-description");
      const cta = document.querySelector(".hero-cta-group");
      const stats = document.querySelector(".hero-stats");

      if (!badge && !title && !subtitle && !description && !cta && !stats) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (badge) {
        tl.fromTo(badge, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
      }
      
      const titleLines = document.querySelectorAll(".hero-title .hero-line");
      if (titleLines.length > 0) {
        tl.fromTo(titleLines, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, badge ? "-=0.3" : 0);
      }
      
      if (subtitle) {
        tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      }
      
      if (description) {
        tl.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
      }
      
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
      }
      
      if (stats) {
        tl.fromTo(stats, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.1");
      }

      if (!isMobile) {
        gsap.to(".hero-shapes .shape", {
          y: -20,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
        });

        gsap.to(".hero-glow", {
          scale: 1.1,
          opacity: 0.12,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".scroll-indicator", {
          y: 8,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hero-section" id="landingDiv" ref={containerRef}>
        <div className="hero-bg">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          <div className="hero-grid"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">Crafting</span>
            <span className="hero-line hero-line-accent">Digital</span>
            <span className="hero-line">Experiences</span>
          </h1>

          <p className="hero-subtitle">
            Creative Lead & Digital Marketing Expert
          </p>

          <p className="hero-description">
            I transform brands through strategic storytelling and data-driven campaigns. 
            From concept to execution, I create digital experiences that captivate audiences 
            and drive measurable growth.
          </p>

          <div className="hero-cta-group">
            <button className="hero-btn hero-btn-primary" onClick={scrollToWork}>
              <span>Explore My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={scrollToContact}>
              <span>Let's Connect</span>
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">8+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">20+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>

        {children}
      </div>
    </>
  );
};

export default Landing;
