import { Link } from "react-router-dom"
import useWindowDimensions from "../hooks/useWindowDimension"
import Sidebar from "./Sidebar"

export default function Header() {
    const { width, height } = useWindowDimensions()
    return (
        <header className=" " style={{ height: "4rem" }}>
            {/* <h1 className="fw-semibold display-6 logo">
                MyCRM
            </h1> */}
            <nav className="navbar bg-body-tertiary navbar-expand-lg ">
                <div className="container">
                    <Link to={"/"} className="text-decoration-none"> 
                        <h1 className="fw-semibold display-6 logo">
                            MyCRM
                        </h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <Link to={"/"} className="text-decoration-none">
                                <h1 className="fw-semibold display-6 logo">
                                    MyCRM
                                </h1>
                            </Link>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {width < 992 && <Sidebar />}
                                {/* <Sidebar /> */}
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}