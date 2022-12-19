// import React from "react";
// import styles from "./JoinChat.module.css";
// import { useNavigate } from 'react-router-dom';

// const JoinChat = () => {
//     const navigate = useNavigate();
//     const [userName, setUserName] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         localStorage.setItem('userName', userName);
//         // navigate('/chat');
//     }

//     return (
//         <form className={styles.joinContainer} onSubmit={handleSubmit}>
//             <div className={styles.form}>
//                 <label>Username:</label>
//                 <input
//                     type='text'
//                     name='username'
//                     id="username"
//                     placeholder="Enter username"
//                     className="inputField"
//                     required />
//             </div>
//             <div className={styles.form}>
//                 <label>Chatroom:</label>
//                 <select name="room" id="room" className="inputField">
//                     <option value="General">General</option>
//                     <option value="Questions">Questions</option>
//                     <option value="Colaboration">Colaboration</option>
//                     <option value="Offtopic">Off topic</option>
//                     <option value="userInput">userInput</option>
//                 </select>
//             </div>
//             <button className="styles.btn">Join Chatroom</button>
//         </form>
//     )
// };

// export default JoinChat;