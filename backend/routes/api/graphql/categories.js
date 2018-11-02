var mongoose = require('mongoose');

async function prueba() {
    var Category = mongoose.model('Category');
    const pool = await Category.find().then(function (category) {
      console.log(category);
      return category;
      
    });
    /*console.log(111111111111);
    console.log(pool);*/
    return pool;
};

module.exports = prueba;