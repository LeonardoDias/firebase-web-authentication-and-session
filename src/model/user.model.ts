import DAO from './dao';
import Interface from './interface';
import passport from 'passport';

export default class UserModel {
  protected _DAO: DAO.firebase.UserDAO;

  constructor(DAO: DAO.firebase.UserDAO) {
    this._DAO = DAO;
  }

  fetchAll = async () => {
    return await this._DAO.fetchAll()
  }

  fetchSingle = async (email: string) => {
    return await this._DAO.fetchSingle(email)
  }

  authenticate = async (email: string, password: string) => {
    const hashedPassword = password.toUpperCase().trim()
    const result_docs = await this._DAO.fetchAll({
      field: 'email',
      op: '==',
      value: email
    }, {
      field: 'password',
      op: '==',
      value: hashedPassword
    })

    if(result_docs.length > 0) {
      return result_docs[0]
    }
    
    return null
  }

  insert = async (document: Interface.User) => {
    return await this._DAO.insert(document, document.email)
  }

  update = async (document: Interface.User) => {
    return await this._DAO.update(document, document.email)
  }

  delete = async (email: string) => {
    return await this._DAO.delete(email)
  }

}