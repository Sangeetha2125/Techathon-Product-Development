import axios from "axios"
import { useEffect, useState } from "react"
import MemoryCard from "./MemoryCard"
import './Memories.css'

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
        <div className="memories-list">
            {memories && memories.map(memory => {
                return <MemoryCard key={memory.id} memory={memory} />
            })}
        </div>
    )
}

export default MemoriesList