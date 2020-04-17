import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import LogIn from "./components/LogIn";
import Leaderboard from "./components/Leaderboard";
import NavBar from "./components/NavBar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      users: [],
      logged_in: false,
    };
  }
  // const state = {
  //   users: [],
  //   user_id: null,
  //   username: null,
  //   texture: null,
  // };

  componentDidMount() {
    fetch("http://localhost:3001/users/", { method: "GET" })
      .then((res) => res.json())
      .then((data) => this.setState({ users: data }));
  }

  // componentDidMount(){
  //   fetch("http://localhost:3000/users/"+this.state.user_id)
  //   .then(res )
  // }

  postScore = (score) => {
    fetch("http://localhost:300/leaderboards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        score: score,
        user_id: this.state.user.user_id,
      },
    });
  };

  // postScore = (score) => {
  //   const body = {
  //     score: score,
  //     user_id: this.state.user.user_id,
  //   };
  //   fetch("http://localhost:3001/leaderboards/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  // };

  // const postSettings = (settings) => {
  //   fetch("http://localhost:3000/settings/",{
  //     method: "POST",
  //     body: {
  //       texture: settings['texture'],
  //       user_id: this.state.user_id
  //     }

  //   })
  // }

  handleLogout = (event) => {
    console.log("logout");
    this.setState({
      user: {},
      logged_in: false,
    });
  };

  handleLogin = (input) => {
    // event.preventDefault();
    console.log(input.username);
    console.log(input.password);
    console.log(this.state.users);
    const user = this.state.users.find(
      (user) => user.username === input.username
    );
    if (!user) {
      console.log("notfound");
    } else {
      console.log("found");
      if (user.password === input.password) {
        console.log("pw match");
        this.setState({
          user: user,
          logged_in: true,
        });
      } else {
        console.log("f");
      }
    }
  };

  render() {
    //   return (
    return (
      <Router>
        <div className="App">
          <NavBar
            handleLogout={this.handleLogout}
            user={this.state.user}
            logged_in={this.state.logged_in}
          />
          <Route
            exact
            path="/"
            component={() => (
              <LogIn
                user={this.state.user}
                handleLogin={this.handleLogin.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/leaderboard"
            component={() => <Leaderboard users={this.state.users} />}
          />
          <Route
            exact
            path="/play"
            username={this.state.username}
            component={() => (
              <Game user={this.state.user} submitScore={this.postScore} />
            )}
          />
        </div>
      </Router>
    );
  }
}

// export default App;
