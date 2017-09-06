import React, {Component} from 'react';
import {Route, history} from 'react-router-dom';

import * as firebase from 'firebase';

class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <h1>Welcome to dashboard!</h1>
    );
  }
}
export {Dashboard}
