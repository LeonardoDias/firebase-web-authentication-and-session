import firebaseDAO from './firebase'

namespace DAO {
    export namespace firebase {
        export class UserDAO extends firebaseDAO.UserDAO {}
    }
}

export default DAO