import React, { useState } from 'react';
import '../css/SignUp.css';
import CustomButton from '../components/CustomButton';
import { useHistory } from 'react-router-dom';
import { createUser, createProfile } from '../api/Firebase';
import { userToken } from '../State';
import { useRecoilState } from 'recoil';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    const [user, setUser] = useRecoilState(userToken);
    let history = useHistory();

    const signup = () => {
        //validation
        if (validation() === 1) {
            setError("Please fill all fields");
            return;
        }
        if (validation() === 2) {
            setError("Both passwords must match");
            return;
        }

        //create the user
        createUser(username, password, (myUser) => {

            //save the user token globally
            setUser(myUser);

            //create Profile
            let data = {
                email: username,
                imageUrl: "no image set"
            };

            createProfile(myUser.user.uid, data, docRef => {
                //profile created
                history.push("/");
            }, error => {
                setError("Error creating profie");
                console.log("Profile Error: ", error);
            });
        }, error => {
            //Handle any errors
            setError("Error: " + error.code + " :: " + error.message);


        });
    }

    const updateUsername = e => {
        setUsername(e.target.value);
        setError('');
    }

    const updatePassword = e => {
        setPassword(e.target.value);
        setError('');
    }

    const updateConfirm = e => {
        setConfirm(e.target.value);
        setError('');
    }

    const validation = () => {
        if (username.trim() === '') return 1;
        if (password.trim() === '') return 1;
        if (confirm.trim() === '') return 1;
        if (confirm !== password) return 2;

        return 0;
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-card-header">
                    <h3>Sign Up</h3>
                </div>

                <div className="signup-card-main">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" value={username} onChange={updateUsername} />
                    <label htmlFor="password" >Password</label>
                    <input id="password" type="password" placeholder="Password" value={password} onChange={updatePassword} />
                    <label htmlFor="confirm" >Confirm Password</label>
                    <input id="confirm" type="password" placeholder="Confirm Password" value={confirm} onChange={updateConfirm} />
                    <CustomButton className="signup-button" width="50%" onClick={signup}>Sign Up</CustomButton>
                </div>

                <div className="signup-card-footer">
                    <p className="signup-error">{error}</p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;