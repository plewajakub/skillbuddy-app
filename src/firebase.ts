import { initializeApp } from 'firebase/app';
import { getFirestore, doc, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { firebaseConfig } from './config';

const firebaseApp = initializeApp(firebaseConfig.firebase);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
export function initialize(){



  if(location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:4200');
    connectFirestoreEmulator(firestore, 'localhost', 4200);
  }
}

export function isExisting(login: string, password:string, email: string = "" ) {
  const userDoc = doc(firestore, 'users')

}
