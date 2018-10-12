var mongoose = require('mongoose');
var slug = require('slug');

var TestSchema = new mongoose.Schema({
    slug_cat: {type: String, lowercase: true, unique: true},
    slug_test:{type: String, lowercase: true, unique: true},
    name: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9\s]+$/, 'is invalid'], index: true},
    description:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9\s]+$/, 'is invalid'], index: true}
    
}, {timestamps: true});

TestSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
    next();

});

TestSchema.methods.slugify = function() {
    this.slug_test = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

};

mongoose.model('Test', TestSchema);
