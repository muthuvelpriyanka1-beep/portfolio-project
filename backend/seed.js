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
  impact: String,
  createdAt: { type: Date, default: Date.now }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100 },
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  date: String,
  createdAt: { type: Date, default: Date.now }
});

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  date: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// Define Models
const Project = mongoose.model('Project', ProjectSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Achievement = mongoose.model('Achievement', AchievementSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);

// Sample Projects Data - Priyanka's Projects
const sampleProjects = [
  {
    title: "Smart Aviation Management System",
    description: "Developed a web application to manage flight bookings and passenger records using a secure database. Simplifies the ticket booking process and ensures data security for travelers.",
    technologies: ["HTML", "CSS", "JavaScript", "Python"],
    impact: "Streamlines flight ticket booking and protects traveler data with secure database management",
    image: "https://via.placeholder.com/400x250?text=Aviation+Management"
  }
];

// Sample Skills Data - Priyanka's Skills
const sampleSkills = [
  // Web Technologies
  { name: "HTML", proficiency: 90, category: "Web Technologies" },
  { name: "CSS", proficiency: 90, category: "Web Technologies" },
  { name: "JavaScript", proficiency: 85, category: "Web Technologies" },
  
  // Programming
  { name: "Python", proficiency: 80, category: "Programming" },
  
  // Design Tools
  { name: "Figma", proficiency: 85, category: "Design Tools" },
  { name: "UI/UX Design", proficiency: 85, category: "Design Tools" },
  { name: "Canva", proficiency: 80, category: "Design Tools" },
  
  // Soft Skills
  { name: "Leadership", proficiency: 85, category: "Soft Skills" },
  { name: "Communication", proficiency: 90, category: "Soft Skills" },
  { name: "Problem Solving", proficiency: 88, category: "Soft Skills" }
];

// Achievements Data - Priyanka's Awards & Achievements
const sampleAchievements = [
  {
    title: "Academic Excellence",
    description: "Secured 2nd Rank in I-MSc Computer Science at Vivekanandha Educational Institutions",
    category: "Academic",
    date: "2024"
  },
  {
    title: "Workshop Speaker",
    description: "Led a hands-on seminar on UI/UX Design in Figma at VICAS",
    category: "Workshop",
    date: "2024"
  },
  {
    title: "CS250 Certification",
    description: "Completed Python for Data Science from Saylor University",
    category: "Certification",
    date: "2024"
  },
  {
    title: "NSS Volunteer",
    description: "Participated in a 7-day Rural Development Camp for community service",
    category: "Community Service",
    date: "2024"
  }
];

// Certificates Data - Priyanka's Certifications
const sampleCertificates = [
  {
    title: "Python Programming Intern",
    organization: "Durga Tech, Erode",
    date: "May 2024 - June 2024",
    description: "Python Programming Internship"
  },
  {
    title: "Seminar: Impact of AI in the Future",
    organization: "Kodaikanal Christian College",
    date: "2024",
    description: "Attended a seminar on the Impact of AI in the Future"
  },
  {
    title: "Paper Presentation: AI in Social Media",
    organization: "National Level Conference",
    date: "2024",
    description: "Presented a paper on Artificial Intelligence in Social Media"
  },
  {
    title: "Google Cloud Computing",
    organization: "NPTEL",
    date: "2024",
    description: "Successfully completed an NPTEL online course on Google Cloud Computing"
  }
];

// Function to seed data
async function seedDatabase() {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Achievement.deleteMany({});
    await Certificate.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert projects
    await Project.insertMany(sampleProjects);
    console.log("✅ Projects added:", sampleProjects.length);

    // Insert skills
    await Skill.insertMany(sampleSkills);
    console.log("✅ Skills added:", sampleSkills.length);

    // Insert achievements
    await Achievement.insertMany(sampleAchievements);
    console.log("✅ Achievements added:", sampleAchievements.length);

    // Insert certificates
    await Certificate.insertMany(sampleCertificates);
    console.log("✅ Certificates added:", sampleCertificates.length);

    console.log("\n🎉 Database seeded successfully!");
    console.log("📊 Total Projects:", await Project.countDocuments());
    console.log("📊 Total Skills:", await Skill.countDocuments());
    console.log("📊 Total Achievements:", await Achievement.countDocuments());
    console.log("📊 Total Certificates:", await Certificate.countDocuments());

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed function
seedDatabase();
