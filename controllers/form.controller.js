const Form = require('../models/form.model')
const Author = require('../models/author.model')

const formController = {
    getAllForm: async (req, res, next) => {
        try {
            const form = await Form.find()
          
            res.send(form)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    getOneForm: async (req, res, next) => {
        try {
            const { id } = req.params
            const form = await Form.findById(id)
            
            res.send(form)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    createForm: async (req, res, next) => {
        try {
            const {
                input,
                input2,
                input3,
                author: authorId,
            } = req.body


            const author = await Author.findById(authorId); 
    console.log(author)
            if (!author) {
              return res.status(404).send("Autor nie został znaleziony."); 
            }


          const newForm = new Form({
            image: req.file.originalname,
            destination: req.file.destination,
            filename: req.file.filename,
            input,
            input2,
            input3,
            author: author._id
            
          });
      
          console.log(newForm)
          const createForm = await newForm.save();
      
          res.status(200).json(createForm);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Wystąpił błąd serwera' });
        }
      },
    updateForm: async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, form2, selectValue } = req.body
            await Form.findByIdAndUpdate(id, {
                $set: {
                    name,
                    form2,
                    selectValue,
                }
            })
            const contact = await Form.findById(id);
            res.send(contact)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    deleteForm: async (req, res, next) => {
        try {
            const { id } = req.params

            await Form.findByIdAndDelete(id);

            res.send('Deleted')
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    
}

module.exports = formController