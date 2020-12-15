import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyCfIvGKVcDoA68i1jZeloFCM3cpGd23AMw',
  authDomain: 'chatify-4ccc2.firebaseapp.com',
  projectId: 'chatify-4ccc2',
  storageBucket: 'chatify-4ccc2.appspot.com',
  messagingSenderId: '774489339748',
  appId: '1:774489339748:web:eb6143da1eb8284cd52c71',
  measurementId: 'G-NF246KTLB7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
