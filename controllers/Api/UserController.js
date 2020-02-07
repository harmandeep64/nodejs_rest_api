const UserModel = require("../../models/UserModel");
const myhelper  = require("../../helpers/CommonHelper");

exports.getProfile = function(req,res){
    user_id = req.headers.user_id;
    
    UserModel.getUser(user_id,function(data){
        return res.status(200).send({
            "status" : 200,
            "message": "Success",
            "data": data,
        });
    });
}