const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const app = express();
const PORT = 4000;
app.use(express.json());

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
        res.status(500).json({ error: 'Server error while fetching books'});
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: 'Book not found'});
        }

        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({ error: 'Book not found'});
        }

        res.json(book);

    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching book'});
    }
});

app.post('/books', async (req, res) => {
try {
    if(!req.body.title){
        return res.status(400).json({ error: 'Title is required.'});
    }
    if(!req.body.author){
        return res.status(400).json({ error: 'Author is required.'});
    }
    if(!req.body.pages){
        return res.status(400).json({ error: 'Pages is required.'});
    }
    
    const newBook = await Book.create({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    });

    res.status(201).json(newBook);

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating book'});
}
});



app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});