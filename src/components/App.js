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

  test(user){
    return user.firstname + " " + user.lastname;
  }
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Make Money. Get things done.</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/test">Test</Link></li>
            </ul>
          </header>
          <main>
            <Route exact path="/" component={Home}/>
            <Route path="/test" component={Test}/>
            <Route path="/email" component={Email}/>
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
