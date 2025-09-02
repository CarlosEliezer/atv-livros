const express = require('express');
const router = express.Router();

const postBook= require('./postBook');
const getBookById = require('./getBookById');
const listBooks = require('./listBooks');
const deleteBook = require('./deleteBook');
const updateBook = require('./updateBook');

router.post('/deck', postBook);
router.get('/deck/:id', getBookById);
router.put('/deck/:id/:target', updateBook);
router.delete('/deck/:id', deleteBook);
router.get('/decks', listBooks)

module.exports = router;