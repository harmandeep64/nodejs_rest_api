const Auth           = require("../controllers/Api/AuthController");
const User           = require("../controllers/Api/UserController");
const CheckBasicAuth = require('../middleware/BasicAuth');
const CheckUserLogin = require('../middleware/CheckUserLogin');

module.exports = function(app){
    
    app.post("/api/signup", CheckBasicAuth,  Auth.signup);

    app.post("/api/login", CheckBasicAuth,  Auth.login);

    app.post("/api/forgot_password", CheckBasicAuth, Auth.forgotPassword);

    app.post("/api/verify_otp", CheckBasicAuth, Auth.verifyOTP);

    app.get("/api/get_profile", [CheckBasicAuth,CheckUserLogin],  User.getProfile);

    app.post("/api/change_password", [CheckBasicAuth,CheckUserLogin],  Auth.changePassword);

    app.post("/api/update_password", [CheckBasicAuth,CheckUserLogin],  Auth.updatePassword);

};