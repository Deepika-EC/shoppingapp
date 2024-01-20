import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Address() {
    const [payment, setPayment] = useState()
    const { pid } = useParams()
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [quan, setQuan] = useState(0)
    const [price, setPrice] = useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const[total,setTotal]=useState("")

    const navigate = useNavigate()

    const Payment = (e) => {
        setPayment(e.target.value);
    }

    useEffect(() => {
        fetch("https://shopping-api-hwlq.onrender.com/Cart_products/" + pid)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.id)
                setTitle(resp.title)
                setQuan(resp.quan)
                setPrice(resp.price)
                fetch("https://shopping-api-hwlq.onrender.com/Orders", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(resp)
                })
                    .then(() => {
                        // alert("successfully added...!")
                        // updateCartCount();
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    },[])

    const placed = (e) => {
        e.preventDefault()
        fetch(`https://shopping-api-hwlq.onrender.com/Cart_products/${pid}`, {
          method: "DELETE",
        })
          .then(() => {
            alert("Your Product has been placed successfully....!")
            navigate("/cartpg")
          })
          .catch((err) => {
            console.log(err)
          })
      }

      useEffect(()=>{
        const calculateTotalPrice = () => {
            const quantity = parseInt(quan) || 0
            const itemPrice = parseFloat(price) || 0
            const totalPrice= quantity * itemPrice;
            setTotal(totalPrice)
        };
        calculateTotalPrice()
    },[price,quan])

    return (
        <div className="py-5 px-3" style={{ backgroundColor: "black", minHeight: "100vh" }}>
            <form className="card container border border-black shadow-lg p-3" style={{ maxWidth: "500px" }} onSubmit={placed}>
                <div>
                    <h4>Product ID</h4>
                    <input disabled="disabled" type="number" value={id} onChange={(e) => setId(e.target.value)} class="form-control" required />
                </div><br />
                <div>
                    <h5>Product Name</h5>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" required />
                </div><br />
                <div>
                    <h5>Customer Name</h5>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} class="form-control"  required />
                </div><br />
                <div>
                    <h5>Email</h5>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="form-control" required />
                </div><br />
                <div>
                    <h5>Address</h5>
                    <input type="text" class="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} required />
                </div><br />
                <div>
                    <h5>Quantity</h5>
                    <input type="text" class="form-control" value={quan} onChange={(e) => setQuan(e.target.value)} required />
                </div><br />
                <div>
                    <h5>Price per item</h5>
                    <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div><br />
                <div>
                    <h5>Total Price</h5>
                    <input type="text" class="form-control" value={total} onChange={(e) => setTotal(e.target.value)} required />
                </div><br />
                <div>
                    <h5>Payment Details</h5>
                    <form className="d-flex justify-content-around">
                        <div>
                            <input type="radio" id="online" name="payment" value="online" onChange={Payment} style={{ cursor: "pointer" }} required />
                            <label>Online Payment</label>
                        </div>
                        <div>
                            <input type="radio" id="offline" name="payment" value="offline" onChange={Payment} style={{ cursor: "pointer" }} required />
                            <label>Cash on Delivery</label>
                        </div>
                    </form>
                    {payment === 'online' && (
                        <div>
                            <h6>Select Online Payment Method:</h6>
                            <div className="">
                                <input type="radio" style={{ cursor: "pointer" }} /><label><img src="https://i.ytimg.com/vi/Wfa5VC-FuFQ/maxresdefault.jpg" alt="gpay" width="30" height="15" />GPay</label><br />
                                <input type="radio" style={{ cursor: "pointer" }} /><label><img src="https://logos-download.com/wp-content/uploads/2021/01/PhonePe_Logo-2048x2042.png" alt="paytm" width="30" height="15" />Paytm</label><br />
                                <input type="radio" style={{ cursor: "pointer" }} /><label><img src="https://logosmarcas.net/wp-content/uploads/2020/11/Paytm-Emblema.png" width="30" height="15" alt="phonepe" />PhonePe</label><br />
                                <input type="radio" style={{ cursor: "pointer" }} /><label> <i class="fa-brands fa-paypal"></i> Paypal</label><br />
                            </div>
                        </div>
                    )}
                </div><br />
                <div className="text-center">
                    <button type="submit" class="btn btn-danger mx-3">BUY NOW</button>
                    <Link to="/cartpg"><button type="submit" class="btn btn-warning">BACK TO CART</button></Link>
                </div>
            </form>
        </div>

    )
}
export default Address;