'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'password_cognitive_brain_2018';

exports.ensureAuth = function (req, res, next){
	if (!req.headers.authorization) {
        return res.status(403).send({message:"peticion haven't authenticated header"});
        
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');//remove simple and double quotes
	console.log(token);
	try{
		var payload = jwt.decode(token, secret);
		console.log(payload);
		if (payload.exp <= moment().unix()) {
			return res.status(401).send({message:'token expirated'});

		}
		
	}catch(ex){
		return res.status(404).send({message:'token invalid'});

	}

	console.log(payload);
	req.user = payload;
  	next();
    
}

