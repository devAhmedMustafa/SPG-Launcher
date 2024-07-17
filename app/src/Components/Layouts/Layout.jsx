import { Outlet } from "react-router-dom";
import Header from "@Components/Containers/Header";
import Navbar from "@Components/Containers/Navbar";

export default function Layout(){
    return (
        <div className="flex flex-col bg-black w-screen h-screen gap-4">
            <Header/>
            <div className="p-4 flex gap-9 relative">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}