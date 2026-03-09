import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing Executive</h4>
                <h5>Reap Benefit</h5>
              </div>
              <h3>Early</h3>
            </div>
            <p>
              Kickstarted a career in digital marketing — managing social media
              campaigns, content creation, and community engagement to amplify
              brand awareness for a social impact organisation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>WordPress Developer & Marketer</h4>
                <h5>PlutoWebs</h5>
              </div>
              <h3>Mid</h3>
            </div>
            <p>
              Bridged design and digital strategy — building WordPress websites
              while running SEO, content marketing, and lead generation
              campaigns for diverse client portfolios.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Creative Lead & Digital Marketing Expert</h4>
                <h5>Graphikardia</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading creative direction and full-funnel digital marketing
              strategy — overseeing brand identity, campaign execution, SEO,
              social media, and performance analytics to drive measurable growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
