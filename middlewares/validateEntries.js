import { request, response } from "express";
import { validationResult } from "express-validator";

export const validateEntries = ( req = request, res = response, next ) => { 
  const errors = validationResult( req )

  if( !errors.isEmpty() ) { 
    res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  next()
}