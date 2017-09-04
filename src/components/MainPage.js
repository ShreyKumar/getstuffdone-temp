import React, { Component } from 'react';
import './../css/main.css';
import App from './App';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};

  }

  handleValid(index){
    console.log("An event just changed!")
  }

  render() {
    return (
      <div id="forms">
        <Form name="login" />
        <Form name="register" />
      </div>
    );
  }
}

class Field extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleYear = this.handleYear.bind(this);

    //this.props.isValid(this);
    this.state = {
      msg: "",
      daymsg: "",
      yearmsg: "",
      valid: false
    };
  }

  handleChange(event){

    var inp = event.target.value;

    if(this.props.name == "email"){
      if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(inp)){
        this.setState({msg: "", valid: true})
        this.props.isValid(this);
      } else {
        this.setState({msg: "Sorry! Invalid Email.", valid: false})
      }
    } else if(this.props.name == "password") {
      if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(inp)){
        this.setState({msg: "", valid: true})
        this.props.isValid(this);
      } else {
        this.setState({msg: "Sorry! Your password should be at least 8 alpha-numeric characters with 1 number, 1 uppercase and 1 lowercase letter.", valid: false})
      }
    } else if(this.props.name == "username"){
      if(inp.length > 5){
        this.setState({msg: "", valid: true})
        this.props.isValid(this);
      } else {
        this.setState({msg: "Sorry! Your username should be greater than 5 characters", valid: false})
      }
    } else if(this.props.name == "firstname" || this.props.name == "lastname") {
      if(inp.length > 1 && inp.charAt(0) == inp.charAt(0).toUpperCase()){
        this.setState({msg: "", valid: true})
        this.props.isValid(this);
      } else {
        this.setState({msg: "Sorry! Invalid Firstname or Lastname", valid: false})
      }
    } else {
      //more to come later
    }

  }

  handleDay(event){
    var inp = event.target.value;
    var isNum = /^\d+$/.test(inp);

    if(inp > 31 || inp < 1 || !isNum){
      this.setState({daymsg: "Sorry! Day must be between 1 and 31", dayvalid: false});
      console.log(this.state);
    } else {
      this.setState({daymsg: "", dayvalid: true});
      this.props.isValid({target: "day"});
    }
  }

  handleYear(event){
    var inp = event.target.value;
    var d = new Date();
    var isNum = /^\d+$/.test(inp);

    if(inp < d.getFullYear()-100 || inp > d.getFullYear() || !isNum){
      this.setState({yearmsg: "Sorry! You can't be more than 100 years old.", yearvalid: false});
    } else {
      this.setState({yearmsg: "", yearvalid: true});
      this.props.isValid({target: "year"});
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
      const day = <div className="day-container">
        <input className="day" type="text" placeholder="Day" maxLength="2" onChange={this.handleDay} />
        <p className="day-error"><i>{this.state.dayvalid ? "" : this.state.daymsg}</i></p>
        </div>;
      const month = <div className="month-container">
      <select className="month">
        <option className="def" value="0">Month:</option>
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
      </div>;
      const year = <div className="year-container">
      <input className="year" type="text" placeholder="Year" maxLength="4" onChange={this.handleYear} />
      <p className="year-error"><i>{this.state.yearvalid ? "" : this.state.yearmsg}</i></p>
      </div>;

      let birthday = [];
      if(this.props.want.includes("day")){
        birthday.push(day);
      }
      if(this.props.want.includes("month")){
        birthday.push(month);
      }
      if(this.props.want.includes("year")){
        birthday.push(year);
      }

      return(
        <div className={"field-" + this.props.name}>
          <label>Birthday: </label>
          {birthday}
        </div>

      )
    } else {
      //more to come
    }
  }
}

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {validFields: [], msg: ""};
    this.addValidField = this.addValidField.bind(this);
    this.fieldExists = this.fieldExists.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  fieldExists(currentFields, field){
    for(var i = 0; i < currentFields.length; i++){
      if(currentFields[i] == field){
        return true;
      }
    }
    return false;
  }

  addValidField(field){
    var currentFields = this.state;
    //push only once
    if(!this.fieldExists(currentFields.validFields, field)){
        currentFields.validFields.push(field);
        this.setState(currentFields);
    }
  }
  handleRegister(event){
    event.preventDefault();
    var input_username = event.target.elements.item(0).value;
    var input_email = event.target.elements.item(1).value;
    var input_pwd = event.target.elements.item(2).value;
    var input_firstname = event.target.elements.item(3).value;
    var input_lastname = event.target.elements.item(4).value;
    var input_day = event.target.elements.item(5).value;
    var input_month = event.target.elements.item(6).value;
    var input_year = event.target.elements.item(7).value;

    //check all fields
    if(this.state.validFields.length >= 7){
      //check birthday month emptiness
      if(input_month > 0){
          //all good, send to the database

      } else {
        var currentMsg = this.state;
        currentMsg.msg = "Sorry, some of your information is invalid/empty"
        this.setState(currentMsg);
      }

    } else {
      //fix everything first!
      var currentMsg = this.state;
      currentMsg.msg = "Sorry, some of your information is invalid/empty"
      this.setState(currentMsg);
    }
  }
  handleLogin(event){
    event.preventDefault();
    if(this.state.length == 2){
      //all logged in
      console.log("logged in");
    } else {
      console.log("woops");
    }
  }

  render(){
    if(this.props.name == "register"){
      return(
        <div className={this.props.name + "-form"}>
          <h1>Register</h1>
          <h4>Basic information first. Then you can update your profile later</h4>
          <p><i>You have to be 18+ to use this app</i></p>
          <form onSubmit={this.handleRegister}>
            <Field name="username" type="text" displayname="Username" example="Bob941" isValid={this.addValidField} />
            <Field name="email" type="text" displayname="Email" example="bob@gmail.com" isValid={this.addValidField}/>
            <Field name="password" type="password" displayname="Password" example="" isValid={this.addValidField}/>
            <Field name="firstname" type="text" displayname="Firstname" example="Bob" isValid={this.addValidField}/>
            <Field name="lastname" type="text" displayname="Lastname" example="Smith" isValid={this.addValidField}/>
            <Field name="birthday" type="birthday" want={["day", "month", "year"]} isValid={this.addValidField} />

            <p className="register-error"><i>{this.state.msg}</i></p>
            <input type="submit" value="Register" />
          </form>
        </div>
      )
    } else {
      //login
      return(
        <div className={this.props.name + "-form"}>
          <h1>Login</h1>
          <h4>Login with your Email, Facebook, Google+ or Twitter accounts</h4>
          <form onSubmit={this.handleLogin}>
            <Field name="email"type="text" displayname="Email" example="bob@gmail.com" isValid={this.addValidField} />
            <Field name="password" type="password" displayname="Password" example="" isValid={this.addValidField}/>
            <input type="submit" value="Login" />
          </form>
        </div>
      )
    }
  }
}


export {MainPage};
