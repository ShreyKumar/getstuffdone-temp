import React, { Component } from 'react';
import logo from './../img/logo.svg';
import './../css/main.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {MainPage as Home} from './MainPage';
import {TestPage as Test} from './TestPage';
import {EmailPage as Email} from './EmailPage';
import {Dashboard as Dash} from './Dashboard';

//firebase stuff
import * as firebase from 'firebase';

//confidential!
var config = {
    apiKey: "AIzaSyAHBSmUDKQPK8Peak4tIU25EBoKmdC4eLw",
    authDomain: "ezplan-151110.firebaseapp.com",
    databaseURL: "https://ezplan-151110.firebaseio.com",
    projectId: "ezplan-151110",
    storageBucket: "ezplan-151110.appspot.com",
    messagingSenderId: "730103684501"
  };
var fireapp = firebase.initializeApp(config);
var defaultStorage = firebase.storage();
var defaultDatabase = firebase.database();


class App extends Component {
  constructor(props){
    super(props);
    firebase.auth().onAuthStateChanged(function(user){
    console.log(user.emailVerified);
      if(user && window.location.pathname != "/dashboard" && user.emailVerified){
        console.log("redirect");
        window.location.href = "/dashboard";
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Make Money. Get things done.</h1>
            <ul>
              <li><Link to="/">Main</Link></li>
              <li><Link to="/test">Test</Link></li>
            </ul>
          </header>
          <main>
            <Route exact path="/" component={Home}/>
            <Route path="/test" component={Test}/>
            <Route path="/email" component={Email}/>
            <Route path="/dashboard" component={Dash} />
          </main>
          <footer>
            A <a href="http://shreykumar.com">Shreyansh Kumar</a> production
          </footer>
        </div>
      </Router>
    );
  }
}


export default App;
