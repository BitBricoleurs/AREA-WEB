import React, {useEffect} from "react";
import {useNotification} from "../context/notificationContext.jsx";

const NotificationManager = () => {

    const {notification, setNotification} = useNotification();

    useEffect(() => {
        if (notification.notificationState !== 'Hide') {
            console.log("NotificationManager.jsx notification: ", notification);
            const timer = setTimeout(() => {
                setNotification({
                    notificationState: 'Hide',
                    message: notification.message
                });
            }, 3000);
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
                className={`fixed top-0 self-center opacity-100 z-50 transition-transform duration-700 ease-in-out ${notification.notificationState === 'Success' ? 'translate-y-0' : '-translate-y-full'}`}>
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
                className={`fixed top-0 self-center opacity-100 z-50 transition-transform duration-700 ease-in-out ${notification.notificationState === 'Warning' ? 'translate-y-0' : '-translate-y-full'}`}>
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
                className={`fixed top-0 self-center opacity-100 z-50 transition-transform duration-700 ease-in-out ${notification.notificationState === 'Error' ? 'translate-y-0' : '-translate-y-full'}`}>
                <div id="toast-danger"
                     className="flex self-center items-center w-full max-w-xs p-2 mb-4 bg-white rounded-lg shadow text-custom-grey dark:bg-box-color space-x-3"
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
        </div>
    );
}

export default NotificationManager;