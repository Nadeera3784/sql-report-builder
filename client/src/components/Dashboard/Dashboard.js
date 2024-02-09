import React, {useEffect, useState, useMemo, useContext} from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

import Table, {DateCell, IndexCell} from "./Table";
import HttpClient from '../../services/Http';
import { classNames } from '../Shared/Utils';
import Notification from '../Shared/Notification';
import TableLoader from '../Shared/TableLoader';
import Cookies from '../Shared/Cookies';
const AppConstants    = require('../../constants/AppConstants');
const {AppContext}    = require('../../store/AppContext');

function Dashboard() {

    const [customReports, setCustomReports] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [selection, setSelection] = useState([]);
    const [componentUdpate , SetComponentUdpate] = useState(0); // eslint-disable-line no-unused-vars
    const {state} = useContext(AppContext);

    const initCustomReports =  function() {
        //const user_id = state.auth_user.user_id;
        HttpClient.get('/app/custom-reports')
        .then((response) => {
            setCustomReports(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
        })
    } 

    useEffect(() => {
        initCustomReports();
    }, [componentUdpate]);


    const  onClickCreateCustomReport = function(id){
      setGenerating(true);
      HttpClient.get('/app/datasets/custom-report/'+id)
      .then((response) => {
        setGenerating(false);
        const fileName = 'report_'+Date.now()+'.csv';
        saveAs(AppConstants.REPORT_URL, fileName);
      })
      .catch((error) => {
        setGenerating(false);
      })
    }
    
    

    function ManageCell({ value }) {
      return(
       <span>
          <button type="button" onClick={() => onClickCreateCustomReport(value)} className={classNames("inline-flex mr-3 justify-center items-center space-x-2 rounded border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm border-gray-300 bg-white text-gray-500 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none")}>

          {generating &&
          
              <svg className={classNames("animate-spin h-5 w-5 text-green inline-block align-middle mr-3")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className={classNames("opacity-25")} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          }

              Generate
          </button>
          <Link to={`/create-schedule/${value}`} className={classNames("inline-flex mr-3 justify-center items-center space-x-2 rounded border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm border-gray-300 bg-white text-gray-500 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none")}>
              Schedule
          </Link>
        </span>
      );
    };

    const onClickBulkDelete =  function() {
      let ids = [];
      if(selection.length === 0){
        toast.error('Check at least one checkbox', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
          for (let index = 0; index < selection.length; index++) {
            ids.push(selection[index]._id);
          }
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-64 m-auto" role="document">
                  <div className="w-full h-full text-center">
                      <div className="flex h-full flex-col justify-between">
                          <svg  width="40" height="40" className="hi-solid hi-shield-exclamation  mt-4 w-12 h-12 m-auto text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd"/></svg>
                          <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">Report Deletion</p>
                          <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">Are you sure you want to delete this?</p>
                          <div className="flex items-center justify-between gap-4 w-full mt-8">
                            <button 
                              type="button" 
                              onClick={() => {
                                HttpClient.post('/app/delete-custom-reports', {custom_report_ids : ids})
                                  .then(function (response) {
                                    setLoading(false);
                                    initCustomReports();
                                    toast.success('Reports have been deleted', {
                                      position: "top-center",
                                      autoClose: 2000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                    });
                                    onClose();
                                  })
                                  .catch(function (error) {
                                    setLoading(false);
                                  });
                              }}
                              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  Delete
                              </button>
                              <button
                              type="button"
                              onClick={() => onClose()}
                              className="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  Cancel
                              </button>
                          </div>
                      </div>
                  </div>
                </div>
              );
            }
          });
      }

    }

    const columns = useMemo(
        () => [
          {
            Header: "No",
            accessor: 'data',
            Cell: IndexCell
          },
          {
            Header: "Name", 
            accessor: "name"
          },
          {
            Header: "Date",
            accessor: "created_at",
            Cell: DateCell
          },
          {
            Header: "Manage",
            accessor: "_id",
            Cell: ManageCell
          },
          
        ],
        []
    );

    return (
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
                <h2 className="text-2xl font-bold py-3">
                    Dashboard
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Manage dashboard</span>
                </h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
                    <Link to="/builder" className="inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-indigo-500 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                        <svg className="hi-outline hi-plus-circle inline-block w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>                       
                         <span>New Report</span>
                    </Link>
                </div>
            </div>
            <div className="mt-6">

            {generating &&   <Notification title="Hang in there, We are generating your report."/>}

            {loading && <TableLoader/>}
            {customReports && <>
                <Table 
                columns={columns} 
                data={customReports}        
                setSelection={setSelection}
                selection={selection}
                onClickBulkDelete={onClickBulkDelete}
            />
            </>
            }
            </div>
        </main>
    )
}

export default Dashboard;