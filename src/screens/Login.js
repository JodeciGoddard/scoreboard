import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import CustomButton from '../components/CustomButton';
import { useHistory } from 'react-router-dom';
import { IsLoggedIn, logUserIn } from '../api/Firebase';
import { userToken } from '../State';
import { useRecoilState } from 'recoil';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [user, setUser] = useRecoilState(userToken);

    const login = () => {
        logUserIn(username, password, (error) => {
            setError('Error: ' + error.code + ' :: ' + error.message);
        })
    }

    useEffect(() => {
        IsLoggedIn(u => {
            console.log("logged In user: ", u);
            setUser(u);
            history.push("/dashboard")
        }, () => {
            console.log("no logged In user");
            setUser('none');
            history.push("/");
        })
    }, []);

    const updateUsername = e => {
        setUsername(e.target.value);
        setError('');
    }

    const updatePassword = e => {
        setPassword(e.target.value);
        setError('');
    }

    const signUp = () => {
        history.push('/SignUp');
    }

    let history = useHistory();

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-card-header">
                    <h3>Login</h3>
                </div>

                <div className="login-card-main">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" value={username} onChange={updateUsername} />
                    <label htmlFor="password" >Password</label>
                    <input id="password" type="password" placeholder="Password" value={password} onChange={updatePassword} />
                    <CustomButton className="login-button" width="50%" onClick={login}>Login</CustomButton>
                </div>

                <div className="login-card-footer">
                    <p className="login-link" onClick={signUp}>Sign up</p>
                    <p className="login-error">{error}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;