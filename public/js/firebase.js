import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getFirestore, collection, getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfkze9OxYv5rXKjQ0asGpx3iLSLL_wk5k",
  authDomain: "marius-blog-8b621.firebaseapp.com",
  projectId: "marius-blog-8b621",
  storageBucket: "marius-blog-8b621.appspot.com",
  messagingSenderId: "1039381804904",
  appId: "1:1039381804904:web:6e0d07010395eb6bb488dd"
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

// collecton ref
const colRef = collection(db, 'blogs');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err.message);
  })

  publishBtn.addEventListener('click'), () => {
    if(articleField.value.length && blogTitleField.value.length){
      // generating id
      let letters = "abcdefghijklmnopqrstuvwxyz"
      let blogTitle = blogTitleField.value.split(" ").join("-");
      let id = '';
      for(let i = 0; i < 4; i++){
        id += letters[Math.floor(Math.random() * letters.length)];
      }
  
      // setting docName
      let docName = `${blogTitle}-${id}`;
      let date = new Date(); //for published date
  
      // access firestore with db variable
      colRef.doc(docName).set({
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
      })
      getDocs(colRef)
      .then(() => {
        console.log('date entered');
      })
      .catch((err) => {
        console.error(err);
      })
  }
}