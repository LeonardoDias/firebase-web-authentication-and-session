import Model from './../model'
import Interface from '../model/interface';

export default class UserController {

    protected _db: FirebaseFirestore.Firestore

    constructor(db: FirebaseFirestore.Firestore) {
        this._db = db
    }

    fetchSingle = (email: string) => {
        let dao = null;
        dao = new Model.DAOfirebase.UserDAO(this._db);
        const model = new Model.UserModel(dao);
        return model.fetchSingle(email)
    }

     fetchAll = () => {
        let dao = null;
        dao = new Model.DAOfirebase.UserDAO(this._db);
        const model = new Model.UserModel(dao);
        return model.fetchAll()
    }

     insert = (document: Interface.User) => {
        let dao = null;
        dao = new Model.DAOfirebase.UserDAO(this._db);
        const model = new Model.UserModel(dao);
        return model.insert(document)
    }

     remove = (email: string) => {
        let dao = null;
        dao = new Model.DAOfirebase.UserDAO(this._db);
        const model = new Model.UserModel(dao);
        return model.delete(email)
    }

     update = (document: Interface.User) => {
        let dao = null;
        dao = new Model.DAOfirebase.UserDAO(this._db);
        const model = new Model.UserModel(dao);
        return model.update(document)
    }
}