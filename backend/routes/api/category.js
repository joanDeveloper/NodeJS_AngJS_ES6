var router = require('express').Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Test = mongoose.model('Test');

//return a list of categories
router.get('/', function(req, res, next) {
  /* console.log(res); */
  /* console.log("hola");
  return res.json({ category: "category" }); */
   Category.find().then(function(category){
    console.log(category);
    Test.populate(category, {path: "test"},function(err, category){
      return res.json({category: category});
    });

  }).catch(next);
   
});

//return details category
router.get('/:id', function(req, res, next) {
  /*console.log("hola detail");
  console.log(req.params.id);*/
  Category.find({'_id':req.params.id}).then(function(category){
    console.log(category);
    if(!category){ 
      return res.sendStatus(401); 
    }
    return res.json({category: category});
    
  }).catch(next);

});

module.exports = router;