import React, { Component } from "react";

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    console.log("mounted");
    fetch("http://localhost:3001/leaderboards")
      .then((res) => res.json())
      .then(
        (data) => this.setState({ players: data }),
        () => console.log("state")
      );
  }

  loadBoard = () => {
    const users = [];
    this.state.players.map((player) => {
      users.push(this.props.users.find((user) => user.id === player.user_id));
    });
    return users[this.state.players.length - 1]
      ? this.renderBoard(users)
      : console.log("no way jose");
  };

  renderBoard = (users) => {
    return this.state.players.map((player, index) => {
      return <li>{`${users[index].username} ${player.score}`}</li>;
    });
  };

  render() {
    return <div>{this.loadBoard()}</div>;
  }
}
export default Leaderboard;
