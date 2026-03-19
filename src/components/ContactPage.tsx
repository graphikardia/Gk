import { useState, useRef, useLayoutEffect } from "react";
import { MdArrowOutward, MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaPaperPlane, FaCheck, FaExclamation } from "react-icons/fa6";
import Navbar from "./Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/ContactPage.css";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".contact-hero-bg", 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".hero-tag", 
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.6"
      )
      .fromTo(".contact-hero h1", 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(".contact-hero > .contact-hero-content > p", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      gsap.fromTo(".contact-info-card",
        { opacity: 0, x: -60, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-cards",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".social-link",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".social-section",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".availability-badge",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".availability-badge",
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(".form-card",
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".form-card",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".form-group",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(".submit-btn",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".submit-btn",
            start: "top 90%",
          }
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
    
    gsap.to(target, {
      scale: 1.01,
      duration: 0.15,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const btn = document.querySelector('.submit-btn');
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      await fetch(import.meta.env.VITE_APPS_SCRIPT_URL || "", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      gsap.fromTo(".form-success",
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
      gsap.fromTo(".form-error",
        { opacity: 0, x: -30, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-hero" ref={heroRef}>
          <div className="contact-hero-bg">
            <div className="hero-blob"></div>
            <div className="hero-blob-2"></div>
            <div className="hero-particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}></div>
              ))}
            </div>
          </div>
          <div className="contact-hero-content">
            <span className="hero-tag">Get in Touch</span>
            <h1>Let's Create <span className="highlight">Together</span></h1>
            <p>Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.</p>
          </div>
        </div>

        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="contact-cards" ref={(el) => { cardsRef.current[0] = el; }}>
                <div className="contact-info-card" ref={(el) => { cardsRef.current[1] = el; }}>
                  <div className="card-icon-wrapper">
                    <MdEmail />
                  </div>
                  <div className="card-content">
                    <span className="card-label">Email</span>
                    <a href="mailto:graphikardia@gmail.com" className="card-link">
                      graphikardia@gmail.com
                      <MdArrowOutward />
                    </a>
                  </div>
                  <div className="card-glow"></div>
                </div>

                <div className="contact-info-card" ref={(el) => { cardsRef.current[2] = el; }}>
                  <div className="card-icon-wrapper">
                    <MdPhone />
                  </div>
                  <div className="card-content">
                    <span className="card-label">Phone</span>
                    <a href="tel:+917975594203" className="card-link">
                      +91 79755 94203
                    </a>
                  </div>
                  <div className="card-glow"></div>
                </div>

                <div className="contact-info-card" ref={(el) => { cardsRef.current[3] = el; }}>
                  <div className="card-icon-wrapper">
                    <MdLocationOn />
                  </div>
                  <div className="card-content">
                    <span className="card-label">Location</span>
                    <span className="card-text">Based in India • Available Worldwide</span>
                  </div>
                  <div className="card-glow"></div>
                </div>
              </div>

              <div className="social-section">
                <span className="social-title">Connect on Social</span>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/gokula" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <FaLinkedinIn />
                    <span>LinkedIn</span>
                    <MdArrowOutward className="link-arrow" />
                  </a>
                  <a href="https://x.com/gokula" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                    <FaXTwitter />
                    <span>Twitter</span>
                    <MdArrowOutward className="link-arrow" />
                  </a>
                  <a href="https://www.instagram.com/mr.gk_gokula" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <FaInstagram />
                    <span>Instagram</span>
                    <MdArrowOutward className="link-arrow" />
                  </a>
                </div>
              </div>

              <div className="availability-badge">
                <span className="pulse-ring"></span>
                <span className="pulse-dot"></span>
                <span>Currently accepting new projects</span>
              </div>
            </div>

            <div className="contact-right">
              <div className="form-card">
                <div className="form-header">
                  <h2>Send a Message</h2>
                  <p>Fill out the form below and I'll get back to you within 24 hours.</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div 
                      className={`form-group ${hoveredField === 'name' ? 'focused' : ''}`}
                      onMouseEnter={() => setHoveredField('name')}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      <label htmlFor="name">
                        <span>Your Name</span>
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                      <div className="input-line"></div>
                    </div>

                    <div 
                      className={`form-group ${hoveredField === 'email' ? 'focused' : ''}`}
                      onMouseEnter={() => setHoveredField('email')}
                      onMouseLeave={() => setHoveredField(null)}
                    >
                      <label htmlFor="email">
                        <span>Email Address</span>
                        <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                      <div className="input-line"></div>
                    </div>
                  </div>

                  <div 
                    className={`form-group ${hoveredField === 'phone' ? 'focused' : ''}`}
                    onMouseEnter={() => setHoveredField('phone')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label htmlFor="phone">
                      <span>Phone Number</span>
                      <span className="optional">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 xxxxxxxxxx"
                    />
                    <div className="input-line"></div>
                  </div>

                  <div 
                    className={`form-group textarea-group ${hoveredField === 'message' ? 'focused' : ''}`}
                    onMouseEnter={() => setHoveredField('message')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label htmlFor="message">
                      <span>Your Message</span>
                      <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, goals, and timeline..."
                      rows={5}
                      required
                    />
                    <div className="input-line"></div>
                  </div>

                  {status === "error" && (
                    <div className="form-message error">
                      <FaExclamation />
                      {errorMessage}
                    </div>
                  )}

                  {status === "success" && (
                    <div className="form-message success">
                      <FaCheck />
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <span className="btn-loading">
                        <span className="spinner"></span>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
