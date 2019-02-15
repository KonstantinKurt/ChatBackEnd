const Message = require('../models/Message.js');
//const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');

const multParse = multer();



const config = require('../config.js');

module.exports = {

    getMessages: function(req, res) {
        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            }
            let parameters = Message.find({}).sort('-createTime').limit(10);
            parameters.exec(function(err, messages) {
              if (err) {
                    return res.status(500).send("There was a problem with searching posts in DB.")
                }
                messages.reverse();
                res.json({ status: "success", message: "Last 10 messages from DB", messages: messages });
            });
        });
    },








};