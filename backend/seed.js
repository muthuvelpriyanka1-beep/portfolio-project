// Achievement Schema
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Achievement = mongoose.model('Achievement', achievementSchema);

// Certificate Schema
const certificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuedBy: { type: String, required: true },
    dateIssued: { type: Date, default: Date.now }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// API Routes
const express = require('express');
const router = express.Router();

// Get all achievements
router.get('/achievements', async (req, res) => {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
});

// Create a new achievement
router.post('/achievements', async (req, res) => {
    const newAchievement = new Achievement(req.body);
    await newAchievement.save();
    res.status(201).json(newAchievement);
});

// Get all certificates
router.get('/certificates', async (req, res) => {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
});

// Create a new certificate
router.post('/certificates', async (req, res) => {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.status(201).json(newCertificate);
});

module.exports = router;
