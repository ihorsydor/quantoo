var express = require('express');
var authorController = require('../controllers/author.controller')
var router = express.Router();

/* GET users listing. */
// router.get("/:a", function(req,res,next){
//     res.send('TEST');
// });
// router.get('/account/abc', function(req, res) {
//     res.send('TEST');
//     console.log('TEST', req);
  
//       res.status(200)
    
//   });
router.get('/search', authorController.searchAuthor);
router.get('/', authorController.getAllAuthor);
router.get('/:id', authorController.getOneAuthor);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);




module.exports = router;