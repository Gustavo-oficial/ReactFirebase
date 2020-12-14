import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCfdPACQiCIYgjO-NjbrVeXDdGgwmsU4r0",
    authDomain: "nyous-6520f.firebaseapp.com",
    projectId: "nyous-6520f",
    storageBucket: "nyous-6520f.appspot.com",
    messagingSenderId: "106116285538",
    appId: "1:106116285538:web:de3c4b187eb00e8359bd3b"
  };

  const app = firebase.initializeApp(firebaseConfig);
  
  export const db = app.firestore();

  export default firebaseConfig;