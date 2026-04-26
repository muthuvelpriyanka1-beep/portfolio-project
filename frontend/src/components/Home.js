import React, { useEffect, useState } from 'react';
import { API_BASE, buildApiUrl } from '../api';
import '../styles/Home.css';

function Home() {
  const [apiHealth, setApiHealth] = useState({ status: 'checking', message: 'Checking backend connection...' });

  useEffect(() => {
    const checkApi = async () => {
      try {
        const healthUrl = buildApiUrl('/api/health');
        const response = await fetch(healthUrl, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }

        const data = await response.json();
        setApiHealth({
          status: 'ok',
          message: `Connected to backend DB: ${data?.mongo?.dbName || 'unknown'}`
        });
      } catch (error) {
        setApiHealth({
          status: 'error',
          message: `Backend connection issue: ${error.message}`
        });
      }
    };

    checkApi();
  }, []);

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

          <div className={`api-debug-banner ${apiHealth.status}`}>
            <strong>API:</strong> {API_BASE || 'Not configured'}<br />
            <strong>Status:</strong> {apiHealth.message}
          </div>

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
