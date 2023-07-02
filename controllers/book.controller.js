const Book = require("../models/book.model");
const Author = require("../models/author.model");
const fs = require("fs");
const path = require("path");
const {deleteFile} = require('./../deleteFileConfig')
const baseUrl = "http://localhost:3000/book/";

const bookController = {
  getAllBook: async (req, res, next) => {
    try {
      const books = await Book.find().populate("author").exec();

      res.send(books);
    } catch (error) {
      res.status(500).send("Error");
    }
  },

  getOneBook: async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      res.send(book);
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  createBook: async (req, res, next) => {
    console.log(req.file);
    try {
      const { name, publishing, siteNumber, author: authorId } = req.body;

      const author = await Author.findById(authorId);

      if (!author) {
        return res.status(404).send("Autor nie został znaleziony.");
      }

      const newBook = new Book({
        image: req.file.originalname,
        destination: req.file.destination,
        filename: req.file.filename,
        imagePath: baseUrl + req.file.destination + req.file.filename,
        name,
        publishing,
        siteNumber,
        author: author._id,
      });

      console.log(newBook);
      const createBook = await newBook.save();

      res.status(200).json(createBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Wystąpił błąd serwera" });
    }
  },
  updateBook: async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.file);
      const { id } = req.params;
      const { name, publishing, siteNumber, author: authorId } = req.body;

      const author = await Author.findById(authorId);

      if (!author) {
        return res.status(404).send("Author was not found");
      }
      if (req.file) {
        const filename = req.body.currantName;
        console.log(filename)
       deleteFile(filename)
        await Book.findByIdAndUpdate(id, {
          $set: {
            name,
            publishing,
            siteNumber,
            author,
            originalname: req.file.originalname,
            destination: req.file.destination,
            filename: req.file.filename,
            imagePath: baseUrl + req.file.destination + req.file.filename,
          },
        });
      } else {
        await Book.findByIdAndUpdate(id, {
          $set: {
            name,
            publishing,
            siteNumber,
            author,
          },
        });
      }

      const book = await Book.findById(id);

      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Wystąpił błąd serwera" });
    }
  },

  deleteBook: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
    try {
      const { id, filename } = req.params;

      await Book.findByIdAndDelete(id);
deleteFile(filename)
   

      res.send("Deleted");
    } catch (error) {
      res.status(500);
      res.send("Error");
    }
  },
  getImage: async (req, res, next) => {
    try {
      const imgFolder = path.join(__dirname, "./../images");
      const imageName = req.params.imageName;
      const imagePath = path.join(imgFolder, imageName);

      fs.access(imagePath, fs.constants.R_OK, (err) => {
        if (err) {
          res.status(404).send("File was not found");
        } else {
          res.sendFile(imagePath);
        }
      });
    } catch (error) {
      res.status(500).send("Error");
    }
  },
};

module.exports = bookController;
