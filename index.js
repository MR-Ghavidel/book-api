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

//Route
app.get('/', (req, res) => {
    res.send('BOOK API');
});

app.get('/books', async (req, res) => {
    try {
        const allBooks = await Book.find({});
        res.json(allBooks);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching todos'});
    }
});



app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});