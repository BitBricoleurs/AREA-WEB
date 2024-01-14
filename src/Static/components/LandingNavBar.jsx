import React, { useState, useEffect} from 'react';
import PurpleLogo from "../../assets/icons/purpleLogo.svg";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';

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
            <nav className={`p-20 px-16 flex w-full`}>
                <div className={`flex flex-row w-full justify-center`}>
                    <div className="flex flex-row items-center w-full justify-between">
                        <div className="LogoBotButler space-x-2 flex flex-row">
                            <div className="w-8 h-8 bg-white"/>
                            <div className="font-outfit text-2xl font-bold text-gradient-landing ">BotButler</div>
                        </div>
                        <div className="flex flex-row items-center space-x-6 ">
                            <Link className={"text-white font-jakarta text-[14px] hover:text-hover-static transition-all duration-300"} to={"https://github.com"} target="_blank">How it works</Link>
                            <Link className={"text-white font-jakarta text-[14px] hover:text-hover-static transition-all duration-300"} to={"https://github.com"} target="_blank">Pricing</Link>
                            <Link className={"text-white font-jakarta text-[14px] hover:text-hover-static transition-all duration-300"} to={"https://github.com"} target="_blank">Github</Link>
                            <Link className={"text-white font-jakarta text-[14px] hover:text-hover-static transition-all duration-300"} to={"/apk"} target="_blank">APK</Link>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <button className="text-white font-jakarta text-[14px] py-2 rounded-md hover:text-light-purple transition duration-300 flex items-center justify-center"
                                    onClick={() => navigateToAuth('login')}>
                                Login
                            </button>
                            <button className="bg-[#570CD5] text-white font-jakarta text-[14px] py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300 flex items-center justify-center"
                                    onClick={() => navigateToAuth('register')}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}



export default LandingNavBar;
