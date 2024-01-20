import Home from "./Homepg";
import CartPg from "./cartpg";
import Address from "./address";
import Orders from "./orders";
import Register from "./registration";
import Login from "./login";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Routers>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cartpg" element={<CartPg />} />
                    <Route path="/address/:pid" element={<Address />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </Routers>
        </div>
    )
}
export default App;