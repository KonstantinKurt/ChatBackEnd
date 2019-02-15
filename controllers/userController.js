const User = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile.js');
const jwt = require('jsonwebtoken');
const validateEmail = require('../libs/validateEmail.js');
const config = require('../config.js');

const sendEmail = require('../libs/sendEmail.js');

module.exports = {

    registration: function(req, res) {
        let user = new User({ _id: new mongoose.Types.ObjectId(), password: req.body.password, email: req.body.email, name: req.body.name });
        if (user) {
            console.log(user);
            user.save(function(err) {
                if (err) {
                    console.log(err);
                    let errors = { ...err.errors };
                    return res.status(400).json({ errors });
                }
                res.json({ status: "success", message: "User added successfully!!!", data: null });
            });
        }
    },
    authentication: function(req, res) {
        let emailFromUser = validateEmail(req.body.email);
        //console.log("email normali");
        if (emailFromUser) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (err) {
                    let errors = { ...err.errors };
                    return res.status(500).json({ errors });

                } else {
                    //console.log("User found ", user);
                    if (user && bcrypt.compareSync(req.body.password, user.password)) {
                        Profile.findOne({ email: req.body.email }, function(err, profile) {
                            if (err) {
                                return res.status(500).send("There was a problem authentication the user.");
                            }
                            if (!profile) {

                                let newProfile = new Profile({ _id: user._id, email: user.email, name: user.name, password: user.password });
                                //console.log(profile);
                                newProfile.save(function(err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    //console.log('profile saved', profile);
                                });
                                const token = jwt.sign({ newProfile }, config.secret, { expiresIn: '72h' });
                                //let profileInfo = `Profile id : ${ profile._id} name : ${ profile.name} email:${ profile.email} Image path : ${ profile.imagePath}`;
                                console.log(newProfile);
                                res.json({ token });
                                // let options = sendEmail.getMailoptions(newProfile.email,newProfile.name);
                                // sendEmail.transporter.sendMail(options, function(err, info) {
                                //     if (err)
                                //         console.log(err)
                                //     else
                                //         console.log(info);
                                // });



                            } else {
                                console.log(profile);
                                const token = jwt.sign({ profile }, config.secret, { expiresIn: '72h' });
                                res.json({ token });
                                console.log(profile);
                            }
                        });
                    } else {
                        let errorsDataBase = { errors: { email: { message: "User not found!!" } } };
                        return res.status(400).json(errorsDataBase);

                    }
                }
            });
        } else {
            let errorsValidate = { errors: { email: { message: "Email isn`t correct" } } };
            return res.status(400).json(errorsValidate);
        }

    },
};