var express = require('express');
var authorController = require('../controllers/author.controller')
var router = express.Router();

/* GET users listing. */
router.get("/", function(req,res,next){
    res.send('TEST');
});
router.get('/account/abc', function(req, res) {
    console.log('TEST', req);
  
      res.status(200)
    
  });
router.get('/', authorController.getAllAuthor);
router.get('/:id', authorController.getOneAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/search', authorController.searchAuthor);



module.exports = router;