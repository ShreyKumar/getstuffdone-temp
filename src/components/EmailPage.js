import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Dashboard as Dash} from './Dashboard';
import {MainPage as Main} from './MainPage';

import * as firebase from 'firebase';

class EmailPage extends Component {
  constructor(props){
    super(props);
    this.state = {email: "", user: []};

    this.verifyEmail = this.verifyEmail.bind(this);

    console.log(this.state);
    console.log(this.state.user.length != 0);

    var newUser = this.state.user;
    newUser = newUser.push(firebase.auth().currentUser);

    this.setState({user: newUser});

    console.log(this.state);


  }

  verifyEmail(user){
    user.sendEmailVerification().then(function() {
      console.log("email sent");
    }).catch(function(error) {
      console.log("error");
      console.log(error);
    });
  }

  render() {
    if(this.state.user[0] != null){
      if(this.state.user[0].emailVerified){
        return (
          <Switch>
            <Route path="/dashboard" component={Dash} />
            <Redirect from="/email" to="/dashboard" push />
          </Switch>
        )
      } else {
        //send email
        this.verifyEmail(this.state.user[0]);

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
    } else {
      return (
        <Switch>
          <Route path="/" component={Main} />
          <Redirect from="/email" to="/" push />
        </Switch>
      )
    }
  }
}

export {EmailPage};
