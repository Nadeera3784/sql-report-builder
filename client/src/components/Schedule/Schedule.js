import React, {useEffect, useState, useMemo} from 'react';
import { Helmet } from "react-helmet";
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import Table, {DateCell, IndexCell, ScheduleDateCell} from "./Table";
import HttpClient from '../../services/Http';
import TableLoader from '../Shared/TableLoader';

function Dashboard() {

    const [scheduleReports, setScheduleReports] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState([]);
    const [componentUdpate , SetComponentUdpate] = useState(0); // eslint-disable-line no-unused-vars

    const initScheduleReports =  function() {
       // const user_id = state.auth_user.user_id;
        HttpClient.get('/app/schedule-reports')
        .then((response) => {
            setScheduleReports(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
          setLoading(true);
        })
    } 
  
    useEffect(() => {
        initScheduleReports();
    }, [componentUdpate]);


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
                                  HttpClient.post('/app/delete-schedule-reports', {schedules_ids : ids})
                                    .then(function (response) {
                                      setLoading(false);
                                      initScheduleReports();
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
            accessor: "custom_report_id.name",
          }, 
          {
            Header: "Schedule Date",
            accessor: "date",
            //Filter: DateRangeColumnFilter,
            Cell: ScheduleDateCell
          }, 
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Date",
            accessor: "created_at",
            Cell: DateCell
          },          
        ],
        []
    );

    return (
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Helmet>
                <title>Report | Report Management</title>
            </Helmet>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:border-b-2 sm:border-gray-200 mb-4 lg:mb-8">
                <h2 className="text-2xl font-bold py-3">
                    Report
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Manage schedule</span>
                </h2>
            </div>


                <div className="mt-6">
     
                {loading && <TableLoader/>}
                {scheduleReports && <>
                    <Table 
                    columns={columns} 
                    data={scheduleReports}        
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