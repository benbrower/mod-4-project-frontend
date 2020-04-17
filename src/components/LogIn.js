import React, { Component } from "react";
let input = "";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handlePasswordChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogin(this.state);
  };

  render() {
    return this.props.logged_in ? (
      <div>Welcome, {this.props.user.username}</div>
    ) : (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Username:
              <input
                id="username"
                name="username"
                type="text"
                onChange={this.handleUserChange}
                value={this.state.username}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                id="passsword"
                name="password"
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
              />
            </label>
          </div>
          <div>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    );
  }
}
export default LogIn;
