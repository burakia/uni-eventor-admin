import { makeApiRequest } from './App.Request';
import axios from 'axios';

let token = '';

export function setToken(tkn){
    token = tkn;
}

export function getToken(){

    if(!token){
        try{
            token =  JSON.parse(localStorage.getItem('token')) || '';
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
        }catch(error){
            console.log(error);
             console.log('hata var');
        }
        
    }

    return token;
}

export function login(username, password, onsuccess, onfailure) {
    var userData = 'grant_type=password&username=' + username + '&password=' + password;
    var loginSuccess = function (data) {
        token = data;
        localStorage.setItem('token',JSON.stringify(token));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
        onsuccess();
    };
    makeApiRequest('POST', '/token', userData, loginSuccess, onfailure, (xhr) => {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    });
}

export function authorize(xhr) {
    if (token.access_token && xhr.readyState === 1) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
    }
    return xhr;
}