import React from 'react';
import Calendar from './CalendarGUI';
import Header from './HeaderGUI';
import ChooseDate from './ChooseDateGUI';
import ControlPanel from './ControlPanelGUI';
import Loading from './LoadingGUI';
import '../styles/components/maingui.scss';import {observer, inject} from "mobx-react";


@inject('mainStore')
@observer
export default class MainGUI extends React.Component{
    render() {
      const {mainStore} = this.props;
      if(mainStore.initialLoad){
        mainStore.login("dummyAdmin","1QJhbiLQiLC1QiJhbGci").then(()=>{
          mainStore.loadCalendar().then(()=>{
            mainStore.setInitialLoad(false);
          })
        })
        return(
          <Loading />
        )
      }else{
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
            <div ref="calendarContainerRef" className="calendarplace" style={{height:this.calculateCalendarHeight()}}>
              <Calendar />
            </div>
          </div>
        )
      }
    }

    calculateCalendarHeight(){
      // TO-DO : make this dynamic 
      return '70%';
    }
}
