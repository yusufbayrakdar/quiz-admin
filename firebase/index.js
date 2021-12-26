import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdIsrLKakzX510N-C-c1fc0IvAOiaoLHw",
  authDomain: "bilsemai.firebaseapp.com",
  projectId: "bilsemai",
  storageBucket: "bilsemai.appspot.com",
  messagingSenderId: "974587058828",
  appId: "1:974587058828:web:8728c23e2469cbde3c39a9",
  measurementId: "G-FFXT63R1LS",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const firebaseStorage = firebase.storage();

export { firebaseStorage, app as default };
