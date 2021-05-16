import React,{useState,useRef,useEffect} from 'react'
import firebase from 'firebase/app';
import './chatroom.css'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ParticlesBg from 'particles-bg'


function ChatRoom({auth,firestore}) {
    const dummy = useRef();
    const messagesRef = firestore.collection('readings');
    const query = messagesRef.orderBy('arrivedAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [sensor,setsensor] = useState('Smoke Sensor');
    const [svalue,setsvalue] = useState('LOW');
   
    
    const sendMessage = async (e) => {
      e.preventDefault();
      const { uid, photoURL,displayName } = auth.currentUser;
     
      await messagesRef.add({
        name: sensor,
        value:svalue,
        arrivedAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        user:displayName
      })
  
      setsensor('Smoke Sensor');
      setsvalue('')
      dummy.current.scrollIntoView({ behavior: 'smooth' });
      
    }
  
    return (<>
      <main>
        {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg}  />)}
        <span ref={dummy}></span>
      </main>
     
      <form onSubmit={sendMessage}>
     
      <h1>Enter your sensor readings</h1>
        <span>Sensor Type</span>
        <select value={sensor} onChange={(e)=>setsensor(e.target.value)}>
          <option defaultValue value="Smoke Sensor">Smoke Sensor</option>
          <option value="PIR Sensor">PIR Sensor</option>
          <option  value="Window Sensor">Window Sensor</option> 
        </select>
        <span>Sensor Reading</span>
        {sensor==="Smoke Sensor" ? <input type="number" value={svalue} onChange={(e)=>setsvalue(e.target.value)} />: <select
         value={svalue} onChange={(e)=>setsvalue(e.target.value)}>
          <option defaultValue value="LOW">LOW</option>
          <option value="HIGH">HIGH</option>
         
        </select>}
        
       
        <button type="submit" >Send your Reading to cloud</button>
      </form>
    </>)
  }

function ChatMessage({message}) {
    let { name, uid, photoURL,value,user,arrivedAt } = message;
    const [warning,setwarning] =useState('');
    
    
     useEffect(() => {
      if(name==="Smoke Sensor" && parseInt(value) >300 )
      setwarning(" ,a Fire started in your home. ")
    else if(name==="PIR Sensor" && value==="HIGH") 
    {
      setwarning(" ,a person was detected inside your home.")
    }
    else if(name==="Window Sensor" && value==="HIGH") 
    {
      setwarning(" ,someone just entered your home through your window.")
    }
   
     }, [])
       
  
    
    return (<>
     <div className={"message sent" }>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>House Owner: {user} <br /> Sensor Name: {name} <br />Sensor value: {value}</p>
     </div>
     {warning &&<div className="message error"> 
        <p>{user}{warning}</p>
     </div>}
     
    </>)
}  

export default ChatRoom
