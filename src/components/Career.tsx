import { useEffect, useRef } from "react";
import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CareerItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  icon: string;
}

const careerData: CareerItem[] = [
  {
    id: 1,
    role: "Social Media Manager",
    company: "Koshys Group of Institutions, Bengaluru",
    period: "2026 – Present",
    description: "Leading comprehensive social media strategy for educational institutions. Managing brand presence, content creation, campaign execution, and community engagement.",
    highlights: ["Content Strategy", "Brand Management", "Engagement Growth", "Campaign Analytics"],
    icon: "🎓"
  },
  {
    id: 2,
    role: "Managing Director",
    company: "Graphikardia",
    period: "2024 – Present",
    description: "Leading digital strategy and creative direction — overseeing brand identity, campaign execution, social media, and performance analytics to drive measurable growth.",
    highlights: ["Doubled account visibility 12k→24k", "40% unique reach increase", "4,000+ views per video"],
    icon: "◈"
  },
  {
    id: 3,
    role: "Senior Graphic Designer & Video Editor",
    company: "Altius Multi-speciality Hospital, Bengaluru",
    period: "Oct 2024 – 2025",
    description: "Led comprehensive digital marketing and creative design for a multi-speciality hospital. Managed brand presence, content creation, video production, and campaign execution.",
    highlights: ["23% patient inflow increase", "High-impact multimedia content", "24-hour rapid turnaround"],
    icon: "⚕"
  },
  {
    id: 4,
    role: "Digital Marketing Professional",
    company: "Freelance",
    period: "2021 - 2024",
    description: "Provided digital marketing and creative services to diverse clients including educational institutions, healthcare, and retail brands.",
    highlights: ["Brand Identity Design", "Social Media Management", "Video Production", "Client Strategy"],
    icon: "◇"
  },
];

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".career-header",
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".career-section",
            start: "top 75%",
            toggleActions: "play none none none"
          },
        }
      );

      gsap.fromTo(
        ".career-card",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".career-grid",
            start: "top 80%",
            toggleActions: "play none none none"
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section" id="career" ref={sectionRef}>
      <div className="career-header">
        <span className="career-label">✦ The Journey</span>
        <h2>
          Building expertise, <span>&</span> creating impact
        </h2>
        <p className="career-intro">
          From shaping institutional narratives to driving digital transformation
        </p>
      </div>

      <div className="career-grid">
        {careerData.map((item, index) => (
          <div key={item.id} className="career-card">
            <div className="career-card-header">
              <div className="career-card-icon">{item.icon}</div>
              <div className="career-card-period">{item.period}</div>
            </div>
            
            <div className="career-card-body">
              <h3>{item.role}</h3>
              <h4>{item.company}</h4>
              <p>{item.description}</p>
            </div>

            <div className="career-card-footer">
              {item.highlights.map((highlight, i) => (
                <span key={i} className="career-tag">{highlight}</span>
              ))}
            </div>

            <div className="career-card-number">0{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
