import * as admin from 'firebase-admin';
import * as fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync('./assets/private/firebase-authentication.json', {
    encoding: 'utf8'
  })
);

let firestoreInstance: FirebaseFirestore.Firestore = null

function getFirestoreInstance() {

  if(firestoreInstance) {
    return firestoreInstance
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  firestoreInstance = admin.firestore();
  return firestoreInstance
}

export default {
  getFirestoreInstance
}