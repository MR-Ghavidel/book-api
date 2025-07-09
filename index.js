const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const app = express();
const PORT = 4000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
    res.send('BOOK API');
});





app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});