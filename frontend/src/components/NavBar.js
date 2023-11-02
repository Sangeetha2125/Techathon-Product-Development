import { Link, useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Button, Box, Typography, Stack } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'

function NavBar({memories,sharings}){

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
                   <Stack direction="row" spacing={2}>
                   {user && (!memories && <Link to="/">
                        <Button variant="contained" size="large">
                            View Memories
                        </Button>
                    </Link>)}
                   {user && (!sharings && <Link to="/shared-memories">
                        <Button variant="contained" size="large">
                            View Shared Memories
                        </Button>
                    </Link>)}
                    {user && <Button variant="contained" color="error" size="large" onClick={handleLogout}>
                        Logout
                    </Button>}
                   </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar