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

const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'marius-blog-8b621'
});

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const firestore = getFirestore(app);

// collecton ref
const colRef = collection(firestore, 'blogs');

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

const blogTitleField = document.querySelector('#blog-title-space');
const articleField = document.querySelector('#article-space');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, 'banner');
});

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, 'image');
})

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if(file && file.type.includes('image')){
    const formdata = new FormData();
    formdata.append('image', file);

    fetch('/upload', {
      method: 'post',
      body: formdata
    }).then(res => res.json())
    .then(data => {
      if(uploadType == 'image'){
        addImage(data, file.name)
      } else{
        bannerPath = `${location.origin}/${data}`;
        banner.style.backgroundImage = `url("${bannerPath}")`;
      }
    })
  } else {
    alert("Upload images only");
  }
}

const addImage = (imagepath, alt) => {
  let curPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagepath})\r`;
  articleField.value = articleField.value.slice(0, curPos) + textToInsert +  articleField.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let date = new Date();

publishBtn.addEventListener('click', async (e) =>{

  // generating custom ID
  let letters = "abcdefghijklmnopqrstuvwxyz"
  let blogTitle = blogTitleField.value.split(" ").join("-");
  let id = '';
  for(let i = 0; i < 4; i++){
    id += letters[Math.floor(Math.random() * letters.length)];
  }

  const customId = `${blogTitle}-${id}`;

  try {
    // Create a document reference with the custom ID
    const docRef = doc(colRef, customId);  // Add the custom ID here

    // Set the document with the custom ID
    await setDoc(docRef, {
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    });

    console.log('Document written with custom ID:', customId);

    // Redirect after successful posting
    location.href = `/${customId}`;

} catch (err) {
    console.error('Error adding document with custom ID:', err);
}

  getDocs(colRef)
  .then(() => {
    console.log('date entered');
  })
  .catch((err) => {
    console.error(err)
  })

})