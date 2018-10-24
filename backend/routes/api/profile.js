let mongoose = require('mongoose');
let router = require('express').Router();
let User = mongoose.model('User');
let md_auth = require('../../middleware/athenticated');
//let multipart = require('connect-multiparty');
//let md_upload = multipart({uploadDir: './uploads/users'});
var fs = require('fs');
var sendEmail = require('../../utils/email.js');
var bcrypt = require('bcrypt-nodejs');
var multer = require('multer');

router.get('/', md_auth.ensureAuth, function (req, res, next) {
    console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, user) => {
        if (err) {
        return res.status(422).send({ message: 'Error petition user' });

        }

        if (user) {
            return res.json({ user:user });
        
        }else {
            return res.status(422).send({ message: 'User invalid' });

        }

    });

});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/users/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

router.post('/upload-avatar', md_auth.ensureAuth, function (req, res, next) {
    console.log("eoooa vatar");
    /*console.log("file:"+req.files);*/
    //console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, user) => {
        if (err) return res.status(422).send({ message: 'Error petition user' });

        if (user) {
            upload(req,res,function(err){
                //console.log(req.file.path);
                if(err){
                     res.json({error_code:1,err_desc:err});
                     return;
                }
                
                if (req.file) {
                    //console.log("filessss: "+req.file.path);
                    let file_path = req.file.path;
                    //console.log(file_path);
                    let file_split = file_path.split('\/');
                    //console.log(file_split);
                    let file_name = file_split[2];//name image
                    let ext_split = file_name.split('\.');
                    let file_ext = ext_split[1];//name format image
                    console.log(file_ext);
        
                    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' ) {
                        let id_user = req.user.sub;
                        User.findById(id_user, (err, users) => {
                            if (err) return res.status(422).send({message:"Error in petition searching user"});
                            if (!users) return res.status(422).send({message:"user not exist"});
                            else{
                                //console.log(users.media);
                                remove_files_upload(res, "./uploads/users/"+users.media, "");//delete previous files
                                //{new:true} => obtain object updated
                                User.findByIdAndUpdate(id_user, {media:file_name}, {new:true}, (err, user_updated) => {
                                    if (err) return res.status(422).send({message:"Error, avatar haven't been uploaded"});
        
                                    if (!user_updated) return res.status(422).send({message:"User not actualitzed"});
                                    else return res.json({user:user_updated});
        
                                });
        
                            }
        
                        });
        
                    }else return remove_files_upload(res, file_path, "format not valid");
        
                }else return res.status(422).send({message:'No files have been uploaded'});
        
            });
            
        }else return res.status(422).send({ message: 'User invalid' });

    });

});

router.put('/update-token', function (req, res, next) {
    console.log(555555555555555555555555);
    //User.findOne({ '_id': req.user.sub }, (err, user) => {
    let email = req.body.email;
    console.log(req.body.email);
        
    req.body.type="change-passwd";
    req.body.to=email;
    req.body.from="joanmodaw@gmail.com";
    function random() {
        return Math.random().toString(36).substr(2);
    };
             
    function token() {
        return random() + random() + random() + random();
    };

    //console.log(token());
    req.token=token();
    //console.log(user._id);
    User.update({email:email},{token:req.token}, (err, user_updated) => {
        console.log("update: " + JSON.stringify(user_updated));
        if(err)return res.status(422).send({ message: 'token not saved' });
            sendEmail.sendEmail(req,res);
            return true;  

    });

});

router.get('/verify-token/:token', function (req, res, next) {
    console.log("token: "+req.params.token);
    let token = req.params.token;
    User.findOne({token: token}, (err, user) => {
        console.log(user);
        if (err) res.status(422).send({ message: 'error peticion verify token' });
        if(!user) res.status(422).send({ message: 'error in token' });
        console.log(res);
        res.redirect("http://localhost:8081/#!/");
        //return res.json({ message: 'correct token' });
    });

});

router.post('/change-passwd', function (req, res, next) {
    let email = req.body.email;
    let passwd = req.body.password;

    if(!email) return res.status(422).send({ message: 'Error, email vacio' });
    if(!passwd) return res.status(422).send({ message: 'Error, password vacio' });

    if(email && passwd){
        User.findOne({ email: email }, (err, user) => {
            if (err) return res.status(422).send({ message: 'Error petition find email' });
            if(!user){
                return res.status(422).send({ message: 'Error, email not exist' });

            }else{
                bcrypt.hash(passwd, null, null, (err, hash) => {
                    let new_passwd = hash;
                    User.update({email:email}, {password:new_passwd},(err, user_updated) => {
                        if (err) return res.status(422).send({ message: 'Error petition update password' });
                        //console.log("params_update: "+JSON.stringify(user_updated));
                        let u_up = JSON.stringify(user_updated);
                        let json = JSON.parse(u_up);
                        /*console.log(n.nModified);*/
                        if(json.ok==1 && json.nModified==1) return res.json({ message: 'success updated password' });
                        else return res.status(422).send({ message: 'Error, token not exist' });
                        
                    });

                });
                
            }

        });
    }

    

});

router.post('/data-update', md_auth.ensureAuth, function (req, res, next) {
    console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, user) => {
        if (err) {
            return res.status(422).send({ message: 'Error petition user' });

        }

        if (user) {
            //return res.json({ user:user });
            let user = req.body.user;
            let name = req.body.name;
            let surname = req.body.surname;
            let email = req.body.email;
            let type_user = req.body.type_user;
            
            if (!user) return res.status(422).send({ message: 'empty user' });
            if (!name) return res.status(422).send({ message: 'empty name' });
            if (!surname) return res.status(422).send({ message: 'empty surname' });
            if (!email) return res.status(422).send({ message: 'empty email' });
            if (!type_user) return res.status(422).send({ message: 'empty type user' });

            User.update({'_id':req.user.sub}, {user:user,
                name:name,
                surname:surname,
                email:email,
                type_user:type_user},
                {multi:true},(err, user_updated) => {
                    let u_up = JSON.stringify(user_updated);
                    let json = JSON.parse(u_up);
                    console.log(json);
                    if(json.ok==1 && json.nModified==1){
                        return res.json({ message: 'success updated user' });
    
                    }
            });
        }else {
            return res.status(422).send({ message: 'User invalid' });

        }

    });

});

function remove_files_upload(res, file_path, msg){
	fs.unlink(file_path, (err)=>{
		if (msg!="") return res.json({message:msg});
	});
}

module.exports = router;
