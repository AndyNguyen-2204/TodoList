import React, { useEffect, useState } from 'react'
import "./ModalConfirm.css"
import { StatusTask } from "../RenderData/RenderData"
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo } from '../../Redux/ListTodoSlice/listTodo'
export default function ModalConfirm(props) {
  return (
    <div id="myModal" className="modal">
      <div className="modalConfirm-content">
        <div onClick={()=>props.handleClose()} className="close">&times;</div>
        <h1>Delete Task</h1>
        <p>Are you sure you want to delete this job?</p>
        <div className='wrap-button-submitModal'>
        <button onClick={()=>props.handleClose()} className='cancle-ConfirmModal'>Cancle</button>
        <button onClick={()=>props.handleSubmit()} className='delete-SubmitModal'>Delete</button>
        </div>
      </div>
    </div>
  )
}
