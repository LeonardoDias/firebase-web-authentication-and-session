import { Router, Request, Response } from "express";
import passport from "passport"
import jwt from "jsonwebtoken"
import UserModel from "../../model/user.model";
import DAO from "../../model/dao";
import config from './../../config'

const router = Router()

router.get('/', (req: Request, res: Response, next: Function) => {
    passport.authenticate('jwt', 
        {
            session: false
        },
        (err, user) => {
            if(err) {
                next(err)
                return
            } else if(!user) {
                res.sendStatus(401)
            } else {
                res.send(JSON.stringify(user))
            }
         }
    )(req, res, next)
})

router.post('/', (req: Request, res: Response, next: Function) => {
    const body = req.body
    let email = null
    let password = null

    if (body) {
        email = req.body.email
        password = req.body.password
        if(!email || !password) {
            res.sendStatus(400)
        }
        const userDAO = new DAO.firebase.UserDAO()
        const userModel = new UserModel(userDAO)

        userModel.authenticate(email, password).then(doc => {
            if(doc) {
                const token = {
                    _id: doc._id,
                    name: doc.name,
                    email: doc.email
                }
                const signedToken = jwt.sign(token, process.env.JWT_TOKEN_SECRET, {
                    expiresIn: 3600
                })
                res.status(200).send(JSON.stringify({key: signedToken}))
            } else {
                res.sendStatus(401)
            }
        }).catch(err => {
            next(err)
        })
    } else {
        res.sendStatus(400)
    }    
})

router.post('/invalidate', (req: Request, res: Response, next: Function) => {
    passport.authenticate('jwt', 
        {
            session: false
        },
        (err, user) => {
            if(err) {
                next(err)
                return
            } else if(!user) {
                res.sendStatus(401)
            } else {
                const sid = req.cookies['sid']
                res.sendStatus(200)
            }
         }
    )(req, res, next)
})

router.post('/anyotherroute', passport.authenticate('jwt', { session: false,  }), (req: Request, res: Response, next: Function) => {
    res.sendStatus(200)
    next()
})

export default router