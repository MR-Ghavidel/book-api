const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('BOOK API');
});





app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});