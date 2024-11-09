import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCDRoJWEFLZobqSDi_PsTBBiIVFaupgIZk",
  authDomain: "netflix-clone-8f9bb.firebaseapp.com",
  projectId: "netflix-clone-8f9bb",
  storageBucket: "netflix-clone-8f9bb.firebasestorage.app",
  messagingSenderId: "792397748316",
  appId: "1:792397748316:web:211150469dea60ccebee99"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=> {
     try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email
    })
}catch(error){
      console.log(error);
      alert(error);
     }
}

const login = async() =>{
    try{
      signInWithEmailAndPassword(auth, email, password);
    }catch(error){
      console.log(error);
      alert(error);
    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};