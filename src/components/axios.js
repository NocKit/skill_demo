import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create({
    timeout: 3000,
});

instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error)
})

const api={
    get(url,data){
        return instance.get(url,{params:data})
    },
    post(url,data){
        return instance.post(url, data)
    },
}

export default api
