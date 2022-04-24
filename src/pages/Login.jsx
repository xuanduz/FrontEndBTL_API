import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    // this.setState({ loginStatus: res.data });
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
          <div className="login-with-fb">
            <span>Login with Facebook</span>
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

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
