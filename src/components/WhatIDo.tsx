import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    number: "01",
    title: "Digital Marketing Strategy",
    subtitle: "The Foundation of Growth",
    description: "Comprehensive strategies tailored to your brand. From social commerce to performance marketing — every pixel serves a purpose, every campaign drives results.",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
    stats: "300%+ ROI",
    color: "#ff1493"
  },
  {
    id: 2,
    number: "02", 
    title: "Social Media Magic",
    subtitle: "Building Communities That Engage",
    description: "End-to-end management that turns followers into advocates. Content that stops the scroll, strategy that builds loyalty.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    stats: "50+ Accounts",
    color: "#ff69b4"
  },
  {
    id: 3,
    number: "03",
    title: "Video Production",
    subtitle: "Stories That Stop The Scroll",
    description: "High-impact video content for reels, ads, and brand storytelling. From concept to final cut — creating visuals that demand attention.",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    stats: "100+ Videos",
    color: "#ff1493"
  },
  {
    id: 4,
    number: "04",
    title: "Meta & Google Ads",
    subtitle: "Precision Targeting, Maximum ROI",
    description: "Data-driven campaigns that don't just reach people — they reach the right people. Creative optimization that converts.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    stats: "500k+ Reach",
    color: "#ff69b4"
  },
  {
    id: 5,
    number: "05",
    title: "Brand Identity",
    subtitle: "Your Story, Visually Told",
    description: "Distinctive identities that resonate. Logo design, visual guidelines, and cohesive storytelling that makes your brand unforgettable.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    stats: "50+ Brands",
    color: "#ff1493"
  },
  {
    id: 6,
    number: "06",
    title: "Creative Direction",
    subtitle: "Vision From Concept To Reality",
    description: "Guiding creative vision across every touchpoint. Ensuring consistency, emotional resonance, and visual excellence.",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
    stats: "100+ Projects",
    color: "#ff69b4"
  }
];

const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".what-header",
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".whatIDO",
            start: "top 75%",
            toggleActions: "play none none none"
          },
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none"
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="whatIDO" id="whatido" ref={sectionRef}>
      <div className="what-header">
        <span className="what-label">✦ What I Do</span>
        <h2 className="what-title">
          Where strategy meets <span className="highlight">creativity</span>
        </h2>
        <p className="what-subtitle">
          Transforming visions into measurable impact — one campaign at a time
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            style={{ '--service-color': service.color } as React.CSSProperties}
          >
            <div className="service-card-inner">
              <div className="service-top">
                <span className="service-number">{service.number}</span>
                <span className="service-stat">{service.stats}</span>
              </div>
              
              <div className="service-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <span className="service-subtitle">{service.subtitle}</span>
                <p>{service.description}</p>
              </div>

              <div className="service-cta">
                <span>Learn More</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="service-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
