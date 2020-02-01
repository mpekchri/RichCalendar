import React from 'react';
import '../styles/components/monthgui.scss';
import Day from './DayOfMonth';
import {observer, inject} from "mobx-react";


@inject('mainStore')
@observer
export default class MonthGUI extends React.Component{
    render() {
      const {days} = this.props.mainStore.calendarStore.monthCalendar;
      const arrayOfX = [1,2,3,4,5,6,7];
      const arrayOfY = [1,2,3,4,5,6];
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return(
        <div className="monthcalendarcontainer">
          <div className="dayCounterContainer">
            {daysOfWeek.map((d)=>{
              return(
                <div className="dayCounter" key={d}>{d}</div>
              )
            })}
          </div>
          {
            arrayOfY.map((col,x)=>{
              return(
                <div className="month-columnContainer" key={'col - '.concat(col)}>
                  {arrayOfX.map((row,y)=>{
                    return(
                      <div className="singleDayInMonthCalendar" key={'row - '.concat(row)}>
                        <Day
                          dayData={days[x*7 + y]}
                        />
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
