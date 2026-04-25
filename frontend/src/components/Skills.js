import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';
import '../styles/Skills.css';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/skills'));
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        console.log('[Skills DEBUG] fetched skills:', data.length);
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <section className="skills"><p>Loading skills...</p></section>;
  if (error) return <section className="skills"><p>Error: {error}</p></section>;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section className="skills">
      <div className="skills-container">
        <h2 className="section-title">My Skills</h2>
        
        <div className="skills-grid">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category">
              <h3>{category}</h3>
              {categorySkills.map(skill => (
                <div key={skill._id} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.proficiency}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
