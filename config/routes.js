const customers      = require("../controllers/CustomerController");
const CheckBasicAuth = require('../middleware/BasicAuth');
const CheckUserLogin = require('../middleware/CheckUserLogin');

module.exports = function(app){
    
    app.post("/customers", CheckBasicAuth, customers.create);

    app.get("/customers", [CheckBasicAuth,CheckUserLogin], customers.findAll);

    app.get("/customers/:customerId", customers.findOne);

    app.put("/customers/:customerId", customers.update);

    app.delete("/customers/:customerId", customers.delete);

    app.delete("/customers", customers.deleteAll);
    
};