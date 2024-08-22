const firebaseConfig = {
  apiKey: "AIzaSyDAK8vF-R_38TIEzuR1gMuBz7pmKldOEUI",
  authDomain: "marius-blog-website.firebaseapp.com",
  projectId: "marius-blog-website",
  storageBucket: "marius-blog-website.appspot.com",
  messagingSenderId: "928224624357",
  appId: "1:928224624357:web:9bed4305820f7c5aefde0c"
};


const app = initializeApp(firebaseConfig);

// init the database
let db = app.firestore();