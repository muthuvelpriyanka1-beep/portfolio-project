
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Project=mongoose.model('Project',{title:String,description:String});
app.get('/api/projects',async(req,res)=>{res.json(await Project.find());});

app.listen(process.env.PORT||5000);
