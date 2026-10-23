import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmmB1-HsBCBpxoAJ2jSgXG0xJOfR1XKaw",
  authDomain: "devmobileuniac.firebaseapp.com",
  projectId: "devmobileuniac",
  storageBucket: "devmobileuniac.firebasestorage.app",
  messagingSenderId: "426358270428",
  appId: "1:426358270428:web:2732ab5b68990f9cf48719",
};

// Inicializa o Firebase caso ainda não tenha sido inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
