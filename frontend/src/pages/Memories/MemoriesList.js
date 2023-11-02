import MemoryCard from "./MemoryCard"
import './Memories.css'
import { useEffect, useState } from "react"
import axios from "axios"

function MemoriesList({memories,setMemories}){

    const [refresh,setRefresh] = useState(false)

    const fetchMemories = () => {
        const user_id = JSON.parse(localStorage.getItem('current_user')).id
        axios.get(`memories?user=${user_id}`)
        .then(res => {
            setMemories(res.data.data)
        })
        .catch(err => {
            setMemories([])
        })
    }

    useEffect(()=>{
        fetchMemories()
        // eslint-disable-next-line
    },[refresh])


    return (
        <div className="memories-list">
            {memories && memories.map(memory => {
                return <div className="memory-card" key={memory.id}><MemoryCard memory={memory} setRefresh={setRefresh}/></div>
            })}
        </div>
    )
}

export default MemoriesList