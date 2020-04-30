import { Router, response } from "express"
import path from 'path'
import passport from "passport";
import request from "request-promise"

const router = Router();

router.get('/', passport.authenticate('jwt', 
{
    session: false, 
    failureRedirect: '/login',
}), (req, res, next) => {
    res.send(`<p>Hello ${req.user.email}</p>
    <form action="/logout" method="POST"><input type="submit"/></form>`)
})

router.get('/login', (req, res, next) => {
    passport.authenticate('jwt', 
        {
            session: false, 
            successRedirect: '/',
        },
        (err, user) => {
            if(err) {
                next(err)
                return
            } else if(!user) {
                res.sendFile(path.join(process.env.ROOT+'/pages/index.html'))
            } else {
                res.redirect('/')
            }
         }
    )(req, res, next)
})

router.post('/login', (req, res, next) => {
    passport.authenticate('jwt', 
        {
            session: false, 
            successRedirect: '/home',
    }, (err, user) => {
        if(err) {
            next(err)
            return
        }
        request.post('http://localhost:3000/api/auth', {
           body: req.body,
           json: true,
           resolveWithFullResponse: true
        }).then((data) => {
            res.cookie('sid', data.body.key, {
                expires: new Date(Date.now() +  3600000),
                httpOnly: true,
                secure: false
            })
            res.redirect('/')
        }).catch((err) => {
            if(err.statusCode === 401 || err.statusCode === 400) {
                res.status(err.statusCode).sendFile(path.join(process.env.ROOT+'/pages/index.html'))
                return
            }
            next(err)
        })
    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    passport.authenticate('jwt', 
        {
            session: false,
            failureRedirect: '/'
        },
        (err, user) => {
            if(err) {
                next(err)
                return
            } else {
                res.clearCookie('sid')
                res.redirect(301, '/')
            }
         }
    )(req, res, next)
})
export default router