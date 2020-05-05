import firebaseDAO from './firebase'
import mysqlDAO from './mysql'

namespace DAO {

    export namespace firebase {
        export abstract class AbstractDAO<T> extends firebaseDAO.AbstractDAO<T> {}
        export class UserDAO extends firebaseDAO.UserDAO {};
    }

    export namespace myql {
        export abstract class AbstractDAO<T> extends mysqlDAO.AbstractDAO<T> {}
        export class UserDAO extends mysqlDAO.UserDAO{}
    }
}

export default DAO