'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'password_cognitive_brain_2018';

exports.create_token = function(user){
	var payload = {
		sub: user._id,
		user:String,
        name: String,
        surname:String,
        email:String,
        password:String,
        type_user:user.type_user,
        type_plan:user.type_plan,
        date_init:String,
        date_expiration:String,
        ubication:String,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix()

	};

	return jwt.encode(payload, secret)
};