import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';

import HttpClient from '../../services/Http';

function Report(props) {
    
    const [dataSet, setDataSet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [notificationEmail, setNotificationEmail] = useState('');
    const [errorBag, setErrorBag] = useState({});


    const onClickSubmit =  function() {
  
    }


    return (
        <main className="w-full mx-auto  px-4 sm:px-6 lg:px-8 pt-4">
            <Helmet>
                <title>Report | Report Management</title>
            </Helmet>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
                <h2 className="text-2xl font-bold py-3">
                    Report
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Schedule Report</span>
                </h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
                    <button onClick={() => props.history.push('/')} className="inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                        <svg className="hi-solid hi-arrow-narrow-left inline-block w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col bg-white border-gray-200 -mx-4 sm:mx-0 sm:rounded border-t border-b sm:border overflow-hidden">
                <div className="px-4 lg:pl-6 lg:pr-4 flex items-center justify-between border-b border-gray-200">
                    <div className="flex-grow py-4">
                       Schedule report - {dataSet && <> {dataSet.name} </> }
                    </div>
                </div>
                <div className="px-4 m-8">
                    <div className="space-y-6">
       
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Report;