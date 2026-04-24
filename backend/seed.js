const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.log("❌ MongoDB Error:", err);
    process.exit(1);
  });

// Define Schemas
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

// Define Models
const Project = mongoose.model('Project', ProjectSchema);
const Skill = mongoose.model('Skill', SkillSchema);

// Sample Projects Data
const sampleProjects = [
  {
    title: "Portfolio Website",
    description: "A full-stack personal portfolio website showcasing projects, skills, and contact information with React frontend and Node.js backend.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "CSS3"],
    githubLink: "https://github.com/muthuvelpriyanka1-beep/portfolio-project",
    liveLink: "https://portfolio-project-kkhq.vercel.app",
    image: "https://via.placeholder.com/400x250?text=Portfolio+Website"
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, and payment integration using Stripe.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    githubLink: "https://github.com/example/ecommerce",
    liveLink: "https://ecommerce-example.vercel.app",
    image: "https://via.placeholder.com/400x250?text=E-commerce+Platform"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, user authentication, and team workspaces.",
    technologies: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    githubLink: "https://github.com/example/task-manager",
    liveLink: "https://task-manager-app.vercel.app",
    image: "https://via.placeholder.com/400x250?text=Task+Manager"
  },
  {
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current weather, forecasts, and allows users to search multiple cities.",
    technologies: ["React", "OpenWeather API", "Axios", "Chart.js"],
    githubLink: "https://github.com/example/weather-app",
    liveLink: "https://weather-dashboard-app.vercel.app",
    image: "https://via.placeholder.com/400x250?text=Weather+Dashboard"
  },
  {
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media performance tracking with real-time data visualization and insights.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    githubLink: "https://github.com/example/social-analytics",
    liveLink: "https://social-analytics-dash.vercel.app",
    image: "https://via.placeholder.com/400x250?text=Social+Analytics"
  }
];

// Sample Skills Data
const sampleSkills = [
  // Frontend
  { name: "React", proficiency: 90, category: "Frontend" },
  { name: "JavaScript", proficiency: 95, category: "Frontend" },
  { name: "HTML5", proficiency: 95, category: "Frontend" },
  { name: "CSS3", proficiency: 90, category: "Frontend" },
  { name: "Tailwind CSS", proficiency: 85, category: "Frontend" },
  { name: "Redux", proficiency: 80, category: "Frontend" },
  
  // Backend
  { name: "Node.js", proficiency: 90, category: "Backend" },
  { name: "Express.js", proficiency: 90, category: "Backend" },
  { name: "Python", proficiency: 75, category: "Backend" },
  { name: "API Development", proficiency: 88, category: "Backend" },
  
  // Database
  { name: "MongoDB", proficiency: 85, category: "Database" },
  { name: "MySQL", proficiency: 80, category: "Database" },
  { name: "PostgreSQL", proficiency: 75, category: "Database" },
  
  // Tools & Others
  { name: "Git & GitHub", proficiency: 90, category: "Tools" },
  { name: "Docker", proficiency: 70, category: "Tools" },
  { name: "Postman", proficiency: 85, category: "Tools" },
  { name: "Problem Solving", proficiency: 92, category: "Others" },
  { name: "Agile/Scrum", proficiency: 80, category: "Others" }
];

// Function to seed data
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert projects
    await Project.insertMany(sampleProjects);
    console.log("✅ Projects added:", sampleProjects.length);

    // Insert skills
    await Skill.insertMany(sampleSkills);
    console.log("✅ Skills added:", sampleSkills.length);

    console.log("\n🎉 Database seeded successfully!");
    console.log("📊 Total Projects:", await Project.countDocuments());
    console.log("📊 Total Skills:", await Skill.countDocuments());

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();
