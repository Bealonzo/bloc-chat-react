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

    }
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ Rooms: this.state.Rooms.concat(room)
            });
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    createNewRoom(event) {
        event.preventDefault();
        this.roomsRef.push({ name: this.state.value });

    }

    selectRoom(key) {
        this.props.activeRoom(key);
}
    render() {


            const roomList = this.state.Rooms.map((room) =>
            < li key = {room.key} > {room.name} < /li>
          );


          return (
            <section>
              <div>
                 <h3>Rooms:</h3>
                 <ul>
                     {this.state.Rooms.map((room) => {
                         return (
                             <div key={room.key} onClick={(event) => this.selectRoom(room, event)}>{room.name}</div>
                         )
                     })}
                 </ul>
              </div>

              <form id="createNewRoom">
                    <input type="text" value={this.state.newRoom} onChange={(event) => this.handleChange(event)} />
                    <input type="submit" onClick={(event) => this.createNewRoom(event)} />
                </form>
              </section>

      );
                }
            }
            export default RoomList;
