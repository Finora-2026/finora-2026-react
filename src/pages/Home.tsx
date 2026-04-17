import {useEffect, useState} from "react";

import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import bellamyPhoto from "../assets/BellamyProfile.jpg";

import "./Home.css";
import TypeWriter from "../components/TypeWriter.tsx";

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

      <div className="ticks"></div>

      <section id="next-steps">
        {/* Scrum / Agile */}
        <div className="card">
          <h2>Scrum Board</h2>
          <TypeWriter text="Sprint planning and collaboration tools" speed={110} />

          <div className="card-buttons">
            <a
              href="https://bellamyphan.atlassian.net/jira/software/projects/FI/boards/101/backlog"
              target="_blank">
              Jira Board
            </a>

            <a
              href="https://bellamyphan.atlassian.net/wiki/spaces/F2/pages/56983553/Finora+2026+Project+Overview"
              target="_blank">
              Confluence
            </a>
          </div>
        </div>

        {/* GitHub Projects */}
        <div className="card">
          <h2>GitHub Projects</h2>
          <TypeWriter text="Code, experiments, and production apps" speed={100} />

          <div className="card-buttons">
            <a href="https://github.com/Finora-2026/finora-2026-spring" target="_blank">Spring</a>
            <a href="https://github.com/Finora-2026/finora-2026-react" target="_blank">React</a>
            <a href="https://github.com/Finora-2026/finora-2026-config" target="_blank">Config</a>
          </div>
        </div>

        {/* Third Party Tools */}
        <div className="card">
          <h2>Third Party Tools</h2>
          <TypeWriter text="External services and integrations" speed={180} />

          <div className="card-buttons">
            <a
              href="https://console.aiven.io/account/a57638e0cd4e/project/finora/services/finora-aiven-db/overview"
              target="_blank">Aiven DB</a>
            <a
              href="https://dashboard.render.com/web/srv-d7g4qrbeo5us73ambkrg"
              target="_blank">Render</a>
            <a
              href="https://vercel.com/bellamy-phans-projects/finora-2026-react"
              target="_blank">Vercel</a>
            <a
              href="https://dashboard.uptimerobot.com/monitors"
              target="_blank">Uptime Robot</a>
            <a
              href="https://app.mailgun.com/dashboard?tab=send"
              target="_blank">MailGun</a>
          </div>
        </div>

      </section>

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