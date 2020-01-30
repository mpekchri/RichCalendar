import React from 'react';
import MonthGUI from './MonthGUI';
import DayGUI from './DayGUI';


export default class CalendarGUI extends React.Component{
    render() {
      return(
        <div className="calendarContainer">
          {/*CalendarGUI <br/>
          -------------
          <MonthGUI/>
          or
          <DayGUI />*/}
          <MonthGUI/>
        </div>
      )
    }

}
