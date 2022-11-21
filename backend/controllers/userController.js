const User = require('../models/user');

// GET::HOME
module.exports.home_get = (req, res) => {
  res.status(200).send('make transactions easily');
  console.log('i am here')
}

// POST::SIGNUP
module.exports.signup_post = async (req, res) => {
  const {firstName, lastName, phoneNumber, email, password, confirmPassword} = req.body;
  try {
    const user = await User.create({firstName, lastName, phoneNumber, email,  password, confirmPassword})

    await user.save()
    // send token to user
    const token = await user.generateAuthToken()
    res.status(201).send({user, token, message:`${user.firstName} you signed-up sucessfully!`})

  } catch(err) { 
    console.log(err)
      res.status(500).json({ msg: err.message })
  }
}

// POST::LOGIN
module.exports.login_post = async (req, res) =>{
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password)
    if(user) {
      const token = await user.generateAuthToken()
      return res.send({user, token,  message:"you logged in sucessfully!"})
    } else {
      return res.send({ message:"login attempt failed"})
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      status:"Failed",
      message:err.message
    });
  }
}

// POST::LOGOUT
module.exports.logout_post  = async (req, res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.status(200).send('logged out successfully')
  } catch(err) {
    res.status(500).json({msg: err.message})
  }
}


// EDIT PROFILE
module.exports.user_patch = async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'phoneNumber', 'password'];
  const isValidOperation = updates.every((updates) => {
    return allowedUpdates.includes(updates)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' })
  }

  try {

    console.log(updates)
    const user = await User.findOne({ _id: req.params.id });

    updates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save()
    res.send('succesfully updated user details!✔')

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: "Failed",
      message: err.message
    });
  }
}