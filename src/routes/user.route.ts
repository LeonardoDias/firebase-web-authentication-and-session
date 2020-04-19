import { Router } from "express"
import {UserController} from './../controller'
import config from './../config/'

const router = Router();

router.get('/', (req, res, next) => {
    const firestoreInstance = config.firebase.getFirestoreInstance()    
    UserController.fetchAll(firestoreInstance).then(value => {
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
    const firestoreInstance = config.firebase.getFirestoreInstance()    
    UserController.fetchSingle(req.params['email'], firestoreInstance).then(value => {
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
    const firestoreInstance = config.firebase.getFirestoreInstance()    
    UserController.insert(req.body, firestoreInstance).then(value => {
        res.status(201).send(value)
        next()
    }).catch(err => {
        next(err)
    })
})

router.delete('/:email', (req, res, next) => {
    const firestoreInstance = config.firebase.getFirestoreInstance()    
    UserController.remove(req.params['email'], firestoreInstance).then(value => {
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
    const firestoreInstance = config.firebase.getFirestoreInstance()    
    UserController.update({...req.body, email: req.params['email']}, firestoreInstance).then(value => {
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