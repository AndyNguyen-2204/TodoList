import React, { useEffect, useState } from 'react'
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../../Component/Tab/Tab';
import { deleteTask, getListTodo } from '../../Redux/ListTodoSlice/listTodo';
import Table from '../../Component/Table/Table';
import Modal from '../../Component/Modal/Modal';
import ModalConfirm from '../../Component/ModalConfirm/ModalConfirm';
export default function Home() {
  const dataUser = useSelector((state) => state.Login.dataUser);
  const dataTable = useSelector((state) => state.TodoList.data)
  const [showModal, setShowModal] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const statusSubmit = useSelector((state) => state.TodoList.success)
  const [dataChoose, setDataChoose] = useState(null)
  const [editModal,setEditModal]=useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (statusSubmit) {
      setShowModalConfirm(false)
      dispatch(getListTodo({ url: `/tasks/${dataUser.user._id}` }))
    }
  }, [statusSubmit])
  useEffect(() => {
    dispatch(getListTodo({ url: `/tasks/${dataUser.user._id}` }))
  }, [])
  const handleEdit = (e) => {
    setDataChoose(e)
    setEditModal(true)
    setShowModal(true)
  }
  const handleDelete = (e) => {
    setDataChoose(e)
    setShowModalConfirm(true)
  }
  const handleClose = () => {
    setDataChoose(null)
    setShowModalConfirm(false)
  }
  const handleSubmit = () => {
       if(dataChoose){
        dispatch(deleteTask({url:`/tasks/${dataChoose._id}`}))
       }
  }
  const showModalAdd=()=>{
    setEditModal(false)
    setShowModal(true)
  }
  return (
    <div className='wrap-homePage'>
      <div className='background-homePage'>
        <div className='wrap-content-inner container'>
          <div className='input-search'>
            <span>Tasks</span>
            <input />
          </div>
          <div className='avatar-user'>
            <img alt='' src='https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA' />
            <span>{dataUser ? dataUser.user.username : ""}</span>
          </div>
        </div>
      </div>
      <div className='wrap-content container'>
        <div >
          <Tab setShowModal={showModalAdd} />
          <Table dataTable={dataTable} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
      </div>
      {showModal && <Modal dataChoose={dataChoose} setShowModal={setShowModal} editModal={editModal} setDataChoose={setDataChoose} />}
      {showModalConfirm && <ModalConfirm handleClose={handleClose} handleSubmit={handleSubmit} />}
    </div>
  )
}
