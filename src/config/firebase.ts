import * as admin from 'firebase-admin';
import * as fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync('./assets/private/firebase-authentication.json', {
    encoding: 'utf8'
  })
);

function createFirestoreDb() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  const db = admin.firestore();
  return db
}

export default {
  createFirestoreDb
}