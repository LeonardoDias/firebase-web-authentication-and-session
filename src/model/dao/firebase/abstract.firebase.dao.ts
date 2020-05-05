import DAO from "../abstract.dao"

export default abstract class FirebaseDAO<T> extends DAO<T> {
  
    protected _collectionName: string
  
    constructor(db: FirebaseFirestore.Firestore, collectionName: string) {
        super(db)
        this._collectionName = collectionName
    }

    getCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
        return (<FirebaseFirestore.Firestore> this._db).collection(this._collectionName);
    }

    async fetchSingle(id: string | number): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id.toString())
        const document = await document_reference.get()
        if(document && document.exists) {
            const data = document.data()
            return <T><unknown> {...data, _id: document_reference.id}
        } else {
            return null
        }
    }

    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]): Promise<T[]> {
        const collection = this.getCollection()
        let builtQuery = null
        if(conditions.length) {
            conditions.forEach(condition => {
                builtQuery = collection.where(condition.field, condition.op, condition.value)
            });
        }
        const queryResult = await (builtQuery || collection).get()
        const documentArray = <T[]><unknown> queryResult.docs.map(doc => {
            return {
                ...doc.data(),
                _id: doc.id
            }
        })
        return documentArray
    }

    async insert(document: T, id: number | string = null): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id?id.toString():null)
        await document_reference.set(document)
        return {...document, _id: document_reference.id}
    }

    async update(document: T, id: number | string): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id.toString())
        try {
            await document_reference.update(document);
            return {...document, id: document_reference.id}
        } catch (err) {
            if(err.code === 5) {
                return null
            }
            throw err
        }
    }

    async delete(id: string | number): Promise<T> {
        const collection = this.getCollection();
        const document_reference = collection.doc(id.toString());
        const document = await document_reference.get();
        if(document.exists) {
            const data = <T><unknown> document.data();
            await document_reference.delete();
            return {...data, id: document_reference.id}
        } else {
            return null
        }
    }
  }