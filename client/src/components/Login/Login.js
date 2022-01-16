import React, { useState, useContext, useEffect} from 'react';
import { useFormik } from 'formik';
import {useHistory} from "react-router-dom";
import BarLoader from "react-spinners/BeatLoader";

import {AppContext}  from '../../store/AppContext';
import AppConstants from '../../constants/AppConstants';
import { useQueryParams } from '../Shared/Utils';
import httpservice from '../../services/Http';

function Login(props) {

    const history = useHistory();

    const {state, dispatch} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState(null);
    const [autoLoginError, setAutoLoginError] = useState(null);
    
    const validate = values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email';
      }
      return errors;
    };
  
    const { type , token} = useQueryParams();
    
    if(type && type === "auto"){
      httpservice.get('https://app.dev.cloud.digitalmediasolutions.com.au/api/organizer/sso/verification?token='+token).then(async function (verificationData) {
          const authPayload = {
              'o2o_id'    : verificationData.data.data._id,
              'org_id'    : verificationData.data.data.current_org_id
          };
          const internalTokenResponse = await httpservice.post('/app/auth', authPayload);
          dispatch({type: AppConstants.AUTH_SET_TOKEN, payload: internalTokenResponse.data.data.accessToken});
          const payload = {
             'user_id'    : verificationData.data.data._id,
             'company_id' : verificationData.data.data.current_org_id,
             'name'       : verificationData.data.data.full_name,
             'email'      : verificationData.data.data.email
          };
          dispatch({type: AppConstants.AUTH_SET_USER, payload: payload});
          setLoading(false);
          history.push('/dashboard');
        })
        .catch(function (error) {
          setLoading(false);
          setAutoLoginError('Invalid token')
      });
    }


    const formik = useFormik({
      initialValues: {
        email: ''
      },
      validate,
      onSubmit: async function(payload, {resetForm}){
        setLoading(true);
        httpservice.post('https://app.dev.cloud.digitalmediasolutions.com.au/api/organizer/sso/auth', payload).then(async function (response) {
          const token = response.data.token;
          const verificationData = await httpservice.get('https://app.dev.cloud.digitalmediasolutions.com.au/api/organizer/sso/verification?token='+token);
          const authPayload = {
            'o2o_id'    : verificationData.data.data._id,
            'org_id'    : verificationData.data.data.current_org_id
          };
          const internalTokenResponse = await httpservice.post('/app/auth', authPayload);
          dispatch({type: AppConstants.AUTH_SET_TOKEN, payload: internalTokenResponse.data.data.accessToken});
          const payload = {
             'user_id'    : verificationData.data.data._id,
             'company_id' : verificationData.data.data.current_org_id,
             'name'       : verificationData.data.data.full_name,
             'email'      : verificationData.data.data.email
          };
          dispatch({type: AppConstants.AUTH_SET_USER, payload: payload});
          setLoading(false);
          history.push('/dashboard');
        })
        .catch(function (error) {
          setLoading(false);
          setServerErrors('Invalid credentials');
        });
      }
    });




    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg className="hi-solid hi-cube-transparent mx-auto h-12 w-auto text-indigo-400" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.25" d="M14.684 25.388C20.3284 25.388 24.904 20.8123 24.904 15.168C24.904 9.52365 20.3284 4.948 14.684 4.948C9.03965 4.948 4.464 9.52365 4.464 15.168C4.464 20.8123 9.03965 25.388 14.684 25.388Z" fill="#5E81F4"/>
            <path opacity="0.5" d="M6.292 13.272C3.74884 13.2711 1.45629 11.7393 0.482133 9.39014C-0.492025 7.04096 0.0437846 4.33633 1.84 2.53598C4.29692 0.080291 8.27908 0.080291 10.736 2.53598C11.9163 3.71535 12.5794 5.31546 12.5794 6.98398C12.5794 8.6525 11.9163 10.2526 10.736 11.432C9.56032 12.6149 7.95978 13.2776 6.292 13.272Z" fill="#5E81F4"/>
            <path opacity="0.5" d="M23.308 29.8959C20.3057 29.897 17.7208 27.7767 17.1348 24.8321C16.5488 21.8875 18.1248 18.9391 20.8988 17.7905C23.6728 16.642 26.8717 17.6133 28.5388 20.1104C30.2058 22.6074 29.8764 25.9343 27.752 28.0559C26.5753 29.2373 24.9754 29.8997 23.308 29.8959Z" fill="#5E81F4"/>
            <path d="M6.46 29.828C3.91539 29.8303 1.61987 28.2997 0.643664 25.9498C-0.332546 23.5999 0.202755 20.8934 2 19.092C2.27475 18.8241 2.57332 18.5818 2.892 18.368L3.2 18.172C3.416 18.044 3.64 17.928 3.876 17.816C3.996 17.764 4.116 17.708 4.248 17.66C4.49358 17.5703 4.74479 17.4968 5 17.44L5.16 17.396C5.18744 17.3861 5.2155 17.3781 5.244 17.372L6.668 17.268C6.852 17.268 7.068 17.304 7.264 17.332H7.308H7.496H7.556H7.616H8C10.4617 17.3091 12.8115 16.3006 14.524 14.532C16.2459 12.7768 17.1888 10.4023 17.14 7.94398V7.87598V7.80798C17.1259 7.73141 17.1178 7.65383 17.116 7.57598V7.38398L17.064 7.19998C17.064 7.08798 17.036 6.96798 17.032 6.85198L17.128 5.53198V5.49998V5.47598C17.128 5.44398 17.188 5.26798 17.188 5.26798C17.2488 4.9968 17.3263 4.72962 17.42 4.46798C17.464 4.34798 17.52 4.22798 17.576 4.10798C17.681 3.87112 17.8013 3.6413 17.936 3.41998V3.38398C17.992 3.29198 18.044 3.19998 18.108 3.11198C18.3181 2.7953 18.5579 2.49931 18.824 2.22798C21.285 -0.237417 25.2786 -0.240999 27.744 2.21998C30.2094 4.68096 30.213 8.67458 27.752 11.14C27.4788 11.4056 27.1815 11.6453 26.864 11.856C26.768 11.924 26.684 11.972 26.6 12.024L26.552 12.052C26.32 12.188 26.096 12.308 25.88 12.408C25.752 12.464 25.636 12.52 25.516 12.564C25.2636 12.6556 25.0057 12.7318 24.744 12.792C24.6886 12.8037 24.6339 12.8184 24.58 12.836L24.48 12.864L23.084 12.96C22.908 12.96 22.72 12.928 22.524 12.904H22.436H22.256H22.14H22.076H21.764C16.6622 12.9786 12.5777 17.1579 12.62 22.26V22.328V22.4C12.6308 22.4702 12.6375 22.541 12.64 22.612C12.64 22.688 12.64 22.76 12.66 22.832C12.68 22.904 12.66 22.968 12.684 23.04C12.698 23.1434 12.706 23.2476 12.708 23.352L12.608 24.724C12.6005 24.7604 12.5912 24.7965 12.58 24.832L12.544 24.956C12.4868 25.2276 12.4106 25.495 12.316 25.756C12.272 25.876 12.212 26 12.156 26.124C12.0543 26.355 11.9408 26.5806 11.816 26.8C11.752 26.912 11.692 27.012 11.624 27.108C11.4121 27.428 11.1696 27.7267 10.9 28C9.72428 29.1804 8.12605 29.8427 6.46 29.84V29.828Z" fill="#5E81F4"/>
          </svg>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">O2O Report</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in to your account
              </span>
            </p>
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {!type && !token &&
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address:
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      autoComplete="off"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                     {formik.errors.email ? <span className="text-sm text-red-700">{formik.errors.email}</span> : null}
                     {serverErrors ? <span className="text-sm text-red-700">{serverErrors}</span> : null}
                  </div>
                </div>

                <div>
                  <button 
                  type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  {loading &&
                    <svg className="animate-spin mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                    Sign in
                  </button>
                  

                </div>
              </form>
              }

              {type && token &&
              <div>
                <div className="text-center">
                  <BarLoader  color={"#4f46e5"}  size={50} />
                </div>
                <div className="text-center">
                  {autoLoginError ? <span className="text-md text-red-700">{autoLoginError}</span> : null}
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      )
}

export default Login;