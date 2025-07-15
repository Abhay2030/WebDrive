// ✅ Step 7: Firebase Configuration
const firebaseConfig = {
    apiKey: "            ",
    authDomain: "minidrive-ee651.firebaseapp.com",
    projectId: "minidrive-ee651",
    storageBucket: "minidrive-ee651.appspot.com",
    messagingSenderId: "361760622556",
    appId: "1:361760622556:web:e270f2a9101ce5d0e3b119"
  };
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  // ✅ Step 8: Authentication Logic
  function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => alert("Signed up!"))
      .catch(err => alert(err.message));
  }
  
  function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById("upload-section").style.display = "block";
        alert("Logged in!");
        showFiles();
      })
      .catch(err => alert(err.message));
  }
  
  function logout() {
    auth.signOut().then(() => {
      alert("Logged out!");
      document.getElementById("upload-section").style.display = "none";
    });
  }
  
  // ✅ Step 9: Upload File
  function uploadFile() {
    const file = document.getElementById("fileInput").files[0];
    const storageRef = storage.ref("files/" + file.name);
    storageRef.put(file).then(() => {
      alert("File uploaded!");
      showFiles(); // Refresh the file list
    });
  }
  
  // ✅ Step 10: Show Files
  function showFiles() {
    const listRef = storage.ref("files/");
    document.getElementById("fileList").innerHTML = "";
    listRef.listAll().then(result => {
      result.items.forEach(item => {
        item.getDownloadURL().then(url => {
          document.getElementById("fileList").innerHTML += `
            <div>
              <a href="${url}" target="_blank">${item.name}</a>
              <button onclick="deleteFile('${item.fullPath}')">Delete</button>
            </div>
          `;
        });
      });
    });
  }
  
  // ✅ Step 11: Delete File
  function deleteFile(path) {
    const fileRef = storage.ref(path);
    fileRef.delete().then(() => {
      alert("File deleted");
      showFiles();
    });
  }
  
