import React, {Component} from 'react';
import {Route, history} from 'react-router-dom';

import * as firebase from 'firebase';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.signmeout = this.signmeout.bind(this);

    this.getParameterByName = this.getParameterByName.bind(this);
    var mode = this.getParameterByName("mode");
    var actionCode= this.getParameterByName("oobCode");

    this.state = {verified: "no-link", email: "", msg: ""};

    if(mode == "verifyEmail"){
      console.log("verify the email");
      firebase.auth().applyActionCode(actionCode).then(function(resp){
        console.log("verified");
        this.setState({verified: true});
      }.bind(this)).catch(function(error){
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

  signmeout(){
    firebase.auth().signOut().then(function(){
      window.location.href = "/";
    }, function(error){
      console.log("error");
      console.log(error);
    })
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

    let alert = null;

    if(this.state.verified != "no-link"){
      if(this.state.verified){
        alert = <div className="alert success">Your email <b>{this.state.email}</b> has been sucessfully verified</div>;
      } else {
        alert = <div className="alert error">Oops! This link may have already been used or expired. Please try again later.</div>
      }
    }

    return (<div id="dashboard">
      {alert}
      <h1>Welcome to the dashboard!</h1>
      <p><a href="#" onClick={this.signmeout}>Sign out</a></p>

    </div>);
  }
}
export {Dashboard}
