import {MainStore} from './models/Stores';
import { onSnapshot, getSnapshot, applySnapshot } from 'mobx-state-tree';


export const setupStore = (useDummyData=true) => {
    if(useDummyData){
        const jsonData = {
            initialLoad:true,
            calendarStore:{
                monthCalendar:{
                    days:createDays()
                }
            },
            navOptionsStore: {
                currentDate: new Date(),
                selectedView: 'Month',
            },
            authStore: {
                username: 'geparxosbro',
                password:'1QJhbiLQiLC1QiJhbGci'
            },
        };
        const store = MainStore.create(jsonData);
        return store;
    }else{
        const jsonData = {
            initialLoad:true,
            calendarStore:{},
            navOptionsStore: {
                currentDate: new Date(),
                selectedView: 'Month',
            },
            authStore: {
                username: 'dummyAdmin',
                password:'1QJhbiLQiLC1QiJhbGci'
            },
        };
        const store = MainStore.create(jsonData);
        return store;
    }  
}


function createDays(){
    let days = [];
    for(let i=0; i<31; i++){
        days.push({
            dayNumber:i+1,
            dayOrder:i+3,
            isActive:true,
            isCurrent:false,
        })
    }
    days[15].isCurrent = true;
    days = [
        {dayNumber:30,dayOrder:1,isActive:false,isCurrent:false},
        {dayNumber:31,dayOrder:2,isActive:false,isCurrent:false}
    ].concat(days);
    days = days.concat([
        {dayNumber:1,dayOrder:34,isActive:false,isCurrent:false},
        {dayNumber:2,dayOrder:35,isActive:false,isCurrent:false},
        {dayNumber:3,dayOrder:36,isActive:false,isCurrent:false},
        {dayNumber:4,dayOrder:37,isActive:false,isCurrent:false},
        {dayNumber:5,dayOrder:38,isActive:false,isCurrent:false},
        {dayNumber:6,dayOrder:39,isActive:false,isCurrent:false},
        {dayNumber:7,dayOrder:40,isActive:false,isCurrent:false},
        {dayNumber:8,dayOrder:41,isActive:false,isCurrent:false},
        {dayNumber:9,dayOrder:42,isActive:false,isCurrent:false},
    ])
    // add tasks in some days
    days[10]['tasks'] = [
        {priority:'HST',displayOrder:1, name:'Do this'},
        {priority:'M',displayOrder:2, name:'Do that'}
    ];
    days[11].tasks = [
        {priority:'HST',displayOrder:1},
    ];
    days[18].tasks = [
        {priority:'H',displayOrder:1, name:'Make coffee'},
        {priority:'L',displayOrder:2, name:'Make another one'}
    ];
    return days;
}