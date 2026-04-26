const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

const DEBUG_LOGS = process.env.DEBUG_LOGS === 'true';

const log = (...args) => console.log(new Date().toISOString(), ...args);
const debugLog = (...args) => {
  if (DEBUG_LOGS) {
    log('[DEBUG]', ...args);
  }
};

const maskMongoUri = (uri = '') => {
  if (!uri) return '<missing>';
  return uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@');
};

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${Date.now() - start}ms`);
  });
  next();
});

// MongoDB Connection
log('Connecting MongoDB with URI:', maskMongoUri(process.env.MONGO_URI));
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    log(`✅ MongoDB Connected (db: ${mongoose.connection.name})`);
  })
  .catch(err => log('❌ MongoDB Error:', err.message));

mongoose.connection.on('error', (error) => log('❌ MongoDB connection error:', error.message));
mongoose.connection.on('disconnected', () => log('⚠️ MongoDB disconnected'));

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


app.get('/', (req, res) => {
  res.status(200).json({
    service: 'portfolio-backend',
    status: 'running',
    health: '/api/health',
    endpoints: ['/api/projects', '/api/skills', '/api/contact']
  });
});

// Basic health check
app.get('/api/health', async (req, res) => {
  const stateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const readyState = mongoose.connection.readyState;

  res.json({
    ok: true,
    mongo: {
      state: stateMap[readyState] || `unknown(${readyState})`,
      dbName: mongoose.connection.name || null
    },
    apiBaseHint: process.env.NODE_ENV || 'development'
  });
});

// Debug-only endpoint (enable with DEBUG_LOGS=true)
app.get('/api/debug/db-stats', async (req, res) => {
  if (!DEBUG_LOGS) {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    const [projectCount, skillCount, contactCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Contact.countDocuments()
    ]);

    res.json({
      dbName: mongoose.connection.name,
      collections: {
        projects: projectCount,
        skills: skillCount,
        contacts: contactCount
      },
      sampleProject: await Project.findOne().sort({ createdAt: -1 }),
      sampleSkill: await Skill.findOne().sort({ createdAt: -1 })
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch debug stats', details: error.message });
  }
});

// ===== PROJECTS API =====

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    debugLog(`/api/projects -> ${projects.length} records from db ${mongoose.connection.name}`);
    res.json(projects);
  } catch (error) {
    log('❌ /api/projects failed:', error.message);
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
    log('❌ /api/projects/:id failed:', error.message);
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
    debugLog('Project created:', savedProject._id.toString());
    res.status(201).json(savedProject);
  } catch (error) {
    log('❌ POST /api/projects failed:', error.message);
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

// ===== SKILLS API =====

// GET all skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    debugLog(`/api/skills -> ${skills.length} records from db ${mongoose.connection.name}`);
    res.json(skills);
  } catch (error) {
    log('❌ /api/skills failed:', error.message);
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
    debugLog('Skill created:', savedSkill._id.toString());
    res.status(201).json(savedSkill);
  } catch (error) {
    log('❌ POST /api/skills failed:', error.message);
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

    debugLog('Contact saved:', savedContact._id.toString());
    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: savedContact
    });
  } catch (error) {
    log('❌ POST /api/contact failed:', error.message);
    res.status(500).json({ error: 'Failed to save message', details: error.message });
  }
});

// GET all contact messages (for admin)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    debugLog(`/api/contact -> ${contacts.length} records`);
    res.json(contacts);
  } catch (error) {
    log('❌ GET /api/contact failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
});

// ===== SERVER =====

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  log(`🚀 Server running on port ${PORT} (debug=${DEBUG_LOGS ? 'on' : 'off'})`);
});
