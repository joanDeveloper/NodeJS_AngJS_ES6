var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    id_category:[{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    name: {type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    description:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true}
    
}, {timestamps: true});

mongoose.model('Test', CategorySchema);
