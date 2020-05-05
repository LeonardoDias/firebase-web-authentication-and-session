import DAO from '../dao'

export default abstract class Model<T> {
  protected _DAO: DAO.firebase.AbstractDAO<T> | DAO.myql.AbstractDAO<T>;

  constructor(DAO: DAO.firebase.AbstractDAO<T> | DAO.myql.AbstractDAO<T>) {
    this._DAO = DAO;
  }

  public async fetchAll () {
    return await this._DAO.fetchAll()
  }

  public async fetchSingle (id: string | number) {
    return await this._DAO.fetchSingle(id)
  }

  public async insert (document: T, id: string | number) {
    return await this._DAO.insert(document, id)
  }

  public async update (document: T, id: string | number) {
    return await this._DAO.update(document, id)
  }

  public async delete (id: string | number) {
    return await this._DAO.delete(id)
  }

}