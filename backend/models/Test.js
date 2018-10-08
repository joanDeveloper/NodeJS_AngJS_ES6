var mongoose = require('mongoose');
var slug = require('slug');

var CategorySchema = new mongoose.Schema({
    slug_cat: {type: String, lowercase: true, unique: true},
    //id_category:[{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    name: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    description:{type: String, lowercase: true, unique: false, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true}
    
}, {timestamps: true});

/*CategorySchema.pre('validate', function(next){
    console.log("valdiate slug");
    if(!this.slug)  {
      this.slugify();
    }
    next();

});

CategorySchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

};*/

mongoose.model('Test', CategorySchema);
