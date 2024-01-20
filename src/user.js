import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDUgGmFA-U9lzZkMu2QQWsO-kox9Ei-eD8",
    authDomain: "shopping-2d1f8.firebaseapp.com",
    projectId: "shopping-2d1f8",
    storageBucket: "shopping-2d1f8.appspot.com",
    messagingSenderId: "423920902690",
    appId: "1:423920902690:web:b8b7934e9a0142cccda07b",
    measurementId: "G-KL8TE1853K"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()

function User(){
    const [user,setUser]=useState()

    useEffect(()=>{
        let x=onAuthStateChanged(auth,user=>setUser(user))
        return x
    },[])
    return user

}
export default User;