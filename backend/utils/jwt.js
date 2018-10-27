'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'password_cognitive_brain_2018';

exports.create_token = function(user){
	var payload = {
	       sub: user._id,
	       user:user.user,
               name: user.user,
               surname:String,
               email:user.email,
               password:String,
               type_user:user.type_user,
               type_plan:user.type_plan,
               date_init:String,
               date_expiration:String,
               ubication:String,
               media:user.media,
               iat: moment().unix(),
               exp: moment().add(30, 'days').unix()

	};

	return jwt.encode(payload, secret)
};