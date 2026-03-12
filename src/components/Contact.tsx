import { useEffect, useRef } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-bg-pattern"></div>
      
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-label">Let's Connect</span>
          <h2>Ready to write your <span className="highlight">brand story?</span></h2>
          <p>Have a vision? Let's bring it to life together.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card contact-email">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13 2 6"/>
              </svg>
            </div>
            <h4>Email Me</h4>
            <a href="mailto:graphikardia@gmail.com">graphikardia@gmail.com</a>
          </div>

          <div className="contact-card contact-website">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h4>Visit Website</h4>
            <a href="https://gokula.graphikardia.com" target="_blank" rel="noopener noreferrer">
              gokula.graphikardia.com
            </a>
          </div>

          <div className="contact-card contact-social">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </div>
            <h4>Follow Me</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/gokula" target="_blank" rel="noopener noreferrer">
                LinkedIn <MdArrowOutward />
              </a>
              <a href="https://x.com/gokula" target="_blank" rel="noopener noreferrer">
                Twitter <MdArrowOutward />
              </a>
              <a href="https://www.instagram.com/mr.gk_gokula" target="_blank" rel="noopener noreferrer">
                Instagram <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">⚔️</span>
              <span className="logo-text">GOKULA</span>
            </div>
            <p className="footer-tagline">Creative Lead & Digital Storyteller. Crafting digital experiences that inspire and engage.</p>
            <div className="footer-socials">
              <a href="mailto:graphikardia@gmail.com" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a href="tel:+917975594203" aria-label="Phone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>
              <a href="https://linkedin.com/in/geetha-gokula-p" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com/graphikardia" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-nav">
            <div className="nav-section">
              <h5>Quick Links</h5>
              <a href="#landingDiv">Home</a>
              <a href="#about">About</a>
              <a href="#whatido">Services</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="nav-section">
              <h5>Services</h5>
              <a href="#whatido">Digital Marketing</a>
              <a href="#whatido">Social Media</a>
              <a href="#whatido">Video Production</a>
              <a href="#whatido">Brand Identity</a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <MdCopyright />
              <span>{currentYear} Geetha Gokula P. All rights reserved.</span>
            </div>
            <div className="footer-awards">
              <span>YUVA Summit India Winner</span>
              <span className="dot">•</span>
              <span>Best Core Organizing Team RANVITA 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
