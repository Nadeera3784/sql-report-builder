import AppConstants from '../constants/AppConstants';

const AppReducer = (state, action) => {
    switch (action.type) {
        case AppConstants.ADD_ANALYTICS:
            // return {
            //     ...state,
            //     analytics: [...state.analytics, action.payload]
            // };
            return {
                ...state, 
                analytics: action.payload
            };
        case AppConstants.SEARCH_ANALYTICS:
            return {
                ...state,
                analytics: state.analytics[0].filter(item => item.Dataset.includes(action.payload))
            };
        case AppConstants.COOKIE_CONSENT:
            return {
                ...state, 
                cookie_consent : !state.cookie_consent
            };
        case AppConstants.AUTH_SET_TOKEN:
            localStorage.setItem("o2o-app-key", action.payload);
            return state;
        case AppConstants.AUTH_SET_USER:
            return {
                ...state, 
                auth_user: action.payload
            };
        case AppConstants.ADD_EVENTS:
            return {
                ...state, 
                events: action.payload
            };
        case AppConstants.ADD_DATASETS:
            return {
                ...state, 
                datasets: action.payload
            };
        default:
            return state;
    }
};

export default AppReducer;