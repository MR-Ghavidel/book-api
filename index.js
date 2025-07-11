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
        res.status(500).json({ error: 'Server error while fetching books' });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);

    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching book' });
    }
});

app.post('/books', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: 'Title is required.' });
        }
        if (!req.body.author) {
            return res.status(400).json({ error: 'Author is required.' });
        }
        if (!req.body.pages) {
            return res.status(400).json({ error: 'Pages is required.' });
        }

        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages
        });

        res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json({ error: 'Server error while creating book' });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, pages, isRead } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Book not found' });
        }

        if (
            typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof pages !== 'number' ||
            typeof isRead !== 'boolean'
        ) {
            return res.status(400).json({ error: 'Invalid data provided.' })
        }

        const updateBook = await Book.findByIdAndUpdate(
            id,
            { title, author, pages, isRead },
            { new: true }
        );
        if (!updateBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(updateBook);

    } catch (error) {
        res.status(500).json({ error: 'Server error while updating book'});
    }

});

app.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: 'Book not found' });
        }

        const deletedBook = await Book.findByIdAndDelete(id);

        if(!deletedBook){
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting book' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});