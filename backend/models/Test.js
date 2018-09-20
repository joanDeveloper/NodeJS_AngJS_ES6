var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    id_category:[{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    name: String,
    description:String
    
}, {timestamps: true});

mongoose.model('Test', CategorySchema);
