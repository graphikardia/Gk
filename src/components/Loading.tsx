import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import gsap from "gsap";

const storyFrames = [
  { 
    text: "Every great brand starts with a story...", 
    sub: "The spark of an idea",
  },
  { 
    text: "A vision that transforms into something real...", 
    sub: "Building the dream",
  },
  { 
    text: "Strategy meets creativity...", 
    sub: "The master plan",
  },
  { 
    text: "Design brings ideas to life...", 
    sub: "Crafting perfection",
  },
  { 
    text: "Digital presence that drives growth...", 
    sub: "Making impact",
  },
  { 
    text: "Welcome to my world", 
    sub: "Let's create together",
  },
  { 
    text: "I'm Geetha Gokula P", 
    sub: "Creative Lead & Digital Storyteller",
  },
];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [displayedName, setDisplayedName] = useState("");
  const [displayedSurname, setDisplayedSurname] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);

  const fullName = "GEETHA";
  const surname = "GOKULA P";

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".loading-bg-effects", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".loading-logo-wrapper", 
      { opacity: 0, scale: 0.5, rotate: -180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.3"
    )
    .fromTo(".loading-name", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".loading-story", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".loading-progress-wrapper", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".loading-footer", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    let charIndex = 0;
    const nameInterval = setInterval(() => {
      if (charIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(nameInterval);
        setTimeout(() => {
          let surnameIndex = 0;
          const surnameInterval = setInterval(() => {
            if (surnameIndex <= surname.length) {
              setDisplayedSurname(surname.slice(0, surnameIndex));
              surnameIndex++;
            } else {
              clearInterval(surnameInterval);
            }
          }, 80);
        }, 200);
      }
    }, 100);

    return () => {
      clearInterval(nameInterval);
    };
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      const timer = setTimeout(() => {
        setExitAnimation(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [percent, setIsLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev < storyFrames.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100 && !isLoaded) {
      setIsLoaded(true);
    }
  }, [percent, isLoaded]);

  useEffect(() => {
    if (exitAnimation) {
      gsap.to(".loading-content", {
        opacity: 0,
        y: -50,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.in"
      });
      gsap.to(".loading-screen", {
        opacity: 0,
        scale: 1.1,
        duration: 1,
        ease: "power3.in"
      });
      gsap.to(".loading-bg-effects", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      });
    }
  }, [exitAnimation]);

  return (
    <div className={`loading-screen ${exitAnimation ? 'exiting' : ''}`} ref={containerRef}>
      <div className="loading-bg-effects">
        <div className="loading-orb loading-orb-1"></div>
        <div className="loading-orb loading-orb-2"></div>
        <div className="loading-orb loading-orb-3"></div>
        
        <div className="loading-particles">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
        
        <div className="loading-grid"></div>
        <div className="loading-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="horizontal-line" style={{ top: `${20 + i * 15}%` }} />
          ))}
        </div>
        <div className="loading-radial"></div>
        <div className="loading-vignette"></div>
      </div>

      <div className="loading-content">
        <div className="loading-logo-wrapper">
          <div className="loading-logo">
            <div className="logo-inner">
              <span className="logo-text">GK</span>
              <div className="logo-glow"></div>
              <div className="logo-sparkle sparkle-1"></div>
              <div className="logo-sparkle sparkle-2"></div>
              <div className="logo-sparkle sparkle-3"></div>
            </div>
            <div className="logo-ring"></div>
            <div className="logo-ring ring-2"></div>
            <div className="logo-ring ring-3"></div>
            <div className="logo-orbit">
              <div className="orbit-dot"></div>
            </div>
          </div>
          <div className="logo-shadow"></div>
        </div>

        <div className="loading-name">
          <h1 className="name-line">
            <span className="name-char">{displayedName}</span>
            <span className="cursor">|</span>
          </h1>
          <h2 className="surname-line">
            <span className="surname-char">{displayedSurname}</span>
          </h2>
          <div className="name-underline"></div>
        </div>

        <div className="loading-story">
          <div className="story-text-container">
            <div className="story-quote-mark">"</div>
            <p className="story-text" key={storyIndex}>
              {storyFrames[storyIndex].text}
            </p>
            <div className="story-quote-mark closing">"</div>
            <span className="story-sub">{storyFrames[storyIndex].sub}</span>
          </div>
          
          <div className="story-dots">
            {storyFrames.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i <= storyIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="loading-progress-wrapper">
          <div className="progress-track">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(percent, 100)}%` }}
              >
                <div className="progress-inner"></div>
              </div>
            </div>
            <div className="progress-glow"></div>
            <div className="progress-markers">
              <span className="marker" style={{ left: '25%' }}></span>
              <span className="marker" style={{ left: '50%' }}></span>
              <span className="marker" style={{ left: '75%' }}></span>
            </div>
          </div>
          
          <div className="progress-info">
            <div className="progress-percent">
              <span className="percent-value">{Math.min(percent, 100)}</span>
              <span className="percent-symbol">%</span>
            </div>
            <span className="status">
              {percent < 25 && "Initializing..."}
              {percent >= 25 && percent < 50 && "Loading assets..."}
              {percent >= 50 && percent < 75 && "Building experience..."}
              {percent >= 75 && percent < 100 && "Almost there..."}
              {percent >= 100 && "Welcome in"}
            </span>
          </div>
        </div>

        <div className="loading-divider">
          <span className="divider-line"></span>
          <span className="divider-icon">✦</span>
          <span className="divider-line"></span>
        </div>
      </div>

      <div className="loading-footer">
        <div className="footer-content">
          <div className="brand-tag">
            <span className="brand-icon">◆</span>
            <span className="brand-name">GRAPHIKARDIA</span>
            <span className="brand-icon">◆</span>
          </div>
          <div className="role-tags">
            <span>Digital Marketing</span>
            <span className="dot">•</span>
            <span>Brand Strategy</span>
            <span className="dot">•</span>
            <span>Creative Direction</span>
          </div>
          <div className="footer-year">
            <span>EST. 2024</span>
          </div>
        </div>
      </div>

      <div className="corner-accent top-left"></div>
      <div className="corner-accent top-right"></div>
      <div className="corner-accent bottom-left"></div>
      <div className="corner-accent bottom-right"></div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 12);
      percent = Math.min(percent + rand, 55);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = Math.min(percent + Math.round(Math.random() * 4), 100);
        setLoading(percent);
        if (percent >= 100) {
          clearInterval(interval);
          setLoading(100);
        }
      }, 150);
    }
  }, 40);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
