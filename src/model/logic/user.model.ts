import Interface from '../interface';
import Model from './abstract.model'

export default class UserModel extends Model<Interface.User>{

  fetchSingle = async (email: string) => {
    return super.fetchSingle(email)
  }

  insert = async (document: Interface.User) => {
    return super.insert(document, document.email)
  }

  update = async (document: Interface.User) => {
    return super.update(document, document.email)
  }

  delete = async (email: string) => {
    return super.delete(email)
  }

  authenticate = async (email: string, password: string):Promise<Interface.User> => {

    if(!email && !password) {
      throw new CustomError.UserInputError()
    }

    const hashedPassword = password.toUpperCase().trim() // not even a cryptograph, just for test
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

}