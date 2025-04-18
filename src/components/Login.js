import React from 'react';
import { Button } from '@mui/material';
import "./Login.css";
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import { useStateValue } from '../redux/StateProvider';
import { actionTypes } from '../Reducer';

function Login() {
    const [, dispatch] = useStateValue();


    const signIn = async () => {
        
            signInWithPopup(auth, provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
         .catch((error) => alert(error.message));
        
    };

  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904' alt='WhatsApp Logo'/>

            <div className='login__text'>
                <h1>Sign in to Whatapp</h1>
            </div>

            <Button onClick={signIn} type="submit">Sign In With Google</Button>


        </div>
    </div>
  )
}

export default Login
