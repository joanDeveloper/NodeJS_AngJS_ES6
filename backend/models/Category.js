var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
  name: String,
  test:[
    {
      _id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Test'
      }
    }],
  description:String
  
}, {timestamps: true});

mongoose.model('Category', CategorySchema);
