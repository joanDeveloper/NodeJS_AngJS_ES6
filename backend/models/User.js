var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  surname:String,
  email:String,
  type_user:String,
  type_plan:String,
  date_init:String,
  date_expiration:String,
  ubication:String
  //test:[{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
}, {timestamps: true});

mongoose.model('User', UserSchema);
