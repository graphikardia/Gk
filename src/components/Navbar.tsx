import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export let smoother: {
  scrollTo: (target: string, smooth?: boolean, position?: string) => void;
  paused: (paused: boolean) => void;
  scrollTop: (top: number) => void;
};

let lenis: Lenis;

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    smoother = {
      scrollTo: (target: string, smooth = true, position = "top") => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: position as ScrollLogicalPosition });
        }
      },
      paused: (paused: boolean) => {
        if (paused) {
          lenis.stop();
        } else {
          lenis.start();
        }
      },
      scrollTop: (top: number) => {
        lenis.scrollTo(top, { immediate: true });
      },
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section || "", true, "top");
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (section: string) => {
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  return (
    <>
      <div className="header">
        <a href="/#landingDiv" className="navbar-title" data-cursor="disable">
          GK
        </a>
        <ul className="nav-links">
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#whatido" href="#whatido">
              <HoverLinks text="SERVICES" />
            </a>
          </li>
          <li>
            <a data-href="#toolkit" href="#toolkit">
              <HoverLinks text="TOOLKIT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
        
        <button className="theme-toggle desktop-only" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}>
              <span className="mobile-nav-number">01</span>
              <span className="mobile-nav-text">About</span>
            </a>
            <a href="#whatido" onClick={(e) => { e.preventDefault(); scrollToSection("#whatido"); }}>
              <span className="mobile-nav-number">02</span>
              <span className="mobile-nav-text">Services</span>
            </a>
            <a href="#toolkit" onClick={(e) => { e.preventDefault(); scrollToSection("#toolkit"); }}>
              <span className="mobile-nav-number">03</span>
              <span className="mobile-nav-text">Toolkit</span>
            </a>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection("#work"); }}>
              <span className="mobile-nav-number">04</span>
              <span className="mobile-nav-text">Work</span>
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}>
              <span className="mobile-nav-number">05</span>
              <span className="mobile-nav-text">Contact</span>
            </a>
          </nav>
          
          <div className="mobile-menu-footer">
            <button className="mobile-theme-toggle" onClick={toggleTheme}>
              {isDark ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
