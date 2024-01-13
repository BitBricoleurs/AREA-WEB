import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PurpleLogo from "../../assets/icons/purpleLogo.svg";
import WhiteLogo from "../../assets/icons/whiteLogo.svg";
import {useContextLogin} from "../context/loginContext.jsx";
import "/src/App/styles/blobBackground.css";


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const SelectMethod = ({onSwitch, currentAuthType, setCurrentAuthType }) => {

    const switchToRegisterSelect = () => {
        setCurrentAuthType('register');
    };

    const switchToLoginSelect = () => {
        setCurrentAuthType('login');
    };


    const linkText = currentAuthType === 'login' ? (
        <button className="text-xs text-gray-900 dark:text-gray-300 hover:text-light-purple transition duration-700 group pb-[4%]" onClick={switchToRegisterSelect}>
            Don't have an account? <span className="text-light-purple group-hover:text-gray-300 transition duration-700">Sign up</span>
        </button>
    ) : (
        <button className="text-xs text-gray-900 dark:text-gray-300 hover:text-light-purple transition duration-700 group pb-[4%]" onClick={switchToLoginSelect}>
            Already have an account? <span className="text-light-purple group-hover:text-gray-300 transition duration-700">Sign in</span>
        </button>
    );

    const handleMicrosoftLogin = () => {
        fetch('https://butbutlerapi.azurewebsites.net/microsoft-login', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                console.error('Authorization URL not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleGithubLogin = () => {
        fetch('https://butbutlerapi.azurewebsites.net/github-login', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data.authorization_url) {
                window.location.href = data.authorization_url;
            } else {
                console.error('Authorization URL not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full flex flex-col items-center justify-center">
                <img src={PurpleLogo} className="h-14 m-[4%] select-none" alt={"PurpleVideo"}/>
                <span className=" text-xl sm:text-4xl  font-semibold whitespace-nowrap dark:text-white font-outfit select-none">
                    Continue to
                    <span className="pl-[2%] font-thin hover:text-light-purple transition duration-700">
                        Bot
                    </span>
                    Butler
                </span>
            <div className="max-w-sm w-full">
                <div className="space-y-5 pt-[16%] pb-[22%]">
                    <button onClick={handleMicrosoftLogin}
                            className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                        <div className="flex items-center w-8 h-8 ml-4">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.25 12.75H12.75V20.25H20.25V12.75Z" fill="#FEBA08"/>
                                <path d="M11.25 12.75H3.75V20.25H11.25V12.75Z" fill="#05A6F0"/>
                                <path d="M20.25 3.75H12.75V11.25H20.25V3.75Z" fill="#80BC06"/>
                                <path d="M11.25 3.75H3.75V11.25H11.25V3.75Z" fill="#F25325"/>
                            </svg>
                        </div>
                        Continue with Microsoft
                    </button>
                    <button onClick={handleGithubLogin}
                            className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                        <div className="flex items-center w-8 h-8 ml-4">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1180_398)">
                                    <path
                                        d="M11.9536 0C5.35266 0 0 5.50136 0 12.2878C0 17.717 3.42506 22.323 8.17462 23.9478C8.772 24.0615 8.99137 23.6812 8.99137 23.3566C8.99137 23.0637 8.98022 22.0956 8.97516 21.0689C5.64956 21.8122 4.94784 19.6191 4.94784 19.6191C4.40409 18.1988 3.62062 17.8212 3.62062 17.8212C2.53612 17.0585 3.70237 17.0741 3.70237 17.0741C4.90275 17.1608 5.53481 18.3404 5.53481 18.3404C6.60094 20.219 8.33119 19.6758 9.01331 19.362C9.12056 18.5677 9.43041 18.0257 9.77222 17.7188C7.11722 17.408 4.32609 16.3544 4.32609 11.6461C4.32609 10.3046 4.79306 9.20837 5.55778 8.34787C5.43366 8.03833 5.02453 6.78859 5.67356 5.09602C5.67356 5.09602 6.67734 4.76575 8.96166 6.35559C9.91509 6.08324 10.9377 5.94678 11.9536 5.94216C12.9695 5.94678 13.9928 6.08324 14.9482 6.35559C17.2297 4.76575 18.2321 5.09602 18.2321 5.09602C18.8827 6.78859 18.4734 8.03833 18.3493 8.34787C19.1157 9.20837 19.5795 10.3045 19.5795 11.6461C19.5795 16.3656 16.7831 17.4048 14.1214 17.709C14.5501 18.0903 14.9321 18.8382 14.9321 19.9845C14.9321 21.6286 14.9182 22.9519 14.9182 23.3566C14.9182 23.6836 15.1334 24.0668 15.7394 23.9461C20.4863 22.3195 23.9071 17.7152 23.9071 12.2878C23.9071 5.50136 18.5552 0 11.9536 0Z"
                                        fill="#161614"/>
                                    <path
                                        d="M4.47641 17.5043C4.45016 17.5653 4.3566 17.5836 4.27157 17.5418C4.18485 17.5017 4.1361 17.4184 4.16422 17.3571C4.19 17.2943 4.28357 17.2767 4.3701 17.3189C4.457 17.3589 4.50651 17.443 4.47641 17.5043ZM5.06441 18.0436C5.00741 18.0979 4.89594 18.0727 4.82029 17.9868C4.7421 17.9011 4.72747 17.7866 4.78532 17.7314C4.8441 17.6772 4.95219 17.7025 5.03057 17.7883C5.10876 17.8749 5.12394 17.9887 5.06432 18.0437M5.46782 18.7336C5.39451 18.7859 5.27469 18.7369 5.20072 18.6276C5.1275 18.5184 5.12751 18.3873 5.20232 18.3348C5.27657 18.2823 5.3945 18.3295 5.4695 18.4379C5.54263 18.549 5.54263 18.6801 5.46772 18.7337M6.14994 19.5328C6.08441 19.607 5.94491 19.5871 5.84272 19.4858C5.73829 19.3867 5.70913 19.2461 5.77485 19.1718C5.84113 19.0974 5.98147 19.1183 6.08441 19.2188C6.18819 19.3177 6.21979 19.4594 6.14994 19.5328ZM7.03157 19.8026C7.00279 19.8988 6.86835 19.9426 6.73297 19.9017C6.59779 19.8596 6.50929 19.7468 6.53657 19.6496C6.56469 19.5527 6.69969 19.5072 6.8361 19.5509C6.9711 19.5928 7.05969 19.7047 7.03157 19.8026ZM8.03507 19.917C8.03844 20.0184 7.9236 20.1024 7.78147 20.1043C7.63851 20.1074 7.52291 20.0254 7.52141 19.9258C7.52141 19.8234 7.63363 19.7402 7.77651 19.7378C7.91863 19.7349 8.03507 19.8163 8.03507 19.917ZM9.02075 19.8782C9.03782 19.9771 8.939 20.0786 8.79791 20.1056C8.65916 20.1316 8.53072 20.0706 8.513 19.9726C8.49575 19.8712 8.59644 19.7698 8.73491 19.7435C8.87629 19.7182 9.00275 19.7777 9.02075 19.8782Z"
                                        fill="#161614"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1180_398">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        Continue with Github
                    </button>
                    <button onClick={onSwitch}
                            className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                        <div className="flex items-center w-8 h-8 ml-4">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.9412 5.17315C23.8415 4.66905 23.6166 4.19262 23.2884 3.79207C23.2218 3.70798 23.1521 3.63316 23.0759 3.55727C22.4921 2.9704 21.68 2.63379 20.8478 2.63379H3.15206C2.31061 2.63379 1.51922 2.96191 0.923672 3.5576C0.848297 3.63279 0.778406 3.70835 0.709219 3.79512C0.3825 4.19398 0.158578 4.66976 0.0612187 5.17455C0.0205313 5.37279 0 5.5782 0 5.78599V18.2143C0 18.6467 0.0878438 19.0677 0.261984 19.468C0.412688 19.8234 0.641344 20.1604 0.923484 20.4424C0.994547 20.5131 1.06514 20.5784 1.14052 20.642C1.70461 21.1091 2.41889 21.3662 3.15206 21.3662H20.8478C21.5858 21.3662 22.2993 21.1082 22.8619 20.6368C22.9371 20.576 23.0068 20.5121 23.0765 20.4424C23.3492 20.17 23.566 19.8569 23.7218 19.5117L23.7423 19.4625C23.9132 19.0699 24 18.6502 24 18.2143V5.78599C24 5.58091 23.9802 5.37415 23.9412 5.17315ZM1.63233 4.64548C1.67691 4.58023 1.73381 4.51324 1.80642 4.44007C2.16684 4.07984 2.64483 3.8816 3.15202 3.8816H20.8478C21.3594 3.8816 21.8376 4.08016 22.194 4.44077C22.2555 4.50298 22.3143 4.57202 22.3656 4.64102L22.5009 4.8229L13.0556 13.0549C12.7644 13.3102 12.3895 13.4507 11.9999 13.4507C11.614 13.4507 11.2395 13.3105 10.9448 13.0552L1.50891 4.82524L1.63233 4.64548ZM1.25414 18.324C1.24903 18.2902 1.24786 18.2526 1.24786 18.2143V6.04334L8.5777 12.4376L1.32183 18.7639L1.25414 18.324ZM21.7921 19.8675C21.5085 20.0312 21.1817 20.118 20.8478 20.118H3.15206C2.81798 20.118 2.49141 20.0312 2.20791 19.8675L1.91128 19.6955L9.40828 13.1621L10.2299 13.8768C10.7228 14.3047 11.3512 14.5406 12 14.5406C12.651 14.5406 13.2806 14.3047 13.7731 13.8768L14.5944 13.1618L22.0888 19.6959L21.7921 19.8675ZM22.7518 18.2143C22.7518 18.2519 22.7511 18.2891 22.7464 18.3223L22.6814 18.7663L15.4224 12.441L22.7518 6.04643V18.2143Z"
                                    fill="white"/>
                            </svg>
                        </div>
                        Continue with Email
                    </button>
                </div>
                <div className="text-center text-gray-400">
                    {linkText}
                </div>
            </div>
            </div>
        </div>
    )
}

const LoginForm = ({switchToSelectMethod, switchToRegister, setNotification}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const navigate = useNavigate();
    const {login} = useContextLogin();

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && document.activeElement.tagName === 'BODY') {
                switchToSelectMethod();
            }
            if (e.key === 'Escape' && document.activeElement.tagName !== 'BODY') {
                document.activeElement.blur();
            }
        };

        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [switchToSelectMethod]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setNotification({
                notificationState: 'Warning',
                message: 'Please enter a valid email address'
            });
            return;
        }
        if (!showPasswordInput) {
            setShowPasswordInput(true);
            return;
        }
        try {
            console.log("url: ", `${import.meta.env.VITE_REACT_APP_API_URL}login`)
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}login`, {
                method: 'POST',
                headers: {
                    "ngrok-skip-browser-warning": true,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            console.log(response)

            const data = await response.json();
            if (response.status === 200) {
                login(data.user, data.token);

                setNotification({
                    notificationState: 'Success',
                    message: 'Successfully logged in!'
                });
                navigate('/dashboard');
            } else {
                setNotification({
                    notificationState: 'Error',
                    message: data.message || 'Invalid email or password'
                });
            }
        } catch (error) {
            setNotification({
                notificationState: 'Error',
                message: 'An error occurred. Please try again.'
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="max-w-sm w-full flex flex-col items-center justify-center">
                <img src={PurpleLogo} className="h-14 m-[4%]" alt="PurpleVideo"/>
                <span className="text-4xl font-semibold whitespace-nowrap dark:text-white font-outfit select-none">
                    Login to <span className="pl-0.5 font-thin hover:text-light-purple transition duration-700">
                        Bot
                    </span>Butler
                </span>

                <form className="max-w-sm mx-auto font-outfit flex flex-col items-center pt-[10%]"
                      onSubmit={handleSubmit}>
                    <div className="relative mb-6 flex">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-light-purple">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>

                        </div>
                        <input type="text"
                               value={email}
                               onChange={handleEmailChange}
                               id="input-group-1"
                               className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md" placeholder="name@botbutler.com"
                        />
                    </div>
                        <div className={`relative mb-6 transition-opacity duration-500 ${showPasswordInput ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-light-purple">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>

                            </div>
                                <input type="password"
                                       value={password}
                                       onChange={handlePasswordChange}
                                       id="password"
                                       className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md" placeholder="password"
                                />
                        </div>

                    <div className="flex items-center">
                        <input id="link-checkbox" type="checkbox" value="" className="w-3 h-3 bg-custom-grey border-contrast-box-color rounded dark:focus:ring-blue-600 dark:ring-offset-light-purple focus:ring-2 dark:bg-light-purple dark:border-light-purple"/>
                            <label htmlFor="link-checkbox" className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Keep me sign in</label>
                    </div>
                    <input type="submit" hidden />
                </form>
                <div className="flex flex-col items-center justify-center w-full pt-[4%] pb-[4%] font-thin">
                    <button className="text-xs  text-gray-900 dark:text-gray-300 hover:text-light-purple transition duration-700">
                        Forgot your password?
                    </button>
                    <button className="text-xs text-gray-900 dark:text-gray-300 hover:text-light-purple transition duration-700 group" onClick={switchToRegister}>
                        Don't have an account? <span className="text-light-purple group-hover:text-gray-300 transition duration-700">Sign up</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


const RegisterForm = ({ switchToSelectMethod, switchToLogin, setNotification}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && document.activeElement.tagName === 'BODY') {
                switchToSelectMethod();
            }
            if (e.key === 'Escape' && document.activeElement.tagName !== 'BODY') {
                document.activeElement.blur();
            }
        };

        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [switchToSelectMethod]);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setNotification({
                notificationState: 'Warning',
                message: 'Please enter a valid email address'
            });
            return;
        }
        if (!showPasswordInput) {
            setShowPasswordInput(true);
            return;
        }
        if (!name) {
            setNotification({
                notificationState: 'Warning',
                message: 'Please enter your name'
            });
            return;
        }
        if (password.length < 8) {
            setNotification({
                notificationState: 'Warning',
                message: 'Password must be at least 8 characters long'
            });
            return;
        }
        if (password !== confirmPassword) {
            setNotification({
                notificationState: 'Warning',
                message: 'Passwords do not match'
            });
            return;
        }
        try {
            console.log("url: ", `${import.meta.env.VITE_REACT_APP_API_URL}register`)
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}register`, {
                method: 'POST',
                headers: {
                    "ngrok-skip-browser-warning": true,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name })
            });

            const data = await response.json();
            console.log("data: ", data)

            if (response.status === 201) {
                setNotification({
                    notificationState: 'Success',
                    message: 'Successfully registered!'
                });

                switchToLogin();
            } else {
                console.log("data: ", data)
                setNotification({
                    notificationState: 'Error',
                    message: data.message || 'An error occurred during registration'
                });
            }
        } catch (error) {
            setNotification({
                notificationState: 'Error',
                message: 'An error occurred. Please try again.'
            });
        }
    };



    return (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-full">
            <div className="max-w-sm w-full flex flex-col items-center justify-center">
                <img src={PurpleLogo} className="h-14 m-[4%]" alt="PurpleVideo"/>
                <span className="text-4xl font-semibold whitespace-nowrap dark:text-white font-outfit select-none">
                    Register to <span className="pl-0.5 font-thin hover:text-light-purple transition duration-700">
                        Bot
                    </span>Butler
                </span>
                <form className="max-w-sm mx-auto font-outfit flex flex-col items-center pt-[6%]"
                      onSubmit={handleSubmit}>
                    <div className="relative mb-6 flex">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-4 h-4 text-light-purple">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                            </svg>

                        </div>
                        <input type="text"
                               value={email}
                               onChange={handleEmailChange}
                               id="input-group-1"
                               className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md"
                               placeholder="name@botbutler.com"
                        />
                    </div>
                    <div
                        className={`relative mb-6 transition-opacity duration-500 ${showPasswordInput ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 text-light-purple">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                            </svg>

                        </div>
                        <input type="text"
                               value={name}
                               onChange={handleNameChange}
                               id="name"
                               className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md"
                               placeholder="Your name"
                        />
                    </div>
                    <div
                        className={`relative mb-6 transition-opacity duration-500 ${showPasswordInput ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 text-light-purple">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                            </svg>

                        </div>
                        <input type="password"
                               value={password}
                               onChange={handlePasswordChange}
                               id="password"
                               className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md"
                               placeholder="password"
                        />
                    </div>

                    <div
                        className={`relative mb-6 transition-opacity duration-500 ${showPasswordInput ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 text-light-purple">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                            </svg>

                        </div>
                        <input type="password"
                               value={confirmPassword}
                               onChange={handleConfirmPasswordChange}
                               id="confirmPassword"
                               className="bg-contrast-box-color border text-custom-grey text-sm rounded-lg focus:ring-blue-500 focus:border-light-purple block w-full ps-10 p-2.5 placeholder-custom-grey  border-contrast-box-color placeholder:font-thin placeholder:text-md"
                               placeholder="confirm password"
                        />
                    </div>
                    <div className="flex items-center pt-4">
                        <input id="link-checkbox" type="checkbox" value=""
                               className="w-3 h-3 bg-custom-grey border-contrast-box-color rounded dark:focus:ring-blue-600 dark:ring-offset-light-purple focus:ring-2 dark:bg-light-purple dark:border-light-purple"/>
                        <label htmlFor="link-checkbox"
                               className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Keep me sign
                            in</label>
                    </div>
                    <input type="submit" hidden/>
                </form>
                <div className="flex flex-col items-center justify-center w-full pt-[4%] pb-[4%] font-thin">
                    <button
                        className="text-xs  text-gray-900 dark:text-gray-300 hover:text-light-purple transition duration-700 group"
                        onClick={switchToLogin}>
                        Already have an account? <span
                        className="text-light-purple group-hover:text-gray-300 transition duration-700">Sign in</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

const NotificationManager = ({notification, setNotification}) => {

    useEffect(() => {
        if (notification.notificationState !== 'Hide') {
            const timer = setTimeout(() => {
                setNotification({
                    notificationState: 'Hide',
                    message: notification.message
                });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification, setNotification]);

    const closeNotification = () => {
        setNotification({
            notificationState: 'Hide',
            message: notification.message
        });
    };

    return (
        <div className="flex justify-center">
            <div
                className={`fixed top-0 self-center opacity-100 z-50 transition-transform duration-500 ease-in-out ${notification.notificationState === 'Success' ? 'translate-y-0' : '-translate-y-full'}`}>
                <div id="toast-success"
                     className="flex self-center items-center w-full max-w-xs p-2 mb-4 bg-white rounded-lg shadow text-custom-grey dark:bg-box-color space-x-3"
                     role="alert">
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="sr-only">Check icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal font-outfit">{notification.message}</div>
                    <button type="button"
                            className="ms-auto -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-600 inline-flex items-center justify-center h-6 w-6 text-custom-grey hover:text-light-purple bg-box-color "
                            data-dismiss-target="#toast-success" aria-label="Close" onClick={closeNotification}>
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`fixed top-0 self-center opacity-100 z-51 transition-transform duration-500 ease-in-out ${notification.notificationState === 'Warning' ? 'translate-y-0' : '-translate-y-full'}`}>
                <div id="toast-warning"
                     className="flex self-center items-center w-full max-w-xs p-2 mb-4 bg-white rounded-lg shadow text-custom-grey dark:bg-box-color space-x-3"
                     role={"alert"}>
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                        </svg>
                        <span className="sr-only">Warning icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal font-outfit">{notification.message}</div>
                    <button type="button"
                            className="ms-auto -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-600 inline-flex items-center justify-center h-6 w-6 text-custom-grey hover:text-light-purple bg-box-color "
                            data-dismiss-target="#toast-warning" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                className={`fixed top-0 self-center opacity-100 z-52 transition-transform duration-500 ease-in-out ${notification.notificationState === 'Error' ? 'translate-y-0' : '-translate-y-full'}`}>
                <div id="toast-danger"
                     className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 space-x-3"
                     role="alert">
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">{notification.message}</div>
                    <button type="button"
                            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            data-dismiss-target="#toast-danger" aria-label="Close" onClick={closeNotification}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

const AuthenticationBox = () => {
    const location = useLocation();
    const {from} = location.state || {from: 'login'};
    const [currentView, setCurrentView] = useState('selectMethod');
    const [currentAuthType, setCurrentAuthType] = useState(from);
    const [transitionState, setTransitionState] = useState('enter');
    const [notification, setNotification] = useState({
        notificationState: 'Hide',
        message: ''
    });
    const { login } = useContextLogin();
    const navigate = useNavigate();


    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            validateTokenAndLogin(token);
        }
    }, [token]);

    const validateTokenAndLogin = async (token) => {
        try {
            const response = await fetch('https://butbutlerapi.azurewebsites.net/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("data: ", data)
                login(data.user, token);

                setNotification({
                    notificationState: 'Success',
                    message: 'Successfully logged in!'
                });
                navigate('/dashboard');
            } else {
                setNotification({
                    notificationState: 'Error',
                    message: 'Invalid or expired token'
                });
            }
        } catch (error) {
            console.error('Error validating token:', error);
            setNotification({
                notificationState: 'Error',
                message: 'An error occurred while validating the token'
            });
        }
    };

    const linkEmailAction = () => {
        if (currentAuthType === 'login') {
            switchToLoginForm();
        } else {
            switchToRegisterForm();
        }
    };

    const switchToLoginForm = () => {
        setTransitionState('exit');
        setTimeout(() => {
            setCurrentView('login');
            setTransitionState('enter');
        }, 150);
    };

    const getTransitionClasses = (view) => {
        return currentView === view && transitionState === 'enter'
            ? 'transition duration-1000 scale-100 opacity-100'
            : 'transition duration-1000 scale-95 opacity-0';
    };

    const switchToRegisterForm = () => {
        setTransitionState('exit');
        setTimeout(() => {
            setCurrentView('register');
            setTransitionState('enter');
        }, 150);
    }
    const switchToSelectMethod = () => {
        setTransitionState('exit');
        setTimeout(() => {
            setCurrentView('selectMethod');
            setTransitionState('enter');
        }, 150);
    }

    return (
        <div
            className="flex flex-col h-screen sm:bg-transparent bg-box-color transition-all text-white ease-in-out duration-700">
            <NotificationManager notification={notification} setNotification={setNotification}/>
            <div className="p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse select-none">
                    <img src={WhiteLogo} className="h-6" alt={"PurpleVideo"}/>
                    <span className="text-md font-semibold whitespace-nowrap">
                        <span className="font-thin">Bot</span><span className="font-medium">Butler</span>
                        </span>
                </a>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="flex justify-center items-center bg-box-color p-[2%} h-2/3 rounded-lg border bg-opacity-95 sm:border-contrast-box-color transition duration-700 border-box-color  font-outfit w-2/3">
                    <div className={`transform transition-all duration-700 ${getTransitionClasses('selectMethod')}`}>
                        {currentView === 'selectMethod' && <SelectMethod onSwitch={linkEmailAction} currentAuthType={currentAuthType} setCurrentAuthType={setCurrentAuthType} />}
                    </div>
                    <div className={`transform transition-all duration-300 ${getTransitionClasses('login')}`}>
                        {currentView === 'login' && <LoginForm switchToRegister={switchToRegisterForm} switchToSelectMethod={switchToSelectMethod} setNotification={setNotification}/>}
                    </div>
                    <div className={`transform transition-all duration-300 ${getTransitionClasses('register')}`}>
                        {currentView === 'register' && <RegisterForm switchToLogin={switchToLoginForm}  switchToSelectMethod={switchToSelectMethod} setNotification={setNotification}/>}
                    </div>
                </div>
            </div>
            <div className="mt-auto p-[2%] text-gray-400 text-xs text-center font-outfit font-medium">
                © 2023 BitBuilder. All Rights Reserved.
            </div>
        </div>
    )
}

export default function AuthPage() {
    return (
        <div className="h-full w-full relative">
                <div className="blob"></div>
            <div className="blob-left"></div>
            <div className="relative h-full w-full z-10">
            <AuthenticationBox/>
            </div>
        </div>
    );
}
