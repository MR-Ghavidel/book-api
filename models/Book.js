const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    pages: {
        type: Number,
        require: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;