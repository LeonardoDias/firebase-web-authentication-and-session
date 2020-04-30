import config from './src/config/'
import { Express } from 'express'

export default class App {

    private app: Express = null
    private server: any  = null
    private static firestoreDB: FirebaseFirestore.Firestore = null

    constructor() {
    }

    static getFirebaseapp = () => {
        return App.firestoreDB
    }

    private loadFirebase = () => {
        App.firestoreDB = config.firebase.getFirestoreInstance();
    }

    init = (flags: {
        firestore?: boolean
    } = {}) => {
        if(flags.firestore) {
            this.loadFirebase()
        }
        this.app = config.express.createExpressApp();
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