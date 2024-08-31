import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getFirestore, collection, getDocs,
  addDoc, doc, setDoc
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
const firestore = getFirestore(app);

// collecton ref
const colRef = collection(firestore, 'blogs');

const blogSection = document.querySelector('.blog-sec');

getDocs(colRef).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
      const blog = { id: doc.id, ...doc.data() };
      if(blog.id !== decodeURI(location.pathname.split("/").pop())) {
          createBlog(blog);
      }
  });
});


const createBlog = (blog) => {
  blogSection.innerHTML += `
  <div class="blog-card">
    <div class="main-img_box"><img class="main-img" src="${blog.bannerImage}"></div>
    <h1>${blog.title.substring(0, 100) + '...'}</h1>
    <p>${blog.article.substring(0, 200) + '...'}</p>
    <a href="/${blog.id}"><button class="fullstory-btn">Full Story <i class="fa-solid fa-arrow-right-long"></i></button></a>
  </div>
  `;
}