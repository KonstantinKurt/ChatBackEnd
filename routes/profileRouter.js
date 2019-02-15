const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const multParse = multer();
const bcrypt = require('bcrypt');

const profileController = require('../controllers/profileController.js'); 

const config = require('../config');
const ensureToken = require('../libs/ensureToken');
const multerImage = require('../libs/multer');


router.get('/profile', ensureToken, profileController.getProfileUser);

router.put('/profile', ensureToken, multerImage.single('avatar'), profileController.updateProfileUser);




module.exports = router;