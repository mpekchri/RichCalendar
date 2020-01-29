import React from 'react';
import Calendar from './CalendarGUI';
import Header from './HeaderGUI';
import ChooseDate from './ChooseDateGUI';
import ControlPanel from './ControlPanelGUI';
import '../styles/components/maingui.scss';


export default class MainGUI extends React.Component{
    render() {
      return(
        <div className="fathercontainer">
          <div className="headerplace">
            <Header/>
          </div>
          <div className="controlpanelplace">
            <ControlPanel/>
          </div>
          <div className="subcontrolpanelplace">
            <ChooseDate/>
          </div>
          <div className="calendarplace">
            <Calendar />
          </div>
        </div>
      )
    }

}
