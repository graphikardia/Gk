import { useEffect, useState } from "react";
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
  { 
    text: "Crafting experiences that inspire", 
    sub: "Scroll to explore",
  },
];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const timer = setTimeout(() => {
        setExitAnimation(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1200);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [percent, setIsLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev < storyFrames.length - 1 ? prev + 1 : prev));
    }, 2000);
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
        y: -30,
        duration: 0.6,
        ease: "power2.inOut"
      });
      gsap.to(".loading-screen", {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [exitAnimation]);

  return (
    <div className={`loading-screen ${exitAnimation ? 'exiting' : ''}`}>
      <div className="loading-bg-effects">
        <div className="loading-orb loading-orb-1"></div>
        <div className="loading-orb loading-orb-2"></div>
        <div className="loading-orb loading-orb-3"></div>
        
        <div className="loading-particles">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
            ></div>
          ))}
        </div>
        
        <div className="loading-grid"></div>
        <div className="loading-scanlines"></div>
        <div className="loading-radial"></div>
      </div>

      <div className="loading-content">
        <div className="loading-logo-wrapper">
          <div className="loading-logo">
            <div className="logo-inner">
              <span className="logo-text">GK</span>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-ring"></div>
            <div className="logo-ring ring-2"></div>
            <div className="logo-ring ring-3"></div>
          </div>
        </div>

        <div className="loading-name">
          <h1>GEETHA</h1>
          <h2>GOKULA P</h2>
        </div>

        <div className="loading-story">
          <div className="story-text-container">
            <p className="story-text" key={storyIndex}>
              {storyFrames[storyIndex].text}
            </p>
            <span className="story-sub">{storyFrames[storyIndex].sub}</span>
          </div>
          
          <div className="story-dots">
            {storyFrames.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i <= storyIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>

        <div className="loading-progress-wrapper">
          <div className="progress-track">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(percent, 100)}%` }}
              ></div>
            </div>
            <div className="progress-glow"></div>
          </div>
          
          <div className="progress-info">
            <span className="percent">{percent}%</span>
            <span className="status">
              {percent < 25 && "Initializing..."}
              {percent >= 25 && percent < 50 && "Loading assets..."}
              {percent >= 50 && percent < 75 && "Building experience..."}
              {percent >= 75 && percent < 100 && "Almost there..."}
              {percent >= 100 && "Welcome in"}
            </span>
          </div>
        </div>
      </div>

      <div className="loading-footer">
        <div className="footer-content">
          <div className="brand-tag">
            <span className="brand-icon">✦</span>
            <span className="brand-name">Graphikardia</span>
          </div>
          <div className="role-tags">
            <span>Digital Marketing</span>
            <span className="dot">•</span>
            <span>Brand Strategy</span>
            <span className="dot">•</span>
            <span>Creative Direction</span>
          </div>
        </div>
      </div>
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