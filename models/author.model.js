var mongoose = require('mongoose')

const {Schema, model, SchemaTypes}  = mongoose;

const authorSchema = new Schema({
    name: {
        required: true,
        type: SchemaTypes.String,
    },
    
    country: {
        required: true,
        type: SchemaTypes.String,
    },

},{
    timestamp: true
});

const authorModel = model('Author', authorSchema)

module.exports = authorModel;
