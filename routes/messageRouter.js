const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const multParse = multer();
const bcrypt = require('bcrypt');

const messageController = require('../controllers/messageController.js'); 

const config = require('../config');
const ensureToken = require('../libs/ensureToken');
const multerImage = require('../libs/multer');


router.get('/messages', ensureToken, messageController.getMessages);






module.exports = router;