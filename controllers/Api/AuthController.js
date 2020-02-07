const UserModel = require("../../models/UserModel");
const myhelper  = require("../../helpers/CommonHelper");
const mailer    = require('../../config/email');
const pug       = require('pug');

exports.signup = (req,res) => {
    input   = req.body;
    required= ['first_name','last_name','email','password','phone','user_type','device_type','device_token'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params:"+check
        });
    }
    
    UserModel.isEmailExist(input.email,function(check){
        if(check){
            return res.status(409).send({
                "status" : 409,
                "message": "Email already exist."
            });
        }
        input.session_key = myhelper.genrateToken();
        UserModel.addUser(input,function(user_id){
            UserModel.getUser(user_id,function(user){
                return res.status(200).send({
                    "status" : 200,
                    "message": "Success",
                    "data": user,
                });
            });
        });
    });
};

exports.login = function(req,res){
    input   = req.body;
    required= ['email','password','device_type','device_token'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params:"+check
        });
    }

    UserModel.login(input,function(response){
        if(!response){
            return res.status(403).send({
                "status" : 403,
                "message": "Email or password incorrect."
            });
        }
        
        return res.status(200).send({
            "status" : 200,
            "message": "Success",
            "data": response,
        });
    });
};

exports.changePassword = function(req,res){
    user_id = req.headers.user_id;
    input   = req.body;
    required= ['old_password','new_password'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params:"+check
        });
    }
    UserModel.changePassword(user_id,input,function(response){
        return res.status(response.status).send({
            "status" : response.status,
            "message": response.message,
        });
    });
};

exports.forgotPassword = function(req,res){
    input = req.body;
    required= ['email'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params:"+check
        });
    }

    UserModel.isEmailExist(input.email,function(user){
        if(!user){
            return res.status(404).send({
                "status" : 404,
                "message": "Email not found."
            });
        }

        otp = myhelper.genrateOTP();
        
        message = pug.renderFile('./views/emails/forgot_password.pug', {"otp":otp,"username":"User"});
        
        mailer(input.email,'Forgot password | SOS', message);
        
        UserModel.updateUser({'otp':otp},user);

        return res.status(200).send({
            "status" : 200,
            "message": "Please check you inbox",
            "data": {
                "OTP": otp,
            }
        });
    });
};

exports.verifyOTP = function(req,res){
    input = req.body;
    required= ['email','otp','device_type','device_token'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params: "+check
        });
    }

    UserModel.verifyOTP(input,function(verified){
        if(!verified){
            return res.status(403).send({
                "status" : 403,
                "message": "Your OTP is invalid !"
            });
        }
        UserModel.loginWithID(verified.user_id,function(response){
            if(!response){
                return res.status(403).send({
                    "status" : 403,
                    "message": "user_id is incorrect."
                });
            }
            
            return res.status(200).send({
                "status" : 200,
                "message": "Success",
                "data": response,
            });
        });
    });
}

exports.updatePassword = function(req,res){
    user_id = req.headers.user_id;
    input   = req.body;
    required= ['password'];
    check   = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params:"+check
        });
    }

    UserModel.updateUser({'otp':null,'password':input.password},user_id);
    
    return res.status(200).send({
        "status" : 200,
        "message": "Account reset successfully !"
    });
}