require('dotenv').config();
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubLink: String,
  liveLink: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100 },
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

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

async function seedDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing. Please set it in your environment variables.');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected for seeding');

  await Promise.all([
    Project.deleteMany({}),
    Skill.deleteMany({})
  ]);

  await Promise.all([
    Project.insertMany(projectSeedData),
    Skill.insertMany(skillSeedData)
  ]);

  console.log('✅ Seed completed: projects and skills inserted');
}

seedDatabase()
  .catch((error) => {
    console.error('❌ Seeding failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  });
