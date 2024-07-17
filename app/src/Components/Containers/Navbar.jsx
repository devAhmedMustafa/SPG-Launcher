import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <nav className="flex flex-col gap-10 bg-offBlack p-5 rounded-full sticky top-16 h-fit z-10">
            <Link to="/">
                <i className="fa-solid fa-house text-xl"></i>
            </Link>
        </nav>
    )
}

