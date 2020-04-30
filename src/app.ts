import config from './config'
import { Express, Request, Response } from 'express'
import IUser from './model/interface/user.interface'

declare global {
    namespace Express {
        interface Request {
            context: {
                firestoreDB: FirebaseFirestore.Firestore
            }
        }

        interface User extends IUser {}
    }

    namespace CustomError {
        class UserInputError extends Error {}
    }
}

export default class App {

    private app: Express = null
    private server: any  = null

    constructor() {
    }

    private loadFirebase = () => {
        return config.firebase.getFirestoreInstance();
    }

    private loadJWTPassportStrategy = () => {
        return config.passportJwt.createPassportJwtStrategy();
    }

    init = () => {
        this.loadJWTPassportStrategy();
        const firestoreDB = this.loadFirebase();
        this.app = config.express.createExpressApp((req: Request, res: Response, next: Function):void => {
            req.context = {
                firestoreDB
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