import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    let links = document.querySelectorAll(".navbar-nav a[data-href]");
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

  const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="/#landingDiv" className="navbar-brand">
            <span className="navbar-logo">G<span>K</span></span>
          </a>

          <ul className="navbar-nav">
            <li>
              <Link to="/">
                <HoverLinks text="Home" />
              </Link>
            </li>
            <li>
              <Link to="/work">
                <HoverLinks text="Work" />
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <HoverLinks text="Contact" />
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-logo">G<span>K</span></span>
          <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

          <nav className="mobile-menu-nav">
          <Link to="/" onClick={closeMobileMenu}>
            <span className="mobile-menu-number">01</span>
            <span className="mobile-menu-text">Home</span>
          </Link>
          <Link to="/work" onClick={closeMobileMenu}>
            <span className="mobile-menu-number">02</span>
            <span className="mobile-menu-text">Work</span>
          </Link>
          <Link to="/contact" onClick={closeMobileMenu}>
            <span className="mobile-menu-number">03</span>
            <span className="mobile-menu-text">Contact</span>
          </Link>
        </nav>

        <div className="mobile-menu-footer">
          <button className="mobile-theme-btn" onClick={toggleTheme}>
            {isDark ? (
              <>
                <SunIcon />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
