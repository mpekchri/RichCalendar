import React from 'react';
import '../styles/components/headergui.scss';
import AvatarImage from '../img/user.svg';
import Expand from '../img/expand.svg';
import {observer, inject} from "mobx-react";


@inject('mainStore')
@observer
export default class HeaderGUI extends React.Component{
    render() {
      // TO-DO : rewrite the way Avatar image is loading in order to be dynamic
      const {authStore, navOptionsStore} = this.props.mainStore;
      const paths = navOptionsStore.navPaths;
      const currentDate = navOptionsStore.currentDate;
      const username = authStore.username;
      return(
        <div className="headercontainer">
          <div className="hPaths">
            {this.managePathString(paths)}
          </div>
          <div className="hTime">
            {this.getCurrentDateString(currentDate)}
          </div>
          <div className="hUserInfo">
            <img src={AvatarImage} className="avatarimg" style={{paddingRight:'16px'}}/>
            <div style={{paddingRight:'16px'}}>{username}</div>
            <img src={Expand} className="expandimg" style={{paddingRight:'16px'}}/>
          </div>
        </div>
      )
    }


    managePathString(paths) {
      // TO-DO : fill in the function with proper code
      return paths[0];
    }


    getCurrentDateString(currentDate){
      return currentDate.toUTCString().split(" ").slice(0,4).join(" ");
    }

}
