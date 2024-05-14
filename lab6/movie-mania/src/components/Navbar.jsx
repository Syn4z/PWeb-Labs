import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { ToggleDark } from './ToggleDark';

function Navbar() {
    const [isChecked, setIsChecked] = useState(false);
    const { header, handleLogin } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);

    const Navdata = [
        {
            id: 1,
            headername: "Genres",
            Name: "Genres",
            link : "/"
        },
        {
            id: 2,
            headername: "Trending",
            Name: "Trending",
            link:"/trending"
        },
        {
            id: 3,
            headername: "Upcoming",
            Name: "Upcoming",
            link:"/upcoming"
        },
        {
            id: 4,
            headername: "Favorites",
            Name: "Favorites",
            link:"/favorite"
        }
    ]

    return (
        <>
            {/* mobilebutton */}
            <button className="z-40 text-3xl text-black fixed right-0 bottom-0 m-6 p-4 duration-150 rounded-full active:scale-90 bg-white block md:hidden" onClick={() => setActivemobile(!activemobile)}>
                {activemobile ? <HiX /> : <HiMenuAlt1 />}
            </button>

            <nav className={`${activemobile ? 'block' : 'hidden'} fixed bg-black/90 md:bg-nav-bg-color h-full w-full md:w-[15rem] z-30 md:block`}>
                <motion.div
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link to="/" className="logo flex flex-col justify-center items-center m-7 gap-2" onClick={() => setActivemobile(!activemobile)}>
                        <img src={logo} alt="logo" className="w-24" />
                        <h1 className="text-navbar-text-color font-bold text-2xl text-center">Movie Mania</h1>
                    </Link>
                </motion.div>

                <ul className="text-navbar-text-color font-semibold text-[16px] text-center px-5">
                    {Navdata.map((data) => (
                            <Link key={data.id} to={data.link}><li className={`${header == data.headername ? 'bg-navbar-element-bg border-navbar-element-border' : 'bg-gray-500/20 border-black'} p-2 my-2  hover:bg-navbar-element-bg rounded-[5px] border-2 hover:border-navbar-element-border`} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>
                    ))}
                </ul>
                <ToggleDark isChecked={isChecked} setIsChecked={setIsChecked} />
                <button class="ml-12 mt-20 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleLogin}>
                Log In
                </button>
            </nav>
        </>
    )
}

export default Navbar
