import React, { useState} from 'react';
import {Link} from "react-router-dom";

function Header(props) {

    const [userDropdownOpen , setUserDropdownOpen ] = useState(false);

    const onClickDropDownToggle =  function(event){
       setUserDropdownOpen(!userDropdownOpen);
    }
    

    return (
        <header className="flex flex-none items-center h-16 bg-white shadow-sm fixed top-0 right-0 left-0 z-30 lg:pl-64">
            <div className="flex justify-between max-w-10xl mx-auto px-4 lg:px-8 w-full">
                <div className="flex items-center space-x-2">
                    <div className="hidden lg:block">
                        <button type="button"  onClick={(event) => props.onClickDesktopSidebarToggle(event)} className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                            <svg className="hi-solid hi-menu-alt-1 inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                    <div className="lg:hidden">
                        <button type="button"  onClick={(event) => props.onClickMobileSidebarToggle(event)} className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                            <svg className="hi-solid hi-menu-alt-1 inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative inline-block">
                        <button
                           onClick={(event) => onClickDropDownToggle(event)}
                            type="button"
                            className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                            id="tk-dropdown-layouts-user"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            <span>John doe</span>
                            <svg className="hi-solid hi-chevron-down inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <div role="menu" aria-labelledby="tk-dropdown-layouts-user" onMouseLeave={() => setUserDropdownOpen(false)} className={`absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded z-1  ${userDropdownOpen ? "" : "hidden"}`}>
                            <div className="bg-white ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100">
                                <div className="p-2 space-y-1">
                                    <Link role="menuitem" to="/settings" className="flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                        <svg className="hi-solid hi-cog inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                        <span>Settings</span>
                                    </Link>
                                </div>
                                <div className="p-2 space-y-1">
                                    <button  type="button" role="menuitem" className="w-full text-left flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700">
                                        <svg className="hi-solid hi-lock-closed inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;