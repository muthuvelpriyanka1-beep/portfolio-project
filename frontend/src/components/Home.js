import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <section className="home">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Hi, I'm Your Name</h1>
          <p className="home-subtitle">Full-Stack Developer | React Enthusiast | Problem Solver</p>
          <p className="home-description">
            I build beautiful and functional web applications using modern technologies.
            Passionate about creating seamless user experiences and scalable backend systems.
          </p>
          <div className="home-buttons">
            <button className="btn btn-primary">View My Work</button>
            <button className="btn btn-secondary">Download CV</button>
          </div>
        </div>
        <div className="home-image">
          <img src="https://via.placeholder.com/400x400" alt="Profile" />
        </div>
      </div>
    </section>
  );
}

export default Home;
