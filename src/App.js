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
  apiKey: "AIzaSyDC1KO2whA-C9lcICSoZNqFhuru8LD6sy8",
  authDomain: "homesecurity-7225a.firebaseapp.com",
  projectId: "homesecurity-7225a",
  storageBucket: "homesecurity-7225a.appspot.com",
  messagingSenderId: "980796948338",
  appId: "1:980796948338:web:af3174785d0629c4f1e7eb"
})


const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
 
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#FFFFFF" num="300" bg={true} />
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
