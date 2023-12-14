const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    to_user_id: String,
    from_user_id: String,
    message: String,
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("notification", notificationSchema);