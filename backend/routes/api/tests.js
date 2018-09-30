var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var mongoose_pag = require('mongoose-pagination');

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
router.get('/detail/:id', function(req, res, next) {
  console.log("ea");
  console.log(req.params);
    Test.find({'_id':req.params.id}).then(function(test){
      console.log(test);
      if(!test){ 
        return res.sendStatus(422); 
      }
      return res.json({test});
      
    }).catch(next);
  
});

//return list test by category with pagination
//faltaría meterle más test para poder paginarlos almenos de 2 en 2 o 3 en 3
router.get('/list/:id/:page?', function(req, res, next) {
  var page = 1;
  console.log(req.params.page);
  if (req.params.page) {
    page = req.params.page;

  }
  
  var items_per_page = 2;
  Test.find({id_category:req.params.id}).paginate(page, items_per_page, (err, test, total)=>{  
    console.log(test);
    if(!test){ 
      return res.sendStatus(401);

    }

    return res.json({test: test});
    
  });

});

module.exports = router;