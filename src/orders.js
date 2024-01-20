import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://shopping-api-hwlq.onrender.com/Orders")
            .then((res) => res.json())
            .then((resp) => {
                setData(resp)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const removeCart = (id) => {
        fetch("https://shopping-api-hwlq.onrender.com/Orders/" + id, {
            method: "DELETE"
        })
            .then(() => {
                alert("deleted successfully...!")
                // without refresh it getting removed for that use 
                window.location.reload()
            })
            .catch((err) => {
                alert("getting error" + err)
            })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="d-flex">
                    <Link to="/cartpg">
                        <a className="navbar-brand ms-2" href="#"><i className="fa-solid fa-arrow-left"></i></a>
                    </Link>
                    <h5 className="fst-italic">Orders</h5>
                </div>
            </nav><br />

            <div className="table-responsive mx-2">
                {data.length > 0 && (
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr className="text-center" key={item.id}>
                                    <td>{item.id}</td>
                                    <td><img src={item.image} alt="img" width="60px" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <a className="text-dark" href="#"><i className="fa-solid fa-xmark" onClick={() => removeCart(item.id)}></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {data.length === 0 && <div>No Data Found</div>}
            </div>

        </div>
    )
}
export default Orders;