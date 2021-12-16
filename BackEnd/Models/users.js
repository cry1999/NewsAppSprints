const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
    userName:
    {
        type: String
    },
    adress: {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String,
        select: false,
        min: 8
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    }],
    favouritNews: [],
    keyWords: [{

    }],
    categories: {
        type: Object,
        default: {
            business: false,
            entertainment: false,
            general: true,
            health: false,
            science: false,
            sports: false,
            technology: false,
        }
    },
    otp:
    {
        type: String,
        default: "",
        select: false,
        createdAt: { type: Date, expires: '5m', default: Date.now }
    },
    verifiedUsers: {
        type: Boolean,
        default: false
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    },
});
//user Model
module.exports = mongoose.model('users', userSchema);

