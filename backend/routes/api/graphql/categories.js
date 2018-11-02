var mongoose = require('mongoose');

async function getCategories() {
    var Category = mongoose.model('Category');
    const pool = await Category.find().then(function (category) {
      console.log(category);
      return category;
      
    });
    return pool;
};

module.exports = getCategories;