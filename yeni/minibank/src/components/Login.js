import React, {useEffect, useState} from 'react';
import { useAuth } from "../context/AuthContext";
import Bg from '../assets/bg.png';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';import {Button} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('password', password);
    }, [password]);

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
        navigate('/')
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
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                startAdornment={
                    <InputAdornment position="start">
                        <PersonOutlineRoundedIcon color="primary"  />
                    </InputAdornment>
                }
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
            /><br/><br/><br/><br/>
            <Button
                sx={{width:"18rem",backgroundColor:"white",padding:"0.5rem",borderRadius:"15rem",textAlign:"center",alignItems:"center",fontSize: "18px",boxShadow: "1px 1px 10px 1px #A9A9A9"}}
                 type="submit">
                Login
            </Button><br/>
                <Button
                    variant="text"
                    sx={{width:"18rem",padding:"0.5rem",textAlign:"center",alignItems:"center",fontSize: "15px",color:"#00B694",}}
                    onClick={() => navigate('/register')}
                >
                Create Account
            </Button>
        </form>
        </div>
    );
}
export default Login;
