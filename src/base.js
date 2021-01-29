import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/auth'

export const app = firebase.initializeApp({
  "projectId": "covid-19-cf852",
  "appId": "1:1015990696223:web:4bc4d3275764b423af182a",
  "databaseURL": "https://covid-19-cf852-default-rtdb.europe-west1.firebasedatabase.app",
  "storageBucket": "covid-19-cf852.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyBDaMl7ykSHnhHrf1kiKKvfoi2glKMT14w",
  "authDomain": "covid-19-cf852.firebaseapp.com",
  "messagingSenderId": "1015990696223"
});

// Export the necessary variables to be used
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore() ; 
export const storage = app.storage(); 