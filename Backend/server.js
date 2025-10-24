const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
const userRouter=require('./routes/userRoutes.js')


const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://localhost:27017/mongodbTR4'
    );
    console.log('DB CONNECTED 🔥');

  } catch (error) {
    console.log(error);
  }
};

connectDb();

app.get('/',(req,res)=>{
    res.send("home page ")
})

app.listen(3000, () => {
  console.log('Server is running on 3000');
});
