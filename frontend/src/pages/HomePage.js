import { useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

function HomePage(){

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('current_user')))
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.post('logout')
        .then(res => {
            localStorage.removeItem('current_user')
            localStorage.removeItem('token')
            setUser(null)
            navigate('/signin')
        })
        .catch(err => {
            localStorage.removeItem('current_user')
            localStorage.removeItem('token')
            setUser(null)
            navigate('/signin')
        })
    }
    return (
        <Box>
            <AppBar
                position="static"
                color="inherit"
                sx={{
                    padding:"3px",
                    width:"100%"
                }}
            >
                <Toolbar>
                    <Box sx={{flexGrow:1}}>
                        <Typography variant="h5">Welcome, {user.name}!</Typography>
                    </Box>
                    {user && <Button variant="contained" size="large" onClick={handleLogout}>
                        Logout
                    </Button>}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default HomePage