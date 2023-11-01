import { Alert, Avatar, Button, Container, Grid, Snackbar, Stack, TextField, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { blue } from "@mui/material/colors"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'
import axios from "axios"

function ForgotPassword(){

    const [email,setEmail] = useState('')

    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [isValid,setIsValid] = useState(true)

    const navigate = useNavigate()
    
    const handleClose = () =>{
        setIsValid(true)
        localStorage.setItem('showMessage',true)
        navigate('/signin')
        setOpen(false)
    }

    const handleError = (error) =>{
        if(error === "Invalid Credentials"){
            setIsValid(false)
            setLoading(false)
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        setLoading(true)
        let credentials = {email}

        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/forgot-password`,
            data:JSON.stringify(credentials),
            headers:{
                "Content-Type":"application/json",
            }
        })
        .then(res => {
            setLoading(false)
            setOpen(true)
        })
        .catch(err => handleError(err.response.data.message))
    }

    return (
        <Container maxWidth="sm">
            <Stack direction="column" spacing={2} alignItems="center" mt={14} mb={3}>
                <Avatar sx={{bgcolor:blue[500]}}>
                    <PersonIcon />
                </Avatar>
                <Typography variant="h5" component="h1">Forgot Password</Typography>
            </Stack>
            {!isValid && <Alert severity="error" onClose={() => {setIsValid(true)}}>Invalid Credentials</Alert>}
            <Snackbar open={open} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal:'right'}} autoHideDuration={2500}>
                <Alert onClose={handleClose} severity="success">
                    Mail Sent Successfully
                </Alert>
            </Snackbar>
            <Grid container mt={1} spacing={2.5} component="form" noValidate autoComplete="off" onSubmit={(event)=>handleSubmit(event)}>
                <Grid item xs={12}>
                    <TextField label="Email Address" value={email} onChange={(event)=>setEmail(event.target.value)} required fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton variant="contained" type="submit" size="large" loading={loading} endIcon={<LoginIcon fontSize="inherit"/>} loadingPosition="end" fullWidth>Get Reset Link</LoadingButton>
                </Grid>
            </Grid>
            <Stack flexDirection="row" justifyContent="flex-end" mt={2}>
                <Link to="/signin">
                    <Button ml="auto" sx={{
                        textDecoration:"underline"
                    }} 
                    disableRipple disableElevation>
                        Back to Sign in
                    </Button>
                </Link>
            </Stack>
        </Container>
    )
}

export default ForgotPassword