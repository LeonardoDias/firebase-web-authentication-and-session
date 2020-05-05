import {dotenv} from './src/config/'
import App from './src/app'
import IUser from './src/model/interface/user.interface'
import { Connection } from 'mysql'

dotenv.loadEnv()
process.env.ROOT = __dirname

declare global {
  namespace Express {
      interface Request {
          context: {
              firestoreDB: FirebaseFirestore.Firestore,
              mysqlDB: Connection
          }
      }

      interface User extends IUser {}
  }

  namespace CustomError {
      class UserInputError extends Error {}
  }

}

let app = new App();
app.init();
app.listen(parseInt(process.env.PORT) || 3000);
process.on('SIGINT', async function() {
  await app.close();
  process.exit();
});