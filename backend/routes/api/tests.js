var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');

// return a list of all test
router.get('/', function(req, res, next) {
    //console.log(res);
    console.log("hola test");
    Test.find().then(function(test){
        console.log(test);
        return res.json({test: test});

    }).catch(next);
  //return res.json({"LLego al": "Events-Server"});
});

//return details test
router.get('/detail/:id', function(req, res, next) {
    
    Test.find({'_id':req.params.id}).then(function(test){
      console.log(test);
      if(!test){ 
        return res.sendStatus(401); 
      }
      return res.json({test: test});
      
    }).catch(next);
  
});

//return list test of category
router.get('/list/:id', function(req, res, next) {
  Test.find({id_category:req.params.id}).then(function(test){
    console.log(test);
    if(!test){ 
      return res.sendStatus(401); 
    }
    return res.json({test: test});
    
  }).catch(next);

});

module.exports = router;