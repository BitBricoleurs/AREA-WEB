import {LandingNavBar, LandingVideoBackground} from "../components/";
import '../Static.css';
import React, {useState} from "react";
import ButtonArrow from '../../assets/ButtonArrow.svg';

const CustomCard = ({ title, description }) => {
    return (
        <div className="w-64 rounded overflow-hidden shadow-lg bg-background p-6 text-white flex flex-col">
            <div className="flex flex-row mb-4">
                <div className="w-3 bg-vertical-purple-gradient mr-4 rounded-md self-stretch"></div>
                <div className="flex-col">
                    <div className="text-white font-bold text-base mb-4">{title}</div>
                    <p className="text-white font-light text-xs">{description}</p>
                </div>
            </div>
            <button className="bg-dark-purple hover:bg-light-purple text-white font-bold py-1 px-4 mt-6 rounded inline-flex items-center justify-center w-32 self-center">
                <span className="text-xs font-light">Learn More</span>
                <img src={ButtonArrow} alt="Arrow" className="ml-2" />
            </button>
        </div>
    );
};



const CustomButtonLanding = ({ children }) => {
    return (
        <button className="bg-horizontal-purple-gradient text-white w-52 py-2 pl-4 pr-2 rounded-md hover:bg-light-purple-gradient transition duration-300 flex items-center justify-between group">
            <span className="flex items-center justify-center">
                {children}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                className="h-6 w-auto group-hover:fill-hover-static transition duration-300 fill-white group-hover:rotate-90"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.6381 4.47172C9.0449 4.06493 9.70445 4.06493 10.1112 4.47172L17.4029 11.7634C17.8097 12.1702 17.8097 12.8297 17.4029 13.2365L10.1112 20.5282C9.70445 20.935 9.0449 20.935 8.6381 20.5282C8.23131 20.1214 8.23131 19.4619 8.6381 19.0551L15.1932 12.5L8.6381 5.94486C8.23131 5.53807 8.23131 4.87852 8.6381 4.47172Z"
                />
            </svg>
        </button>
    );
};


const FirstContent = () => {
    return (
        <div className="relative z-10 p-4 font-outfit md:mb-0  md:mt-[-400px] sm:mt-[-200px] ml-10">
            <h1 className="text-white text-5xl font-bold mb-4 ">
                Craft Your Workflow
            </h1>
            <p className="text-white text-5xl mb-4 font-bold">
                Automate Your Success
            </p>
            <p className="text-purple-100 text-xl mb-6 font-thin">
                Unleash your potential with BotButler<br/>
                Automate to Chart New Heights
            </p>
            <CustomButtonLanding className="bg-horizontal-purple-gradient text-white w-52 py-2 pl-4 pr-2 rounded-md hover:bg-light-purple-gradient transition duration-300 flex items-center justify-between group">
                <span className="flex items-center justify-center font-medium">
                    <span className="pr-2">Try</span>
                    <span className="font-light">Bot</span>
                    <span className="">Butler</span>
                </span>
            </CustomButtonLanding>
        </div>
    );
};

const SecondContent = () => {
    return (
        <div className="relative z-10 flex justify-center items-end mt-0 md:mt-[50px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <CustomCard
                    title="Simplified Integrations"
                    description="Connect your favorite apps with ease. BotButler streamlines your digital tools to work together flawlessly."
                />
                <CustomCard
                    title="Real-Time Analytics"
                    description="Make informed decisions with up-to-the-minute data. BotButler provides real-time insights to help you stay ahead of the curve."
                />
                <CustomCard
                    title="Custom Workflows"
                    description="Tailor-made automation to fit your unique business needs. With BotButler, create custom workflows that do the work for you."
                />
            </div>
        </div>
    );
}


export default function LandingPage() {
    return (
        <>
            <div className="bg-background-gradient-landing">
                <LandingNavBar/>
                <LandingVideoBackground/>
                <FirstContent/>
                <SecondContent/>
            </div>
        </>
    );
}
