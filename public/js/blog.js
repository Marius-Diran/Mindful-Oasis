import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getFirestore, collection, getDoc,
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


let blogId = decodeURI(location.pathname.split("/").pop());
let docRef = doc(colRef, blogId);

getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
        setupBlog(docSnap.data());
    } else {
        console.log("No such document!");
        location.replace("/");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

const setupBlog = (data) => {
  const banner = document.querySelector('.banner');
  const blogTitle = document.querySelector('.blog-title');
  const titleTag = document.querySelector('title');
  const publish = document.querySelector('.published');

  banner.style.backgroundImage = `url(${data.bannerImage})`;

  titleTag.innerHTML += blogTitle.innerHTML = data.title;
  publish.innerHTML += data.publishedAt;

  const article = document.querySelector('.article');
  addArticle(article, data.article);
}

const addArticle = (ele, data) => {
  data = data.split("\n").filter(item => item.length);
  // console.log(data);

  data.forEach(item => {
    // check for heading
    if(item[0] == '#'){
      let hCount = 0;
      let i = 0;
      while(item[i] == '#'){
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
    } 
    
    // checking for image format
    else if(item[0] == "!" && item[1] == "["){
      let seperator;

      for(let i = 0; i <= item.length; i++){
        if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
          seperator = i;
        }
      }

      let alt = item.slice(2, seperator);
      let src =item.slice(seperator + 2, item.length -1);
      ele.innerHTML += `
      <img src="${src}" alt="${alt}" class="article-image">
      `
    }
    
    else{
      ele.innerHTML += `<p>${item}</p>`;
    }
  })
}