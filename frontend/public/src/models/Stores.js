import { types, getParent, destroy } from 'mobx-state-tree';
import {login as controllerLogin, loadMonthCalendar as controllerLoadMonthCalendar} from '../controllers/FrontendMainController';
import { flow } from "mobx-state-tree";
import { autorun } from "mobx";
import { applySnapshot } from 'mobx-state-tree';


const MainStore = types
  .model({
    initialLoad: types.optional(types.boolean, true),
    calendarStore: types.maybeNull(types.late(() => CalendarStore)),
    navOptionsStore: types.maybeNull(types.late(() => NavOptionsStore)),
    authStore: types.maybeNull(types.late(() => AuthStore)),
    dataBeingFetched: types.optional(types.boolean, false),
  })
  .actions(self =>({
    setDataBeingFetched(booleanValue){
      self.dataBeingFetched = booleanValue;
    },    
    setInitialLoad(booleanValue){
      self.initialLoad = booleanValue;
    },

    // ASYNC ACTIONS 
    login : flow(function* login(username,password){
      // if(self.initialLoad == true && self.authStore.token == null){
      //   // if user is not logged in AND data have not been loaded, then :
      //   try{
      //     let response = yield controllerLogin(usrname,password);
      //     token = response.token;
      //     if(token){
      //       self.authStore.setToken(token);
      //     }
      //     print(token);
      //   }catch(error){
      //     console.log("Error : Store.js -- MainStore -- actions -- login : ".concat(error) )
      //   }
      // }else{
      //   // TO-DO
      //   console.log("Warning : Store.js -- MainStore -- actions -- login : Not yet implemented")
      // }
      try{
        let response = yield controllerLogin(username,password);
        let token = response.data.token;
        if(token){
          self.authStore.setToken(token);
        }
        // console.log(token);
      }catch(error){
        console.log("Error : Store.js -- MainStore -- actions -- login : ".concat(error) )
      }
    }),

    loadCalendar: flow(function* loadCalendar(){
      if(self.navOptionsStore.selectedView == 'Month'){
        self.setDataBeingFetched(true);
        let response = yield controllerLoadMonthCalendar(
          self.authStore.token,
          undefined, // filters = undefined,
          undefined, // searchText = undefined,
          undefined, // selectedDate = undefined
          self.initialLoad
        );
        let calendarData = JSON.parse(response.data);
        console.log(calendarData)
        self.calendarStore.setMonthCalendar(calendarData.monthCalendarState);
        // console.log(self.calendarStore.monthCalendarState)
        self.setDataBeingFetched(false);
      }else{
        // TO-DO
      }
    })
  }))


const AuthStore = types
  .model({
    token: types.maybeNull(types.string),
    username: types.string,
    password:types.string,
  })
  .actions(self =>({
    setToken(token){
      self.token = token;
    },
  }))


const NavOptionsStore = types
  .model({
    navPaths: types.optional(types.array(types.string),['HOME']),
    currentDate: types.Date,
    selectedView: types.enumeration("CALENDAR_VIEW",['Year','Month','Week','Day']),
  })


const CalendarStore = types
  .model({
    monthCalendarState:types.optional(types.late(() => MonthCalendarState), {}),
  })
  .actions(self =>({
    setMonthCalendar(monthCalendarJsonObj){
      applySnapshot(self.monthCalendarState, monthCalendarJsonObj);
    }

  }))

  
const MonthCalendarState = types
  .model({
    dayBoundaryElements: types.optional(types.array(types.late(() => DayBoundaryElement)), [])
  })


const DayBoundaryElement = types
  .model({
    dayNumber: types.integer,
    dayOrder: types.integer,
    isActive: types.boolean,
    isCurrentDay: types.boolean,
    hasMoreEvents: types.optional(types.boolean, false),
    tasks: types.optional(types.array( types.late(() => MonthTaskBoundaryElement) ), [])
  })


const MonthTaskBoundaryElement = types
  .model({
    priority: types.enumeration('TASK_PRIORITY',['HST','H','M','L','R']),
    displayOrder: types.integer,
    name: types.optional(types.string, '')
  })

  
export {MainStore, CalendarStore, MonthCalendarState, AuthStore, NavOptionsStore};


// // Listen for changes
// autorun(() => {
  
// })
