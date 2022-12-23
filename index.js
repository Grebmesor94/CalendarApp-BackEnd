import Server from './models/server.js';
import dotenv from 'dotenv'
import url from 'url'

dotenv.config()

const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) )
const server = new Server()

server.listen()
