import passport from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

function createPassportJwtStrategy(): void {

    /*async function searchUserCb(searchParams: {_id: any}): Promise<any> {
        const _id = searchParams._id;
        if(_id === 10) {
            return {
                _id: 10,
                email: "leonardodias914@gmail.com"
            }
        } else if (_id === -1) {
            throw new Error("INVALID ID")
        }
        return null
    }*/

    const opts: StrategyOptions = {
        jwtFromRequest: (req) => {
            return req.cookies['sid']
        },
        secretOrKey: process.env.JWT_TOKEN_SECRET        
    }

    passport.use(new Strategy(opts, function (jwt_payload: any, done: Function) {
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

function authenticate(options?: passport.AuthenticateOptions, cbFunction?: (...args: any[]) => any) {
    return passport.authenticate('jwt', { session: false, ...options }, cbFunction)
}

  export default {
    createPassportJwtStrategy,
    authenticate,
  }