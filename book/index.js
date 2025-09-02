const express = require('express');
const router = express.Router();

const postBook= require('./postBook');
const getBookById = require('./getBookById');
const listBooks = require('./listBooks');
const deleteBook = require('./deleteBook');
const updateBook = require('./updateBook');
const searchBookBy = require('./searchBookBy');

router.post('/book', postBook);
router.get('/book/:id', getBookById);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);
router.get('/books', listBooks)
router.get('/books/search', searchBookBy);

module.exports = router;