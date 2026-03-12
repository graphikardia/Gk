import { useEffect, useRef } from "react";
import "./styles/About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Strategic Planning", "Social Commerce", "Creative Direction", "Digital Marketing",
  "Brand Identity", "Business Analytics", "Photography", "Meta Ads", "Google Ads",
  "Video Production", "Content Strategy", "Adobe Creative Suite"
];

const awards = [
  { icon: "🏆", title: "YUVA Summit India Winner", subtitle: "2024" },
  { icon: "⭐", title: "Best Core Organizing Team", subtitle: "RANVITA 2024" },
  { icon: "🎖️", title: "NCC 'C' Certificate", subtitle: "National Level" }
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-text",
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".about-image-card",
        { opacity: 0, x: -60, scale: 0.95 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          duration: 1, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-main-content",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".about-story-card",
        { opacity: 0, x: 60 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-main-content",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".award-card",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-awards-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".skill-pill",
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          delay: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".about-skills-section",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section" id="about" ref={sectionRef}>
      <div className="about-hero">
        <div className="about-hero-text">
          <span className="about-label">✦ About Me</span>
          <h2>
            Turning ideas into <span className="highlight">powerful stories</span>
          </h2>
          <p className="about-intro">
            I'm Geetha Gokula P — a Creative Lead & Digital Storyteller who transforms 
            brands through authentic storytelling, high-impact video production, and 
            strategic social media management.
          </p>
        </div>
      </div>

      <div className="about-main-content">
        <div className="about-image-section">
          <div className="about-image-card">
            <div className="about-image-inner">
              <img 
                src="/images/photo.png" 
                alt="Geetha Gokula P" 
                className="about-profile-img"
              />
              <div className="about-image-overlay"></div>
              <div className="about-image-accent"></div>
            </div>
            <div className="about-floating-badge">
              <span className="badge-pulse"></span>
              <span>Available for Projects</span>
            </div>
          </div>
        </div>

        <div className="about-story-section">
          <div className="about-story-card">
            <h3>The Story So Far</h3>
            <p>
              My journey began with a passion for storytelling and a drive to make brands 
              come alive in the digital space. From managing social impact campaigns to 
              leading creative teams, every step has been about creating meaningful 
              connections between brands and their audiences.
            </p>
            <p>
              Today, as <strong>Social Media Manager at Koshys Group of Institutions</strong> and 
              <strong> Managing Director at Graphikardia</strong>, I help institutions 
              and businesses discover their unique voice and amplify their digital presence.
            </p>
          </div>

          <div className="about-awards-section">
            <h4>Recognition & Achievements</h4>
            <div className="awards-grid">
              {awards.map((award, i) => (
                <div key={i} className="award-card">
                  <span className="award-icon">{award.icon}</span>
                  <div className="award-info">
                    <span className="award-title">{award.title}</span>
                    <span className="award-sub">{award.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-skills-section">
            <h4>Skills & Expertise</h4>
            <div className="skills-wrapper">
              {skills.map((skill, i) => (
                <span key={i} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>

          <div className="about-cta-section">
            <a href="tel:+917975594203" className="cta-btn primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Let's Talk
            </a>
            <a href="#work" className="cta-btn secondary">
              View My Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
