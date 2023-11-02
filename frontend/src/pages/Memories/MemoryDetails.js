import { Box, Card, IconButton, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import NavBar from "../../components/NavBar"
import { useEffect, useState } from "react"
import axios from "axios"
import './Memories.css'
import ShareIcon from '@mui/icons-material/Share';

function MemoryDetails(){
    const { id } = useParams()
    const [memory,setMemory] = useState()

    useEffect(()=>{
        axios.get(`memories/${id}`)
        .then(res => {
            setMemory(res.data.data) 
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return (
       <Box>
        {/* <NavBar memories={true}/> */}
        {memory && 
        <div className="memory">
            <Stack direction="row" justifyContent="space-between">
                <h1>{memory.name}</h1>
                <IconButton color="secondary" size="large" title="Share"
                    sx={{
                        cursor:"pointer",
                        borderRadius: '50%',
                        bgcolor: 'darkblue',
                        color:"white",
                        '&:hover': {
                            bgcolor: 'darkblue',
                        }
                    }}
                >
                    <ShareIcon />
                </IconButton>
            </Stack>
            <div className="memory-content">
                <img src={memory.image_path} alt="" />
                <div className="description">
                    <div className="mem-flex">
                        <div className="mem-card mem-location">
                            {memory.location}
                        </div>
                        <div className="mem-card mem-date">
                            {(new Date(memory.date)).toDateString()}
                        </div>
                    </div>
                    <p className="mem-description">
                        {memory.description}
                    </p>
                </div>
            </div>
        </div>}
       </Box>
    )
}

export default MemoryDetails