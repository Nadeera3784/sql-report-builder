import React, {useState, useEffect, useContext} from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import HttpClient      from '../../services/Http';
import {AppContext}    from  '../../store/AppContext';
import AppConstants    from '../../constants/AppConstants';
import Notification    from '../Shared/Notification';

function Analytics() {

    const [loading, setLoading] = useState(false);
    const [initialize, setInitialize] = useState(true);
    const {state , dispatch} = useContext(AppContext);

    useEffect(() => {
        if(initialize  && state.analytics.length === undefined){
            setLoading(true);
            HttpClient.get('/app/analytics').then(function (response) {
                dispatch({type: AppConstants.ADD_ANALYTICS, payload: response.data.data});
                setLoading(false);
                setInitialize(false);
            }).catch(function (error) {
                setLoading(true);
            });
        }
    }, []);

    const onSearchInputChange = function(event){
        dispatch({type: AppConstants.SEARCH_ANALYTICS, payload: event.target.value});
    }

    return (
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Helmet>
                <title>Report | Analytics Management</title>
            </Helmet>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
                <h2 className="text-2xl font-bold py-3">
                    Analytics
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Manage analytics</span>
                </h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
                  <input onChange={(e) => onSearchInputChange(e)} type="text" className="w-full block border border-gray-200 rounded px-3 py-2 leading-5 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" id="tk-form-layouts-search" placeholder="Search.." />
                </div>
            </div>
            <div className="mt-6">
               {loading  &&  <Notification title="Hang in there, We are generating your analytics."/>}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
                {state.analytics && state.analytics.length !== undefined && state.analytics.map((item, index) => (
                    <div key={index} className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                        <div className="p-5 lg:p-6 flex-grow w-full flex justify-between items-center">
                            <dl>
                                <dt className="text-2xl font-semibold">
                                    {item.Count}
                                </dt>
                                <dd className="uppercase font-medium text-sm text-gray-500 tracking-wider">
                                {item.Dataset}
                                </dd>
                            </dl>
                            <div className="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full">
                            <Link to={`analytics-details/${item.Id}`} className="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-indigo-600 hover:text-indigo-500">
                                    <svg className="hi-solid hi-arrow-right inline-block w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    )) 
                }
                </div>
            </div>
        </main>
    )
}

export default Analytics;