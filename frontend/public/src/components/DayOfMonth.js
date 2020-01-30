import React from 'react';
import '../styles/components/dayofmonth.scss';


export default class MonthGUI extends React.Component{
    render() {
      const dayNumber = '05';
      const dailyTasks = [
        {
          displayOrder:1,
          priority:'HST',
          taskName:'Some task name'
        },
        {
          displayOrder:1,
          priority:'L',
          taskName:'Well, another one task name'
        },
      ]
      return(
        <div className="singledayofmonthcontainer">
          <div className="daylayer0 activeday">
            <div className="daynumbertext">{dayNumber}</div>
          </div>
          <div className="daylayer1">
            {
              dailyTasks.map((task)=>{
                return(
                  <div className="dailyTask" style={{background:this.colorTask(task.priority)}}>
                    <div>{task.taskName}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
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
}
