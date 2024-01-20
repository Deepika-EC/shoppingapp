import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function CartPg() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const navi = useNavigate()

    useEffect(() => {
        fetch("https://shopping-api-hwlq.onrender.com/Cart_products")
            .then((resp) => resp.json())
            .then((res) => {
                setData(res)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // removecart 

    const removeCart = (id) => {
        fetch("https://shopping-api-hwlq.onrender.com/Cart_products/" + id, {
            method: "DELETE"
        })
            .then(() => {
                alert("deleted successfully...!")
                window.location.reload()
            })
            .catch((err) => {
                alert("getting error" + err)
            })
    }

    const quantity = (id, action) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, quantity: action === "increment" ? item.quantity + 1 : item.quantity - 1 } : item
            )
        )
    }

    const totalPrice = (item) => {
        return item.price * item.quantity;
    }

    const placeOrder = (id) => {
        navigate("/address/" + id)
    }

    const orders = () => {
        navi("/orders")
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <Link to="/home">
                        <a class="navbar-brand me-auto" href="#"><i class="fa-solid fa-arrow-left"></i></a>
                    </Link>
                    <h5 className="fst-italic">Shopping Bag</h5>
                    

                    {/* <div class="navbar-brand"> */}
                        <a href="#" class="navbar-brand"><h5 className="fst-italic mx-4" onClick={orders}>Orders</h5></a>
                    {/* </div> */}
                </div>
            </nav>
            <div className="row my-2 mx-0">
                {data.length === 0 ? (
                    <div>No Data Found</div>
                ) : (
                    data.map((item) => (
                        <div className="col-6 col-md-2 mb-4">
                            <div className="card h-100" key={item.id}>
                                <div className="card-body">
                                    <img src={item.image} height="100px" width="100%" class="card-img-top" alt="..." />
                                    <div className="card-text text-center">
                                        <h5 className="card-title fst-italic">Title : {item.title}</h5>
                                        <h6 className="card-text fw-bold fst-italic">Price : $ {item.price}</h6>
                                        <button className="btn btn-warning btn-sm" onClick={() => quantity(item.id, "decrement")} disabled={item.quantity <= 1}>-</button>
                                        <span className="mx-2"><b className="fst-italic">Qt:{item.quantity}</b></span>
                                        <button className="btn btn-secondary btn-sm" onClick={() => quantity(item.id, "increment")} disabled={item.quantity >= 10}>+</button><br /><br />
                                        <h6 className="card-text fw-bold fst-italic">Total :$ {totalPrice(item)} </h6>
                                        <div className="d-flex align-items-center">
                                            {/* <Link to="/address/:pid"> */}
                                            <a href="#" className="btn btn-danger fst-italic" style={{ color: "white" }} onClick={() => { placeOrder(item.id) }}>Place Order</a>
                                            {/* </Link> */}
                                            <div className="d-flex flex-column flex-sm-row">
                                                <a href="#" style={{ color: "black" }} onClick={() => removeCart(item.id)}><i class="fa-solid fa-trash-can h5 mx-2 mt-1"></i></a>
                                                {/* <a href="#" style={{ color: "black" }}><i class="fa-regular fa-heart h5 mt-1"></i></a> */}
                                                <a href="#" style={{ color: "black", transition: "background-color 0.3s", backgroundColor: "white" }}
                                                    onClick={(e) => { e.preventDefault(); e.target.style.color = 'red' }}><i className="fa-regular fa-heart h5 mt-1"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default CartPg;