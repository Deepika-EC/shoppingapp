import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()

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

const changeName = (e) => {
    setName(e.target.value)
}
const changeEmail = (e) => {
    setEmail(e.target.value)
}
const changePassword = (e) => {
    setPassword(e.target.value)
}
const changeConfirm = (e) => {
    setConfirm(e.target.value)
}

const submitData = (e) => {
    e.preventDefault()
    let obj = {
        email: email,
        password: password
    }
    
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(() => {
            if(password!==confirm){
                alert("does not match..!")
            }
            else{
            alert("successfully registered....!")
            navigate("/login")
            }
        })
        .catch(() => {
            alert("Error...!")
        })
}

return (
    <div style={{backgroundImage:`url("https://morephotos.com/wp-content/uploads/1618/18/MorePhotos-shopping-carts-1200x800.jpeg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",padding: "30px",minHeight:"100vh"}}>
    <div className="mx-5"  style={{ maxWidth: "400px"}}>
        <div className="card m-3 " style={{backgroundColor:"rgba(100, 149, 255, 0.568)"}}>
            <div className="card-title text-center my-1">
                <h2>Register Form</h2>
            </div>
            <div className="card-body">
                <form onSubmit={submitData}>
                    <div className="mb-3">
                        <label className="form-label px-2"><i class="fa-solid fa-user"></i><span className="px-2">Name</span></label>
                        <input value={name} type="text" className="form-control" onChange={changeName} style={{border:"none",borderBottom:"2px solid black"}} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label px-2"><i class="fa-solid fa-envelope"></i><span className="px-2">Email</span></label>
                        <input value={email} type="email" className="form-control" onChange={changeEmail} style={{border:"none",borderBottom:"2px solid black"}} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label px-2"><i class="fa-solid fa-key"></i><span className="px-2">Password</span></label>
                        <input value={password} type="password" className="form-control" onChange={changePassword} style={{border:"none",borderBottom:"2px solid black"}} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label px-2"><i class="fa-solid fa-lock"></i><span className="px-2">Confirm Password</span></label>
                        <input value={confirm} type="password" className="form-control" onChange={changeConfirm} style={{border:"none",borderBottom:"2px solid black"}} required />
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary mx-3">Submit</button>
                    {/* <Link to="/a" className="btn btn-danger">Back</Link> */}
                    <br/><br/>
                    <div>
                        <b>If you have an account? </b><br/>
                        <Link to="/login" style={{color:"blue",fontSize:"20px"}}> LOGIN HERE</Link>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
)
}
export default Register;