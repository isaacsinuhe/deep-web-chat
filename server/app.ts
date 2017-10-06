import * as bodyParser from 'body-parser'
import * as socket from 'socket.io'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as morgan from 'morgan'
import * as mongoose from 'mongoose'
import * as path from 'path'
import * as passport from 'passport'
import * as passportJWT from 'passport-jwt'
import * as http from 'http'
import User from './models/user'
import { socketEvents } from './socket'
import setAPIRoutes from './routes'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'


dotenv.config({ path: '.env' })

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.SECRET_TOKEN
}
const userStrategy = new Strategy(jwtOptions, function (jwt_payload, next) {
  // console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = User.findById(jwt_payload._id, (err, res) =>
    res ? next(null, user) : next(null, false)
  )
});

passport.use(userStrategy)
const app = express()
app.use(passport.initialize())

app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'));

// mongoose 
(<any>mongoose).Promise = global.Promise
const connection = mongoose.connect(process.env.MONGODB_URI, 
  { useMongoClient: true }
)

const server = http.createServer(app)
connection
.then( () => {
  console.log('Connected to MongoDB')
  
  // connected to mongo and routes fully setted up
  setAPIRoutes(app)
  socketEvents()

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
  server.listen(app.get('port'), () => {
    console.log('Express listening on port ' + app.get('port'))
  })
})
.catch((e) => {
  console.log('connection error:')
})

export const io = socket(server)
export const chatSocket = io.of('/chat')
export const userSocket = io.of('/user')
export { app }
