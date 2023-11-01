import {  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Snackbar, Stack,TextField} from "@mui/material"
import { useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/Close'
import axios from "axios"
import { DropzoneArea } from 'material-ui-dropzone'
import MemoriesList from "./MemoriesList"
import { useNavigate } from "react-router-dom"

function MemoriesPage(){

    const [openDialog,setOpenDialog] = useState(false)
    const navigate = useNavigate()

    const [name,setName] = useState('')
    const [date,setDate] = useState('')
    const [filePath,setFilePath] = useState("")
    const [description,setDescription] = useState('')
    const [location,setLocation] = useState('')

    const [isNameValid,setIsNameValid] = useState(true)
    const [errorName,setErrorName] = useState('')

    const [isDateValid,setIsDateValid] = useState(true)
    const [errorDate,setErrorDate] = useState('')
        
    const [isDescriptionValid,setIsDescriptionValid] = useState(true)
    const [errorDescription,setErrorDescription] = useState('')

    const [isLocationValid,setIsLocationValid] = useState(true)
    const [errorLocation,setErrorLocation] = useState('')

    const [showAlert,setShowAlert] = useState(false)
    const [processing,setProcessing] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setProcessing(true)

        const user_id = parseInt(JSON.parse(localStorage.getItem('current_user')).id)
        const FormData = require("form-data")
        const data = new FormData()
        data.append("name",name)
        data.append("file", filePath)
        data.append("user_id",user_id)
        data.append("description",description)
        data.append("location",location)
        data.append("date",date)

        axios({
            method:'post',
            url:`${process.env.REACT_APP_API_URL}/memories`,
            data:data,
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => {
            localStorage.setItem('alertMessage',res.data.message)
            navigate('/')
            setOpenDialog(false)
            setShowAlert(true)
            resetForm()
        })
        .catch(err => {
            const errors = err.response.data.message

            if(errors.hasOwnProperty('name')){
                setIsNameValid(false)
                setErrorName(errors.name)
            }
            else if(errors.hasOwnProperty('date')){
                setIsDateValid(false)
                setErrorDate(errors.date)
            }
            else if(errors.hasOwnProperty('description')){
                setIsDescriptionValid(false)
                setErrorDescription(errors.description)
            }
            else if(errors.hasOwnProperty('location')){
                setIsLocationValid(false)
                setErrorLocation(errors.location)
            }
            else{
                setIsNameValid(true)
                setIsDateValid(true)
                setIsDescriptionValid(true)
                setIsLocationValid(true)
                setErrorName('')
                setErrorDate('')
                setErrorDescription('')
                setErrorLocation('')
            }
        })
        .finally(()=>{
            setProcessing(false)
        })
    }

    const resetForm = () => {
        setOpenDialog(false)
        setIsNameValid(true)
        setIsDateValid(true)
        setIsDescriptionValid(true)
        setIsLocationValid(true)
        setName('')
        setFilePath('')
        setDate('')
        setDescription('')
        setLocation('')
        setErrorName('')
        setErrorDate('')
        setErrorDescription('')
        setErrorLocation('')
    }

    
    const handleAlertClose = () => {
        setShowAlert(false)
        localStorage.removeItem('alertMessage')
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
    },[])

    return (
        <Box>
            <Snackbar open={showAlert} onClose={handleAlertClose} anchorOrigin={{vertical:'top',horizontal:'right'}} autoHideDuration={3000}>
                <Alert severity="success" onClose={handleAlertClose}>
                    {localStorage.getItem('alertMessage')}
                </Alert>
            </Snackbar>
            <Box sx={{ p: 1,mt:3.5,mb:2}}>
                <Dialog open={openDialog} component="form" encType="multipart/form-data" onSubmit={(event)=>handleSubmit(event)} noValidate autoComplete="off" fullWidth>
                    <DialogTitle variant="h5">
                        Add New Memory
                        <IconButton
                            onClick={resetForm}
                            sx={{
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                color: "grey"
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={1.5}>
                            <Grid item  xs={12}>
                                <TextField margin="dense" type="name" label="Memory Name" value={name} error={!isNameValid} helperText={!isNameValid && errorName} onChange={(event)=>setName(event.target.value)} fullWidth />
                            </Grid>
                            <Grid item  xs={12}>
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                useChipsForPreview
                                filesLimit={1}
                                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                                previewText="Selected Image"
                                showAlerts={false}
                                maxFileSize={9000000000000}
                                onChange={(files)=>setFilePath(files[0])}
                            />
                            </Grid>
                            <Grid item  xs={12}>
                                <TextField type="date" InputLabelProps={{ shrink: true }} InputProps={{ placeholder: ' ' }} label="Choose Date" value={date} error={!isDateValid} helperText={!isDateValid && errorDate} onChange={(event)=>setDate(event.target.value)} fullWidth />
                            </Grid>
                            <Grid item  xs={12}>
                                <TextField multiline rows={5} margin="dense" label="Enter Description" value={description} error={!isDescriptionValid} helperText={!isDescriptionValid && errorDescription} onChange={(event)=>setDescription(event.target.value)} fullWidth />
                            </Grid>
                            <Grid item  xs={12}>
                                <TextField margin="dense" type="text" label="Enter Location" value={location} error={!isLocationValid} helperText={!isLocationValid && errorLocation} onChange={(event)=>setLocation(event.target.value)} fullWidth />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{margin:"0.5em"}}>
                        <Button type="submit" variant="outlined" color="inherit" endIcon={<SaveOutlinedIcon />} disabled={processing}>Save Memory</Button>
                    </DialogActions>
                </Dialog>
                <Stack alignItems="end" justifyItems="center" sx={{m:'0em 4em'}}>
                    <Button variant="contained" color="success" endIcon={<AddIcon />} onClick={() => {
                        setOpenDialog(true)
                    }}>Add New</Button>
                </Stack>
            </Box>
            <MemoriesList memories={memories}/>
        </Box>
    )
}

export default MemoriesPage