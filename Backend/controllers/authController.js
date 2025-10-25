const User = require('./../models/user.js');
const bcrypt = require('bcrypt')
exports.signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    //check if user exist , if user exist send a error msg you are already registered , please login
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const error = new Error('User is already registered , Please login');
      throw error;
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      message: 'user registred successfull',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.login = async(req,res) => {
  try {
    const {email , password}  = req.body ;
    //if email exists , 
    const user = await User.findOne({email}) ;
    if(!user){
      const error = new Error('User is not registered please register and try again')
      throw error
    }
    console.log(user)
   const isPasswordMatch =  await bcrypt.compare(password , user.password)
   if(!isPasswordMatch){
    const error = new Error('Password donot match')
    throw error
   }
  } catch (error) {
    res.status(500).json({
      message : error.message
    })
  }
}