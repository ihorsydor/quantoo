const Author = require('../models/author.model')


const authorController = {
    getAllAuthor: async (req, res, next) => {
        try {
            const author = await Author.find()
          
            res.send(author)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    getOneAuthor: async (req, res, next) => {
        try {
            const { id } = req.params
            const author = await Author.findById(id)
            
            res.send(author)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    createAuthor: async (req, res, next) => {
        try {
            const {
                name, country
            } = req.body



            const author = new Author({
                name, country
            });

            const createdAuthor = await author.save();

            res.send(createdAuthor.toObject());
        } catch (error) {
            res.status(500);
            res.send(error);
        }
    },
    updateAuthor: async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, country } = req.body
            await Author.findByIdAndUpdate(id, {
                $set: {
                    name,
                    country
                }
            })
            const contact = await Author.findById(id);
            res.send(contact)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    deleteAuthor: async (req, res, next) => {
        try {
            const { id } = req.params

            await Author.findByIdAndDelete(id);

            res.send('Deleted')
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    searchAuthor: async (req, res, next) => {
        console.log('tu jest')
        try {
          const { query } = req.query;
          console.log(req.query)
          const authors = await Author.find({ name: { $regex: query, $options: 'i' } });
          res.send(authors);
        } catch (error) {
          res.status(500).send('Error');
        }
      },
}

module.exports = authorController