import React, { useState} from 'react';
import { ToastContainer } from 'react-toastify';

import Footer        from '../Footer/Footer';
import Sidebar       from '../Sidebar/Sidebar';
import Header        from '../Header/Header';

function Layout(props) {

    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);


    const onClickDesktopSidebarToggle = function (e) {
        setDesktopSidebarOpen(!desktopSidebarOpen);
        setMobileSidebarOpen(!desktopSidebarOpen);
    }

    const onClickMobileSidebarToggle = function (e) {
        setMobileSidebarOpen(!mobileSidebarOpen);
        setDesktopSidebarOpen(!mobileSidebarOpen);
    }

    return (
            <div className={`flex flex-col mx-auto w-full min-h-screen bg-gray-100 ${(desktopSidebarOpen || mobileSidebarOpen) ? (desktopSidebarOpen ? "lg:pl-64" : "pl-64") : ""}`}>
                <Sidebar onClickMobileSidebarToggle={onClickMobileSidebarToggle}
                    desktopSidebarOpen={desktopSidebarOpen}
                    mobileSidebarOpen={mobileSidebarOpen} />
                <Header
                    desktopSidebarOpen={desktopSidebarOpen}
                    mobileSidebarOpen={mobileSidebarOpen}
                    onClickDesktopSidebarToggle={onClickDesktopSidebarToggle}
                    onClickMobileSidebarToggle={onClickMobileSidebarToggle} />
                <div className="min-h-screen bg-gray-100 text-gray-900 mt-16">
                    <ToastContainer />
                    {props.children}
                </div>
                <Footer />
            </div>
     
    );
}

export default Layout;
