import React, { useState, useEffect} from 'react';
import PurpleLogo from "../../assets/icons/purpleLogo.svg";
import {Routes, Route, useNavigate} from 'react-router-dom';

const LandingNavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateToAuth = (authType) => {
        navigate('/auth', { state: { from: authType } });
    };

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`fixed top-0 w-full z-50 p-4 ${hasScrolled ? 'bg-opacity-90 backdrop-blur-md drop-shadow -translate-y-2 pb-2 transition duration-300 ' : ''}`}>
                <div className="flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={PurpleLogo} className="h-10" alt={"PurpleVideo"}/>
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white font-outfit">
                        <span className="font-light">Bot</span>
                        <span className="font-medium">Butler</span>
                    </span>
                    </a>
                    <div className="hidden md:flex flex-grow items-center justify-center">
                        <a href="#" className="text-white hover:text-hover-static px-3 py-2 rounded-md text-sm font-medium">Services</a>
                        <a href="https://github.com/BitBricoleurs/AREA-WEB" className="text-white hover:text-hover-static px-3 py-2 rounded-md text-sm font-medium">Github</a>
                        <a href="#" className="text-white hover:text-hover-static px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                    </div>
                    <div className="flex items-center">
                        <button className="text-gradient bg-transparent hover:text-white hover:bg-horizontal-purple-gradient bg-white border border-violet-800 font-medium rounded-md text-sm px-6 py-1.5 mr-4 transition duration-700" onClick={() => navigateToAuth('login')}>
                            Login
                        </button>
                        <button type="button" className="text-white bg-horizontal-purple-gradient hover:bg-light-purple-gradient font-medium rounded-md text-sm px-6 py-1.5" onClick={() => navigateToAuth('register')}>
                            Register
                        </button>
                        <button onClick={toggleMenu} className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 focus:text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} absolute w-full bg-opacity-90 flex-col items-center md:hidden`} id="mobile-menu">
                    <ul className="flex flex-col w-full">
                        <li className="w-full">
                            <a href="#" className="block text-center text-gray-200 hover:text-purple-500 px-3 py-2 text-sm font-medium">Services</a>
                        </li>
                        <li className="w-full">
                            <a href="https://github.com/BitBricoleurs/AREA-WEB" className="block text-center text-gray-200 hover:text-purple-500 px-3 py-2 text-sm font-medium">Github</a>
                        </li>
                        <li className="w-full">
                            <a href="#" className="block text-center text-gray-200 hover:text-purple-500 px-3 py-2 text-sm font-medium">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default LandingNavBar;
