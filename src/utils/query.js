import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8085"

axios.interceptors.request.use((request) => {
    request.headers.common.Accept = 'application/json';
    return request;
}, (error) => Promise.reject(error));

export default function query({
    endpoint,
    data = null,
    method = 'POST',
    headers = {},
    opts = { retry: true },
    type = 'json',
    params = {},
    credentials = null
}) {
    const requestObj = {
        method,
        url: endpoint,
        withCredentials: false,
        retry: opts.retry,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        data,
        params,
        responseType: type,
        auth: credentials
    };
    return axios(requestObj);
}