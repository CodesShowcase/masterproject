import express, { Application, Request, Response } from 'express'
import session from 'express-session'
import infoRoutes from './routes/infoRoutes'
import secureRoutes from './routes/secureRoutes'
import statRoutes from './routes/statRoutes'
import userRoutes from './routes/userRoutes'
import jobs from './handlers/jobsHandler'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

console.log(new Date().toString());

declare module "express-session" {
  interface SessionData {
    user: { id: number; username: string; level: string; };
  }
}

const app: Application = express()
const domain  = process.env.CORS_DOMAIN as string
const port    = process.env.EXPRESS_PORT as string
const secret  = process.env.SESSION_SECRET as string

//app.use(helmet())


app.use(morgan('short'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(
  cors({
    origin: domain,
    credentials: true,
  })
)

app.use(cookieParser())
app.use(session({  
  secret: secret,  
  saveUninitialized: false,
  resave: false,
  cookie: { 
    maxAge: 3600000,
    secure: true,
  } 
}))

app.get('/', function (req: Request, res: Response) {
    res.send('API | Fuel Prices')
})

infoRoutes(app)
secureRoutes(app)
statRoutes(app)
userRoutes(app)

if (process.env.NODE_ENV !== 'test') {
  jobs()

  app.listen(port, () =>
    console.log(`⚡️[server]: Express running on port ${port}`),
  )
}

export default app
