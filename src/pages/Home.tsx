import {useEffect, useState} from "react";

import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import bellamyPhoto from "../assets/BellamyProfile.jpg";

import "./Home.css";
import TypeWriter from "../components/TypeWriter.tsx";
import InfoBox from "../components/InfoBox.tsx";
import {infoBoxes} from "../data/infoBoxes.ts";

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
        </div>

        <TypeWriter
          text="I’m a passionate Software Engineer with a strong background in cloud computing and full-stack development. I specialize in building scalable, efficient applications using Java, Spring Boot, Angular, React, and AWS. I’m continually learning and improving my skills in software architecture, DevOps, and clean code practices to deliver reliable, production-ready solutions."
          speed={25}
        />

      </section>

      {infoBoxes.map((box, index) => (
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
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <TypeWriter
            text="Your questions, answered"
            speed={80}
          />
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <TypeWriter
            text="Join the Vite community"
            speed={120}
          />
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
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