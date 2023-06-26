var mongoose = require('mongoose')

const {Schema, model, SchemaTypes}  = mongoose;

const formSchema = new Schema({
    name: {
        required: true,
        type: SchemaTypes.String,
    },
    
    form2: {
        required: true,
        type: SchemaTypes.String,
    },

    selectValue: {
        required: true,
        type: SchemaTypes.String,
    },

},{
    timestamp: true
});

const formModel = model('Form', formSchema)

module.exports = formModel;
