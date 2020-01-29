import React from 'react';
import '../styles/components/controlpanelgui.scss';


export default class ControlPanelGUI extends React.Component{
    render() {
      const chosenOption = 1;
      return(
        <div className="cpcontainer">
          <div className="cpoptions">
            <div className="cpsingleoption">
              CALENDAR
            </div>
          </div>
          <div className="cpdateoptions">
            <div className={this.dateOptionsClassNameGenerator(chosenOption,0)}>
              YEAR
            </div>
            <div className={this.dateOptionsClassNameGenerator(chosenOption,1)}>
              MONTH
            </div>
            <div className={this.dateOptionsClassNameGenerator(chosenOption,2)}>
              WEEK    
            </div>
            <div className={this.dateOptionsClassNameGenerator(chosenOption,3)}>
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
