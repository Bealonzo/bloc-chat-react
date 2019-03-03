import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], username:"" ,content: "", sentAt: "", roomId: "" };
    this.messagesRef = this.props.firebase.database().ref('messages');


  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });

    });
  }




  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages


    .filter(message => message.roomId === activeRoom)
    .map(message => {
      return <div key={message.key}>{"From: " + message.username + " | Sent At: " + message.sentAt + " | Message: " + message.content}</div>
    })

    return (
      <div className='messageList'>{messageList}</div>

    );
  }
}

export default MessageList;
