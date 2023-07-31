import React, { useEffect, useState } from 'react'
import "./Modal.css"
import { StatusTask } from "../RenderData/RenderData"
import { useDispatch, useSelector } from 'react-redux'
import { addNewTodo, updateTask } from '../../Redux/ListTodoSlice/listTodo'
export default function Modal(props) {
  const [value, setValue] = useState({
    title: "",
    description: "",
    time: "",
    status: "Inprocess"
  })
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.Login.dataUser.user._id)
  const statusSubmit = useSelector((state) => state.TodoList.success)
  const handleClose = () => {
    props.setShowModal(false)
    props.setDataChoose(null)
  }
  const handleSelectChange = (event) => {
    setValue({
      ...value,
      status: event.target.value
    })
  }
  const onChangeInput = (event) => {
    const { name, value } = event.target
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = () => {
    const data = {
      ...value,
      userId: userId
    }
   if(props.editModal){
    dispatch(updateTask({ url: `/tasks/${props.dataChoose._id}`, data }))
   }else{
    dispatch(addNewTodo({ url: `/tasks/${userId}`, data }))
   }
  }
  useEffect(() => {
    if (statusSubmit) {
      setValue({
        title: "",
        description: "",
        time: "",
        status: ""
      })
      props.setShowModal(false)
    }
  }, [statusSubmit])
  useEffect(()=>{
      if(props.dataChoose){
        setValue({
          title:props.dataChoose.title,
          description:props.dataChoose.description,
          time:props.dataChoose.time,
          status:props.dataChoose.status
        })
      }
  },[props.dataChoose])
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div onClick={handleClose} className="close">&times;</div>
        <h1>{props.editModal?"Edit task":"Add new task"}</h1>
        <div className='modal-wrap-content'>
          <div className='items'>
            <span>Task Name</span>
            <input onChange={onChangeInput} value={value.title} name="title" type="text" placeholder="Enter task name..." />
          </div>
          <div className='items'>
            <span>Task Description</span>
            <textarea className='text-area' onChange={onChangeInput} value={value.description} name="description" type="text" placeholder="Enter task description..." />
          </div>
          <div className='items'>
            <span>Execution Time </span>
            <input onChange={onChangeInput} value={value.time} name="time" type="text" placeholder="Input 3" />
          </div>
          <div className='items'>
            <span>Choose status task</span>
            <select onChange={handleSelectChange} value={value.status}>
              {StatusTask.map((el, index) =>
                <option key={index} value={el.id}>{el.name}</option>
              )}
            </select>
          </div>
        </div>
        <button onClick={handleSubmit} className='btn-SubmitModal'>Submit</button>
      </div>
    </div>
  )
}
