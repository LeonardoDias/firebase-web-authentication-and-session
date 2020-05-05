import jwt from "jsonwebtoken"
import {Model, DAO, Interface} from './../model'

export default class UserController {

    protected _model: Model.User

    constructor(model: Model.User = null, DAO: DAO.firebase.UserDAO | DAO.myql.UserDAO = null) {
        if(model) {
            this._model = model
        } else {
            this._model = new Model.User(DAO)
        }
    }

    authenticate = (email: string, password: string):Promise<string> => {
        const userModel = this._model
        return userModel.authenticate(email, password).then(doc => {
            if(doc) {
                const token = {
                    name: doc.name,
                    email: doc.email
                }
                const signedToken = jwt.sign(token, process.env.JWT_TOKEN_SECRET, {
                    expiresIn: 3600
                })
                return signedToken;
            } else {
                return null
            }
        });
    }

    fetchSingle = (email: string):Promise<Interface.User> => {
        const userModel = this._model
        return userModel.fetchSingle(email)
    }

     fetchAll = ():Promise<Interface.User[]> => {
        const userModel = this._model
        return userModel.fetchAll()
    }

     insert = (document: Interface.User) => {
        const userModel = this._model
        return userModel.insert(document)
    }

     remove = (email: string) => {
        const userModel = this._model
        return userModel.delete(email)
    }

     update = (document: Interface.User) => {
        const userModel = this._model
        return userModel.update(document)
    }
}