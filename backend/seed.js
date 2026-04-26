require('dotenv').config();
const mongoose = require('mongoose');
const { projectSeedData, skillSeedData } = require('./seedData');

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
