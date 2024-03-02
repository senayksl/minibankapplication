import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import AccountDetails from './components/AccountDetails';
import Transfer from './components/Transfer';
import { useAuth } from "./context/AuthContext";
import TransactionHistory from "./components/TransactionHistory";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
function App() {
    const navItems = ['Acoounts', 'Transfers', 'Log Out'];
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const { setCurrentUser } = useAuth();
    const { logout } = useAuth();

    function PrivateRoute({ children }) {
        const { currentUser } = useAuth();
        return currentUser ? children : <Navigate to="/" />;
    }
    function NavigationAppBar() {
        const navigate = useNavigate();
        const navItems = [
            { label: 'Accounts', path: '/' },
            { label: 'Transfers', path: '/transfer' },
            { label: 'Log Out', path: '/login' }
        ];
        const handleNavigate = (path) => {
            if (path === '/login') {
                navigate('/login');
            } else {
                navigate(path);
            }
        };

        return (
            <AppBar style={{backgroundColor:"#00B694FF",color:"#ffffff"}}  component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => {}}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => handleNavigate("/")}>
                        MINI BANK APPLICATION
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.label} sx={{ color: '#fff' }} onClick={() => handleNavigate(item.path)}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser({ token });
        }
    }, [setCurrentUser]);

    return (
        <Router>
            <NavigationAppBar />
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <AccountDetails />
                    </PrivateRoute>
                } />
                <Route path="/transfer" element={
                    <PrivateRoute>
                        <Transfer />
                    </PrivateRoute>
                } />
                <Route path="/transactions" element={
                    <PrivateRoute>
                        <TransactionHistory />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;