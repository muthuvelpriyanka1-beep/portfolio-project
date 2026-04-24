import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Who am I?</h3>
            <p>
              I'm a passionate full-stack developer with experience in building web applications.
              I love learning new technologies and solving complex problems.
            </p>
            
            <h3>Education</h3>
            <div className="education-item">
              <h4>Bachelor of Science in Computer Science</h4>
              <p>University Name | Graduation: 2023</p>
            </div>

            <h3>Experience</h3>
            <div className="experience-item">
              <h4>Full-Stack Developer</h4>
              <p>Company Name | 2023 - Present</p>
              <ul>
                <li>Developed and maintained React applications</li>
                <li>Built REST APIs using Node.js and Express</li>
                <li>Collaborated with designers and product teams</li>
              </ul>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <h4>10+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h4>2+</h4>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h4>20+</h4>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
