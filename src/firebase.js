import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDNBQ5abTadNXpCmgpS0P3MZwGHIsy20Aw",
    authDomain: "crud-248f8.firebaseapp.com",
    projectId: "crud-248f8",
    storageBucket: "crud-248f8.appspot.com",
    messagingSenderId: "60529872943",
    appId: "1:60529872943:web:eb78c3d9acd8be875936da"
  }

  export const firebaseApp=firebase.initializeApp(firebaseConfig)