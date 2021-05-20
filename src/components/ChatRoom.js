import React,{useState,useRef,useEffect} from 'react'
import firebase from 'firebase/app';
import './chatroom.css'
import { useCollectionData } from 'react-firebase-hooks/firestore';


function ChatRoom({auth,firestore}) {
    const dummy = useRef();
    const messagesRef = firestore.collection('readings');
    const query = messagesRef.orderBy('arrivedAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
   
  
    
    const sendMessage = async () => {
    
      const { uid, photoURL,displayName } = auth.currentUser;
      const val = ['HIGH','LOW']
      
      let svalue,svalue1,svalue2;
   
   //generating random sensor data   
     
    svalue =Math.floor(Math.random()*200 +200)
    await messagesRef.add({
        name: 'Smoke Sensor',
        value:svalue,
        arrivedAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        user:displayName
      })

      svalue1 = val[Math.floor(Math.random()*val.length)]
      await messagesRef.add({
          name:"PIR Sensor" ,
          value:svalue1,
          arrivedAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL,
          user:displayName
        })
      svalue2 = val[Math.floor(Math.random()*val.length)]
      await messagesRef.add({
            name: "Window Sensor",
            value:svalue2,
            arrivedAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            user:displayName
          })
     
         
    }
     useEffect(() => {
        console.log("iss bar toh chla bhai")  
       setTimeout(sendMessage,10000);
     }, [])
    
    return (<>
      <main>
        {messages && messages.map(msg => <ChatMessage auth={auth} key={msg.id} message={msg}  />)}
        <span ref={dummy}></span>
      </main>
     
    
       
    </>)
  }

function ChatMessage({message}) {
    let { name, uid, photoURL,value,user,arrivedAt } = message;
    const [warning,setwarning] =useState('');
    
    
     useEffect(() => {
      if(name==="Smoke Sensor" && parseInt(value) >300 )
      setwarning(" ,a Fire started in your home at ")
    else if(name==="PIR Sensor" && value==="HIGH") 
    {
      setwarning(" ,a person was detected inside your home at ")
    }
    else if(name==="Window Sensor" && value==="HIGH") 
    {
      setwarning(" ,someone just entered your home through your window at ")
    }
   
     }, [])
       
  
    
    return (<>
     <div className={"message sent" }>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>House Owner: {user} <br /> Sensor Name: {name} <br />Sensor value: {value}</p>
     </div>
     {warning &&<div className="message error"> 
        <p>{user}{warning}{arrivedAt && arrivedAt.toDate().toString()}</p>
     </div>}
     
    </>)
}  

export default ChatRoom
