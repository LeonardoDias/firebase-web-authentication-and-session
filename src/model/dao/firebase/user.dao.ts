import Interface from '../../interface';
import FirebaseDAO from './abstract.firebase.dao';

export default class UserDAO extends FirebaseDAO<Interface.User> {
    
    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]) {
        return super.fetchAll(...conditions.filter(condition => condition.field !== 'password'))
    }
}