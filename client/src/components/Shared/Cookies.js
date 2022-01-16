import React, {useContext} from 'react';

const AppConstants    = require('../../constants/AppConstants');
const {AppContext}    = require('../../store/AppContext');

const Cookies = () => {

    const {dispatch} = useContext(AppContext);

    const onClickCookieAccept = function(){
      dispatch({type: AppConstants.COOKIE_CONSENT, payload: null});
    }

    return (
        <div className="fixed bottom-0 right-0 z-60 p-2 sm:p-4">
        <div className="max-w-xl flex flex-col sm:flex-row justify-between items-center rounded-lg p-4 sm:py-5 sm:px-8 bg-gray-800 space-y-5 sm:space-y-0 sm:space-x-8">
          <div>
            <h4 className="font-semibold text-lg text-white mb-1">
            C is for COOKIE
            </h4>
            <p className="font-medium text-sm text-gray-400 leading-relaxed">
            Ok, these cookies are neither sweet nor chocolatey. But they allow us to get to know you better and to offer content to you that you will devour. And that is worth all the cookies in the world.
            </p>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-start sm:justify-end space-x-2">
            <button type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-700 bg-gray-700 text-white hover:text-white hover:bg-gray-800 hover:border-gray-800 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-gray-700 active:border-gray-700">
              <span>Manage</span>
            </button>
            <button onClick={() => onClickCookieAccept()} type="button" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700">
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-check inline-block w-5 h-5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Accept</span>
            </button>
          </div>
        </div>
      </div>
    )
}

export default Cookies;