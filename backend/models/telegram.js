const mongoose = require('mongoose');
const userDataSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    problem: String
});
module.exports  = mongoose.model('UserData', userDataSchema);