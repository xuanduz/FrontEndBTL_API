import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";

import Button from "../components/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: "",
        password: "",
      },
      loginStatus: false,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  responseGG = (res) => {
    const obj = res.profileObj;
    var addUser = {
      email: obj.email,
      fname: obj.familyName,
      lName: obj.givenName,
      uname: obj.email,
      password: obj.googleId,
      contact: obj.email,
      address: obj.email,
    };
    axios
      .get(process.env.REACT_APP_API + "checkAccount?username=" + addUser.uname)
      .then((res) => {
        if (res.data === "NOT EXIST") {
          var addNewUser =
            process.env.REACT_APP_API +
            "register?fname=" +
            addUser.fname +
            "&lname=" +
            addUser.lName +
            "&uname=" +
            addUser.uname +
            "&password=" +
            addUser.password +
            "&email=" +
            addUser.email +
            "&phonenumber=" +
            addUser.contact +
            "&address=" +
            addUser.address;
          axios.post(addNewUser).then((res) => {
            if (res.data === "Success") {
              localStorage.setItem("ACCOUNT", JSON.stringify(addUser.uname));
              window.location.href = "/";
            } else {
              alert(res.data);
            }
          });
        } else {
          alert("Success");
          localStorage.setItem("ACCOUNT", JSON.stringify(res.data));
          window.location.href = "/";
        }
      })
      .catch((res) => console.log(res));
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let res = await axios.get(
      process.env.REACT_APP_API +
        "login" +
        "/" +
        this.state.login.username +
        "/" +
        this.state.login.password
    );
    if (res.data === false) {
      alert("Invalid username or password");
    } else {
      alert("Success");
      localStorage.setItem(
        "ACCOUNT",
        JSON.stringify(this.state.login.username)
      );
      window.location.href = "/";
    }
  };

  handleChange = (e) => {
    let newData = { ...this.state.login };
    newData[e.target.id] = e.target.value;
    this.setState({ login: newData });
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="username">User Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.login.username}
                      placeholder="Input your user name"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="password">Password</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.login.password}
                      placeholder="Password"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="login-submit">
              <Button text="Login" />
            </div>
          </form>
          <div className="login-with-gg">
            <GoogleLogin
              clientId="151924404736-bl390pgbdog67kh6b9po5pe5nlhqfqqd.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGG}
              onFailure={this.responseGG}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          </div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
