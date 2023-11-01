import axios from "axios"
import { useEffect, useState } from "react"

function MemoriesList(){

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
        memories && memories.map(memory => {
            return <img src={memory.image_path} alt="" />
        })
    )
}

export default MemoriesList