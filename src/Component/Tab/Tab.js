import React, { useState } from 'react'
import "./Tab.css"
export default function Tab(props) {
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
        props.setShowModal(true)
    }
  return (
    <div className='wrap-divTab'>
        <div className='wrap-tab'>
        {Tab.map((el,index)=>
            <span onClick={()=>props.setTab(index)} key={index} className={props.tab===index?"TabActive":""}>{el.name}</span>
        )}
        </div>
        <div className='wrap-Addtask'>
            <button onClick={handleAddTask} className='btn-addTask'>Add Task</button>
        </div>
    </div>
  )
}
