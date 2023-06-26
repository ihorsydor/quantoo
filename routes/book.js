var express = require('express');
var bookController = require('../controllers/book.controller')
var router = express.Router();

/* GET users listing. */
router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getOneBook);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;