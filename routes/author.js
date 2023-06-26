var express = require('express');
var authorController = require('../controllers/author.controller')
var router = express.Router();

/* GET users listing. */
router.get('/', authorController.getAllAuthor);
router.get('/:id', authorController.getOneAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/:id/search', authorController.searchAuthor);



module.exports = router;