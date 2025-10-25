const express=require('express')
const userController=require("./../controllers/userController")

const router=express.Router()

//get users
router.get('/users',userController.getAllUsers)

//get user by id
router.get('/users/:id',userController.getAUser)

// //delete user by id
router.delete('/users/:id',userController.deleteAUser)

//post users
router.post('/users',userController.createUsers)

//put users (replace all the fields)
router.put('/users/:id',userController.updateAUser)

//patch update (replace some values in the database)
router.patch('/users/:id',userController.patchAUser)

module.exports = router