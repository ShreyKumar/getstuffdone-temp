import React, {Component} from 'react';
import {Route, history} from 'react-router-dom';

import * as firebase from 'firebase';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {verified: false, email: "", msg: ""};

    this.getParameterByName = this.getParameterByName.bind(this);
    var mode = this.getParameterByName("mode");
    var actionCode= this.getParameterByName("oobCode");

    if(mode == "verifyEmail"){
      console.log("verify the email");
      firebase.auth().applyActionCode(actionCode).then(function(resp){
        console.log("verified");
        this.setState({verified: true});
      }).catch(function(error){
        console.log("error");
        console.log(error);
        this.setState({verified: false});
      }.bind(this));

      firebase.auth().onAuthStateChanged(function(user){
        if(this.state.verified){
          this.setState({email: user.email});
        } else {
          this.setState({msg: "Oops! This link may have expired or already been used. Please try again later."});
        }
      }.bind(this))

    } else {
      console.log("other modes");
    }
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  render(){

    var container = <div id="dashboard">;

    if(this.state.verified){
      var ret = start.push(
        <p>Your email <b>{this.state.email}</b> has been sucessfully verified.</p>
      );
    } else {
      var ret = start.push(<p>{this.state.msg}</p>);
    }

    ret.push(end);
    return ret;
  }
}
export {Dashboard}
