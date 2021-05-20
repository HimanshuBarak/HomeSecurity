import React  from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import ChatRoom from './components/ChatRoom'
import ParticlesBg from 'particles-bg'
//import AuthContext from './context/AuthContext'
import { useAuthState } from 'react-firebase-hooks/auth';


firebase.initializeApp({
  apiKey: "AIzaSyCWq7GDaj8qbbvo4iVILrfHqbF0CYMB4hk",
    authDomain: "security-ff744.firebaseapp.com",
    projectId: "security-ff744",
    storageBucket: "security-ff744.appspot.com",
    messagingSenderId: "824027621738",
    appId: "1:824027621738:web:b35303f71e14d6e4565d13"
})


const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
 
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
     
      <header>
        <h1 style={{fontSize:"clamp(18px,6vw,38px)"}}>HomeSecurity Panel</h1>
        <SignOut auth={auth}/>
      </header>

      <section>
        {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth}/>}
      </section>

    </div>
  );
}









export default App;
