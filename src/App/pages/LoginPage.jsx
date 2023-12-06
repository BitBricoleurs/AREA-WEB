import React from "react";
import LandingVideo from "../../assets/landingVideo.mp4";
import PurpleLogo from "../../assets/purpleLogo.svg";
import ReturnArrow from '../../assets/returnArrowLogin.svg'
import {LandingVideoBackground} from "../../components";
const LoginInput = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 font-outfit bg-background w-5/6 bg-opacity-100 rounded-md">
            <div className="flex justify-between items-start mb-4 pb-2 py-1 text-base font-medium rounded-md text-white">
                  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.693 490.693" className="h-10 w-10 hover:fill-hover-static">
                  <path d="M351.173 149.227H36.4L124.827 60.8c4.053-4.267 3.947-10.987-.213-15.04-4.16-3.947-10.667-3.947-14.827 0L3.12 152.427c-4.16 4.16-4.16 10.88 0 15.04l106.667 106.667c4.267 4.053 10.987 3.947 15.04-.213 3.947-4.16 3.947-10.667 0-14.827L36.4 170.56h314.773c65.173 0 118.187 57.387 118.187 128s-53.013 128-118.187 128h-94.827c-5.333 0-10.133 3.84-10.88 9.067-.96 6.613 4.16 12.267 10.56 12.267h95.147c76.907 0 139.52-66.987 139.52-149.333s-62.613-149.334-139.52-149.334z"/>
                </svg>
                  </a>
                <div className="text-sm">
                <a className="flex items-center space-x-3 rtl:space-x-reverse select-none">
                    <img src={PurpleLogo} className="h-10" alt={"PurpleVideo"}/>
                    <span className="text-3xl font-semibold whitespace-nowrap dark:text-white font-outfit">
                        <span className="font-light">Bot</span>
                        <span className="font-medium">Butler</span>
                    </span>
                </a>
                </div>
        </div>
            <div className="text-center">
            <h2 className="text-4xl mb-4 font-medium text-white">Hi, Welcome back</h2>
            <p className="mb-16 font-light -mt-4 text-white">Create an account or login into BotButler.</p>
            </div>
            <div className="flex flex-col items-center">
                <button className="flex items-center w-64 mb-4 px-3 py-1 h-8 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_291_1581)">
                                <path d="M23.9878 12.2245C23.9878 11.2413 23.9061 10.5238 23.7294 9.77966H12.2383V14.2176H18.9833C18.8474 15.3205 18.113 16.9815 16.4811 18.0976L16.4583 18.2462L20.0915 20.9964L20.3433 21.0209C22.655 18.9347 23.9878 15.8653 23.9878 12.2245Z" fill="#4285F4"/>
                                <path d="M12.2383 23.9176C15.5428 23.9176 18.3169 22.8545 20.3433 21.0209L16.4811 18.0976C15.4476 18.8018 14.0605 19.2934 12.2383 19.2934C9.00175 19.2934 6.25478 17.2074 5.27556 14.324L5.13203 14.3359L1.35409 17.1927L1.30469 17.3269C3.31731 21.2334 7.45141 23.9176 12.2383 23.9176Z" fill="#34A853"/>
                                <path d="M5.27634 14.3239C5.01797 13.5798 4.86844 12.7825 4.86844 11.9587C4.86844 11.1349 5.01797 10.3376 5.26275 9.59354L5.25591 9.43507L1.43063 6.53235L1.30547 6.59052C0.475969 8.21162 0 10.032 0 11.9587C0 13.8854 0.475969 15.7058 1.30547 17.3269L5.27634 14.3239Z" fill="#FBBC05"/>
                                <path d="M12.2383 4.62403C14.5365 4.62403 16.0867 5.59401 16.9707 6.40461L20.4248 3.10928C18.3034 1.1826 15.5428 0 12.2383 0C7.45141 0 3.31731 2.68406 1.30469 6.59056L5.26197 9.59359C6.25478 6.7102 9.00175 4.62403 12.2383 4.62403Z" fill="#EB4335"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_291_1581">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <span>Continue with Google</span>
                </button>
                <button className="flex items-center w-64 h-8 mb-4 px-3 py-1 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_291_1590)">
                                <path d="M16.6172 0C16.6731 0 16.729 0 16.788 0C16.925 1.69253 16.279 2.95719 15.4938 3.87301C14.7234 4.78251 13.6685 5.6646 11.9623 5.53076C11.8484 3.86247 12.4955 2.69161 13.2796 1.77789C14.0068 0.92636 15.3399 0.168621 16.6172 0Z" fill="black"/>
                                <path d="M21.7831 17.6166C21.7831 17.6335 21.7831 17.6482 21.7831 17.6641C21.3036 19.1163 20.6196 20.3609 19.785 21.516C19.023 22.5646 18.0893 23.9757 16.422 23.9757C14.9814 23.9757 14.0245 23.0494 12.548 23.0241C10.9861 22.9988 10.1272 23.7987 8.69921 24C8.53586 24 8.37251 24 8.21232 24C7.16371 23.8482 6.31744 23.0178 5.70092 22.2695C3.88298 20.0585 2.47816 17.2025 2.2168 13.5476C2.2168 13.1893 2.2168 12.832 2.2168 12.4737C2.32745 9.85797 3.59843 7.73124 5.2878 6.70054C6.17938 6.15253 7.40505 5.68566 8.76982 5.89432C9.35472 5.98496 9.95227 6.1852 10.4761 6.38333C10.9724 6.57408 11.5932 6.91237 12.1812 6.89446C12.5796 6.88286 12.9759 6.67525 13.3774 6.52876C14.5535 6.10405 15.7065 5.61715 17.2262 5.84585C19.0525 6.12196 20.3488 6.93345 21.1497 8.18546C19.6048 9.16873 18.3833 10.6505 18.592 13.1808C18.7775 15.4794 20.1138 16.8241 21.7831 17.6166Z" fill="black"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_291_1590">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <span>Continue with Apple</span>
                </button>
                <button className="flex items-center w-64 mb-4 px-3 py-1 h-8 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-700 hover:text-light-purple">
                    <div className="flex items-center w-8 h-8 ml-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 12.75H12.75V20.25H20.25V12.75Z" fill="#FEBA08"/>
                        <path d="M11.25 12.75H3.75V20.25H11.25V12.75Z" fill="#05A6F0"/>
                        <path d="M20.25 3.75H12.75V11.25H20.25V3.75Z" fill="#80BC06"/>
                        <path d="M11.25 3.75H3.75V11.25H11.25V3.75Z" fill="#F25325"/>
                    </svg>
                    </div>
                    <span>Continue with Microsoft</span>
                </button>
                <button className="flex items-center justify-center w-64 px-3 h-8 py-1 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-700 mb-8">
                    Email and Password
                </button>
                </div>
        </div>
    )
}


const SideVideo = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <video autoPlay loop muted className="object-cover w-full h-full">
                <source src={LandingVideo} type="video/mp4"/>
            </video>
        </div>
    )
}

export default function LoginPage() {
    return (
        <>
                <div className="relative w-full h-screen">
                    <LandingVideoBackground/>
                    <LoginInput/>
                </div>
        </>
    );
}
