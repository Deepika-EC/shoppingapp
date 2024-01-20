import React from "react";
// import "./estyle.css"
function Footer() {
    return (
        <div className="bg-light py-4 fst-italic">
            <div className="row mx-0">
                <div className="col-md-3 col-sm-12 text-center">
                    <a class="navbar-brand me-5" href="#"><img src="https://icon-library.com/images/icon-for-store/icon-for-store-2.jpg" width="70" height="50" /></a><br/><br/>
                    <b>Office & Household Applicances</b>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Pages</h4><br/>
                    <p>About us</p>
                    <p>Our Expertise</p>
                    <p>Testimonials</p>
                    <p>Office and Household</p>
                    <p>Shop</p>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Legal and help</h4><br/>
                    <p>FAQs</p>
                    <p>Terms of use</p>
                    <p>Privacy policy</p>
                </div>
                <div className="col-md-3 col-sm-6 text-center">
                    <h4>Contact Us</h4><br/>
                    <p className="mt-2"><span style={{color:"rgb(82, 82, 253)"}}><i class="fa-solid fa-location-dot h4"></i></span>&nbsp;107,Bazaar St,Udhaya Nagar Arch,<br/>Near KR Puram Railway Station,<br/>Bengaluru,Karnataka-560016. </p>
                    <p className="mt-2"><span style={{color:"green"}}><i class="fa-solid fa-phone h4"></i></span>&nbsp;987456321</p>
                    <p className="mt-2"><span style={{color:"grey"}}><i class="fa-solid fa-envelope h4"></i></span>&nbsp;xyz123@gmail.com</p>
                </div>
                <div className="col-md-2 col-sm-6 text-center">
                    <h4>Social Links</h4><br/>
                    <p class="mt-2">
                        <span class="pr-3" style={{color:"#316FF6"}}>
                            <i class="fa-brands fa-facebook h4"></i>
                        </span>
                        <span class="px-3" style={{color:"#1DA1F2"}}>
                            <i class="fa-brands fa-twitter h4"></i>
                        </span>
                        <span class="px-3" style={{color:"#0077b5"}}>
                            <i class="fa-brands fa-linkedin h4"></i>
                        </span>
                        <span class="px-3" style={{color:"#CD201F"}}>
                            <i class="fa-brands fa-youtube h4"></i>
                        </span>
                    </p>
                    <p>
                        <i class="fa-brands fa-google-play h4"></i> Google Play
                    </p>
                    <p>
                        <span style={{color:"silver"}}>
                        <i class="fa-brands fa-apple h4 mx-1"></i></span> Apple Store
                    </p>
                </div>

            </div>
        </div>
    )
}
export default Footer;