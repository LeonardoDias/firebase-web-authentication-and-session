import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportJwt from './passport-jwt'

import route from '../routes'

function createExpressApp():Express {
    passportJwt.createPassportJwtStrategy();
    
    const app = express()
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({
        extended: true,
    }))
    app.use(passport.initialize())
    app.use('/', route.app.app)
    app.use('/api/auth', bodyParser.json())
    app.use('/api/auth', route.api.auth)
    app.use('/api/user', route.api.user)

    return app
}

export default {
    createExpressApp
}