import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], content: "", sentAt: "", roomId: "", };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }

handleChange(event) {
  this.setState({ content: event.target.value });
}

createChat(event, user) {
  event.preventDefault();
  this.messagesRef.push ({
    user: this.props.user,
    content: this.state.content,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom,
  });
  
  this.setState({content: ''});
}


  render() {
    const activeRoom = this.props.activeRoom;
    const messageList = this.state.messages

    .filter(message => message.roomId === activeRoom)
    .map(message => {
      return <div key={message.key}>{"From: " + message.user + " | Sent At: " + message.sentAt + " | Message: " + message.content}</div>
    })

    return (
      <section>
      <div className='messageList'>{messageList}</div>
      <form id="create-new-chat">
        <input type="text" value={this.state.content} onChange={(event) => this.handleChange(event)} />
        <input type="submit" onClick={(event) => this.createChat(event)} />
      </form>
      </section>

    );
  }
}

export default MessageList;
