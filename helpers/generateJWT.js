import jwt from 'jsonwebtoken'

export const generateJWT = ( uid, name ) => { 

  return new Promise ( (resolve, reject) => { 

    const payload = { uid, name } ;
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { 
      expiresIn: '2h',
      algorithm: 'HS256',
    }, ( error, token ) => { 
      if( error ) {
        console.log( error );
        reject('Token could not be generated')
      } else { 
        resolve( token )
      }
    })
  })  
}