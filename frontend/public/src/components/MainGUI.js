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
          <div className="global-tfc controlpanelplace">
            <ControlPanel/>
          </div>
          <div className="global-tfc subcontrolpanelplace">
            <ChooseDate/>
          </div>
          <div className="global-tfc calendarplace">
            <Calendar />
          </div>
        </div>
      )
    }

}
