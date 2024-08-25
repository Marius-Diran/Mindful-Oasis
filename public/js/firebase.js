import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfkze9OxYv5rXKjQ0asGpx3iLSLL_wk5k",
  authDomain: "marius-blog-8b621.firebaseapp.com",
  projectId: "marius-blog-8b621",
  storageBucket: "marius-blog-8b621.appspot.com",
  messagingSenderId: "1039381804904",
  appId: "1:1039381804904:web:6e0d07010395eb6bb488dd"
};


const app = initializeApp(firebaseConfig);

// init the database
const db = getFirestore(app);