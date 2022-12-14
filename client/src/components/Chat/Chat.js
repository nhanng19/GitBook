import styles from "./Chat.module.css";
import { io } from "socket.io-client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";

const Chat = () => {
    
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    
    const username = user.username
    const room = 'tempRoomID'
    console.log(room);

    const socket = io('http://localhost:3000');
    

    socket.emit('joinRoom', { username, room })

    // Send message to server side.
    socket.on('message', message => {
        outputMessage(message);
    })

    // Submit chat function
    const submitForm = (e) => {
        e.preventDefault();
        // retrieve text to send
        const msg = e.target.elements.msg.value;
        // sending message to server
        socket.emit('chatMessage', msg)
        // Clear input and focus on input area
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    }

    // function to recieve data from server and render it onto page
    function outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="userMessage">${message.username} <span>${message.time}</span></p>
        <p className="text">
            ${message.text}
        </p>`;

        document.getElementById('chatBox').appendChild(div);
    }



    return (
        <div className={styles.container}>
            <div className={styles.rightSideBar}>
                <h2 className={styles.sideHeader}>Active Users:</h2>
                <hr></hr>
                <ul className={styles.userList}>
                    <li className={styles.user}>Dat</li>
                    <li className={styles.user}>Lydia</li>
                    <li className={styles.user}>Richard</li>
                    <li className={styles.user}>Nhan</li>
                </ul>
            </div>
            <div className={styles.mainChat}>
                <div className={styles.header}>
                    <p className={styles.roomId}>Current Room: {room}</p>
                    {/* <button className={styles.leaveBtn}>Leave Chat</button> */}
                </div>
                <div className={styles.chatBox} id='chatBox'>
                    
                </div>
                <form className={styles.chatInput} id='chatForm' onSubmit={submitForm}>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter message"
                        className={styles.chatText}
                        autoComplete="off"
                        required>
                    </input>
                    <button className={styles.sendBtn} type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
};

export default Chat;