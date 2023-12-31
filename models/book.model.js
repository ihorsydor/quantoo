const mongoose = require('mongoose');

const { Schema, model, SchemaTypes } = mongoose;

const bookSchema = new Schema({
  image: {
    required: true,
    type: SchemaTypes.String,
},
destination: {
    required: true,
    type: SchemaTypes.String,
},
imagePath:{
  required: true,
  type: SchemaTypes.String,
},
filename: {
    required: true,
    type: SchemaTypes.String,
},
  name: {
    required: true,
    type: SchemaTypes.String,
  },
  publishing: {
    required: true,
    type: SchemaTypes.String,
  },
  siteNumber: {
    required: true,
    type: SchemaTypes.Number,
  },
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
}, {
  timestamp: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

bookSchema.virtual('authorData', {
  ref: 'Author',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
});

const bookModel = model('Book', bookSchema);

module.exports = bookModel;

