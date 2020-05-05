import DAO from "../abstract.dao"
import { Connection } from "mysql";

export default abstract class MysqlDAO<T> extends DAO<T> {
  
    protected _collectionName: string
    protected _idFieldName: string
    protected _defaultTimeout: number
  
    constructor(db: Connection, collectionName: string, idFieldName: string='id') {
        super(db)
        this._collectionName = collectionName.toUpperCase()
        this._idFieldName = idFieldName,
        this._defaultTimeout = 40000 // seconds
    }

    async fetchSingle(id: string | number): Promise<T> {
        let query: string = `SELECT * FROM ${this._collectionName} WHERE ${this._idFieldName} = ?`;
        return new Promise((resolve, reject) => {
            (<Connection> this._db).query({
                sql: query,
                values: [id],
                timeout: this._defaultTimeout
            }, (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                }
                if(results && results.length > 0) {
                    console.log(fields)
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            })
        })
    }

    async fetchAll(...conditions: {
                field: string, 
                op: FirebaseFirestore.WhereFilterOp, 
                value: string | number | boolean
            }[]): Promise<T[]> {

        let query: string = `SELECT * FROM ${this._collectionName}`;
        if(conditions.length > 0) {
            query += ` WHERE ${
                conditions.map((condition, index, array) => {
                    let queryPart = condition.field + " " + condition.op + " " + "?"
                    if(index != array.length - 1) {
                        queryPart = queryPart.concat(" AND ")
                    }
                    return queryPart
                }).join(" ")
            }`
        };
        return new Promise((resolve, reject) => {
            (<Connection> this._db).query({
                sql: query,
                values: conditions.map(condition => condition.value),
                timeout: this._defaultTimeout
            }, (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                }
                if(results && results.length > 0) {
                    console.log(fields)
                    resolve(results)
                } else {
                    resolve([])
                }
            })
        })
    }

    async insert(document: T, id: number | string = null): Promise<T> {
        const query: string = `INSERT INTO ${this._collectionName} SET ?`;
        let values:any = document
        if(id) {
            values[this._idFieldName] = id
        } 

        return new Promise((resolve, reject) => {
            (<Connection> this._db).query({
                sql: query,
                values,
                timeout: this._defaultTimeout
            }, (error, result) => {
                if(error) {
                    reject(error)
                    return
                }
                console.log(result)
                resolve({...document, _id: result.insertId})
            })
        })
    }

    async update(document: T, id: number | string): Promise<T> {
        const query: string = `UPDATE ${this._collectionName} SET ${
            Object.keys(document).map(value => value + " = ?").join(",")} WHERE ${this._idFieldName} = ?`;
        return new Promise((resolve, reject) => {
            (<Connection> this._db).query({
                sql: query,
                values: [...Object.values(document), id],
                timeout: this._defaultTimeout
            }, (error,result) => {
                if(error) {
                    reject(error)
                    return
                }
                if(result.affectedRows == 0) {
                    reject(new Error())
                }
            })
        })
    }

    async delete(id: string | number): Promise<T> {
        const query: string = `DELETE FROM ${this._collectionName} WHERE ${this._idFieldName} = ?`;
        return new Promise((resolve, reject) => {
            (<Connection> this._db).query({
                sql: query,
                values: [id],
                timeout: this._defaultTimeout
            }, (error) => {
                if(error) {
                    reject(error)
                    return
                }
                resolve()
            })
        })
    }
  }