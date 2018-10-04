var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var md_auth = require('../../middleware/athenticated');

router.get('/control-user', md_auth.ensureAuth, function (req, res, next) {
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
                    info_user().then((users)=> {//promise
                        return res.json({users_count, users});

                    });
                
                });
            
            }else{
                return res.status(422).send({ message: 'Admin invalid' });

            }
        
        }else {
            return res.status(422).send({ message: 'User invalid' });

        }

    });

});
/* promise */
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
