import * as config from './config'
import { Express, Request, Response } from 'express'

export default class App {

    private app: Express = null
    private server: any  = null

    constructor() {
    }

    private loadFirebase = () => {
        return config.firebase.getFirestoreInstance();
    }

    private loadMysql = () => {
        return config.mysql.getMySqlInstance()
    }

    private loadJWTPassportStrategy = () => {
        return config.passportJwt.createPassportJwtStrategy();
    }

    init = () => {
        this.loadJWTPassportStrategy();
        const firestoreDB = this.loadFirebase();
        const mysqlDB = this.loadMysql();
        this.app = config.express.createExpressApp((req: Request, res: Response, next: Function):void => {
            req.context = {
                firestoreDB,
                mysqlDB
            }
            next()
        });
    }

    listen = (port: number) => {
        this.server = this.app.listen(port, () => {
            console.log('RUNNING');
          })
    }

    close = () => {
        this.server.close()
    }
}