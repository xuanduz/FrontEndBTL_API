import React, { Component } from "react";
import axios from "axios";
import validator from "validator";

import Button from "../components/Button";

class Register extends Component {
  constructor(props) {
    super(props);
    this.fNameRef = React.createRef();
    this.lNameRef = React.createRef();
    this.userNameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneNumberRef = React.createRef();
    this.addressRef = React.createRef();
    this.state = {
      error: "",
      register: {
        fName: "",
        lName: "",
        usernameRes: "",
        passwordRes: "",
        email: "",
        address: "",
        phoneNumber: "",
      },
    };
  }

  validateForm = () => {
    var hasError = false;
    var errorString = "";

    if (document.getElementById("fName").value == "") {
      hasError = true;
      errorString += "\nEnter first name";
    }

    if (document.getElementById("lName").value == "") {
      hasError = true;
      errorString += "\nEnter last name";
    }

    if (document.getElementById("usernameRes").value == "") {
      hasError = true;
      errorString += "\nEnter username";
    }

    if (document.getElementById("passwordRes").value === "") {
      hasError = true;
      errorString += "\nEnter password";
    }

    if (document.getElementById("email").value === "") {
      hasError = true;
      errorString += "\nEnter email";
    }

    if (document.getElementById("phoneNumber").value === "") {
      hasError = true;
      errorString += "\nEnter phone number";
    }

    if (document.getElementById("address").value === "") {
      hasError = true;
      errorString += "Enter address";
    }

    if (hasError) {
      return errorString;
    }
    return true;
  };

  handleRegister = (e) => {
    e.preventDefault();
    // this.validateForm();
    const result = this.validateForm();
    if (result === true) {
      var addNewUser =
        process.env.REACT_APP_API +
        "register?fname=" +
        document.getElementById("fName").value +
        "&lname=" +
        document.getElementById("lName").value +
        "&uname=" +
        document.getElementById("usernameRes").value +
        "&password=" +
        document.getElementById("passwordRes").value +
        "&email=" +
        document.getElementById("email").value +
        "&phonenumber=" +
        document.getElementById("phoneNumber").value +
        "&address=" +
        document.getElementById("address").value;

      axios.post(addNewUser).then((res) => alert(res.data));
    } else {
      alert(result);
    }
  };

  handleChange = (e) => {
    let newData = { ...this.state.register };
    newData[e.target.id] = e.target.value;
    this.setState({ register: newData });
  };

  render() {
    return (
      <div className="login-wrapper register-wrapper">
        <div className="login register">
          <h1>Register</h1>
          <form onSubmit={this.handleRegister}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="fName">First Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      ref={this.fNameRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.fName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="lName">Last Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      ref={this.lNameRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.lName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="usernameRes">User Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="usernameRes"
                      id="usernameRes"
                      ref={this.userNameRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.username}
                      placeholder="Input your user name"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="passwordRes">Password</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="passwordRes"
                      id="passwordRes"
                      ref={this.passwordRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.password}
                      placeholder="Password"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="email">Email</label>
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      ref={this.emailRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.email}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="phoneNumber">Phone Number</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      ref={this.phoneNumberRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.phoneNumber}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="address">Address</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      ref={this.addressRef}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.register.address}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="login-submit">
              <Button text="Register" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
