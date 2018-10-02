var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
  name: {type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  test:[
    {
      _id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Test'
      }
    }],
  description:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true}
  
}, {timestamps: true});

mongoose.model('Category', CategorySchema);
