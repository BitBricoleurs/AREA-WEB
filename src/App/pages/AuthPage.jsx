import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
                <div className="space-y-4 pt-[6%] pb-[5%]">
                <button className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_291_1581)">
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
                    Continue with Google
                </button>
                <button className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_291_1590)">
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
                    Continue with Apple
                </button>
                <button className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.25 12.75H12.75V20.25H20.25V12.75Z" fill="#FEBA08"/>
                            <path d="M11.25 12.75H3.75V20.25H11.25V12.75Z" fill="#05A6F0"/>
                            <path d="M20.25 3.75H12.75V11.25H20.25V3.75Z" fill="#80BC06"/>
                            <path d="M11.25 3.75H3.75V11.25H11.25V3.75Z" fill="#F25325"/>
                        </svg>
                    </div>
                    Continue with Microsoft
                </button>
                <button onClick={onSwitch} className="flex items-center justify-center w-full px-3 py-1 border border-contrast-box-color rounded-md hover:bg-light-purple hover:text-upside-bar transition duration-700">
                    <div className="flex items-center w-8 h-8 ml-4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.9412 5.17315C23.8415 4.66905 23.6166 4.19262 23.2884 3.79207C23.2218 3.70798 23.1521 3.63316 23.0759 3.55727C22.4921 2.9704 21.68 2.63379 20.8478 2.63379H3.15206C2.31061 2.63379 1.51922 2.96191 0.923672 3.5576C0.848297 3.63279 0.778406 3.70835 0.709219 3.79512C0.3825 4.19398 0.158578 4.66976 0.0612187 5.17455C0.0205313 5.37279 0 5.5782 0 5.78599V18.2143C0 18.6467 0.0878438 19.0677 0.261984 19.468C0.412688 19.8234 0.641344 20.1604 0.923484 20.4424C0.994547 20.5131 1.06514 20.5784 1.14052 20.642C1.70461 21.1091 2.41889 21.3662 3.15206 21.3662H20.8478C21.5858 21.3662 22.2993 21.1082 22.8619 20.6368C22.9371 20.576 23.0068 20.5121 23.0765 20.4424C23.3492 20.17 23.566 19.8569 23.7218 19.5117L23.7423 19.4625C23.9132 19.0699 24 18.6502 24 18.2143V5.78599C24 5.58091 23.9802 5.37415 23.9412 5.17315ZM1.63233 4.64548C1.67691 4.58023 1.73381 4.51324 1.80642 4.44007C2.16684 4.07984 2.64483 3.8816 3.15202 3.8816H20.8478C21.3594 3.8816 21.8376 4.08016 22.194 4.44077C22.2555 4.50298 22.3143 4.57202 22.3656 4.64102L22.5009 4.8229L13.0556 13.0549C12.7644 13.3102 12.3895 13.4507 11.9999 13.4507C11.614 13.4507 11.2395 13.3105 10.9448 13.0552L1.50891 4.82524L1.63233 4.64548ZM1.25414 18.324C1.24903 18.2902 1.24786 18.2526 1.24786 18.2143V6.04334L8.5777 12.4376L1.32183 18.7639L1.25414 18.324ZM21.7921 19.8675C21.5085 20.0312 21.1817 20.118 20.8478 20.118H3.15206C2.81798 20.118 2.49141 20.0312 2.20791 19.8675L1.91128 19.6955L9.40828 13.1621L10.2299 13.8768C10.7228 14.3047 11.3512 14.5406 12 14.5406C12.651 14.5406 13.2806 14.3047 13.7731 13.8768L14.5944 13.1618L22.0888 19.6959L21.7921 19.8675ZM22.7518 18.2143C22.7518 18.2519 22.7511 18.2891 22.7464 18.3223L22.6814 18.7663L15.4224 12.441L22.7518 6.04643V18.2143Z" fill="white"/>
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

const LoginForm = ({ switchToSelectMethod, switchToRegister, setNotification }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const navigate = useNavigate();
    const { login } = useContextLogin();

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
                    "ngrok-skip-browser-warning": "4545",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
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

                <form className="max-w-sm mx-auto font-outfit flex flex-col items-center pt-[10%]" onSubmit={handleSubmit}>
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
