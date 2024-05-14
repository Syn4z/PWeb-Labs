import React from 'react';

const Popup = ({ message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-search-bar-bg2 text-white rounded-lg p-5 shadow-lg">
                <h2 className="text-center text-2xl font-bold mb-4">{message}</h2>
                <div className="flex justify-center">
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;