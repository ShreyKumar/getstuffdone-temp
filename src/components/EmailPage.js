import React, {Component} from 'react';
import {Dashboard as Dash} from './Dashboard';
import {MainPage as Main} from './MainPage';

import * as firebase from 'firebase';

class EmailPage extends Component {
  constructor(props){
    super(props);
    this.state = {user: null};

    this.verifyEmail = this.verifyEmail.bind(this);



    console.log(firebase.auth().currentUser);

    firebase.auth().onAuthStateChanged(function(user){
      this.setState({user: user});
      //if(user != null){
      //} else {
      //  window.location.href = "/";
      //}
      if(this.state.user.emailVerified){
        window.location.href = "/dashboard";
      } else {
        //send email
        this.verifyEmail(this.state.user);
      }
    }.bind(this));




  }

  verifyEmail(){
    this.state.user.sendEmailVerification().then(function() {
      console.log("email sent");
    }).catch(function(error) {
      console.log("error");
      console.log(error);
    });
  }

  render() {
    //inform user
    return (
        <div id="email">
            An email has been sent to {this.state.email}.
            Please check your inbox and follow the instructions to
            activate your account. If you haven't recieved it,
            click <a href="#" onClick={this.verifyEmail}>here</a> to send it again.
            If it still doesn't work, something is wrong. Contact
            <a href="mailto:shreyanshkumar@mail.utoronto.ca">me</a> right away!
        </div>
    );
  }
}

export {EmailPage};
