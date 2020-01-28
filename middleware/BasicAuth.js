const app   = require("../config/app");

CheckAuth = function(req,res,next){
    var auth = req.headers['authorization'];

    if(!auth) {     
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(400).send({
            "status": 400,
            "message":"Bad request. Please provide BasicAuth.",
        });
    }else if(auth){
        var tmp         = auth.split(' ');
        var buf         = new Buffer(tmp[1], 'base64'); 
        var plain_auth  = buf.toString();

        var creds = plain_auth.split(':');
        var username = creds[0];
        var password = creds[1];

        if((username == app.AUTH.USER) && (password == app.AUTH.PASS)) {
            console.log("Auth Passed");
            next();
        }else{
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).send({
                "status": 401,
                "message":"Not Authrized user.",
            });
        }
    }
}

module.exports = CheckAuth;