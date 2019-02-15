const bookshelf = require('bookshelf')(knex);

const messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId, 
    },
    author:{
         type:String,
    },
    text: {
        type: String,
    },
    createTime:{
        type: String,
        default: new Date(),
    },
    
}, { versionKey: false });
module.exports = mongoose.model('Message', messageSchema);