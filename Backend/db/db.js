const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://devendersingh2k:CVfWa8DWQbmQZNCT@cluster0.9gy2k2z.mongodb.net/PaytmSelf");


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true,
    },

    password : {
        type: String,
        required : true
    }
});

const accountSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    balance : {
        type : Number,
        required : true
    }
})



userSchema.methods.createHash = async function(plainText){
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainText,salt);
};

userSchema.methods.validatePasswords = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports = {
    User,
    Account
}