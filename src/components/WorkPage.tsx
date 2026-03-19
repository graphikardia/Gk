import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FaArrowRight, FaPlay, FaVideo, FaImages } from "react-icons/fa";
import Reels from "./Reels";
import Carousels from "./Carousels";
import Navbar from "./Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const websites = [
  {
    title: "Graphikardia",
    category: "Full-Service Digital Agency",
    description: "Complete brand identity and digital presence for a creative agency specializing in graphic design, web development, and digital marketing.",
    tools: "WordPress, SEO, Brand Strategy, Social Media",
    url: "https://www.graphikardia.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    title: "GK Portfolio",
    category: "Personal Brand Portfolio",
    description: "A showcase portfolio website demonstrating creative leadership and digital marketing expertise with immersive 3D elements.",
    tools: "React, Three.js, GSAP, WebGL",
    url: "https://gokula.graphikardia.com",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop",
  },
  {
    title: "Dr. Darshana",
    category: "Healthcare & Wellness",
    description: "Professional website for a medical practitioner featuring appointment booking, health resources, and patient information portals.",
    tools: "WordPress, Medical SEO, Appointment System",
    url: "https://dr-darshana.graphikardia.com",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
  },
  {
    title: "Koshys Global Academia",
    category: "Educational Institution",
    description: "Comprehensive admission portal for a renowned educational institution with course information, online applications, and virtual tours.",
    tools: "WordPress, Online Forms, Virtual Tour, SEO",
    url: "https://admissions.koshysglobalacademia.com",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
  },
  {
    title: "KGI Admissions",
    category: "Higher Education Portal",
    description: "Dedicated admission portal for Koshys Group of Institutions with program listings, application tracking, and institute information.",
    tools: "WordPress, Dynamic Forms, Lead Generation",
    url: "https://admissions.kgi.edu.in",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop",
  },
];

const WorkPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".work-hero-bg", 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(".hero-badge", 
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.8"
      )
      .fromTo(".work-hero h1", 
        { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".work-hero p", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(".hero-scroll-indicator", 
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        const elements = section.querySelectorAll('.animate-in');
        gsap.fromTo(elements,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.fromTo(".reels-section .section-header",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reels-section",
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(".reel-card",
        { opacity: 0, scale: 0.8, rotateY: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".reels-grid",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".carousels-section .section-header",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".carousels-section",
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(".category-tab",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".category-tabs",
            start: "top 85%",
          }
        }
      );

      gsap.to(".parallax-element", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".work-page",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".floating-shape", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isAnimating) return;

    const imageEl = imageRef.current;
    const contentEl = contentRef.current;

    gsap.to(imageEl, {
      opacity: 0,
      x: direction === "right" ? -50 : 50,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
    });

    gsap.to(contentEl, {
      opacity: 0,
      y: direction === "right" ? 30 : -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(contentEl, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          });
        }, 50);
      }
    });

    gsap.to(imageEl, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.5,
      delay: 0.35,
      ease: "power3.out"
    });

  }, [currentIndex, direction]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? websites.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === websites.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const currentProject = websites[currentIndex];

  return (
    <>
      <Navbar />
      <div className="work-page">
        <div className="work-hero" ref={heroRef} style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>
          <div className="work-hero-bg">
            <div className="hero-gradient parallax-element"></div>
            <div className="hero-grid"></div>
            <div className="floating-shapes">
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
            </div>
          </div>
          <div className="work-hero-content">
            <span className="hero-badge animate-in">Portfolio</span>
            <h1 className="animate-in">My <span className="gradient-text">Work</span></h1>
            <p className="animate-in">A curated collection of websites, videos, and social media content that tell compelling brand stories.</p>
          </div>
          <div className="hero-scroll-indicator animate-in">
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>
        </div>

        <section className="websites-section" ref={(el) => { sectionRefs.current[0] = el; }}>
          <div className="section-header">
            <span className="section-label animate-in">
              <span className="label-number">01</span>
              Websites
            </span>
            <h2 className="section-title animate-in">Digital Experiences</h2>
            <p className="section-desc animate-in">Transforming ideas into impactful digital experiences</p>
          </div>

          <div className="project-showcase">
            <div className="project-content" ref={contentRef}>
              <div className="project-counter animate-in">
                <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="separator">/</span>
                <span className="total">{String(websites.length).padStart(2, '0')}</span>
              </div>

              <span className="project-category animate-in">{currentProject.category}</span>
              <h3 className="project-title animate-in">{currentProject.title}</h3>
              <p className="project-description animate-in">{currentProject.description}</p>

              <div className="project-tools animate-in">
                {currentProject.tools.split(", ").map((tool, i) => (
                  <span key={i} className="tool-tag">{tool}</span>
                ))}
              </div>

              <a 
                href={currentProject.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link animate-in"
              >
                <span>Visit Website</span>
                <FaArrowRight />
              </a>
            </div>

            <div className="project-visual" ref={imageRef}>
              <div className="project-image-container" style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}>
                <div 
                  className="project-image"
                  style={{ backgroundImage: `url(${currentProject.image})` }}
                >
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FaPlay />
                      <span>View Live</span>
                    </div>
                  </div>
                </div>
                <div className="image-frame"></div>
                <div className="image-glow"></div>
              </div>

              <div className="project-navigation">
                <button className="nav-btn" onClick={goToPrev} aria-label="Previous">
                  <MdArrowBack />
                </button>
                <div className="nav-dots">
                  {websites.map((_, index) => (
                    <button
                      key={index}
                      className={`nav-dot ${index === currentIndex ? "active" : ""}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button className="nav-btn" onClick={goToNext} aria-label="Next">
                  <MdArrowForward />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider animate-in">
          <div className="divider-line"></div>
          <div className="divider-icons">
            <FaVideo />
            <span>Content Creation</span>
            <FaVideo />
          </div>
          <div className="divider-line"></div>
        </div>

        <Reels />
        
        <div className="section-divider animate-in">
          <div className="divider-line"></div>
          <div className="divider-icons">
            <FaImages />
            <span>Social Media</span>
            <FaImages />
          </div>
          <div className="divider-line"></div>
        </div>

        <Carousels />
      </div>
    </>
  );
};

export default WorkPage;
