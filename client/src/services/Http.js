import axios from 'axios';
import AuthService from './Auth';

const http = axios.create({
    //baseURL: 'http://o2o-reporting-prod.eu-central-1.elasticbeanstalk.com/api/v1',
    baseURL: 'http://o2o-reporting-v1-env.eba-sms26npm.ap-southeast-1.elasticbeanstalk.com/api/v1',
    //baseURL: 'http://127.0.0.1:3030/api/v1',
})


http.interceptors.request.use(async function (config) {
    const token = await AuthService.getToken();
    
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return Promise.resolve(response);
}, function (error) {
    if(error.response.status === 401) {
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default http;