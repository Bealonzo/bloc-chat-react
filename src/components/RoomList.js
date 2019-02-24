import React, {
    Component
} from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('Rooms');
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
    render() {
            const roomList = this.state.Rooms.map((room) => < li key = {room.key} > {room.name} < /li>);


						return (<ul> {roomList}</ul>);
                }
            }
            export default RoomList;
