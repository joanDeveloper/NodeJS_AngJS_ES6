var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var mongoose_pag = require('mongoose-pagination');

/*router.param('test', function(req, res, next, slug) {
  console.log("slug: "+slug);
  Test.findOne({ slug: slug})
    .then(function (test) {
      if (!test) { return res.sendStatus(422); }

      req.test = test;

      return next();
    }).catch(next);
});*/

// return a list of all test
router.get('/', function(req, res, next) {
    //console.log(res);
    //console.log("hola test");
    Test.find().then(function(test){
        console.log(test);
        return res.json({test: test});

    }).catch(next);
 
});

//return a list of all test with pagination 
router.get('/pagination/:page?', function(req, res, next) {
  //console.log(res);
  var page = 1;
  console.log(req.params.page);
	if (req.params.page) {
	  page = req.params.page;

  }
  
  var items_per_page = 3;
  Test.find().paginate(page, items_per_page, (err, test, total)=>{
    if(!test){ 
      return res.sendStatus(401); 
    }
    
    return res.json({test: test});
    
  });

});

//return details test
router.get('/detail/:slug', function(req, res, next) {
  console.log("ea");
  console.log(req.params);
    Test.find({'slug_test':req.params.slug}).then(function(test){
      console.log(test);
      if(!test){ 
        return res.sendStatus(422); 
      }
      return res.json({test});
      
    }).catch(next);
  
});

//return list test by category with pagination
//faltaría meterle más test para poder paginarlos almenos de 2 en 2 o 3 en 3
router.get('/list/:slug/:page?', function(req, res, next) {
  var page = 1;
  console.log(req.params.page);
  if (req.params.page) {
    page = req.params.page;

  }
  
  var items_per_page = 50;
  //console.log("slug list: "+ req.params.slug);
  Test.find({slug_cat:req.params.slug}).paginate(page, items_per_page, (err, test, total)=>{  
    console.log(test);
    if(!test){ 
      return res.sendStatus(401);

    }

    return res.json({test: test});
    
  });

});

module.exports = router;