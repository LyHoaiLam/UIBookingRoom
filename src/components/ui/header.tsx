'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBooking from "./HeaderSearch";


function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // New
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleSearch = (searchQuery: { location: string, date: string }) => {
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="bg-gray-500 p-4 relative">
            <div className="flex items-center">
                <div className="w-[20%] text-3xl cursor-pointer"> 
                    <Link href="/">
                        <span className="sm:hidden sm:inline scroll-m-20 font-semibold tracking-tight first:mt-0 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Home</span>
                        <span className="hidden sm:inline scroll-m-20 font-semibold tracking-tight first:mt-0 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Home Page Booking</span>
                    </Link>
                </div>

                <div className="w-[50%] ml-8 sm:ml-0 flex items-center justify-center">
                    <SearchBooking onSearch={handleSearch} />
                </div>

                <div className="ml-20 lg:hidden">
                    <button onClick={toggleMenu} className="text-3xl">
                        &#9776;
                    </button>
                </div>

                <div className={`${isMenuOpen ? "block" : "hidden"} lg:flex flex-col lg:flex-row lg:items-center lg:justify-end absolute lg:static right-0 top-full lg:top-auto bg-gray-500 p-4 lg:p-0 w-full lg:w-auto z-50`}>
                    {isLoggedIn ? (
                        <Button className="bg-red-600 w-20" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button className="bg-sky-600 w-full lg:w-[40%] mb-2 lg:mb-0 lg:mr-8">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button className="bg-sky-600 w-full lg:w-[40%]">
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
