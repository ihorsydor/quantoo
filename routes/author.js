var express = require('express');
var authorController = require('../controllers/author.controller')
var router = express.Router();


router.get('/search', authorController.searchAuthor);
router.get('/', authorController.getAllAuthor);
router.get('/:id', authorController.getOneAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);




module.exports = router;