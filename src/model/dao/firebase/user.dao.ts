import Interface from '../../interface';
import FirebaseDAO from './abstract.firebase.dao';

export default class UserDAO extends FirebaseDAO<Interface.User> {

    constructor(db: FirebaseFirestore.Firestore, collectionName: string = 'user') {
        super(db, collectionName)
    }
    
    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]) {
        return super.fetchAll(...conditions.filter(condition => condition.field !== 'password')).then(docs => 
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