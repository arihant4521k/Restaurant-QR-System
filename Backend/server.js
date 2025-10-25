const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

// Import all routers
const userRouter = require('./routes/userRoutes.js');
const adminRouter = require('./routes/adminRoutes.js');
const staffRouter = require('./routes/staffRoutes.js');

// Database connection
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://localhost:27017/RestaurentDB'
    );
    console.log('DB CONNECTED 🔥');
  } catch (error) {
    console.log(error);
  }
};

connectDb();

// Home route
app.get('/', (req, res) => {
  res.send("Restaurant Management System - Home Page");
});

// API Routes
app.use('/api/v1', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/staff', staffRouter);

// Optional: Auth routes (uncomment when ready)
// app.use('/api/v1/auth', require('./routes/authRoutes.js'));

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000 🚀');
});
