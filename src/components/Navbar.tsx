import { useEffect } from "react";
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
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.7,
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

    smoother.scrollTop(0);
    smoother.paused(true);

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

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          GK
        </a>
        <a
          href="https://gk.graphikardia.com"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
        >
          gk.graphikardia.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
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
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
