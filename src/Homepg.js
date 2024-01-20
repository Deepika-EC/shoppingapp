import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import User from "./user";
import Pagination from "./pagination";
import { signOut,getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

function Home() {
    const [data, setData] = useState([])
    const [count,setCount]=useState(0)
    const [value,setValue]=useState("")  // for search function 
    const [sort,setSort]=useState("")
    let navigate=useNavigate()

    let currentUser=User()

    useEffect(() => {
        fetch("https://shopping-api-hwlq.onrender.com/Products")
            .then((resp) => resp.json())
            .then((res) => {
                setData(res)
                console.log(res)
            })
            .catch((err) => {
                console.log("error", err)
            })
    }, [])

    const addCart=(id)=>{
        fetch("https://shopping-api-hwlq.onrender.com/Products/"+id)
        .then((res)=>res.json())
        .then((resp)=>{
            // console.log(resp)
            fetch("https://shopping-api-hwlq.onrender.com/Cart_products",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(resp)
            })
            .then(()=>{
                // alert("successfully added...!")
                updateCartCount();
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // count

    const updateCartCount = () => {
        fetch("https://shopping-api-hwlq.onrender.com/Cart_products")
            .then((res) => res.json())
            .then((resp) => {
                setCount(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    useEffect(() => {  // it is used to show the count instead of refreshing.
        updateCartCount();
    }, []);

    //  search items...!    

    const searchItems = (e) => {
        setValue(e.target.value)
         // Use axios to fetch data based on the search value
        axios.get(`https://shopping-api-hwlq.onrender.com/Products?q=${e.target.value}`) // collection of datas based on my query it will filter so use query method
            .then((res) => {
                setData(res.data) // based on res the data will updating because all the datas in res
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // sorting

    let options=["title","price"]

    const Sorting = async (e) => {
        e.preventDefault()
        let value = e.target.value
        setSort(value)
        return await axios.get(`https://shopping-api-hwlq.onrender.com/Products?_sort=${value}&_order=asc`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const cartPg=()=>{
        navigate("/cartpg")
    }
    
    // pagination

    const [page,setPage]=useState(1)
    const [records,setRecords]=useState(8)

    let lr = page * records  // last record = 8
    let fr = lr-records // first records = 0
    let show=data.slice(fr,lr)  // 0,8  show --> variable name that will declare in below map

    const npage=Math.ceil(data.length / records)
    const number=[...Array(npage+1).keys()].slice(1)

    const updatePages=(num)=>{
        setPage(num)
    }

    const prev=()=>{
        if(page!==1){
            setPage(page - 1)
        }
    }

    const next=()=>{
        if(page!==npage){
            setPage(page + 1)
        }
    }

    // logout
    
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

    const logout = (e) => {
        e.preventDefault()
        signOut(auth)
        .then(()=>{
            alert("Successfully Logout...!");
        navigate("/login");
        })
        .catch((err)=>{
            alert("error",err)
        })
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand me-5" href="#"><img src="https://icon-library.com/images/icon-for-store/icon-for-store-2.jpg" width="70" height="50" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <input class="form-control me-2 mt-1 fst-italic" onChange={searchItems} value={value} type="search" placeholder="Search items....!" aria-label="Search" />
                        <form class="d-flex mt-2" role="search">
                            <a className="navbar-brand mx-5 pt-1" href="#" onClick={cartPg}>
                                <i class="fa-solid fa-bag-shopping h3"></i>
                                <span class="position-absolute top-10 start-70 translate-middle badge rounded-pill bg-danger">{count.length}</span>
                            </a>
                            <a class="navbar-brand me-4 pt-1" href="#"><i class="fa-solid fa-user"></i> {currentUser?.email}</a>
                            <button class="btn btn-outline-dark fst-italic" type="submit" onClick={logout}>LOGOUT</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="row mx-2 my-3">
                <div className="col-md-3 p-1">
                    <div className="border border-2 p-3 rounded mb-3" style={{backgroundColor:"rgb(85, 182, 177)"}}>
                        <div>
                            <select class="form-select mb-3 fst-italic h6" aria-label="Default select example">
                                <option selected>Shop by Concern</option>
                            </select>
                        </div>
                        <div>
                            <select class="form-select mb-3 fst-italic h6" aria-label="Default select example">
                                <option selected>Shop by Category</option>
                            </select>
                        </div>
                        <div>
                            <select class="form-select mb-3 fst-italic h6" aria-label="Default select example">
                                <option selected>Shop by Product</option>
                            </select>
                        </div>
                        <div>
                            <select class="form-select mb-3 fst-italic h6" aria-label="Default select example">
                                <option selected>Shop All</option>
                            </select>
                        </div>
                    </div>
                    <div className="border border-1 p-3 rounded mb-3" style={{backgroundColor:"rgb(85, 182, 177)"}}>
                        <div>
                            <select value={sort} onChange={Sorting} class="form-select fst-italic" aria-label="Default select example">
                                <option selected>Sort</option>
                                {options.map((item) => (
                                    <option>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="border border-1 p-3 rounded h6" style={{backgroundColor:"rgb(85, 182, 177)"}}>
                        <div>
                            <label for="customRange1" class="form-label fst-italic">Products</label>
                            <input type="range" class="form-range" id="customRange1" />
                        </div>
                        <div>
                            <label for="customRange1" class="form-label fst-italic">Price</label>
                            <input type="range" class="form-range" id="customRange1" />
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row my-2">
                        {show.map((item) => (
                            <div className="col-6 col-sm-3 mb-4">
                                <div class="card h-100" key={item.id}>
                                    <div class="card-body">
                                        <img src={item.image} height="200px" width="100%" class="card-img-top" alt="..." />
                                        <div className="card-text text-center">
                                            <h5 class="card-title fst-italic">Title : {item.title}</h5>
                                            <h6 class="card-text fw-bold fst-italic">Price : ${item.price}</h6>
                                            <a href="#" class="btn btn-dark fst-italic" style={{ color: "white" }} onClick={()=>addCart(item.id)}>Add to Cart<i class="fa-solid fa-cart-arrow-down"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div><br/>
            <Pagination total={data.length}
            records={npage}
            update={updatePages}
            next={next}
            prev={prev}
            activePage={page}
            />
            <br/>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
export default Home;