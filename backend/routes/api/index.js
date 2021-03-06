var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/admin', require('./admin'));
router.use('/profile', require('./profile'));
router.use('/contact', require('./contact'));
router.use('/category', require('./category'));
router.use('/test', require('./tests'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;