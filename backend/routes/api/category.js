var router = require('express').Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Test = mongoose.model('Test');
var mongoose_pag = require('mongoose-pagination');

//return a list of categories
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  /* console.log(res); */
  /* console.log("hola");
  return res.json({ category: "category" }); */
   Category.find().then(function(category){
=======
  Category.find().then(function(category){
>>>>>>> 5121581160e48ab0fa942bde2d27f53d568931b6
    console.log(category);
    if(!category){ 
      return res.sendStatus(401);

    }

    Test.populate(category, {path: "test"},function(err, category){
      return res.json({category: category});
      
    });

  }).catch(next);
<<<<<<< HEAD
   
=======

});

//return a list of categories with pagination
router.get('/pagination/:page?', function(req, res, next) {
  var page = 1;
  console.log(req.params.page);
	if (req.params.page) {
	  page = req.params.page;

  }
  
  var items_per_page = 2;
  Category.find().populate({path:'test'}).paginate(page, items_per_page, (err, category, total)=>{
    if(!category){ 
      return res.sendStatus(401); 
    }
    
    return res.json({category: category});
    
  });
  
>>>>>>> 5121581160e48ab0fa942bde2d27f53d568931b6
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