const express = require('express');
const mongoose = require('mongoose');
const  User  = require('./models/Users.models.js');
const  userRoute = require("./routes/users.router.js");

const app = express();


app.use(express.json());

// users route 
app.use("/blog/users", userRoute);


app.get('/',(req,res) => {
    res.send("Hello from node API updated ");
})


// users API 

app.post('/blog/users', async(req,res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  }
  catch (error) {
   res.status(500).json({message:error.message});
  }
})

// GET all users 

app.get('/blog/users', async(req,res) => {
  
})


// get single users 

app.get('/blog/users/:id', async (req,res) => {
 
})

// update users 


app.put('/blog/users/:id', async (req,res) => {
  try {
    const {id} = req.params;
    const users = await User.findByIdAndUpdate(id, req.body);
    if(!users) {
      return res.status(404).json({message: "users not found"});
    }
    const updateUsers = await User.findById(id);
    res.status(200).json(updateUsers)
  }
  catch (error) {
    res.status(500).json({message: error.message})
  }
})


// delete api 

app.delete('/blog/users/:id' , async(req,res) => {
  try {
    const {id} = req.params;
    const users = await User.findByIdAndDelete(id);
    if(!users){
      return res.status(404).json({message: "users not found"});
    }
    res.status(200).json({message: "users has been deleted successfull"});
  }
  catch  (error){
    res.status(500).json({message:error.message});
  }
})

mongoose.connect("mongodb+srv://mahuraninstitute:GsQYONGfQcofjdxa@cluster0.qdwka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
   console.log("connectd to database ");
   
app.listen(3000, ()   =>{
    console.log("server running port 3000 ");
 })
})
.catch(() => {
    console.log("connection failed ");
})
