import express from 'express'
import cors from 'cors'
import userRouter from '../routes/user.js'
import { connectDB } from '../db/connection.js'
import { eventsRouter } from '../routes/events.js'
import url from 'url'
import path from 'path'

const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) )

export default class Server { 

  constructor(){ 
    this.app = express()
    this.port = process.env.PORT
    this.paths = { 
      user: '/api/users',
      events: '/api/events'
    }
    
    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  dbConnection() { 
    connectDB()
  }

  middlewares() { 

    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( express.static( 'public' ) )

  }

  routes() { 
    this.app.use( this.paths.user, userRouter )
    this.app.use( this.paths.events, eventsRouter )
    this.app.use('*', ( req, res ) => { 
      res.sendFile( path.resolve( __dirname, '../public/index.html' ) )
    })
  }
  listen() {
    this.app.listen(this.port, () => { 
      console.log('running on port: ', this.port);
    })
  }
}



