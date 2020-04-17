import passport from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

function createPassportJwtStrategy(): void {

    async function searchUserCb(searchParams: {_id: any}): Promise<any> {
        const _id = searchParams._id;
        console.log(searchParams)
        if(_id === 10) {
            return {
                _id: 10,
                email: "leonardodias914@gmail.com"
            }
        } else if (_id === -1) {
            throw new Error("INVALID ID")
        }
        return null
    }

    const opts: StrategyOptions = {
        jwtFromRequest: (req) => {
            console.log(req.cookies)
            return req.cookies['sid']
        },
        secretOrKey: 'exptooljwtsecretkey'
    }

    passport.use(new Strategy(opts, function (jwt_payload: any, done: Function) {
        console.log('jwt_payload', jwt_payload)
        searchUserCb({_id: jwt_payload._id})
            .then((user: any) => {
                if(user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }).catch((err: Error) => {
                return done(err, false)
            })
    }))
}

function authenticate() {
    return passport.authenticate('jwt', { session: false })
}

  export default {
    createPassportJwtStrategy,
    authenticate
  }