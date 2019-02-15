const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
        default: '',
    },
}, { versionKey: false });
// profileSchema.pre('save', function(next) {
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

module.exports = mongoose.model('Profile', profileSchema);