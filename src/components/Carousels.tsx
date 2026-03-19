import { useState } from "react";
import "./styles/Carousels.css";

const carouselsData = [
  {
    id: 1,
    title: "Health & Wellness",
    items: [
      "/posts/carousel-1/565197296_17968802885974631_5051933593515420127_n.webp",
      "/posts/carousel-1/572111314_17968802858974631_8967565580181351600_n.webp",
      "/posts/carousel-1/572701038_17968802894974631_1018490037608893490_n.webp",
      "/posts/carousel-1/573389536_17968802867974631_4057138513315875245_n.webp",
      "/posts/carousel-1/573690846_17968802876974631_8575164600836394629_n.webp",
      "/posts/carousel-1/573716907_17968802903974631_5644120118832856337_n.webp",
    ],
    video: "/posts/carousel-1/SaveGram.App_AQPWmeEY_7qG97dWupbXdHUZSm2g8xPEDuUyvoninYLo3qZ38ntOs2_Yx18bjUSDur-AIBVoeaaBB7KqE5EiafyMSRvAWwFC9QYwVDU.mp4",
  },
  {
    id: 2,
    title: "Lifestyle",
    items: [
      "/posts/carousel-2/SaveGram.App_572117427_17904554835270797_7013307209236044002_n.jpg",
      "/posts/carousel-2/SaveGram.App_572221392_17904554853270797_6588772868898530733_n.jpg",
      "/posts/carousel-2/SaveGram.App_572222490_17904554826270797_1552216029331678988_n.jpg",
      "/posts/carousel-2/SaveGram.App_572565925_17904554844270797_7406170605832971409_n.jpg",
      "/posts/carousel-2/SaveGram.App_572718811_17904554862270797_7217105137034341217_n.jpg",
    ],
    video: null,
  },
  {
    id: 3,
    title: "Beauty & Style",
    items: [
      "/posts/carousel-3/SaveGram.App_565178612_17902948185270797_8058156525315599860_n.jpg",
      "/posts/carousel-3/SaveGram.App_565148695_17902948203270797_9082019025719653430_n.jpg",
      "/posts/carousel-3/SaveGram.App_565139785_17902948194270797_1891132749792348108_n.jpg",
      "/posts/carousel-3/SaveGram.App_565082328_17902948173270797_6671959480103176276_n.jpg",
      "/posts/carousel-3/SaveGram.App_564542757_17902948176270797_757735909583848514_n.jpg",
    ],
    video: null,
  },
  {
    id: 4,
    title: "Fashion",
    items: [
      "/posts/carousel-4/SaveGram.App_565297494_17984487200903128_2199023012670481793_n.jpg",
      "/posts/carousel-4/SaveGram.App_564997227_17984487191903128_2194764681315997580_n.jpg",
      "/posts/carousel-4/SaveGram.App_564523285_17984487245903128_8625788390513021980_n.jpg",
      "/posts/carousel-4/SaveGram.App_564332027_17984487221903128_3238901291773125194_n.jpg",
      "/posts/carousel-4/SaveGram.App_563870433_17984487230903128_3549839381566380764_n.jpg",
      "/posts/carousel-4/SaveGram.App_563848017_17984487212903128_1694400357528799210_n.jpg",
    ],
    video: null,
  },
];

const Carousels = () => {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carousel = carouselsData[activeCarousel];
  const isVideo = carousel.video !== null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carousel.items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carousel.items.length) % carousel.items.length);
  };

  return (
    <div className="carousels-section" id="carousels">
      <div className="carousels-container section-container">
        <h2>
          Posts & <span>Carousels</span>
        </h2>
        <p className="carousels-tagline">Engaging visual content for social media</p>

        <div className="carousel-tabs">
          {carouselsData.map((c, index) => (
            <button
              key={c.id}
              className={`carousel-tab ${activeCarousel === index ? "active" : ""}`}
              onClick={() => {
                setActiveCarousel(index);
                setCurrentSlide(0);
              }}
              data-cursor="disable"
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="carousel-wrapper">
          <button 
            className="carousel-nav carousel-prev" 
            onClick={prevSlide}
            data-cursor="disable"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="carousel-slides">
            {carousel.items.map((item, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
              >
                <img src={item} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          <button 
            className="carousel-nav carousel-next" 
            onClick={nextSlide}
            data-cursor="disable"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {carousel.items.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              data-cursor="disable"
            />
          ))}
        </div>

        {isVideo && (
          <div className="carousel-video">
            <video
              src={carousel.video!}
              controls
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousels;
