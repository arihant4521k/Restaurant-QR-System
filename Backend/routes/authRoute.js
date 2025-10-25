const express = require('express') ;

const router = express.Router() ;
const authController = require('./../controllers/authController.js')

//signup 
router.post('/register' ,authController.signUp )
router.post('/login' , authController.login)
module.exports = router