import axios from "axios"
import { useEffect, useState } from "react"
import MemoryCard from "./MemoryCard"
import './Memories.css'

function MemoriesList({memories}){

    return (
        <div className="memories-list">
            {memories && memories.map(memory => {
                return <MemoryCard key={memory.id} memory={memory} />
            })}
        </div>
    )
}

export default MemoriesList