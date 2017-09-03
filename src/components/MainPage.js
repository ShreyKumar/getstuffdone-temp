import React, { Component } from 'react';
import './../css/main.css';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this);
    this.handleLoginPwdChange = this.handleLoginPwdChange.bind(this);

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

  }

  handleLogin(event) {
    event.preventDefault();
  }
  handleRegister(event) {
    event.preventDefault();
  }

  handleLoginEmailChange(event) {
    this.setState({value: event.target.value});
    var email = event.target.value;

    if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
      this.props.msg = "Correct email";
    } else {
      this.props.msg = "nothing";
    }
  }
  handleLoginPwdChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state);
  }
  handleUserNameChange(event) {
    this.setState({value: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({value: event.target.value});
  }
  handlePwdChange(event) {
    this.setState({value: event.target.value});
  }
  handleNameChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div id="forms">
        <div className="login-form">
          <h1>Login</h1>
          <h4>Login with your Email, Facebook, Google+ or Twitter accounts</h4>
          <form onSubmit={this.handleLogin}>
            <Field name="login-username" displayname="Username" example="bob@gmail.com"/>

            <label>Password: </label>
            <input type="password" onChange={this.handleLoginPwdChange} />
            <p className="login-pass-error"><i></i></p>

            <input type="submit" value="Login" />
          </form>
        </div>
        <div className="register-form">
          <h1>Register</h1>
          <h4>Basic information first. Then you can update your profile further later</h4>
          <p><i>You have to be 18+ to use this app</i></p>
          <form onSubmit={this.handleRegister}>
            <label>Username:</label>
            <input type="text" onChange={this.handleUserNameChange} placeholder="Bob94" />
            <p className="user-error"><i>This is what your potential employers will see</i></p>

            <label>Email:</label>
            <input type="text" onChange={this.handleEmailChange} placeholder="bob@gmail.com" />
            <p className="email-error"><i>Use this to login!</i></p>

            <label>Password:</label>
            <input type="text" onChange={this.handlePwdChange} placeholder="" />
            <p className="pwd-error"><i>Must be at least 8 alpha-numeric characters with at least 1 number and 1 uppercase letter</i></p>

            <label>Firstname:</label>
            <input type="text" onChange={this.handleNameChange} placeholder="Bob" />
            <p className="first-error"><i></i></p>

            <label>Lastname:</label>
            <input type="text" onChange={this.handleNameChange} placeholder="Smith" />
            <p className="last-error"><i></i></p>

            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    );
  }
}

class Field extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    event.preventDefault();

    var inp = event.target.value;

    if(this.props.name == "login-username"){
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inp)){
        this.props.msg = "Valid email.";
      } else {
        this.props.msg = "Sorry! Invalid email.";
      }
    }

  }

  render(){
    return(
      <div className="field-{this.props.name}">
        <label>{this.props.displayname}: </label>
        <input type="text" onChange={this.handleChange} placeholder={this.props.example} />
        <p className="{this.props.name}-error"><i>{this.props.msg}</i></p>
      </div>
    )
  }
}


export {MainPage};
