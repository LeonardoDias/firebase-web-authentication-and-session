import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import route from '../routes'

function createExpressApp(...defaultMiddlewareHandler: [(req: Request, res: Response, next: Function) => void]):Express {
    
    const app = express()
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({
        extended: true,
    }))
    app.use(passport.initialize())
    app.use(defaultMiddlewareHandler)
    app.use('/', route.app.app)
    app.use('/api/auth', bodyParser.json())
    app.use('/api/auth', route.api.auth)
    app.use('/api/user', route.api.user)

    return app
}

export default {
    createExpressApp
}