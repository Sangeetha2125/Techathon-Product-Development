import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './Timeline.css'

function Timeline(){

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

    const [memories,setMemories] = useState([])

    useEffect(()=>{
        const user_id = JSON.parse(localStorage.getItem('current_user')).id
        axios.get(`memories?user=${user_id}`)
        .then(res => {
            setMemories(res.data.data)
        })
        .catch(err => {
            setMemories([])
        })
    },[memories])
    
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
            {user && <Link to="/">
                    <Button variant="contained" size="large">
                        View Memories
                    </Button>
                </Link>}
                {user && <Button variant="contained" size="large" onClick={handleLogout}>
                    Logout
                </Button>}
            </Stack>
            </Toolbar>
        </AppBar>
        <div className="timeline-wrapper">
        <div style={{height:"1.5rem"}}></div>
        <div className="timeline-container">
            {memories && memories.map(memory => {
                return <div className="tcard">
                <div className="tcard-content" >
                    <h1>{memory.name}</h1>
                    <p className="date">{(new Date(memory.date)).toDateString()}</p>
                </div>
            </div>
            })}
        </div>
    </div>
    </Box>
    )
}

export default Timeline