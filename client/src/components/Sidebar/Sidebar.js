import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";


function Sidebar(props) {

    const location = useLocation();

    const [currentLocation, setCurrentLocation] = useState('/');

    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, [location.pathname]);

    return (
        <nav className={`flex flex-col fixed top-0 left-0 bottom-0 w-full lg:w-64 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-500 ease-out ${(props.desktopSidebarOpen || props.mobileSidebarOpen) ? "translate-x-0" : (props.desktopSidebarOpen ? "lg:-translate-x-full" : "-translate-x-full")}`} aria-label="Main Sidebar Navigation">
            <div className="h-16 flex-none flex items-center justify-between lg:justify-center px-4 w-full">

                <Link to="/" className="inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-600 hover:text-gray-500">
                    
                    <svg className="hi-solid hi-cube-transparent inline-block w-6 h-6 text-indigo-400" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.25" d="M14.684 25.388C20.3284 25.388 24.904 20.8123 24.904 15.168C24.904 9.52365 20.3284 4.948 14.684 4.948C9.03965 4.948 4.464 9.52365 4.464 15.168C4.464 20.8123 9.03965 25.388 14.684 25.388Z" fill="#5E81F4"/>
                    <path opacity="0.5" d="M6.292 13.272C3.74884 13.2711 1.45629 11.7393 0.482133 9.39014C-0.492025 7.04096 0.0437846 4.33633 1.84 2.53598C4.29692 0.080291 8.27908 0.080291 10.736 2.53598C11.9163 3.71535 12.5794 5.31546 12.5794 6.98398C12.5794 8.6525 11.9163 10.2526 10.736 11.432C9.56032 12.6149 7.95978 13.2776 6.292 13.272Z" fill="#5E81F4"/>
                    <path opacity="0.5" d="M23.308 29.8959C20.3057 29.897 17.7208 27.7767 17.1348 24.8321C16.5488 21.8875 18.1248 18.9391 20.8988 17.7905C23.6728 16.642 26.8717 17.6133 28.5388 20.1104C30.2058 22.6074 29.8764 25.9343 27.752 28.0559C26.5753 29.2373 24.9754 29.8997 23.308 29.8959Z" fill="#5E81F4"/>
                    <path d="M6.46 29.828C3.91539 29.8303 1.61987 28.2997 0.643664 25.9498C-0.332546 23.5999 0.202755 20.8934 2 19.092C2.27475 18.8241 2.57332 18.5818 2.892 18.368L3.2 18.172C3.416 18.044 3.64 17.928 3.876 17.816C3.996 17.764 4.116 17.708 4.248 17.66C4.49358 17.5703 4.74479 17.4968 5 17.44L5.16 17.396C5.18744 17.3861 5.2155 17.3781 5.244 17.372L6.668 17.268C6.852 17.268 7.068 17.304 7.264 17.332H7.308H7.496H7.556H7.616H8C10.4617 17.3091 12.8115 16.3006 14.524 14.532C16.2459 12.7768 17.1888 10.4023 17.14 7.94398V7.87598V7.80798C17.1259 7.73141 17.1178 7.65383 17.116 7.57598V7.38398L17.064 7.19998C17.064 7.08798 17.036 6.96798 17.032 6.85198L17.128 5.53198V5.49998V5.47598C17.128 5.44398 17.188 5.26798 17.188 5.26798C17.2488 4.9968 17.3263 4.72962 17.42 4.46798C17.464 4.34798 17.52 4.22798 17.576 4.10798C17.681 3.87112 17.8013 3.6413 17.936 3.41998V3.38398C17.992 3.29198 18.044 3.19998 18.108 3.11198C18.3181 2.7953 18.5579 2.49931 18.824 2.22798C21.285 -0.237417 25.2786 -0.240999 27.744 2.21998C30.2094 4.68096 30.213 8.67458 27.752 11.14C27.4788 11.4056 27.1815 11.6453 26.864 11.856C26.768 11.924 26.684 11.972 26.6 12.024L26.552 12.052C26.32 12.188 26.096 12.308 25.88 12.408C25.752 12.464 25.636 12.52 25.516 12.564C25.2636 12.6556 25.0057 12.7318 24.744 12.792C24.6886 12.8037 24.6339 12.8184 24.58 12.836L24.48 12.864L23.084 12.96C22.908 12.96 22.72 12.928 22.524 12.904H22.436H22.256H22.14H22.076H21.764C16.6622 12.9786 12.5777 17.1579 12.62 22.26V22.328V22.4C12.6308 22.4702 12.6375 22.541 12.64 22.612C12.64 22.688 12.64 22.76 12.66 22.832C12.68 22.904 12.66 22.968 12.684 23.04C12.698 23.1434 12.706 23.2476 12.708 23.352L12.608 24.724C12.6005 24.7604 12.5912 24.7965 12.58 24.832L12.544 24.956C12.4868 25.2276 12.4106 25.495 12.316 25.756C12.272 25.876 12.212 26 12.156 26.124C12.0543 26.355 11.9408 26.5806 11.816 26.8C11.752 26.912 11.692 27.012 11.624 27.108C11.4121 27.428 11.1696 27.7267 10.9 28C9.72428 29.1804 8.12605 29.8427 6.46 29.84V29.828Z" fill="#5E81F4"/>
                    </svg>


                    <span>O2O Report</span>
                </Link>

                <div className="lg:hidden">
                    <button type="button" onClick={(event) => props.onClickMobileSidebarToggle(event)} className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-red-600 hover:text-red-400 focus:ring focus:ring-red-500 focus:ring-opacity-50 active:text-red-600">
                        <svg className="hi-solid hi-x inline-block w-4 h-4 -mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>

            </div>
            <div className="overflow-y-auto">
                <div className="p-4 w-full">
                    <nav className="space-y-1">
                        <Link to="/dashboard" className={`flex items-center space-x-3 px-3 font-medium rounded text-white ${currentLocation === "/dashboard" || currentLocation === "/builder"  ? "bg-indigo-500" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50"}`}>
                            <span className="flex-none flex items-center opacity-50">
                                <svg className="hi-outline hi-view-grid inline-block w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            </span>
                            <span className="py-2 flex-grow">Dashboard</span>
                        </Link>
                        <Link to="/analytics" className={`flex items-center space-x-3 px-3 font-medium rounded text-white ${currentLocation === "/analytics" ? "bg-indigo-500" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50"}`}>
                            <span className="flex-none flex items-center opacity-50">
                            <svg className="hi-outline hi-chart-square-bar inline-block w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                            </span>
                            <span className="py-2 flex-grow">Analytics</span>
                        </Link> 
                        <Link to="/schedule" className={`flex items-center space-x-3 px-3 font-medium rounded text-white ${currentLocation === "/schedule" ? "bg-indigo-500" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50"}`}>
                            <span className="flex-none flex items-center opacity-50">
                                <svg className="hi-outline hi-clipboard-list inline-block w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            </span>
                            <span className="py-2 flex-grow">Schedule</span>
                        </Link>                        
                        {/*   <Link to="/subscription" className={`flex items-center space-x-3 px-3 font-medium rounded text-white ${currentLocation === "/subscription" ? "bg-indigo-500" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50"}`}>
                            <span className="flex-none flex items-center opacity-50">
                            <svg className="hi-solid hi-collection inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>                            </span>
                            <span className="py-2 flex-grow">Subscription</span>
                        </Link> */}


                       <a href="#" className="flex items-center space-x-3 px-3 font-medium rounded text-white text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50">
                            <span className="flex-none flex items-center opacity-50">
                              <svg className="hi-outline hi-clipboard-list inline-block w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                            </span>
                            <span className="py-2 flex-grow">Engagements</span>
                        </a> 


                        <a href="#" className="flex items-center space-x-3 px-3 font-medium rounded text-white text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50">
                            <span className="flex-none flex items-center opacity-50">
                              <svg class="hi-outline hi-presentation-chart-line inline-block w-5 h-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
                            </span>
                            <span className="py-2 flex-grow">Activity</span>
                        </a> 

                    </nav>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;