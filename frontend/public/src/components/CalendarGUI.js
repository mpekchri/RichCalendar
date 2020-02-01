import React from 'react';
import MonthGUI from './MonthGUI';
import DayGUI from './DayGUI';
import {observer, inject} from "mobx-react";


@inject('mainStore')
@observer
export default class CalendarGUI extends React.Component{
    render() {
      const {navOptionsStore} = this.props.mainStore;
      const selectedView = navOptionsStore.selectedView;
      return(
        <div className="calendarContainer">
          {this.renderCalendar(selectedView)}
        </div>
      )
    }


    renderCalendar(selectedView){
      if(selectedView === 'Year'){
        // TO-DO
      }else if(selectedView === 'Month'){
        return <MonthGUI/>;
      }else if(selectedView === 'Week'){
        // TO-DO
      }else if(selectedView === 'Day'){
        return <DayGUI/>;
      }
    }

}
