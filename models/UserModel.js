const sql       = require("../config/database");
const myhelper  = require("../helpers/CommonHelper");
const User      = function(){};

User.isEmailExist = function(email,callback){
    sql.query("SELECT * FROM users WHERE email='"+email+"'",function(err,data){
        if(err){
            console.log(err);
        }

        if(data.length>0){
            return callback(data[0].user_id);
        }else{
            return callback(false);
        }
    });
}

User.addUser = function(input,callback){
    user = {
        first_name:     input.first_name,
        last_name:      input.last_name,
        email:          input.email,
        password:       input.password,
        phone:          input.phone,
        user_type:      input.user_type,
        device_type:    input.device_type,
        device_token:   input.device_token,
        session_key:    input.session_key,
    };

    sql.query("INSERT INTO users SET ?", user, (err, data) => {
        if(err){
            console.log(err);
        }
        
        return callback(data.insertId);
    });
}

User.getUser = function(user_id,callback){
    sql.query("SELECT * FROM users WHERE user_id = "+user_id, (err, data) => {
        if(err){
            console.log(err);
        }

        return callback(data[0]);
    });
}

User.checkSession = function(user_id,session_key,callback){
    sql.query("SELECT * FROM users WHERE user_id='"+user_id+"' AND session_key='"+session_key+"'",function(err,data){
        if(err){
            console.log(err);
        }

        if(data.length>0){
            return callback(true);
        }else{
            return callback(false);
        }
    });
}

User.login = function(input,callback){
    sql.query("SELECT * FROM users WHERE email = '"+input.email+"' AND password = '"+input.password+"'",(err,data)=>{
        if(err){
            console.log(err);
        }

        if(data.length==0){
            return callback(false);
        }

        token   = myhelper.genrateToken();
        user_id = data[0].user_id;

        sql.query("UPDATE users SET session_key = ?, device_type = ?, device_token = ?,otp = ? WHERE user_id = ?",[token, input.device_type, input.device_token, null, user_id], function(err, res){
            if(err){
                console.log(err);
            }
        });

        data[0].session_key = token;
        return callback(data[0]);
    });
}

User.loginWithID = function(user_id,callback){
    sql.query("SELECT * FROM users WHERE user_id = '"+user_id+"'",(err,data)=>{
        if(err){
            console.log(err);
        }

        if(data.length==0){
            return callback(false);
        }

        token   = myhelper.genrateToken();
        sql.query("UPDATE users SET session_key = ?, device_type = ?, device_token = ? WHERE user_id = ?",[token, input.device_type, input.device_token, user_id], function(err, res){
            if(err){
                console.log(err);
            }
        });

        data[0].session_key = token;
        return callback(data[0]);
    });
}

User.changePassword = function(user_id,input,callback){
    sql.query("SELECT * FROM users WHERE user_id='"+user_id+"' AND password='"+input.old_password+"'",function(err,data){
        if(err){
            console.log(err);
        }

        if(data.length>0){
            sql.query("UPDATE users SET password = ? , otp = ? WHERE user_id = ?",[input.new_password, null, user_id]);
            return callback({'status':200,'message':'Success'});
        }else{
            return callback({'status':405,'message':'Old password is not correct.'});
        }
    });
}

User.updateUser = function(input,id,callback){
    let query = "UPDATE users SET ";
    let value = [];
    for(var key in input) {
        query += key+" = ? ,"; 
        value.push(input[key]);
    }
    query = query.slice(0, -1);
    query += "WHERE user_id = ? ";
    value.push(id);

    sql.query(query, value, function(err, data){
        if(err){
            console.log(err);
        }
    });
}

User.verifyOTP = function(input,callback){
    sql.query("SELECT * FROM users WHERE email='"+input.email+"' AND otp='"+input.otp+"'",function(err,data){
        if(err){
            console.log(err);
        }
        if(data.length==0){
            return callback(false);
        }

        return callback(data[0]);
    });
}

module.exports = User;