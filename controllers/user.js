import { request, response } from "express";
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateJWT } from "../helpers/generateJWT.js";

export const newUser = async( req = request, res = response ) => { 

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    
    if( user ) { 
      return res.status(400).json({ msg: 'email is already in use' })
    }

    user = new User( req.body )
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync( password, salt )
    await user.save()

    const token = await generateJWT( user._id , user.name )
  
    res.status(201).json({ 
      ok: true,
      msg: 'user created',
      user,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'please speak with admin' })
  }  

}

export const loginUser = async( req = request, res = response ) => { 

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    
    if( !user ) { 
      return res.status(400).json({ msg: 'user with email does not exist' })
    }

    const validPassword = bcrypt.compareSync( password, user.password )
    if( !validPassword ) return res.status(400).json({
      ok: false,
      msg: 'incorrect password' 
    })

    const token = await generateJWT( user._id, user.name )


    res.json({
      ok: true,
      user,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'please speak with admin' })
  }
}

export const renewToken = async( req = request, res = response ) => { 

  const { uid, name } = req;

  const token = await generateJWT( uid, name )

  res.json({ 
    ok: true,
    token, uid, name
  })

}
