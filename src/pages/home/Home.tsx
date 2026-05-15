import {useEffect, useState} from "react";

import bellamyPhoto from "../../assets/BellamyProfile.jpg";
import myResume from "../../assets/BellamyPhan_Resume.pdf";
import {FaFacebook, FaLinkedin, FaGithub, FaShareAlt, FaFolderOpen, FaEnvelope, FaBook, FaFileAlt} from "react-icons/fa";

import "./Home.css";
import TypeWriter from "../../components/TypeWriter/TypeWriter.tsx";
import InfoBox from "../../components/InfoBox/InfoBox.tsx";
import {boxesHomePage} from "../../data/BoxesHomePage.ts";

export default function Home() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Bellamy Phan | Home'
  }, [])

  return (
    <>
      <section id="center">
        <div className="bellamy-profile">
          <img
            src={bellamyPhoto}
            className={`profile ${loaded ? "loaded" : ""}`}
            alt="Profile picture"
            onLoad={() => setLoaded(true)}
          />
        </div>

        <div>
          <h1>Bellamy Phan</h1>

          <div>
            <span>Email: </span>
            <a
                href="mailto:BellamyPhan@icloud.com"
                className="email-link"
            >
              BellamyPhan@icloud.com
            </a>
          </div>
        </div>

        <TypeWriter
          text="I’m a passionate Software Engineer with a strong background in cloud computing and full-stack development. I specialize in building scalable, efficient applications using Java, Spring Boot, Angular, React, and AWS. I’m continually learning and improving my skills in software architecture, DevOps, and clean code practices to deliver reliable, production-ready solutions."
          speed={25}
        />

      </section>

      {boxesHomePage.map((box, index) => (
          <InfoBox
              key={index}
              title={box.title}
              text={box.text}
              speed={box.speed}
              buttons={box.buttons}
          />
      ))}

      <section id="next-steps">
        <div id="docs">
          <FaFolderOpen className="icon" aria-hidden="true" />
          <h2>Documentation</h2>
          <TypeWriter
            text="Public source codes, and files"
            speed={80}
          />
          <ul>
            <li>
              <a
                href="https://github.com/bellamyphan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="button-icon" />
                Bellamy
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Finora-2026"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="button-icon" />
                Finora
              </a>
            </li>
            
            <li>
              <a
                href="https://bellamyphan.atlassian.net/wiki/spaces/F2/pages/56983553/Finora+2026+Project+Overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaBook className="button-icon" />
                Confluence
              </a>
            </li>
            <li>
              <a
                href={myResume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileAlt className="button-icon" />
                Resume
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <FaShareAlt className="icon" aria-hidden="true" />
          <h2>Connect with Bellamy</h2>
          <TypeWriter
            text="Direct message or send me an email"
            speed={120}
          />
          <ul>
            <li>
              <a href="mailto:BellamyPhan@icloud.com" className="social-link">
                <FaEnvelope className="button-icon" />
                Email
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/bellamyphan69"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebook className="button-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bellamyphan/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaLinkedin className="button-icon" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )

}