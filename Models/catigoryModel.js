const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = mongoose.Schema({
    _id : Number, 
    name: {
        type: String,
        required: true,
    }
},{_id : false});

categorySchema.plugin(AutoIncrement, {id: 'class_counter'});


exports.Category = mongoose.model('Category', categorySchema);
