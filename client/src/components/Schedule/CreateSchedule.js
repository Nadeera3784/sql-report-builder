import React, {useEffect, useState, useContext} from 'react';
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import HttpClient from '../../services/Http';
import {AppContext}  from '../../store/AppContext';

function CreateSchedule(props) {
    
    const [dataSet, setDataSet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [notificationEmail, setNotificationEmail] = useState('');
    const [errorBag, setErrorBag] = useState({});
    const {state} = useContext(AppContext);

    useEffect(() => {
        const id = props.match.params.id;
        HttpClient.get('/app/custom-reports/'+id).then(function (response) {
            setDataSet(response.data.data);
        }).catch(function (error) {
            toast.error('Something went wrong, please try again later.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }, []);


    const validate = function() {
        let errors = {};
        setErrorBag({});
        if(startDate === ''){
            errors.startDate = 'Date is required';  
        }
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(notificationEmail !== '' && !regexp.test(notificationEmail)){
            errors.notificationEmail = 'Invalid email address';  
        }
        if(Object.keys(errors).length > 0){
            setErrorBag(errors);
            return false;
        }
        return true;
    };


    const onClickSubmit =  function() {
        const isValid = validate();
        if(isValid){
            const payload = {
                date : startDate,
                email : notificationEmail,
                custom_report_id : dataSet._id
            };
            HttpClient.post('/app/schedule-reports', payload).then(async function (response) {
                setNotificationEmail('');
                toast.success('Schedule have been added successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch(function (error) {
                toast.error('Something went wrong, please try again later.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
          });
        }
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
                    <button onClick={() => props.history.push('/dashboard')} className="inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
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
                        <div className="space-y-1">
                            <label className="font-medium" htmlFor="date">Date:</label>
                             <DatePicker
                            className={`w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${errorBag.startDate ?'border-red-700' : 'border-gray-200'}`}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            showTimeSelect
                            timeIntervals={3}
                            timeCaption="time"
                            dateFormat="yyyy-M-d h:mm aa"
                            />
                           {errorBag.hasOwnProperty('startDate') && <p className="text-md text-red-700">{errorBag.startDate}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="font-medium" htmlFor="notificationEmail">Notification email(optional):</label>
                            <input 
                             className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 border-gray-200"
                             type="email" 
                             name="notificationEmail" 
                             id="notificationEmail" 
                             placeholder="Enter email" 
                             value={notificationEmail}
                             onChange={e => setNotificationEmail(e.target.value)}
                            />
                             {errorBag.hasOwnProperty('notificationEmail') && <p className="text-md text-red-700">{errorBag.notificationEmail}</p>}
                        </div>
                        <button onClick={onClickSubmit} type="submit" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-indigo-500 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-500 active:border-indigo-500">
                         {loading &&
                            <svg className="animate-spin mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          }
                          <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                           Create
                      </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreateSchedule;