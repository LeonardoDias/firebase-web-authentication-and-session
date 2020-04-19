import Model from './../model'
import Interface from '../model/interface';

export function fetchSingle(email: string, db_connection: FirebaseFirestore.Firestore) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO(db_connection, 'user');
    const model = new Model.UserModel(dao);
    return model.fetchSingle(email).then(value => {
        return value
    }).catch(err => {
        throw err
    })
}

export function fetchAll(db_connection: FirebaseFirestore.Firestore) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO(db_connection, 'user');
    const model = new Model.UserModel(dao);
    return model.fetchAll().then(value => {
        return value
    }).catch(err => {
        throw err
    })
}

export function insert(document: Interface.User, db_connection: FirebaseFirestore.Firestore) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO(db_connection, 'user');
    const model = new Model.UserModel(dao);
    return model.insert(document)
}

export function remove(email: string, db_connection: FirebaseFirestore.Firestore) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO(db_connection, 'user');
    const model = new Model.UserModel(dao);
    return model.delete(email)
}

export function update(document: Interface.User, db_connection: FirebaseFirestore.Firestore) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO(db_connection, 'user');
    const model = new Model.UserModel(dao);
    return model.update(document)
}