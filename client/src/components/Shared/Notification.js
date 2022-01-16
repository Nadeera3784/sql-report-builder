import React from 'react';

const Notification = (props) => {
    return (
        <div className="flex justify-between items-center rounded-lg sm:m-4 p-3 sm:py-5 sm:px-8 shadow-sm bg-indigo-500">
            <div className="inline-flex items-center sm:text-lg text-indigo-100">
                <div className="flex-none hidden sm:flex items-center justify-center relative w-8 h-8 mr-6">
                    <svg className="animate-spin h-6 w-6 text-white inline-block " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default Notification;