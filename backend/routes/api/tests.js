var router = require('express').Router();
var mongoose = require('mongoose');
var Test = mongoose.model('Test');
var Category = mongoose.model('Category');
var mongoose_pag = require('mongoose-pagination');
var User = mongoose.model('User');
var md_auth = require('../../middleware/athenticated');

router.post('/create', md_auth.ensureAuth, function (req, res, next) {
  console.log(req.user.type_user);
  let type_user = req.user.type_user;
  User.findOne({ '_id': req.user.sub }, (err, user) => {
    if (err) return res.status(422).send({ message: 'Error petition user' });

    if (user) {
      if (type_user==2) {
        let test = new Test();
        test.name = req.body.nameTest;
        let category = req.body.category;
        test.description = req.body.description;

        if (!test.name) return res.status(422).send({ message: 'name test empty' });
        if (!category) return res.status(422).send({ message: 'category empty' });
        if (!test.description) return res.status(422).send({ message: 'description test empty' });

        Category.findOne({ name: category }, (err, category) => {
          console.log("categ: ",category);
          if (err) return res.status(422).send({ message: 'Error petition category' });
          if (!category) return res.status(422).send({ message: 'Not exist this category' });

          test.slug_cat = category.slug;
          //console.log("slug: "+test.slug_cat);
          
          test.save((err, testSave) => {
            console.log(err);
            if (err) return res.status(422).send({ message: 'Error peticion save test' });
            if (!testSave) return res.status(422).send({ message: 'Error, test not saved' });

            if (testSave) return res.status(200).send({ message: 'test saved' });

          });

        });

      }else{
        res.status(422).send({ message: 'Error, you are not allowed to create test' });

      }
      
    }else {
      return res.status(422).send({ message: 'User invalid' });

    }

  });

});

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