import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:graphikardia@gmail.com" data-cursor="disable">
                graphikardia@gmail.com
              </a>
            </p>
            <h4>Website</h4>
            <p>
              <a href="https://gk.graphikardia.com" target="_blank" data-cursor="disable">
                gk.graphikardia.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
       
            <a
              href="https://www.linkedin.com/in/gokula"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://x.com/gokula"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/mr.gk_gokula"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Geetha Gokula P</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
