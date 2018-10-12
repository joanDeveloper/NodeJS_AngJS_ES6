var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var md_auth = require('../../middleware/athenticated');

router.get('/control-user', md_auth.ensureAuth, function (req, res, next) {
    console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, users) => {
        if (err) return res.status(422).send({ message: 'Error petition user' });
        if (users) {
            if(users.type_user==1){
                //return res.json({ message: "eres admin" });
                User.find().skip(1).count().exec((err, users_count) => {
                    if(err) return res.status(422).send({ message: 'Error petition count users' });
                    //return res.json({ users: users_count });
                    info_user().then((users)=> {//promise
                        return res.json({users_count, users});

                    });
                
                });
            
            }else return res.status(422).send({ message: 'Admin invalid' });
        
        }else return res.status(422).send({ message: 'User invalid' });

    });

});

router.post('/lock-user', md_auth.ensureAuth, function (req, res, next) {
    /* 0 desbloqueado
    *  1 bloqueado
    */
    User.findOne({ '_id': req.user.sub }, (err, users) => {
        if(users.type_user==1){
            let email = req.body.email;
            let lock = req.body.lock;
            //console.log(lock);
            User.update({email:email}, {lock:lock},(err, user_updated) => {
                if(err)return res.status(422).send({ message: 'Petition failed to lock user' });
                let u_up = JSON.stringify(user_updated);
                let json = JSON.parse(u_up);
                if(json.ok==1 && json.nModified==1){
                    if(lock==0)res.json({ message: 'User unlock' });
                    else res.json({ message: 'User lock' });
                    
                }else res.status(422).send({ message: 'lock not saved' });
                
            });

        }else return res.status(422).send({ message: 'Operation not permited' });

    });

});

router.delete('/delete-user/:email', md_auth.ensureAuth, function (req, res, next) {
    User.findOne({ '_id': req.user.sub }, (err, users) => {
        if(users.type_user==1){
            let email = req.params.email;
            //console.log(lock);
            User.find({email:email, email:email}).remove(err => {
                if (err) return res.status(422).send({message:'Error to remove user'});
        
                return res.json({message:"The user has been deleted"});
        
            });

        }else return res.status(422).send({ message: 'Operation not permited' });

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
