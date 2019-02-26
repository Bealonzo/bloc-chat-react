import React, {
    Component
} from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rooms: [],
            value: ''
        };
        this.roomsRef = this.props.firebase.database().ref('Rooms');
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({
                Rooms: this.state.Rooms.concat(room)
            });
        });
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.roomsRef.push({
            name: this.state.value
        });

    }
    render() {


            const roomList = this.state.Rooms.map((room) =>
            < li key = {room.key} > {room.name} < /li>
          );


          return (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                      Create a new Room:
                        <input type='text' value={this.state.value} onChange={this.handleChange} />
                  </label>
              <input type='submit' value='Submit' />
          </form>
          <ul>{roomList}</ul>
          </div>

      );
                }
            }
            export default RoomList;
