const Profile = require('../models/Profile.js');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');

const multParse = multer();



const config = require('../config.js');

module.exports = {

    getProfileUser: function(req, res) {
        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            } else {

                Profile.findById({ _id: authData.profile._id }, function(err, profile) {
                    if (err) {
                        return res.status(500).send("There was a problem with searching profile in DB.")
                    }
                    res.json({ status: "success", message: "Your profile", data: profile });
                });
            }
        });
    },
    


    // DO REFACTORING TO REQUEST WITH FILE (make it separately of update profile);


    updateProfileUser: function(req, res) {
        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                return res.status(403).send("No authority");
            } else {
                // console.log('Info from token', authData.profile);
                // console.log(authData.profile._id);
                const id = authData.profile._id;
                Profile.findById({ _id: authData.profile._id }, function(err, profile) {
                    if (err) {
                        return res.json(err);
                    }
                    //console.log('founded profile', profile);
                    if (req.file) {
                        console.log(req.file.path);
                        profile.avatar = req.file.path;
                    }
                    if (req.body.name) {
                        profile.name = req.body.name;
                    }
                    if (req.body.password) {
                        let newPassword = bcrypt.hashSync(req.body.password, 10);
                        profile.password = newPassword;
                        User.findOneAndUpdate(id, { password: newPassword }, function(err, user) {
                            if (err) {
                                return res.status(500).send("There was a problem changing users password.");
                            }
                            //console.log(authData.profile.password);
                            //console.log(user.password);
                        });
                    }
                    profile.save(function(err) {
                        if (err) {
                            console.log(err);
                            let errors = { ...err.errors };
                            return res.status(400).json({ errors });
                        }

                    });

                    res.json({ status: "success", message: "Profile updated succesfully!", data: profile });

                });

            }
        });
    },







};