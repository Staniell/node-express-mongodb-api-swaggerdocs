const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    firstname : {
        type : String,
        required : true,
    },    
    lastname : {
        type : String,
        required : true,
    },
    coin_balance : {
        type : Number,
        required : true,
        default : 100
    },
    date_created : {
        type : String,
        default : Date.now
    }
})

module.exports = mongoose.model("Users", UserSchema)