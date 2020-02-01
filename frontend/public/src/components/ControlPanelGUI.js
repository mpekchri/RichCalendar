import React from 'react';
import '../styles/components/controlpanelgui.scss';
import {observer, inject} from "mobx-react";


@inject('mainStore')
@observer
export default class ControlPanelGUI extends React.Component{
    render() {
      const {navOptionsStore} = this.props.mainStore;
      const selectedView = navOptionsStore.selectedView;
      return(
        <div className="cpcontainer">
          <div className="cpoptions">
            <div className="cpsingleoption">
              CALENDAR
            </div>
          </div>
          <div className="cpdateoptions">
            <div className={this.dateOptionsClassNameGenerator(selectedView,'Year')}>
              YEAR
            </div>
            <div className={this.dateOptionsClassNameGenerator(selectedView,'Month')}>
              MONTH
            </div>
            <div className={this.dateOptionsClassNameGenerator(selectedView,'Week')}>
              WEEK    
            </div>
            <div className={this.dateOptionsClassNameGenerator(selectedView,'Day')}>
              DAY
            </div>
          </div>
        </div>
      )
    }


    dateOptionsClassNameGenerator(chosenOption,currentOption){
      if(chosenOption != currentOption){
        return "cpdatesingleoption";
      }else{
        return "cpdatesingleoption cpactiveoption";
      }
    }
}
