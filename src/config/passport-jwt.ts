import passport from 'passport'
import { Strategy, StrategyOptions } from 'passport-jwt';

function createPassportJwtStrategy(): passport.PassportStatic {

    const opts: StrategyOptions = {
        jwtFromRequest: (req) => {
            return req.cookies['sid'] || req.get('Authorization')?req.get('Authorization').split(" ")[1]:null
        },
        secretOrKey: process.env.JWT_TOKEN_SECRET        
    }

    return passport.use(new Strategy(opts, function (jwt_payload: any, done: Function) {
        if(jwt_payload.email && jwt_payload.name) {
                return done(null, {
                    email: jwt_payload.email,
                    name: jwt_payload.name
                })
        } else {
            return done(null, false)
        }
    }))
}

export default {
    createPassportJwtStrategy
}