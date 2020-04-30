import { Router, Request, Response } from "express";
import passport from "passport"
import { UserController } from "./../../controller"

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

    if (!body) {
        res.sendStatus(400)
    }
    
    try {
        const email = req.body.email
        const password = req.body.password
        const userController = new UserController(req.context.firestoreDB)
        userController.authenticate(email, password).then(signedToken => {
            if(signedToken) {
                res.status(200).send(JSON.stringify({key: signedToken}))
            } else {
                res.sendStatus(401)
            }
        })    
    } catch(err) {
        if(err instanceof CustomError.UserInputError) {
            res.sendStatus(400)
            return
        }
        next(err)
    }
})

router.post('/anyotherroute', passport.authenticate('jwt', { session: false,  }), (req: Request, res: Response, next: Function) => {
    res.sendStatus(200)
    next()
})

export default router