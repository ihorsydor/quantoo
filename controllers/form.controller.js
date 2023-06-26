const Form = require('../models/form.model')


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
                name, form2, selectValue
            } = req.body



            const form = new Form({
                name, form2, selectValue
            });

            const createdForm = await form.save();

            res.send(createdForm.toObject());
        } catch (error) {
            res.status(500);
            res.send(error);
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