import mongoose, { model } from 'mongoose'

const userSchema = mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  }
})

userSchema.methods.toJSON = function() { 
  const { __v, _id, password, ...user } = this.toObject()
  user.uid = _id;
  return user;
}

export default model('User', userSchema)