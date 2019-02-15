const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const multParse = multer();
const bcrypt = require('bcrypt');

const userController = require('../controllers/userController.js'); 
const config = require('../config');
const ensureToken = require('../libs/ensureToken');
const multerImage = require('../libs/multer');



router.post('/registration', userController.registration); 
router.post('/authentication', userController.authentication);










module.exports = router;