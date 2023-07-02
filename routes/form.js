var express = require('express');
var formController = require('../controllers/form.controller')
var router = express.Router();
const upload = require('./../multerConfig')

/* GET users listing. */
router.get('/', formController.getAllForm);
router.get('/:id', formController.getOneForm);
router.post('/',upload.single('image'), formController.createForm);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

module.exports = router;