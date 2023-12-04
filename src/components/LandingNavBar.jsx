import React, { useState } from 'react';
import PurpleLogo from "../assets/purpleLogo.svg";

const LandingNavBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  return (
    <div>
        <nav className="">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 fixed top-0 w-full z-10 bg-opacity-90 backdrop-blur-sm">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={PurpleLogo} className="h-10"/>
                    <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-outfit">
                        <span className="font-light">Bot</span>
                        <span className="font-medium">Butler</span>
                    </span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
                    <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
                       <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} justify-center items-center w-full md:flex md:w-auto md:order-1`} id="navbar-cta">
                    <ul className="flex flex-col p-4 md:flex-row md:space-x-28 rtl:space-x-reverse md:justify-center font-medium rounded-lg md:mt-0 md:border-0">
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 md:hover:bg-transparent hover:text-hover-static md:dark:hover:text-hover-static dark:text-white">Services</a>
                        </li>
                        <li>
                            <a href="https://github.com/BitBricoleurs/AREA-WEB" className="block py-2 px-3 md:p-0 text-gray-900 md:hover:bg-transparent hover:text-hover-static md:dark:hover:text-hover-static dark:text-white">Github</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 md:hover:bg-transparent hover:text-hover-static md:dark:hover:text-hover-static dark:text-white">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
  );
}

export default LandingNavBar;