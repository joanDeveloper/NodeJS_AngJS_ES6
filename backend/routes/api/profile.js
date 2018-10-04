let mongoose = require('mongoose');
let router = require('express').Router();
let User = mongoose.model('User');
let md_auth = require('../../middleware/athenticated');
let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/users'});
var fs = require('fs');

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

router.post('/upload-avatar', [md_auth.ensureAuth, md_upload], function (req, res, next) {
    //console.log(req.files);
    //console.log(req.user.type_user);
    User.findOne({ '_id': req.user.sub }, (err, user) => {
        if (err) {
            return res.status(422).send({ message: 'Error petition user' });

        }

        if (user) {
            //return res.json({ user:user });
            //console.log(req.body.image);
            //console.log(req);
            if (req.files) {
                //console.log(req.files.image.path);
                let file_path = req.files.image.path;
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
    
                        if (!users) {
                            return res.status(422).send({message:"user not exist"});
    
                        }else{
                            //console.log(users.media);
                            remove_files_upload(res, "./uploads/users/"+users.media, "");//delete previous files
                            //{new:true} => obtain object updated
                            User.findByIdAndUpdate(id_user, {media:file_name}, {new:true}, (err, user_updated) => {
                                if (err) return res.status(422).send({message:"Error, avatar haven't been uploaded"});
    
                                if (!user_updated) {
                                    return res.status(422).send({message:"User not actualitzed"});
    
                                }else{
                                    //console.log(user_updated.media);
                                    return res.json({user:user_updated});
    
                                }
    
                            });
    
                        }
    
                    });
    
                }else{
                    return remove_files_upload(res, file_path, "format not valid");
    
                }
    
            }else{
                return res.status(422).send({message:'No files have been uploaded'});
    
            }

        }else {
            return res.status(422).send({ message: 'User invalid' });

        }

    });

});

function remove_files_upload(res, file_path, msg){
	fs.unlink(file_path, (err)=>{
        //if(err)return res.status(422).send({ message: 'Fail to delete file' });

		if (msg!="") {
			return res.json({message:msg});

		}	

	});

}

module.exports = router;
