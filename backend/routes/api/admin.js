var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var md_auth = require('../../middleware/athenticated');

router.get('/count-user', md_auth.ensureAuth, function (req, res, next) {
    console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, users) => {
        if (err) {
        return res.status(422).send({ message: 'Error petition user' });

        }

        if (users) {
            if(users.type_user==1){
                //return res.json({ message: "eres admin" });
                User.find().skip(1).count().exec((err, users_count) => {
                    if(err){
                        return res.status(422).send({ message: 'Error petition count users' });

                    }

                    //return res.json({ users: users_count });
                    info_user().then((value)=> {//promise
                        return res.status(200).send({users_count, value});

                    });
                
                });
            
            }else{
                return res.status(422).send({ message: 'No eres administrador' });

            }
        
        }else {
            return res.status(422).send({ message: 'User invalid' });

        }

    });

});

async function info_user(){
	try {
        var user = await User.find().exec().then((user) => {
            //console.log(user);
            return user;

        }).catch((err)=> {
           	return handleError(err);

        });

        return {
            users: user
        }

    } catch(err){
        return handleError(err);

    }

}

module.exports = router;
