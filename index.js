const express       = require("express");
const bodyParser    = require("body-parser");
const instance      = express();

instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: true }));

instance.get("/", (req, res) => {
    res.json({ message: "Hi Harman here." });
});

require("./config/routes.js")(instance);

instance.listen(3000);