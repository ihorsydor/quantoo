const Book = require('../models/book.model')
const Author = require('../models/author.model')

const bookController = {
    getAllBook: async (req, res, next) => {
        try {
          const books = await Book.find().populate('author').exec();
    
          res.send(books);
        } catch (error) {
          res.status(500).send('Error');
        }
      },
    
    getOneBook: async (req, res, next) => {
        try {
            const { id } = req.params
            const book = await Book.findById(id)
            
            res.send(book)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    createBook: async (req, res, next) => {
        console.log(req.body)
        try {
          const {
            name,
            publishing,
            siteNumber,
            author: authorId
          } = req.body;
          console.log("tu jest")
          console.log(req.file)
          
          const {filename} = req.file
          
          const author = await Author.findById(authorId); 
    
          if (!author) {
            return res.status(404).send("Autor nie został znaleziony."); 
          }
    
          const book = new Book({
            name,
            publishing,
            siteNumber,
            photo: filename,
            author: author._id 
          });
    
          const createdBook = await book.save();
    
          res.send(createdBook.toObject());
        } catch (error) {
          res.status(500).send(error);
        }
      },
    updateBook: async (req, res, next) => {
        try {
            const { id } = req.params
            const { name, publishing, siteNumber, photo, author } = req.body
            await Book.findByIdAndUpdate(id, {
                $set: {
                    name, publishing, siteNumber, photo, author
                }
            })
            const contact = await Book.findById(id);
            res.send(contact)
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
    deleteBook: async (req, res, next) => {
        try {
            const { id } = req.params

            await Book.findByIdAndDelete(id);

            res.send('Deleted')
        } catch (error) {
            res.status(500);
            res.send('Error');
        }
    },
}

module.exports = bookController