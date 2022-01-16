import React, {useEffect, useState, useMemo, useRef, useContext} from 'react';
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useFormik } from 'formik';
import Fade from 'react-reveal/Fade';


import HttpClient    from '../../services/Http';
import DataSetLoader from '../Shared/DataSetLoader';
import Drawer        from "./Drawer";
import Table         from "./Table";
import AppConstants  from '../../constants/AppConstants';
import {getUniqueArray} from '../Shared/Utils';
import {AppContext}  from '../../store/AppContext';

function Builder(props) {
    const initialState = [];
    const [dataSets, setDataSets] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectEvent, setSelectEvent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [directGenerating, setDirectGenerating] = useState(false);
    const [linkGenerating, setLinkGenerating] = useState(false);
    const [selectDataset, setSelectDataset] = useState(null);
    const [attributeElementData, SetAttributeElementData] = useState(initialState);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [nativeDatatableColumns, setNative4DatatableColumns] = useState([]);
    const [filteredDatatableColumns, setFiltered4DatatableColumns] = useState(null);
    const [filteredDatatableData, setFiltered4DatatableData] = useState(null);
    const [availability, setAvailability] = useState(false);
    const [initialize, setInitialize] = useState(true);
    const checkRef = useRef(false);
    const {state, dispatch} = useContext(AppContext);

    useEffect(() => {
        if(initialize  && state.datasets.length == undefined){
            setLoading(true);
            const organization_id = state.auth_user.company_id;
            HttpClient.get('/app/datasets').then(function (response) {
                dispatch({type: AppConstants.ADD_DATASETS, payload: response.data.data.datasets});
                dispatch({type: AppConstants.ADD_EVENTS, payload: response.data.data.events});
                setLoading(false);
                setInitialize(false);
            }).catch(function (error) {
                setLoading(true);
            });
        }
    }, []);

    const onClickDataset = function(item){
        const {_id} = item;
        HttpClient.get('/app/datasets/'+_id).then(function (response) {
            setSelectDataset(response.data.data);
        }).catch(function (error) {
            setLoading(true);
        });
    };


    useEffect(() => {
        SetAttributeElementData(initialState);
        setFiltered4DatatableColumns(initialState);
        setNative4DatatableColumns(initialState);
    }, [selectDataset]);

    const validate = values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } 
        return errors;
    };


    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validate,
        onSubmit: async function(payload, {resetForm}){
            const postPayload = {
                event_id : selectEvent.id,
                name : payload.name,
                attributes : attributeElementData,
                dataset_id : selectDataset._id,
            };
            HttpClient.post('/app/custom-reports', postPayload).then(async function (response) {
                toast.success('Report have been created successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetForm();
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
    });

    useEffect(async () => {
        if (formik.values.name !== "") {
            const rePattenr =  /^([a-zA-Z0-9 _-]+)$/;
            if (rePattenr.test(formik.values.name)){
                const {data} = await HttpClient.get('/app/custom-reports/availability/'+encodeURIComponent(formik.values.name));
                if(data.data.availability){
                   setAvailability(true);
                }else{
                   setAvailability(false); 
                }
            }else{
                setAvailability(false); 
            }
        }
    }, [formik.values.name]);
     
    const onClickEvent = function(event){
        setSelectEvent(event);
    };

    const onClickGenerate = function(){
       if(attributeElementData.length > 0 && selectDataset != null){
            if(selectDataset.query_where.event  ==  false || selectDataset.query_where.event && selectEvent){
                for (let i = 0; i < attributeElementData.length; i++) {
                    const previous_colum_data = nativeDatatableColumns;
                    previous_colum_data.push({Header: attributeElementData[i], accessor:  attributeElementData[i]});
                    setNative4DatatableColumns(previous_colum_data);
                }
                setFiltered4DatatableColumns(getUniqueArray(nativeDatatableColumns, 'Header'));
                const id = selectDataset._id;
                const payload = {
                    'attributes' : attributeElementData,
                    'event' : selectEvent,
                    'organization' : 224, //224
                    'response_type' : AppConstants.RESPONSE_TYPE_TABLE
                };
                setDirectGenerating(true);
                HttpClient.post('/app/datasets/'+id, payload).then(function (response) {
                    setDirectGenerating(false);
                    if(response.data.message === AppConstants.RESPONSE_TYPE_TABLE){
                        setDirectGenerating(false);
                        setDrawerOpen(true);
                        setFiltered4DatatableData(response.data.data);
                    }else{
                        setDirectGenerating(true);
                    }
                }).catch(function (error) {
                    setDirectGenerating(true);
                });
            }else{
                toast.error('Please select an event', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }                

       }else{
            toast.error('Check at least one attribute', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
       }
    }

    const onClicReportDownload = function(){
        if(attributeElementData.length > 0 && selectDataset != null){
            const id = selectDataset._id;
            const payload = {
                'attributes' : attributeElementData,
                'event' : selectEvent,
                'organization' : 224,
                'response_type' : AppConstants.RESPONSE_TYPE_DOWNLOAD
            };
            setDirectGenerating(true);
            HttpClient.post('/app/datasets/'+id, payload).then(function (response) {
                if(response.data.message === AppConstants.RESPONSE_TYPE_DOWNLOAD){
                   const fileName = 'report_'+Date.now()+'.csv';
                   saveAs(AppConstants.REPORT_URL, fileName);
                   setDirectGenerating(false);
                }else{
                    setDirectGenerating(true);
                }

            }).catch(function (error) {
                setDirectGenerating(true);
            });
       }else{
            toast.error('Check at least one attribute', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
       }
    }

    const onClickMagicLinkGenerate = function(){
        const payload = {
            'organization' : 224,
        };
        setLinkGenerating(true);
        HttpClient.post('/app/magic-link/', payload).then(function (response) {
            setLinkGenerating(false);
            const fileName = 'report_'+Date.now()+'.csv';
            saveAs(AppConstants.REPORT_URL, fileName);
        }).catch(function (error) {
            setLinkGenerating(true);
        });
    }

    const onChangeAttribute = function(event){
        if (event.target.checked === true){
            SetAttributeElementData([...attributeElementData, event.target.value]);
        }else{
            let checked_list = [];
            attributeElementData.map(value => {
                if (value !== event.target.value){
                    checked_list.push(value);
                }
            });
            SetAttributeElementData(checked_list);
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
                    <span className="block sm:inline-block text-xl text-gray-600 font-normal ml-3">Manage Report</span>
                </h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 py-3 bg-gray-50 rounded sm:bg-transparent px-2 sm:px-0">
                    <button onClick={() => props.history.goBack()} className="inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                        <svg className="hi-solid hi-arrow-narrow-left inline-block w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
            </div>
            <Fade>
                <div className="flex flex-col bg-white border-gray-200 -mx-4 sm:mx-0 sm:rounded border-t border-b sm:border overflow-hidden">
                    <div className="px-4 lg:pl-6 lg:pr-4 flex items-center justify-between border-b border-gray-200">
                        <div className="flex-grow py-4">
                            Report Builder
                        </div>
                        <div>
                           <button type="button" onClick={() => onClickMagicLinkGenerate()} className="w-full h-12 px-6 focus:outline-none px-3 py-2 leading-6 rounded border border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow  focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                            <span>
                                    
                                {linkGenerating &&
                                    <svg className="animate-spin h-5 w-5 text-gray inline-block align-middle mr-3 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                                {!linkGenerating  && 
                                    <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                }
                                Magic Link Generate </span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap">
                            <div className="w-1/4 border border-t-0 border-b-0 border-l-0 border-gray-200">
                                <div className="order-r-0  bg-white">
                                    <div className="py-4 px-5 lg:px-6 w-full bg-gray-50">
                                        <h3 className="font-semibold">
                                            Events
                                        </h3>
                                    </div>
                                    <nav className="divide-y divide-gray-200">
                                    {loading  &&  
                                    <div>
                                        <DataSetLoader/>  
                                        <DataSetLoader/>  
                                        <DataSetLoader/>  
                                    </div>
                                    }
                                    <SimpleBar style={{ maxHeight: 500 }}>
                                    {/* {events &&  events.map((item, index) => ( */}
                                    {state.events && state.events.length !== undefined &&  state.events.map((item, index) => (
                                        <div key={index} onClick={() => onClickEvent(item)} className={`p-4 flex justify-between items-center cursor-pointer ${selectEvent && selectEvent.id === item.id ? "bg-indigo-500 text-white" : "text-gray-700 hover:text-gray-700 hover:bg-gray-50"}`}>
                                            <div className="flex items-center space-x-4">
                                                <div>
                                                    <p className="font-semibold text-sm">
                                                    {item.title}
                                                    </p>
                                                </div>
                                            </div>
                                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-chevron-right inline-block w-5 h-5"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        </div>
                                        )) 
                                    }
                                    </SimpleBar>
                                    </nav>
                                </div>
                            </div>
                            <div className="w-1/4 border border-t-0 border-b-0 border-l-0 border-gray-200">
                                <div className="order-r-0  bg-white">
                                    <div className="py-4 px-5 lg:px-6 w-full bg-gray-50">
                                        <h3 className="font-semibold">
                                            Datasets
                                        </h3>
                                    </div>
                                    <nav className="divide-y divide-gray-200">
                                    {loading  &&  
                                    <div>
                                        <DataSetLoader/>  
                                        <DataSetLoader/>  
                                        <DataSetLoader/>  
                                    </div>
                                    }
                                    <SimpleBar style={{ maxHeight: 550 }}>
                                    {state.datasets && state.datasets.length !== undefined &&  state.datasets.map((item, index) => (
                                        <div key={index} onClick={() => onClickDataset(item)} className={`p-4 flex justify-between items-center cursor-pointer ${selectDataset && selectDataset.name === item.name ? "bg-indigo-500 text-white" : "text-gray-700 hover:text-gray-700 hover:bg-gray-50"}`}>
                                            <div className="flex items-center space-x-4">
                                                <div>
                                                    <p className="font-semibold text-sm">
                                                    {item.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-chevron-right inline-block w-5 h-5"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        </div>
                                        )) 
                                    }
                                    </SimpleBar>
                                    </nav>
                                </div>
                            </div>
                            <div className="w-1/4 border border-t-0 border-b-0 border-l-0 border-gray-200">
                                <div className="bg-white">
                                    <div className="py-4 px-5 lg:px-6 w-full bg-gray-50">
                                        <h3 className="font-semibold">
                                            Data Attributes
                                        </h3>
                                    </div>
                                    <SimpleBar style={{ maxHeight: 550 }}>
                                    {selectDataset &&  selectDataset.attributes.map((item, index) => (
                                        <div key={index}>
                                            <div className="p-4 rounded-md md:p-5 border m-2 flex justify-between text-gray-700 bg-white">
                                                <label className="inline-flex items-center ml-6">
                                                    <input type="checkbox" name="attributes[]" value={item}  ref={checkRef} onChange={(event) => onChangeAttribute(event)} className="border border-gray-200 rounded h-4 w-4 text-indigo-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none ptx" />
                                                    <span className="ml-2">{item}</span>
                                                </label>
                                            </div>
                                        </div>
                                    )) 
                                    }
                                    </SimpleBar>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="bg-white">
                                    <div className="py-4 px-5 lg:px-6 w-full bg-gray-50">
                                        <h3 className="font-semibold">
                                            Analysis
                                        </h3>
                                    </div>
                                    <div className="container p-2">

                                        <button type="button" onClick={() => onClickGenerate()} className="w-full h-12 px-6 focus:outline-none px-3 py-2 leading-6 mb-3 rounded border-indigo-500 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                            <span>
                                                
                                            {directGenerating &&
                                                <svg className="animate-spin h-5 w-5 text-white inline-block align-middle mr-3 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            }
                                            {!directGenerating && 
                                            <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                            }
                                            Quick Generate </span>
                                        </button>

                                        <h3 className="flex items-center my-8">
                                            <span aria-hidden="true" className="flex-grow bg-gray-200 rounded h-0.5"></span>
                                            <span className="text-lg font-medium mx-3">Save it as</span>
                                            <span aria-hidden="true" className="flex-grow bg-gray-200 rounded h-0.5"></span>
                                        </h3>

                                        <div className="space-y-1 mt-5">
                                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                            <div className="relative">
                                                <input 
                                                className={`block border rounded px-3 py-2 leading-6 w-full  focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50  ${formik.errors.email ?'border-red-700' : 'border-gray-200'}`}
                                                type="text" 
                                                placeholder="Report name.."
                                                id="name" 
                                                name="name" 
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                                autoComplete="off"
                                                />


                                                <div className="absolute inset-y-0 right-0 w-10 my-px mr-px flex items-center justify-center pointer-events-none rounded-r text-gray-500">
                                                {availability  && 
                                                    <svg className="hi-solid hi-check inline-block w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                                }

                                                {!availability  &&   formik.touched.name && 
                                                    <svg className="hi-solid hi-x inline-block w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                                                }
                                                </div>
                                            </div>
                                            {formik.errors.name ? <span className="text-md text-red-700">{formik.errors.name}</span> : null}
                                                <button disabled={!availability} type="submit" className="w-full h-12 px-6 inline-flex justify-center items-center space-x-2 border focus:outline-none px-3 py-2 leading-6 rounded border-indigo-500 bg-indigo-500 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
                                                <svg className="hi-solid hi-check-circle inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                                    Save
                                                </button>

                                            </form>      
                                        </div>

                                        <div className="bg-gray-100 overflow-hidden">
                                            <div className="">
                                                <div className="mx-auto rounded-2xl text-center shadow-sm overflow-hidden">
                                                    <div className="p-6 lg:p-10 bg-white">
                                                        <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                                                        Get Insights from your data
                                                        </h3>
                                                        <p className="prose prose-sm prose-indigo mb-6">
                                                        Business Intelligence, Dashboards or Analytics. Whatever you need, O2O Report can help
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
            <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
                {filteredDatatableData && <>
                    <Table 
                    columns={filteredDatatableColumns} 
                    data={filteredDatatableData}
                    onClickGenerateCsv={onClicReportDownload}        
                />
                </>
                }
            </Drawer>
        </main>
    );
}

export default Builder;