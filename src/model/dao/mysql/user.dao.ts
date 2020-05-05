import Interface from '../../interface';
import MysqlDAO from './abstract.mysql.dao';
import { Connection } from 'mysql';

export default class UserDAO extends MysqlDAO<Interface.User> {

    constructor(db: Connection, collectionName: string = 'user') {
        super(db, collectionName, 'email')
    }
    
    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]) {
        return super.fetchAll(...conditions).then(docs => 
            docs.map(doc => {
                if(doc && doc.password) {
                    delete doc.password
                }
                return doc
            })
        )
    }

    async fetchSingle(_id: string | number) {
    return super.fetchSingle(_id).then(doc => {
            if(doc && doc.password) {
                delete doc.password
            }
            return doc
        })
    }
}