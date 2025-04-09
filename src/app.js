const express = require('express');
const dotenv = require('dotenv');
// const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const errorHandler = require('./middleware/errorHandler');
const { mongoose } = require('mongoose');

dotenv.config();
// connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// Error Handler
// app.use(errorHandler);
mongoose.connect("mongodb://localhost:27017" ).then(()=>{console.log("database connect")}) .catch(()=>{console.log("disconnect")})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});