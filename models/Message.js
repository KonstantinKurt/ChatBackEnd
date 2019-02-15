const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    authorId: {
        type:String,
    },
    author:{
         type:String,
    },
    text: {
        type: String,
    },
    avatar: {
        type: String,
    },

    createTime:{
        type: String,
        default: new Date(),
    },
    
}, { versionKey: false });
module.exports = mongoose.model('Message', messageSchema);