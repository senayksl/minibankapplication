import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Bg from "../assets/bg.png";
import {Button, Input} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const { signup } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setFeedback('Passwords do not match.');
            return;
        }

        try {
            await signup(email, password,userName);
            setFeedback('Registration successful!');
        } catch (error) {
            setFeedback('Registration failed. Please try again.');
        }
    };
    const backgroundStyle = {
        minHeight: '100vh',
        minWidth: '100vw',
        background: `url(${Bg}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:"center"
    };
    return (
        <div style={backgroundStyle}>

        <form onSubmit={handleSubmit}>
            <Input
                disableUnderline={true}
                sx={{
                    color:"#00B694",
                    backgroundColor:"white",
                    padding:"0.5rem",
                    borderRadius:"12rem",
                    fontSize: "19px",
                    cursor: "pointer",
                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <PersonOutlineRoundedIcon color="primary"  />
                    </InputAdornment>
                }
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            /><br/><br/>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <LockIcon color="primary"  />
                    </InputAdornment>
                }
                disableUnderline={true}
                sx={{
                    color:"#00B694",
                    backgroundColor:"white",
                    padding:"0.5rem",
                    borderRadius:"12rem",
                    fontSize: "19px",
                    cursor: "pointer",
                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            /><br/><br/>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <LockIcon color="primary"  />
                    </InputAdornment>
                }
                disableUnderline={true}
                sx={{
                    color:"#00B694",
                    backgroundColor:"white",
                    padding:"0.5rem",
                    borderRadius:"12rem",
                    fontSize: "19px",
                    cursor: "pointer",
                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
            /><br/><br/>
            <Input
                startAdornment={
                    <InputAdornment position="start">
                        <PersonOutlineRoundedIcon color="primary"  />
                    </InputAdornment>
                }
                disableUnderline={true}
                sx={{
                    color:"#00B694",
                    backgroundColor:"white",
                    padding:"0.5rem",
                    borderRadius:"12rem",
                    fontSize: "19px",
                    cursor: "pointer",
                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                }}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="UserName"
                required
            /><br/><br/><br/>
            <Button
                sx={{width:"18rem",backgroundColor:"white",padding:"0.5rem",borderRadius:"15rem",textAlign:"center",alignItems:"center",fontSize: "18px",boxShadow: "1px 1px 10px 1px #A9A9A9"}}
                type="submit">Register</Button><br/>
            <Button
                onClick={() => navigate('/login')}
                style={{color:"#00B694"}} type="submit">Have an Account? Login</Button>
            <div style={{color:"#0853a8"}}>{feedback}</div>
        </form>
        </div>
    );
}

export default Register;
