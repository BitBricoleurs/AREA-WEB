import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl text-black max-w-4xl w-full m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Azure Authentication</h2>
                    <button
                        className="text-black bg-transparent hover:bg-gray-200 rounded-full p-2"
                        onClick={onClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
