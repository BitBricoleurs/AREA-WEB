import {LandingNavBar, FirstContent, SecondContent, ThirdContent, FourthContent, FifthContent} from "../components/";
import '../Static.css';
import React, {useState} from "react";
import ButtonArrow from '../../assets/ButtonArrow.svg';



export default function LandingPage() {
    return (
        <>
            <div className="bg-background-gradient-landing">
                <LandingNavBar/>
                <FirstContent/>
                <SecondContent/>
                <ThirdContent/>
                <FourthContent/>
                <FifthContent/>
            </div>
        </>
    );
}
