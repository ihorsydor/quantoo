var express = require('express');
var bookController = require('../controllers/book.controller')
var router = express.Router();
const upload = require('./../multerConfig')



router.get('/images/:imageName', bookController.getImage);
router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getOneBook);
router.post('/', upload.single('image'), bookController.createBook);
router.put('/:id', upload.single('image'), bookController.updateBook);
router.delete('/:id/:filename', bookController.deleteBook);

module.exports = router;