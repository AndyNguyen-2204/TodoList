import React, { useState } from 'react'
import "./Tab.css"
export default function Tab() {
    const Tab=[
        {
            name:"All Task"
        },
        {
            name:"New Task"
        },
        {
            name:"Complete"
        }
    ]
    const [show,setShow]=useState(false)
    const handleAddTask = () =>{
        
    }
  return (
    <div className='wrap-divTab'>
        <div className='wrap-tab'>
        {Tab.map((el,index)=>
            <span key={index}>{el.name}</span>
        )}
        </div>
        <div className='wrap-Addtask'>
            <button onClick={handleAddTask} className='btn-addTask'>Add Task</button>
            <input/>
        </div>
    </div>
  )
}
