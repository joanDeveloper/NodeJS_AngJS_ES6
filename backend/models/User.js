var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  idsocial: {type: String, lowercase: true, unique: true, required: [false, "can't be blank"], index: true},
  user:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  name: {type: String, lowercase: true, unique: false, required: [false, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
  surname:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
  email:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'is invalid'], index: true},
  password:String,
  type_user:{type: Number, lowercase: true, unique: false, required: [false, "can't be blank"], match: [/^[0-9]+$/, 'is invalid'], index: true},
  type_plan:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
  date_init:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true},
  date_expiration:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true},
  lat:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true},
  long:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true},
  media:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true},
  token:{type: String, lowercase: true, unique: false, required: [false, "can't be blank"], index: true}
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
mongoose.model('User', UserSchema);
