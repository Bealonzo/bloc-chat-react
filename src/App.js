import React, {
    Component
} from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLq-nbqZu7cIae5GNbpr1F453Py_nAe-s",
    authDomain: "bloc-chat-c6204.firebaseapp.com",
    databaseURL: "https://bloc-chat-c6204.firebaseio.com",
    projectId: "bloc-chat-c6204",
    storageBucket: "bloc-chat-c6204.appspot.com",
    messagingSenderId: "467838968284"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {activeRoom: ""};
  }

setActiveRoom(room) {
  this.setState({activeRoom: room})
}

  render() {
    const showMessages = this.state.activeRoom;

    return (
      <div className = "App">
      <header className = "header">
        <h1> Bloc Chat!</h1>
      </header>

      <div className="roomNav">
        <RoomList firebase={firebase} activeRoom={this.setActiveRoom.bind(this)} />

      </div>
      <main>
        <h1>{this.state.activeRoom.name}</h1>
        <div id="messageArea">
          {showMessages ? (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key}/>) : (null) }
        </div>
      </main>
      </div>

    );
  }
}

export default App;
