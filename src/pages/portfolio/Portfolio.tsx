import {useEffect, useState} from "react";

import bellamyPhoto from "../../assets/BellamyProfile.jpg";
import styles from "./Portfolio.module.scss";

export default function Portfolio() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Bellamy Phan | Portfolio'
  }, [])

  return (
    <div className="portfolio-page">

      {/* Header */}
      <header className="portfolio-header">
        <div className="header-content">
          <div className={styles.bellamyProfile}>
            <img
              src={bellamyPhoto}
              className={`${styles.profile} ${loaded ? styles.profileLoaded : ""}`}
              alt="Profile picture"
              onLoad={() => setLoaded(true)}
            />
          </div>

          <div className="header-text">
            <h1>Bellamy Phan</h1>
            <p>Software Engineer | Cloud Enthusiast | Problem Solver</p>
            <p>
              Dallas, TX | <a href="mailto:BellamyPhan@icloud.com">BellamyPhan@icloud.com</a> |
              469-849-9856
            </p>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/thanhhphan/" target="_blank">LinkedIn</a>
              <a href="https://github.com/bellamyp" target="_blank">GitHub</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="portfolio-container">

        <div className="action-buttons">
          <a href="https://finora-angular.vercel.app/" className="button">
            Finora Web App
          </a>
          {/* todo:add resume link or file here */}
          <a href="BellamyPhan_Resume.pdf" className="button" target="_blank">
            Bellamy's Resume
          </a>
        </div>

        {/* About Me Section */}
        <section className={"section-card"}>
          <h2>About Me</h2>
          <p>
            I’m a passionate Software Engineer with a strong background in cloud computing and full-stack
            development. I specialize in building scalable, efficient applications using Java, Spring Boot,
            Angular, and AWS. I’m continually learning and improving my skills in software architecture, DevOps,
            and clean code practices to deliver reliable, production-ready solutions.
          </p>
        </section>

        {/* Professional Experience Section */}
        <section className="section-card">
          <h2>Professional Experience</h2>

          <div className="item">
            <h3>Baron & Budd, P.C. – Dallas, TX</h3>
            <p><strong>Software Developer</strong> | July 2025 – Present</p>
            <ul>
              <li>Developing full-stack web applications using Java Spring Boot and Angular.</li>
              <li>Refactoring legacy law firm websites to modern platforms with improved UX and performance.</li>
              <li>Ensuring quality, scalability, and performance through cloud-based architecture and deployment.</li>
            </ul>
          </div>

          <div className="item">
            <h3>Cognizant Technology Solutions – Irving, TX</h3>
            <p><strong>Software Engineer</strong> | June 2022 – April 2025</p>
            <ul>
              <li>Developed scalable microservices using Spring Boot for identity verification systems.</li>
              <li>Maintained REST APIs with Java, Hibernate, and Kafka for financial applications.</li>
              <li>Integrated AWS Lambda, Cognito, JDBC, and automated CI/CD using GitLab.</li>
              <li>Developed IVR solutions with Amazon Connect and tested flows with Cyara.</li>
              <li>Refactored legacy systems and automated UI testing with Selenium WebDriver.</li>
              <li>Collaborated with cross-functional teams to resolve complex issues in credit card processing
                systems.
              </li>
            </ul>
          </div>

          <div className="item">
            <h3>Micro Focus – Houston, TX</h3>
            <p><strong>Software Engineer Intern</strong> | August 2021 – June 2022</p>
            <ul>
              <li>Developed and tested RESTful APIs using Java, JUnit, Selenium, and Groovy.</li>
              <li>Automated system integration tests using Jenkins to improve deployment reliability.</li>
              <li>Debugged and optimized web elements with HTML, XML, and XPath.</li>
            </ul>
          </div>

          <div className="item">
            <h3>Illuma Labs – Dallas, TX</h3>
            <p><strong>Software Engineer Intern</strong> | January 2021 – June 2022</p>
            <ul>
              <li>Processed large datasets from Amazon RDS using AWS Glue and Athena for voice recognition and fraud
                detection.</li>
              <li>Designed and implemented data pipelines using S3, MySQL, and AWS Data Lake.</li>
              <li>Improved transformation performance by 30% using Athena and optimized queries.</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section className="section-card">
          <h2>My Projects</h2>

          {/* Finora Web App */}
          <div className="project-card">
            <a href="https://finora-angular.vercel.app/" target="_blank" className="button">
              Finora Web App – Personal Finance Tracking
            </a>

            <p>A full-stack personal finance platform built with Angular & Spring Boot:</p>

            <ul>
              <li>Frontend deployed on <strong>Vercel</strong> with GitHub Actions CI for automated unit tests and deploy on every commit.</li>
              <li>Backend deployed on <strong>Render</strong> using GitHub Actions for full CI pipeline including unit tests, test coverage, Docker image build, and auto-deploy.</li>
              <li><strong>Email service</strong> integration for verification and notifications.</li>
              <li>Secure API layer using <strong>JWT tokens</strong>, role-based authorization, password hashing, and Spring Security.</li>
              <li>PostgreSQL database hosted on <strong>Aiven</strong> for reliable cloud storage.</li>
              <li><strong>Core features:</strong> bank tracking, spending tracking, monthly reports, budgets, bank balance tracking, net worth visualization, repeat transactions, group transactions, grouped bank accounts, cashback automation, split payments, and custom automation rules.</li>
            </ul>

            <p><strong>Repositories:</strong></p>
            <ul>
              <li><a href="https://github.com/bellamyp/finora-angular" target="_blank">Angular Frontend Repository</a></li>
              <li><a href="https://github.com/bellamyp/finora-spring" target="_blank">Spring Boot Backend Repository</a></li>
            </ul>
          </div>

          {/* Angular Tic Tac Toe */}
          <div className="project-card">
            <a href="https://github.com/bellamyp/angular-tik-tac-toe" target="_blank" className="button">
              Angular Tic Tac Toe – Small Game Project
            </a>

            <p>A lightweight and interactive browser-based Tic Tac Toe game built with Angular:</p>

            <ul>
              <li>Implements clean, modular Angular components for board, tiles, and game engine.</li>
              <li>Includes win detection logic, draw rules, and reset functionality.</li>
              <li>Responsive UI designed for both desktop and mobile play.</li>
              <li>Demonstrates state management, event handling, and component communication in Angular.</li>
            </ul>
          </div>

          {/* Tetris Game */}
          <div className="project-card">
            <a href="https://github.com/bellamyp/Tetris" target="_blank" className="button">
              Tetris Game – Java Desktop App
            </a>

            <p>A classic Tetris game implemented entirely with Java:</p>
            <ul>
              <li>Custom rendering using Java AWT.</li>
              <li>Keyboard controls and collision logic.</li>
              <li>Fully object-oriented design.</li>
            </ul>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="section-card">
          <h2>Technical Skills</h2>
          <ul>
            <li><strong>Languages & Frameworks:</strong> Java, Spring Boot, Hibernate, JavaFX, REST APIs, JUnit,
              Selenium, Groovy</li>
            <li><strong>Front-End:</strong> HTML5, CSS3, JavaScript, Angular, Thymeleaf</li>
            <li><strong>Databases & Cloud:</strong> MySQL, MongoDB, AWS (RDS, DynamoDB, S3, Lambda, CloudWatch,
              Athena, Glue)</li>
            <li><strong>Tools & Platforms:</strong> Git, GitHub, GitLab, Jira, Jenkins, Confluence, IntelliJ,
              Eclipse</li>
            <li><strong>Testing & Automation:</strong> Unit Testing, Integration Testing, Regression Testing, IVR
              Application Testing, Contact Center Testing</li>
            <li><strong>Methodologies:</strong> Agile, Scrum, Test-Driven Development (TDD), Waterfall</li>
          </ul>
        </section>

        {/* Education & Certifications Section */}
        <section className="section-card">
          <h2>Education & Certifications</h2>
          <p><strong>Bachelor of Science in Computer Science</strong> | University of Texas at Dallas | GPA: 3.9/4.0
          </p>
          <ul>
            <li>AWS Certified Cloud Practitioner (Credly)</li>
            <li>Cyara Certified Expert</li>
            <li>Udemy Certifications:
              <ul>
                <li>Deploying AWS Spring Boot Apps</li>
                <li>Java Spring Boot 3 & Hibernate</li>
                <li>Java JDBC & MySQL</li>
                <li>Relational Database Design</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Legacy */}
        <section className="section-card">
          <h2>Legacy Portfolio</h2>
          <p>
            <a
              href="https://bellamyphan.space/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bellamyphan.space
            </a>
          </p>
        </section>

      </main>
    </div>
  )
}