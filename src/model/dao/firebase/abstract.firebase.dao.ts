import DAO from "../abstract.dao"

export default abstract class FirebaseDAO<T> extends DAO<T> {
  
    protected _collectionName: string
  
    constructor(db: FirebaseFirestore.Firestore, collectionName: string) {
        super(db)
        this._collectionName = collectionName
    }

    getCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
        return this._db.collection(this._collectionName);
    }

    async fetchSingle(id: string | number): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id.toString())
        const documentArray = <T><unknown> await document_reference.get()
        console.log('fetchSingle', documentArray)
        if (documentArray) { 
            return documentArray
        } else {
            []
        }
    }

    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]): Promise<T[]> {
        const collection = this.getCollection()
        let builtQuery = collection.select()
        if(conditions.length) {
            conditions.forEach(condition => {
                builtQuery = builtQuery.where(condition.field, condition.op, condition.value)
            });
        }
        const documentArray = <T[]><unknown> await builtQuery.get()
        console.log('fetchAll', documentArray)
        if (documentArray) { 
            return documentArray
        } else {
            null
        }
    }

    async insert(document: T, id: number | string = null): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id?id.toString():null)
        const result = <T><unknown> await document_reference.set(document)
        console.log('insert', result)
        return {...document, id: document_reference.id}
    }

    async update(document: T, id: number | string): Promise<T> {
        const collection = this.getCollection()
        const document_reference = collection.doc(id?id.toString():null)
        const result = <T><unknown> await document_reference.update(document);
        console.log('update', result)
        return {...document, id: document_reference.id}
    }

    async delete(id: string | number): Promise<T> {
        const collection = this.getCollection();
        const document_reference = collection.doc(id?id.toString():null);
        const document = <T><unknown> await document_reference.get();
        const result = await document_reference.delete();
        console.log('delete', result)
        return {...document, id: document_reference.id}
    }
  }