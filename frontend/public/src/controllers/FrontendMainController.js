import {base_url, timeout} from './Config';
import axios from 'axios';


export function login(username, password){
    const axiosInstance = axios.create({
        baseURL:base_url,
        timeout: timeout,
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = {
        username: username,
        password: password
    }
    const url = '/auth-api/login';
    return axiosInstance.post(url, data);
}


export function loadMonthCalendar(token, filters=undefined, searchText=undefined, selectedDate=undefined, initialLoad=true){
    const axiosInstance = axios.create({
        baseURL:base_url,
        timeout: timeout,
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Token '+token
        },
        params: {
            calendarView:'Month',
            initialLoad:initialLoad
        }
    });
    const data = {
        filters:filters != undefined ? filters : null,
        searchText:searchText != undefined ? searchText : null,
        selectedDate:selectedDate != undefined ? selectedDate : null
    }
    const url = '/calendar-api/filters';
    return axiosInstance.post(url, data);
}