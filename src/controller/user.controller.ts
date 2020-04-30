import jwt from "jsonwebtoken"
import Interface from '../model/interface';
import IUser from '../model/interface/user.interface';
import UserModel from '../model/user.model';
import UserDAO from '../model/dao/firebase/user.dao';

export default class UserController {

    protected _db: FirebaseFirestore.Firestore
    protected dao: UserDAO
    protected model: UserModel

    constructor(db: FirebaseFirestore.Firestore) {
        this._db = db;
        this.dao = new UserDAO(this._db)
        this.model = new UserModel(this.dao)
    }

    authenticate = (email: string, password: string):Promise<string> => {
        const userModel = this.model
        return userModel.authenticate(email, password).then(doc => {
            if(doc) {
                const token = {
                    _id: doc._id,
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

    fetchSingle = (email: string):Promise<IUser> => {
        const userModel = new UserController(this._db);
        return userModel.fetchSingle(email)
    }

     fetchAll = ():Promise<IUser[]> => {
        const userModel = this.model
        return userModel.fetchAll()
    }

     insert = (document: Interface.User) => {
        const userModel = this.model
        return userModel.insert(document)
    }

     remove = (email: string) => {
        const userModel = this.model
        return userModel.delete(email)
    }

     update = (document: Interface.User) => {
        const userModel = this.model
        return userModel.update(document)
    }
}