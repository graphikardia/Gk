import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
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

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const currentProject = projects[currentIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Stories <span>Created</span>
        </h2>
        <p className="work-tagline">Transforming ideas into impactful digital experiences</p>

        <div className="project-showcase">
          <div className="project-content-wrapper">
            <div className="project-info-section">
              <div className="project-number">
                <span>0{currentIndex + 1}</span>
                <span className="total-projects">/0{projects.length}</span>
              </div>
              
              <div className="project-details">
                <h3>{currentProject.title}</h3>
                <span className="project-category">{currentProject.category}</span>
                <p className="project-description">{currentProject.description}</p>
                
                <div className="project-tools">
                  <span className="tools-label">Technologies</span>
                  <div className="tools-list">
                    {currentProject.tools.split(", ").map((tool, i) => (
                      <span key={i} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>

                <a 
                  href={currentProject.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <span>Visit Website</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="project-nav">
              <button 
                className="nav-btn prev-btn" 
                onClick={goToPrev}
                data-cursor="disable"
              >
                <MdArrowBack />
              </button>
              <div className="project-dots">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`project-dot ${index === currentIndex ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    data-cursor="disable"
                  />
                ))}
              </div>
              <button 
                className="nav-btn next-btn" 
                onClick={goToNext}
                data-cursor="disable"
              >
                <MdArrowForward />
              </button>
            </div>
          </div>

          <div className="project-image-wrapper">
            <a 
              href={currentProject.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="image-link"
            >
              <div 
                className="project-image"
                style={{ backgroundImage: `url(${currentProject.image})` }}
              >
                <div className="image-overlay">
                  <span>View Live Site</span>
                </div>
              </div>
            </a>
            <div className="image-frame"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;