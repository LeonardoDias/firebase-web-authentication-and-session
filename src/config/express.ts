import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportJwt from './passport-jwt'

import route from './../routes'

function createExpressApp():Express {
    passportJwt.createPassportJwtStrategy();
    
    const app = express()
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(passport.initialize())

    app.use('/', (req: Request, res: Response, next: Function) => {
        if(!req.cookies['sid']) {
            console.log('no cookie id')
        } else {
            console.log('cookie id')
        }
        next()
    })

    app.use(route.auth)
    app.use('/user', route.user)

    return app
}

export default {
    createExpressApp
}