var mongoose = require('mongoose')

const {Schema, model, SchemaTypes}  = mongoose;

const formSchema = new Schema({
    image: {
        required: true,
        type: SchemaTypes.String,
    },
    destination: {
        required: true,
        type: SchemaTypes.String,
    },
    filename: {
        required: true,
        type: SchemaTypes.String,
    },
    input: {
        required: true,
        type: SchemaTypes.String,
    },
    input2: {
        required: true,
        type: SchemaTypes.String,
    },
    input3: {
        required: true,
        type: SchemaTypes.String,
    },
    author: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Author",
      },

},{
    timestamp: true
});



const formModel = model('Form', formSchema)

module.exports = formModel;
