import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? {
        apiKey: "AIzaSyDIKbXNuPzie70ni2pU9smm0blRuzM1wPU",
        authDomain: "bilsemai-48bb3.firebaseapp.com",
        projectId: "bilsemai-48bb3",
        storageBucket: "bilsemai-48bb3.appspot.com",
        messagingSenderId: "325539978393",
        appId: "1:325539978393:web:8ca763c23194ca37c96c08",
        measurementId: "G-HCRSV8GTPK",
      }
    : {
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
