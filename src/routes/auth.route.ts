import { Router, Request, Response } from "express";
import passport from "passport"
import jwt from "jsonwebtoken"

const tokenSecret = "exptooljwtsecretkey";

const router = Router()

router.get('/login', (req: Request, res: Response, next: Function) => {
    next();
})

router.post('/login', (req: Request, res: Response, next: Function) => {
    console.log(req.body)
    const token = {
        _id: req.body._id
    }
    const signedToken = jwt.sign(token, tokenSecret, {
        expiresIn: 3600
    })
    
    res.cookie('sid', signedToken, {
        expires: new Date(Date.now() +  10000),
        httpOnly: true,
        secure: false
    })
    res.sendStatus(200)
    next()
})

router.post('/logout', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: Function) => {
    res.sendStatus(200)
    next();
})

router.post('/anyotherroute', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: Function) => {
    console.log(req.body)
    res.sendStatus(200)
    next()
})

export default router