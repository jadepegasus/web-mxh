const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    user_one_id: String,
    user_two_id: String
});

module.exports = mongoose.module("friend", friendSchema);