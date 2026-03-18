import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Reels.css";
import { IoClose } from "react-icons/io5";

interface Reel {
  id: number;
  title: string;
  category: string;
  video: string;
  thumbnail: string;
}

const reelsData: Reel[] = [
  { id: 1, title: "The Hangover Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQM4LTk5Bilmviu1M7upEtc5kGRFhuU8QNlFPSlowsI_NrK5mq7HGCwa1l8PzVkWokGYiBTyvNInrBWbeKfm9m5PTpGt7eEbrNHTZhM.mp4", thumbnail: "/videos/SaveGram.App_AQM4LTk5Bilmviu1M7upEtc5kGRFhuU8QNlFPSlowsI_NrK5mq7HGCwa1l8PzVkWokGYiBTyvNInrBWbeKfm9m5PTpGt7eEbrNHTZhM.webp" },
  { id: 2, title: "Allergies Awareness Reel", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQMh7virex_qE2amE_eD4VynryeWRI_a9Uz7m0PL1PS7EN4-m7Y3OyAzStcwt2HchJYyQgJV1Z_FdejjRhSszbFWsgNfaqLD3Gsh018.mp4", thumbnail: "/videos/SaveGram.App_AQMh7virex_qE2amE_eD4VynryeWRI_a9Uz7m0PL1PS7EN4-m7Y3OyAzStcwt2HchJYyQgJV1Z_FdejjRhSszbFWsgNfaqLD3Gsh018.webp" },
  { id: 3, title: "Health Tips Reel", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQMKlFKhcpbQUwf9yr5MhNgj_F8X9UVzm9MA3E6jkjdKV6Ju_Ftx5KxtNuO9mY04giZE3UKQiE23lJ-mnIEt4nmRW-NIJxLuETVqzpA.mp4", thumbnail: "/videos/SaveGram.App_AQMKlFKhcpbQUwf9yr5MhNgj_F8X9UVzm9MA3E6jkjdKV6Ju_Ftx5KxtNuO9mY04giZE3UKQiE23lJ-mnIEt4nmRW-NIJxLuETVqzpA.webp" },
  { id: 4, title: "Lifestyle Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQMkndN3oOED1CUipzJY8SOu8OOOCpLQ8NY5H95JBEpkNWI35s_LoPixfN1s8p4l4BS5e3m9bW-7fKnEHtIXcOxGldW_oHxIJnWaiFU.mp4", thumbnail: "/videos/SaveGram.App_AQMkndN3oOED1CUipzJY8SOu8OOOCpLQ8NY5H95JBEpkNWI35s_LoPixfN1s8p4l4BS5e3m9bW-7fKnEHtIXcOxGldW_oHxIJnWaiFU.webp" },
  { id: 5, title: "Product Showcase", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQMKoovkpYmFmUT3dRBrh9rTIWAo7n9pepUO5eInxZ6N5XBEhcnxdGcf2mHv6_3XRjttfyBKj9k_Z9tNHNExKpzdk15ZRo-kcGCHg5c.mp4", thumbnail: "/videos/SaveGram.App_AQMKoovkpYmFmUT3dRBrh9rTIWAo7n9pepUO5eInxZ6N5XBEhcnxdGcf2mHv6_3XRjttfyBKj9k_Z9tNHNExKpzdk15ZRo-kcGCHg5c.webp" },
  { id: 6, title: "Fitness Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQMT7ml4Hy3q5z0S1puj9nGjcUo3AurEq-FzdOj32bCwUImRRmThqMN-_VRO_Y4qtkoiTiW6ldspE_NEQR-q5lYLYvYPhbHym16Xggs.mp4", thumbnail: "/videos/SaveGram.App_AQMT7ml4Hy3q5z0S1puj9nGjcUo3AurEq-FzdOj32bCwUImRRmThqMN-_VRO_Y4qtkoiTiW6ldspE_NEQR-q5lYLYvYPhbHym16Xggs.webp" },
  { id: 7, title: "Wellness Tips", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQMuUAi5G5tOnJvyUJXrQCqIqLB3xfl9BEyvUeBbVWqlicZ9t0Ex_MwtCFRQDIhhmtyfaNARzPm9pDqYjLDTCaSnsGT4dulN-oA6OOM.mp4", thumbnail: "/videos/SaveGram.App_AQMuUAi5G5tOnJvyUJXrQCqIqLB3xfl9BEyvUeBbVWqlicZ9t0Ex_MwtCFRQDIhhmtyfaNARzPm9pDqYjLDTCaSnsGT4dulN-oA6OOM.webp" },
  { id: 8, title: "Quick Tips Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQMxcn6Ygdj9oFOMW18P94wKjl9rScMo2_FtlzjCV6pm-HMEXybJukXfGOSw812mwD4p4DwGwDvoC_436dpP5kYq8eV5qKGKKjQMgh0.mp4", thumbnail: "/videos/SaveGram.App_AQMxcn6Ygdj9oFOMW18P94wKjl9rScMo2_FtlzjCV6pm-HMEXybJukXfGOSw812mwD4p4DwGwDvoC_436dpP5kYq8eV5qKGKKjQMgh0.webp" },
  { id: 9, title: "Educational Reel", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQMxFmp9goH0yhVFYvzlVe3smsB1-mJAoLF0WFO0qQnjXdg77B19EsJxkJlb9wZh_FoeIwoIEcvyfYZEx16EWaqH3b6xvwIcZ_lCJeo.mp4", thumbnail: "/videos/SaveGram.App_AQMxFmp9goH0yhVFYvzlVe3smsB1-mJAoLF0WFO0qQnjXdg77B19EsJxkJlb9wZh_FoeIwoIEcvyfYZEx16EWaqH3b6xvwIcZ_lCJeo.webp" },
  { id: 10, title: "Behind The Scenes", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQN52egmInXxmEkQpqTyFORdBU2f4sb1VLgpzr1iVHTwu-kIxqSvI60p-6BuhQjH2wDNps3pMhOv1NbCvgOG3txsLNQkhKiC7rp7w_M.mp4", thumbnail: "/videos/SaveGram.App_AQN52egmInXxmEkQpqTyFORdBU2f4sb1VLgpzr1iVHTwu-kIxqSvI60p-6BuhQjH2wDNps3pMhOv1NbCvgOG3txsLNQkhKiC7rp7w_M.webp" },
  { id: 11, title: "Medicine Explainer", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQNvzIpkdz7hs1qs1Kbmlk6iVnD77RFMAl2ryXODknJe6KYQ6DIqn29hPI-C-WDZ3G3lg_1d-j5W2H_UE7BHcEwNLHYYMD1X6-beSj8.mp4", thumbnail: "/videos/SaveGram.App_AQNvzIpkdz7hs1qs1Kbmlk6iVnD77RFMAl2ryXODknJe6KYQ6DIqn29hPI-C-WDZ3G3lg_1d-j5W2H_UE7BHcEwNLHYYMD1X6-beSj8.webp" },
  { id: 12, title: "Brand Story", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQO2lKpNYIAichb86UzJb_XkXt6w8Y3YxKu-vCvz4eARHwlfPpkFP-_nfiRtA5O8f953UKMuhBQDMjtdS2fFmVZrlqxVwZI7g1y8Xqs.mp4", thumbnail: "/videos/SaveGram.App_AQO2lKpNYIAichb86UzJb_XkXt6w8Y3YxKu-vCvz4eARHwlfPpkFP-_nfiRtA5O8f953UKMuhBQDMjtdS2fFmVZrlqxVwZI7g1y8Xqs.webp" },
  { id: 13, title: "Health Awareness", category: "Doctor Explainer", video: "/videos/SaveGram.App_AQOuOZszB7C96_r2QCzhU9qdcMPSRz_njgwbCHmY-DmEzpwfQJo0_LJ3-rZ4lXAoT5e1x8NpeWYC5hBVt9UhtfSK0Y1UB1Ck3pK64KQ.mp4", thumbnail: "/videos/SaveGram.App_AQOuOZszB7C96_r2QCzhU9qdcMPSRz_njgwbCHmY-DmEzpwfQJo0_LJ3-rZ4lXAoT5e1x8NpeWYC5hBVt9UhtfSK0Y1UB1Ck3pK64KQ.webp" },
  { id: 14, title: "Trending Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQOxyPHDg9ZV6lyz5pCc5vQsz1_IFnAcYv4B0yP3dyFenvUeVskU-ozM5SRoiZ8znW3egYOS8M0kJUzLE-UQBXFQKLBB8JzIuj_r0hA.mp4", thumbnail: "/videos/SaveGram.App_AQOxyPHDg9ZV6lyz5pCc5vQsz1_IFnAcYv4B0yP3dyFenvUeVskU-ozM5SRoiZ8znW3egYOS8M0kJUzLE-UQBXFQKLBB8JzIuj_r0hA.webp" },
  { id: 15, title: "Lifestyle Vlog", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQOyKkEyNO6Y_TJCaqWtI9gB8AWufHRlndDlbDXqEUvN0V6UXpYvv9LdUrjeBGetdDT5iz4at7rDR8RK4M3TPxBLZriMBDJxM1LiwCE.mp4", thumbnail: "/videos/SaveGram.App_AQOyKkEyNO6Y_TJCaqWtI9gB8AWufHRlndDlbDXqEUvN0V6UXpYvv9LdUrjeBGetdDT5iz4at7rDR8RK4M3TPxBLZriMBDJxM1LiwCE.webp" },
  { id: 16, title: "Professional Reel", category: "B-Roll Hook", video: "/videos/SaveGram.App_AQOzp7xoBmNcs8wuFuDZhWnjzUzkMcgirff1I663TdPW-fZlinSSdpXKWV9jLEKg5kOIN9ZaBTEDBXFSJXvXPljEsJpBoOVEOR3D7C0.mp4", thumbnail: "/videos/SaveGram.App_AQOzp7xoBmNcs8wuFuDZhWnjzUzkMcgirff1I663TdPW-fZlinSSdpXKWV9jLEKg5kOIN9ZaBTEDBXFSJXvXPljEsJpBoOVEOR3D7C0.mp4" },
];

const categories = ["All", "B-Roll Hook", "Doctor Explainer"];

const Reels = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredReels = activeFilter === "All" 
    ? reelsData 
    : reelsData.filter(reel => reel.category === activeFilter);

  const handleReelClick = useCallback((reel: Reel) => {
    setSelectedReel(reel);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedReel(null);
      setIsClosing(false);
    }, 300);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedReel) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReel, handleClose]);

  useEffect(() => {
    if (selectedReel && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [selectedReel]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="reels-section" id="reels">
      <div className="reels-container section-container">
        <h2>
          Instagram <span>Reels</span>
        </h2>
        <p className="reels-tagline">Creative video content showcasing storytelling and visual editing</p>

        <div className="reels-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
              data-cursor="disable"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="reels-grid">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              className="reel-card"
              onClick={() => handleReelClick(reel)}
              data-cursor="disable"
            >
              <div className="reel-thumbnail">
                <img src={reel.thumbnail} alt={reel.title} loading="lazy" />
                <div className="reel-play-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="reel-info">
                <span className="reel-category">{reel.category}</span>
                <h3>{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReel && (
        <div 
          className={`reel-modal ${isClosing ? "closing" : ""}`}
          onClick={handleClose}
        >
          <div 
            className="reel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="reel-modal-close"
              onClick={handleClose}
              data-cursor="disable"
            >
              <IoClose />
            </button>
            <div className="reel-video-wrapper">
              <video
                ref={videoRef}
                src={selectedReel.video}
                onContextMenu={handleContextMenu}
                onClick={handleVideoClick}
                playsInline
                loop
                preload="metadata"
                className="reel-video"
              />
              <div className="reel-video-overlay">
                <div className="reel-title-overlay">{selectedReel.title}</div>
              </div>
            </div>
            <div className="reel-modal-info">
              <span className="reel-category-tag">{selectedReel.category}</span>
              <h3>{selectedReel.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reels;
