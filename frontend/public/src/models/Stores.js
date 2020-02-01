import { types, getParent, destroy } from 'mobx-state-tree';


const MainStore = types
  .model({
    initialLoad: types.optional(types.boolean, true),
    calendarStore: types.maybeNull(types.late(() => CalendarStore)),
    navOptionsStore: types.maybeNull(types.late(() => NavOptionsStore)),
    authStore: types.maybeNull(types.late(() => AuthStore)),
  })
  // .actions(self =>({
  //   actionName(args){
  //     // some functionality
  //   },
  // }))


const AuthStore = types
  .model({
    token: types.maybeNull(types.string),
    username: types.string
  })


const NavOptionsStore = types
  .model({
    navPaths: types.optional(types.array(types.string),['HOME']),
    currentDate: types.Date,
    selectedView: types.enumeration("CALENDAR_VIEW",['Year','Month','Week','Day']),
  })


const CalendarStore = types
  .model({
    monthCalendar:types.maybeNull(types.late(() => MonthCalendarState)),
  })

  
const MonthCalendarState = types
  .model({
    days: types.optional(types.array(types.late(() => DayBoundaryElement)), [])
  })


const DayBoundaryElement = types
  .model({
    dayNumber: types.integer,
    dayOrder: types.integer,
    isActive: types.boolean,
    isCurrent: types.boolean,
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
