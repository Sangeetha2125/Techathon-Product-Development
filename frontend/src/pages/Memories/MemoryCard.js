import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MemoryCard({memory}){

    const username = JSON.parse(localStorage.getItem('current_user')).name
    const [showDeleteDialog,setShowDeleteDialog] = useState(false)
    const [deleteid ,setDeleteid] = useState()
    const [showAlert,setShowAlert] = useState(false)
    const navigate = useNavigate()

    const takeDeleteId = (event) => {
        let id = event.target.id
        setDeleteid(id)
        setShowDeleteDialog(true)
    }

    const handleDelete = (event) => {
        axios.delete(`/memories/${event.target.id}/delete`)
        .then(res => {
            localStorage.setItem('alertMessage',res.data.message)
            setShowDeleteDialog(false)
            setShowAlert(true)
            navigate('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const handleAlertClose = () => {
        setShowAlert(false)
        localStorage.removeItem('alertMessage')
    }

    return (
    <Box>
        <Snackbar open={showAlert} onClose={handleAlertClose} anchorOrigin={{vertical:'top',horizontal:'right'}} autoHideDuration={3000}>
            <Alert severity="success" onClose={handleAlertClose}>
                {localStorage.getItem('alertMessage')}
            </Alert>
        </Snackbar>
         <Dialog open={showDeleteDialog} onClose={()=>setShowDeleteDialog(false)} fullWidth>
            <DialogTitle>Are you sure to delete the list?</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <Button id={deleteid} variant="contained" color="error" onClick={handleDelete}>Yes</Button>
                    <Button variant="contained" color="success" onClick={() => setShowDeleteDialog(false)}>No</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                {username[0]}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings" onClick={takeDeleteId} id={memory.id} >
                <DeleteIcon/>
            </IconButton>
            }
            title={memory.name}
            subheader={memory.date}
        />
        <CardMedia
            component="img"
            height="194"
            image={memory.image_path}
            alt={memory.name}
        />
        <CardContent>
        <Typography>
            {(memory.description).length > 220 ? (memory.description).slice(0, 220) + '...' : (memory.description).slice(0, 100)}
            {(memory.description).length > 220 && <Button variant="text">Read More</Button>}
        </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Stack direction="row" spacing={1}>
                <LocationOnIcon />
                <Typography>{memory.location}</Typography>
            </Stack>
        </CardActions>
        </Card>
    </Box>
  );
}

export default MemoryCard