const projectSeedData = [
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with React, Node.js, and MongoDB.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubLink: 'https://github.com/your-username/portfolio-project',
    liveLink: 'https://your-portfolio.vercel.app',
    image: 'https://via.placeholder.com/600x400?text=Portfolio+Website'
  },
  {
    title: 'Task Manager API',
    description: 'REST API for task management with authentication and CRUD operations.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    githubLink: 'https://github.com/your-username/task-manager-api',
    liveLink: '',
    image: 'https://via.placeholder.com/600x400?text=Task+Manager+API'
  }
];

const skillSeedData = [
  { name: 'JavaScript', proficiency: 90, category: 'Frontend' },
  { name: 'React', proficiency: 88, category: 'Frontend' },
  { name: 'Node.js', proficiency: 85, category: 'Backend' },
  { name: 'Express', proficiency: 84, category: 'Backend' },
  { name: 'MongoDB', proficiency: 82, category: 'Database' }
];

module.exports = {
  projectSeedData,
  skillSeedData
};
