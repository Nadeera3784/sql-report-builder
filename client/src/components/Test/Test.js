import React, {useState, useEffect, useContext} from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import HttpClient    from '../../services/Http';
const {AppContext}    = require('../../store/AppContext');
const AppConstants    = require('../../constants/AppConstants');



function Test() {

    const [loading, setLoading] = useState(false);
    const [initialize, setInitialize] = useState(true);
    const {state , dispatch} = useContext(AppContext);


    useEffect(() => {
        //console.log(state);

        // if(initialize  && state.analytics === undefined ||  state.analytics?.length == 0){
        //     setLoading(true);
        //     HttpClient.get('/app/analytics').then(function (response) {
        //         dispatch({type: AppConstants.ADD_ANALYTICS, payload: response.data.data});
        //         setLoading(false);
        //         setInitialize(false);
        //     }).catch(function (error) {
        //         setLoading(true);
        //     });
        // }

        console.log(state);
    }, []);

    return (
         <h2>Hello world</h2>
    )
}

export default Test;