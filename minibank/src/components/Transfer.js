import React, {useState} from 'react';
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoneyIcon from '@mui/icons-material/Money';
import Button from "@mui/material/Button";
import axios from "axios";
import {Snackbar} from "@mui/material";

function Transfer() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState(null);
    const [transaction,setTransaction] = useState({});

    const transferMoney = async () => {
        try {
            await axios.post('http://localhost:8080/api/transactions/transfer',
                transaction).then(() => {
            }).then((e)=>{
                setSnackbarMessage('Transaction successfully');
                setSnackbarOpen(true);
                setTransaction({
                    fromAccountNumber:"",
                    toAccountNumber:"",
                    amount:""
                })
            }).catch((e)=>{
                setSnackbarMessage(e.response.data);
                setSnackbarOpen(true);
            });

        } catch (err) {
            setError('Failed to transaction.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await transferMoney();

    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    return (
        <div style={{marginTop:"20vh",textAlign:"center",minWidth:"100vh"}}>
            <form onSubmit={handleSubmit}>
                <Input
                    disableUnderline={true}
                    sx={{
                        minWidth:"60vh",
                        color: "#00B694",
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "12rem",
                        fontSize: "19px",
                        cursor: "pointer",
                        boxShadow: "1px 1px 10px 1px #A9A9A9"
                    }}
                    variant="outlined"
                    value={transaction?.fromAccountNumber}
                    onChange={(e) => setTransaction({...transaction,fromAccountNumber:e.target.value})}
                    placeholder="From Account Number"
                    required
                    startAdornment={
                        <InputAdornment position="start">
                            <CurrencyExchangeIcon color="primary"/>
                        </InputAdornment>
                    }
                />
                <br/><br/>
                <Input
                    disableUnderline={true}
                    sx={{
                        minWidth:"60vh",
                        color: "#00B694",
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "12rem",
                        fontSize: "19px",
                        cursor: "pointer",
                        boxShadow: "1px 1px 10px 1px #A9A9A9"
                    }}
                    variant="outlined"
                    value={transaction?.toAccountNumber}
                    onChange={(e) => setTransaction({...transaction,toAccountNumber:e.target.value})}
                    placeholder="To Account Number"
                    required
                    startAdornment={
                        <InputAdornment position="start">
                            <CurrencyExchangeIcon color="primary"/>
                        </InputAdornment>
                    }
                />
                <br/><br/>
                <Input
                    type={"number"}
                    disableUnderline={true}
                    inputProps={{
                        step: 0.01,
                    }}
                    sx={{
                        minWidth:"60vh",
                        color: "#00B694",
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "12rem",
                        fontSize: "19px",
                        cursor: "pointer",
                        boxShadow: "1px 1px 10px 1px #A9A9A9"
                    }}
                    variant="outlined"
                    value={transaction?.amount}
                    onChange={(e) => setTransaction({...transaction,amount:e.target.value})}
                    placeholder="Amount"
                    required

                    startAdornment={
                        <InputAdornment position="start">
                            <MoneyIcon color="primary"/>
                        </InputAdornment>
                    }
                />
                <br/><br/>
                <Button
                    sx={{
                        minWidth:"60vh",
                        width: "18rem",
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "15rem",
                        textAlign: "center",
                        alignItems: "center",
                        fontSize: "18px",
                        boxShadow: "1px 1px 10px 1px #A9A9A9"
                    }}
                    type="submit">
                    Transfer
                </Button><br/>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
}

export default Transfer;