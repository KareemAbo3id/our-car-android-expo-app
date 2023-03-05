// firebase setup:
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDAnDRc2pTM2h1Zp2D9ncJ4oPkJYgbIjTI',
  authDomain: 'ourcar-ec74b.firebaseapp.com',
  projectId: 'ourcar-ec74b',
  storageBucket: 'ourcar-ec74b.appspot.com',
  messagingSenderId: '269776002077',
  appId: '1:269776002077:web:0ed15f49a79f9157463af4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
