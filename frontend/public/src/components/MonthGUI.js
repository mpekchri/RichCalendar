import React from 'react';
import '../styles/components/monthgui.scss';
import Day from './DayOfMonth';


export default class MonthGUI extends React.Component{
    render() {
      const arrayOfX = [1,2,3,4,5,6,7];
      const arrayOfY = [1,2,3,4,5,6];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return(
        <div className="monthcalendarcontainer">
          <div className="dayCounterContainer">
            {days.map((d)=>{
              return(
                <div className="dayCounter">{d}</div>
              )
            })}
          </div>
          {
            arrayOfY.map((col)=>{
              return(
                <div className="month-columnContainer">
                  {arrayOfX.map((row)=>{
                    return(
                      <div className="singleDayInMonthCalendar">
                        <Day/>
                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      )
    }
}
