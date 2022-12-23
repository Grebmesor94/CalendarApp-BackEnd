import { request, response } from "express";
import jwt from 'jsonwebtoken'

export const validateJWT = ( req = request, res = response, next) => { 

  const token = req.header('x-token')

  if( !token ) { 
    return res.status(401).json({
      ok: false,
      msg: 'no token int the request'
    })
  }

  try {
    
    const { uid, name } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    req.uid = uid;
    req.name = name;
    
    next()
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token is not valid'
    })
  }
}