const Author = require("../models/author.model");
const Book = require("../models/book.model");

const authorController = {
  getAllAuthor: async (req, res, next) => {
    try {
      const author = await Author.find();

      res.send(author);
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  getOneAuthor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const author = await Author.findById(id);

      res.send(author);
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  createAuthor: async (req, res, next) => {
    try {
      const { name, country } = req.body;

      const author = new Author({
        name,
        country,
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
      const { id } = req.params;
      const { name, country } = req.body;
      await Author.findByIdAndUpdate(id, {
        $set: {
          name,
          country,
        },
      });
      const contact = await Author.findById(id);
      res.send(contact);
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  deleteAuthor: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Author.findByIdAndDelete(id);

      res.send("Deleted");
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  searchAuthor: async (req, res, next) => {
    
    try {
      const { query } = req.query;
      console.log(req.query);
      const authors = await Author.find({
        name: { $regex: query, $options: "i" },
      });
      console.log(authors)

      const books = await Book.find()
      .populate({
        path: 'author',
        select: 'name'
      })
      .exec();

      const authorObjects = authors.map(author=>{
        const authorObject = {
            name:author.name,
            books: []
      }
        const authorBooks = books.filter(book => book.author.name === author.name);

        if (authorBooks.length > 0) {
            authorObject.books = authorBooks.map(book => ({ name: book.name }));
          } 

          return authorObject

      })
      console.log(authorObjects)
      
      
    //   res.send(authors);
      res.send(authorObjects);
    } catch (error) {
      res.status(500).send("Error");
    }
  },

};

module.exports = authorController;
