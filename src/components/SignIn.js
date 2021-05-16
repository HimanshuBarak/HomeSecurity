import firebase from 'firebase/app';
import React from 'react'

function SignIn({auth}) {
  
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p style={{textAlign:'center',maxWidth:"100%",fontSize:"clamp(12px,4vw,24px)"}}>Get connected with the cloud at the click of a button and make your home  more secure.</p>
      </>
    )
  
  }

  export default SignIn;