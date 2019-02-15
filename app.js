const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Message.js');
const cors = require('cors');
const nodemailer = require('nodemailer');


const userCounter = require('./libs/userCounter.js');
const config = require('./config.js');
const findIdOfElement = require('./libs/findIdOfElement.js');


require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));
app.use(cors());

const userRouter = require('./routes/userRouter.js');
const profileRouter = require('./routes/profileRouter.js');
const messageRouter = require('./routes/messageRouter.js');
app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', messageRouter);

const server = app.listen(config.PORT, () => {
    console.log(`Express launched at http://localhost:'  ${config.PORT}  '; press Ctrl+C to disconnect`);
});
mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true }, function(err) {
    //console.log(process.env.DB_CONN);
    if (err) {
        return console.log(err);
    } else {
        console.log('Database connected succesfully!');
    }
});
const io = require('socket.io')(server);





io.on('connection', function(socket) {
    console.log(' User connected');
    socket.emit('onlineUsers', userCounter.users);
    userCounter.incrementCounter();
    socket.on('logInNewUser',function(data) {
        //console.log(data);
        //userCounter.users.clear();
       let check  = userCounter.users.findIndex(x => x.id == data.id);
       //console.log(userCounter.users);
       if(check ==-1){
         userCounter.users.push(data);
         socket.broadcast.emit('onlineUsers', userCounter.users);
       }
       else{
        socket.broadcast.emit('onlineUsers', userCounter.users);
       }
    });
    socket.on('message', function(data) {
        console.log(data);
        let message = new Message({ _id: new mongoose.Types.ObjectId(), authorId: data.authorId, author: data.author, text: data.text, createTime: data.createTime,avatar: data.avatar });
        message.save(function(err) {
            if (err) {
                console.log(err);
                return console.log("There was a problem with saving new message!");
            }
        });
        let response = {_id: message._id ,authorId: message.authorId, author: message.author ,text: data.text, avatar: message.avatar};
        console.log(response);
        io.sockets.emit('message', response);
    })
    socket.on('typing', function(data) {
        //console.log(data)
        socket.broadcast.emit('typing', data);
    });
    socket.on('disconnect', function(data) {
        userCounter.decrementCounter();
        userCounter.deleteOfflineUser(data);

    });
    socket.on('getUsersCount', function() {
        let count = userCounter.getCounter();
        io.sockets.emit('getUsersCount', count);

    });
});