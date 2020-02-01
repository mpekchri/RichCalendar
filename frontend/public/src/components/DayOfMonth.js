import React from 'react';
import '../styles/components/dayofmonth.scss';


export default class MonthGUI extends React.Component{
    render() {
      const data = this.props.dayData;
      const dayNumber = data.dayNumber;
      const dailyTasks = data. tasks;
      return(
        <div className="singledayofmonthcontainer" onClick={this.dayClicked}>
          <div className={"daylayer0 ".concat(this.classNameForDayColoring(data))} >
            <div className="daynumbertext">{dayNumber}</div>
          </div>
          <div className="daylayer1">
            {
              dailyTasks.map((task,index)=>{
                return(
                  <div className="dailyTask" 
                    style={{background:this.colorTask(task.priority)}} 
                    key={'taskDispOrder - '.concat(index)}
                    onClick={this.taskClicked}
                  >
                    {task.name.length > 0 ? <div>{task.name}</div> : <div>&nbsp;</div>}
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }


    dayClicked(e){
      console.log('day clicked')}


    taskClicked(e){
      e.stopPropagation();
      console.log('task clicked')
    }


    colorTask(priority){
      if(priority==='HST'){
        return 'rgb(233, 96, 96)';
      }else if(priority==='H'){
        return 'rgb(238, 142, 118)';            
      }else if(priority==='M'){
        return 'rgb(233, 169, 96)';
      }else if(priority==='L'){
        return 'rgb(130, 141, 238)';
      }else if(priority==='R'){
        return 'rgb(221, 213, 100)';
      }
    }


    classNameForDayColoring(dayData){
      let dayClassName = 'nonactiveday';
      if(dayData.isActive){
        dayClassName='activeday';
      }
      if(dayData.isCurrent){
        dayClassName='currentday';
      }
      return dayClassName;
    }
}
