//JS Contact backend
var router = require('express').Router();
var mongoose = require('mongoose');
var email = require('../../utils/email.js');

router.post('/', function(req, res, next) {
  console.log("aplega a node");
  //console.log(req,res,next);

  email.sendEmail(req,res);
  return true;
});

module.exports = router;
