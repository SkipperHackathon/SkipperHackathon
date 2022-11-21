const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// mongoose schema
const userSchema = new mongoose.Schema({
 firstName:{
    type:String,
    require: [true,'please provide your first name'],
    lowercase: true,
  },

  lastName:{
    type:String,
    required:[true, 'please provide your email your last name'],
    lowercase:true,
  },

  phoneNumber: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required:true,
    lowercase: true,
    unique: true,
    trim: true,
    validate:[isEmail,'please provide valid email address']
  },
  
  password:{
    type:String,
    required:[true, 'please provide a password'],
    minlength:[6,'minimum password length is 6 characters']
  },

  profile_id:{
    type:String,
  },
  
  tokens:[
    {
    token:{
      type:String,
      required:true
    }
  }
],
}, {
  timestamps: true
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  delete userObject.password

  return userObject
}



userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id:user._id.toString() }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  user.tokens = user.tokens.concat({ token })
  await user.save()  

  return token
}

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email});

  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user
    }
    throw Error('Incorrect password')
  }
  throw Error('Incorrect email')
}

// hash pin before saving
userSchema.pre('save', async function(next){
  const user = this

  if(user.isModified('password')){
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next()
  }
   next()
})

const User = mongoose.model('user', userSchema);
module.exports = User;