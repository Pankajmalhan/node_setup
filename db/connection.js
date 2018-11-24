const config = require("config");
var mongoose = require("mongoose");
mongoose.connect(config.get("database.mongodb.path"),{useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDb..."))
    .catch((err) => console.log("Could not connect to MongoDb",err));
