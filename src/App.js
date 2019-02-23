import React, {
    Component
} from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';



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
    render() {
        return ( <
            div >
            <
            RoomList firebase = {
                firebase
            }
            /> <
            /div>
        );
    }
}

export default App;
