var randomstring = require("randomstring");

var checkRequired = function(input,rule){
    final = "";
    
    for(var key in rule) {
        if(input[rule[key]]=='' || input[rule[key]]==undefined){
            final = final+rule[key]+','; 
        }
    }

    if(final==''){
        return false;
    }else{
        return final.slice(0, -1);
    }
}

var genrateToken = function(){
    return randomstring.generate();
}

var genrateOTP = function(){
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}

module.exports = {
    "checkRequired":    checkRequired,
    "genrateToken":     genrateToken,
    "genrateOTP":       genrateOTP,
}