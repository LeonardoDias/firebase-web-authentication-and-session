import { Router } from "express"
import {UserController} from '../../controller'
import config from '../../config'

const router = Router();

router.get('/', (req, res, next) => {
    UserController.fetchAll().then(value => {
        if(value && value.length > 0) {
            res.status(200).send(value)
        } else {
            res.sendStatus(204)
        }
        next()
    }).catch(err => {
        next(err)
    })
})

router.get('/:email', (req, res, next) => {
    UserController.fetchSingle(req.params['email']).then(value => {
        if(value) {
            res.status(200).send(value)
        } else {
            res.sendStatus(204)
        }
        next()
    }).catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    UserController.insert(req.body).then(value => {
        res.status(201).send(value)
        next()
    }).catch(err => {
        next(err)
    })
})

router.delete('/:email', (req, res, next) => {
    UserController.remove(req.params['email']).then(value => {
        if(value) {
            res.send(value).status(200)
        } else {
            res.sendStatus(204)
        }
        next()
    }).catch(err => {
        next(err)
    })
})

router.put('/:email', (req, res, next) => {
    UserController.update({...req.body, email: req.params['email']}).then(value => {
        if(value) {
            res.status(200).send(value)
        } else {
            res.sendStatus(204)
        }
        next()
    }).catch(err => {
        next(err)
    })
})

export default router