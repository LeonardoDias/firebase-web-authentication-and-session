import Model from './../model'
import Interface from '../model/interface';

export function fetchSingle(email: string) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO();
    const model = new Model.UserModel(dao);
    return model.fetchSingle(email).then(value => {
        return value
    }).catch(err => {
        throw err
    })
}

export function fetchAll() {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO();
    const model = new Model.UserModel(dao);
    return model.fetchAll().then(value => {
        return value
    }).catch(err => {
        throw err
    })
}

export function insert(document: Interface.User) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO();
    const model = new Model.UserModel(dao);
    return model.insert(document)
}

export function remove(email: string) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO();
    const model = new Model.UserModel(dao);
    return model.delete(email)
}

export function update(document: Interface.User) {
    let dao = null;
    dao = new Model.DAOfirebase.UserDAO();
    const model = new Model.UserModel(dao);
    return model.update(document)
}