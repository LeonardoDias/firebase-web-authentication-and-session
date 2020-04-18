import DAO from './dao'

export class User {
  protected _DAO: DAO.firebase.UserDAO

  constructor(DAO: DAO.firebase.UserDAO) {
    this._DAO = DAO
  }

}