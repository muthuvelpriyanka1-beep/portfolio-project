
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ===== SCHEMAS =====

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubLink: String,
  liveLink: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

// Skill Schema
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100 },
  category: String,
  createdAt: { type: Date, default: Date.now }
});

// Contact Message Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Project = mongoose.model('Project', ProjectSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// ===== PROJECTS API =====

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
});

// POST new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink, image } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newProject = new Project({
      title,
      description,
      technologies: technologies || [],
      githubLink,
      liveLink,
      image
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

// ===== SKILLS API =====

// GET all skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills', details: error.message });
  }
});

// POST new skill
app.post('/api/skills', async (req, res) => {
  try {
    const { name, proficiency, category } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Skill name is required' });
    }

    const newSkill = new Skill({
      name,
      proficiency: proficiency || 80,
      category: category || 'Other'
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill', details: error.message });
  }
});

// ===== CONTACT API =====

// POST contact message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message received successfully',
      data: savedContact 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message', details: error.message });
  }
});

// GET all contact messages (for admin)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
});

// ===== SERVER =====

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
