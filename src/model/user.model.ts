import DAO from './dao';
import Interface from './interface';

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