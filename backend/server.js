const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Project = mongoose.model("Project", {
  title: String,
  description: String,
  github: String
});

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/api/contact", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Saved" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
