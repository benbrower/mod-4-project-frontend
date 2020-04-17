import React from 'react';
import './App.css';
import Game from './components/Game';
import Test from './components/Test';


function App() {
  state = {
    user_id: null,
    username: null,
    texture: null,

    }
  }
  componentDidMount(){
    fetch("http://localhost:3000/users/"+this.state.user_id)
    .then(res )
  }


  const postScore = (score) => {
    fetch("http://localhost:3000/leaderboards/",{
      method: "POST",
      body: {
        score: score,
        user_id: this.state.user_id
      }

    })
  }

  const postSettings = (settings) => {
    fetch("http://localhost:3000/settings/",{
      method: "POST",
      body: {
        texture: settings['texture'],
        user_id: this.state.user_id
      }

    })
  }

  return (
    <div className="App">
      { /*< Test /> */}
  < Game user={this.state.username}
         texture={this.state.texture}
         postScore={this.postScore}
  />

    </div>
  );
}

export default App;
