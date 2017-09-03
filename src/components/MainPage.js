import React, { Component } from 'react';
import './../css/main.css';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

  }

  handleLogin(event) {
    event.preventDefault();
  }
  handleRegister(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="forms">
        <div className="login-form">
          <h1>Login</h1>
          <h4>Login with your Email, Facebook, Google+ or Twitter accounts</h4>
          <form onSubmit={this.handleLogin}>
            <Field name="email" type="text" displayname="Email" example="bob@gmail.com"/>
            <Field name="password" type="password" displayname="Password" example=""/>
            <input type="submit" value="Login" />
          </form>
        </div>
        <div className="register-form">
          <h1>Register</h1>
          <h4>Basic information first. Then you can update your profile further later</h4>
          <p><i>You have to be 18+ to use this app</i></p>
          <form onSubmit={this.handleRegister}>
            <Field name="username" type="text" displayname="Username" example="Bob94" />
            <Field name="email" type="text" displayname="Email" example="bob@gmail.com"/>
            <Field name="password" type="password" displayname="Password" example=""/>
            <Field name="firstname" type="text" displayname="Firstname" example="Bob"/>
            <Field name="lastname" type="text" displayname="Lastname" example="Smith"/>
            <Field type="birthday" />

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

    this.state = {msg: "", valid: false};
  }

  handleChange(event){
    event.preventDefault();

    var inp = event.target.value;

    if(this.props.name == "email"){
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inp)){
        this.setState({msg: "", valid: true})
      } else {
        this.setState({msg: "Sorry! Invalid Email.", valid: false})
      }
    } else if(this.props.name == "password") {
      if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(inp)){
        this.setState({msg: "", valid: true})
      } else {
        this.setState({msg: "Sorry! Your password should be at least 8 alpha-numeric characters with at least 1 number, 1 uppercase and 1 lowercase letter.", valid: false})
      }
    } else if(this.props.name == "username"){
      if(inp.length > 5){
        this.setState({msg: "", valid: true})
      } else {
        this.setState({msg: "Sorry! Your username should be greater than 5 characters", valid: false})
      }
    } else {
      if(inp.length > 1 && inp == inp.charAt(0).toUpperCase()){
        this.setState({msg: "", valid: true})
      } else {
        this.setState({msg: "Sorry! Invalid Firstname or Lastname", valid: false})
      }
    }

  }

  render(){

    if(this.props.type == "text" || this.props.type == "password"){
      //input
      return(
        <div className={"field-" + this.props.name}>
          <label>{this.props.displayname}: </label>
          <input className={this.state.valid ? "valid" : "invalid"} type={this.props.type} onChange={this.handleChange} placeholder={this.props.example} />
          <p className={this.props.name + "-error"}><i>{this.state.msg}</i></p>
        </div>
      )
    } else if(this.props.type == "birthday") {
      //birthday
      return(
        <div className="field-birth">
          <label>Birthday: </label>
          <input className="day" type="text" placeholder="Day" maxlength="2"/>
          <select className="month">
            <option className="def" value="0">Please Select:</option>
            <option className="jan" value="1">January</option>
            <option className="feb" value="2">Febuary</option>
            <option className="mar" value="3">March</option>
            <option className="apr" value="4">April</option>
            <option className="may" value="5">May</option>
            <option className="jun" value="6">June</option>
            <option className="jul" value="7">July</option>
            <option className="aug" value="8">August</option>
            <option className="sep" value="9">September</option>
            <option className="oct" value="10">October</option>
            <option className="nov" value="11">November</option>
            <option className="dec" value="12">December</option>
          </select>
          <input className="year" type="text" placeholder="Year" maxlength="4" />
        </div>

      )
    } else {
      //more to come
    }
  }
}


export {MainPage};
