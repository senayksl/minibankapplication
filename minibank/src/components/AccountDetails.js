import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import MenuItem from '@mui/material/MenuItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Accordion, AccordionDetails,
    AccordionSummary, ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, TextField
} from "@mui/material";
import {Snackbar} from '@mui/material';
import * as PropTypes from "prop-types";
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function ItemProps(props) {
    return null;
}

ItemProps.propTypes = {children: PropTypes.node};

function AccountDetails({match}) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [account, setAccount] = useState(null);
    const [accountName, setAccountName] = useState('');
    const [accountList, setAccountList] = useState([]);
    const [accountDetail, setAccountDetail] = useState(null);
    const [updatedAccount, setUpdatedAccount] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDetail, setOpenDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accountFilter, setAccountFilter] = useState({
        name:"",
        number:""
    });


    useEffect(() => {
        fetchAccountList()
    }, []);

    const fetchAccountList = async (accountId) => {
        const token = localStorage.getItem('token');
        const apiUrl = `http://localhost:8080/api/accounts?name=`+accountFilter.name+"&number="+accountFilter.number ;
        axios({
            method: 'GET',
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data, "ss")
                setAccountList(res?.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };



    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const fetchAccountDetails = async (accountId) => {
        const token = localStorage.getItem('token');
        const api = `http://localhost:8080/api/accounts/${accountId}`;
        axios({
            method: 'GET',
            url: api,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAccountDetail(res?.data);
                console.log(res, "res")
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        const api2 = `http://localhost:8080/api/transactions/account/${accountId}`;
        axios({
            method: 'GET',
            url: api2,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setTransactionHistory(res?.data);
                console.log(res, "transaction")
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchAccountDelete = async (accountId) => {
        const token = localStorage.getItem('token');
        const api = `http://localhost:8080/api/accounts/${accountId}`;
        axios({
            method: 'DELETE',
            url: api,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                alert(res.data)
                console.log(res, "res")
                fetchAccountList()
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    const createAccount = async () => {
        try {
            await axios.post('http://localhost:8080/api/accounts',
                {
                    name: accountName,
                }).then(() => {
                fetchAccountList()
            });
            setSnackbarMessage('Account created successfully');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to fetch account details.');
        }
    };


    const updateAccount = async () => {
        const token = localStorage.getItem('token');
        let id = updatedAccount !=null ?updatedAccount?.id:null
        const api = `http://localhost:8080/api/accounts/${id}`;
        axios({
            method: 'PUT',
            url: api,
            data:{"name": accountName},
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setSnackbarMessage('Account Updated successfully');
                setSnackbarOpen(true);
                fetchAccountList()
                setOpenUpdate(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setUpdatedAccount(null)
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createAccount();

        handleClose()
    };
    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        await updateAccount();

        handleClose()
    };

    return (
        <div>
            <h2>Accounts</h2>
            <Button
                sx={{color:"#00B694FF",marginTop:"3vh",width:"18rem",backgroundColor:"white",padding:"0.5rem",borderRadius:"15rem",textAlign:"center",alignItems:"center",fontSize: "18px",boxShadow: "1px 1px 10px 1px #A9A9A9"}}
                onClick={() => {
                createAccount()
                setOpen(true)
            }}>+ Create Account </Button>
            <div style={{marginTop:"20px"}}>
                <TextField
                    fullWidth
                    placeholder={"Name Filter"}
                    onChange={(e)=>{setAccountFilter({...accountFilter,name:e.target.value})}}
                ></TextField>
                <TextField
                    fullWidth
                    placeholder={"Number Filter"}
                    onChange={(e)=>{setAccountFilter({...accountFilter,number:e.target.value})}}
                ></TextField><br/><br/>
                <Button
                    style={{width:"100%"}}
                    variant={"contained"}
                    onClick={() => {
                        fetchAccountList(accountFilter.name,accountFilter.number)
                    }}><SearchIcon/>Search Accounts </Button>
            </div>

            <Table style={{backgroundColor: "rgba(255,255,255,0.93)", marginTop: "2vh"}} size="small"
                   aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <h6 style={{fontFamily: "inherit", fontSize: "18px"}}>Account Number</h6>
                        </TableCell>
                        <TableCell align="center">
                            <h6 style={{fontFamily: "inherit", fontSize: "18px"}}>Account Holder</h6>
                        </TableCell>
                        <TableCell align="center">
                            <h6 style={{fontFamily: "inherit", fontSize: "18px"}}>Account Name</h6>
                        </TableCell>
                        <TableCell align="center">
                            <h6 style={{width: "8vh", fontFamily: "inherit", fontSize: "18px"}}>Balance</h6>
                        </TableCell>
                        <TableCell align="center">
                            <h6 style={{fontFamily: "inherit", textAlign: "center", fontSize: "18px"}}>Details</h6>
                        </TableCell>
                    </TableRow>
                </TableHead><br/>
                <TableBody>
                    {accountList && accountList.length > 0 ? accountList.map((account) => (
                        <TableRow key={account?.id}>
                            <TableCell component="th" scope="row" align="left">
                                <h5 style={{
                                    fontFamily: "inherit",
                                    fontSize: "18px",
                                    color: "#071438"
                                }}>{account.id}</h5>
                            </TableCell>
                            <TableCell component="th" align="center">
                                {account?.number}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {account?.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                {account?.balance}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                                <ButtonGroup
                                    variant="contained" aria-label="Basic button group">
                                    <Button variant={"outlined"}
                                            sx={{width:"3rem",padding:"0.5rem",textAlign:"center",alignItems:"center",fontSize: "15px",color:"#00B694",}}
                                            onClick={() => {
                                                fetchAccountDetails(account?.id)
                                                setOpenDetail(true)
                                            }}>
                                        <FormatListBulletedIcon/></Button>

                                    <Button variant={"outlined"}
                                            sx={{width:"3rem",padding:"0.5rem",textAlign:"center",alignItems:"center",fontSize: "15px",color:"#0032da",}}
                                            onClick={() => {
                                                setUpdatedAccount(account)
                                                setOpenUpdate(true)
                                            }}
                                    >
                                        <EditIcon/>
                                    </Button>
                                    <Button
                                        sx={{width:"3rem",padding:"0.5rem",textAlign:"center",alignItems:"center",fontSize: "15px",color:"#d20000",}}
                                        onClick={() => {
                                            fetchAccountDelete(account?.id)
                                        }}
                                        variant={"outlined"} color={"warning"}>
                                        <DeleteIcon/>
                                    </Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={6}>No accounts found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                        <form onSubmit={handleSubmit}>
                            <Input
                                disableUnderline={true}
                                sx={{
                                    color: "#00B694",
                                    backgroundColor: "white",
                                    padding: "0.5rem",
                                    borderRadius: "12rem",
                                    fontSize: "19px",
                                    cursor: "pointer",
                                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                                }}
                                variant="outlined"
                                onChange={(e) => setAccountName(e.target.value)}
                                placeholder="Account Name"
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonOutlineRoundedIcon color="primary"/>
                                    </InputAdornment>
                                }
                            /><br/><br/>
                            <Button
                                sx={{
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
                                Create
                            </Button><br/>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openUpdate}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                        <form onSubmit={handleSubmitUpdate}>
                            <h4 style={{color:"rgba(68,68,68,0.47)"}}>Update Account Name</h4>
                            <Input
                                disableUnderline={true}
                                sx={{
                                    color: "#00B694",
                                    backgroundColor: "white",
                                    padding: "0.5rem",
                                    borderRadius: "12rem",
                                    fontSize: "19px",
                                    cursor: "pointer",
                                    boxShadow: "1px 1px 10px 1px #A9A9A9"
                                }}
                                variant="outlined"
                                defaultValue={updatedAccount?.name}
                                onChange={(e) => setAccountName(e.target.value)}
                                placeholder="Account Name"
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonOutlineRoundedIcon color="primary"/>
                                    </InputAdornment>
                                }
                            /><br/><br/>
                            <Button
                                sx={{
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
                                Update
                            </Button><br/>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={openDetail}
                onClose={handleCloseDetail}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent style={{minWidth: "90vh", maxHeight: "500px"}} dividers={true}>
                    <DialogContentText id="alert-dialog-slide-description">
                        <h3 style={{textAlign: "center"}}>Account Details</h3>
                        {accountDetail ?
                            <Box sx={{flexGrow: 1}}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "15px"}}><b>ID</b></Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "13px"}}>{accountDetail?.id}</Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "15px"}}><b>NUMBER</b></Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "13px"}}>{accountDetail?.number}</Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "15px"}}><b>NAME</b></Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "13px"}}>{accountDetail?.name}</Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "15px"}}><b>BALANCE</b></Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item style={{fontSize: "13px"}}>{accountDetail?.balance}</Item>
                                    </Grid>
                                </Grid>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        style={{backgroundColor: "rgba(0,182,148,0.13)"}}
                                    >
                                        Transaction History
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Table style={{backgroundColor: "rgba(255,255,255,0.93)", marginTop: "2vh"}}
                                               size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <h6 style={{fontFamily: "inherit", fontSize: "15px"}}>From
                                                            Account Number</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <h6 style={{fontFamily: "inherit", fontSize: "15px"}}>To Account
                                                            Number</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <h6 style={{
                                                            fontFamily: "inherit",
                                                            fontSize: "15px"
                                                        }}>Transaction Date</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <h6 style={{
                                                            width: "8vh",
                                                            fontFamily: "inherit",
                                                            fontSize: "15px"
                                                        }}>Amount</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <h6 style={{
                                                            width: "8vh",
                                                            fontFamily: "inherit",
                                                            textAlign: "center",
                                                            fontSize: "15px"
                                                        }}>Status</h6>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead><br/>
                                            <TableBody>
                                                {transactionHistory && transactionHistory.length > 0 ? transactionHistory.map((transaction) => (
                                                    <TableRow key={transaction?.id}>
                                                        <TableCell component="th" scope="row" align="left">
                                                            {transaction?.fromNumber}
                                                        </TableCell>
                                                        <TableCell component="th" align="center">
                                                            {transaction?.toNumber}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" align="center">
                                                            {transaction?.transactionDate}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" align="center">
                                                            {transaction?.amount}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row" align="center">
                                                            {transaction?.status}
                                                        </TableCell>
                                                    </TableRow>
                                                )) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6}>No Transaction History found</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>

                            : (
                                <TableRow>
                                    <TableCell colSpan={6}>No accounts found</TableCell>
                                </TableRow>
                            )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetail}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

        </div>

    );
}

export default AccountDetails;
