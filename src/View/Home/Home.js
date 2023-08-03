import React, { useEffect, useState } from 'react'
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../../Component/Tab/Tab';
import { deleteTask, getListCompleted, getListNewTask, getListTodo } from '../../Redux/ListTodoSlice/listTodo';
import Table from '../../Component/Table/Table';
import Modal from '../../Component/Modal/Modal';
import ModalConfirm from '../../Component/ModalConfirm/ModalConfirm';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getUser, logOutUser } from '../../Redux/Login/login';
import { useNavigate } from 'react-router';
import ModalUpload from '../../Component/ModalUpload/ModalUpload';
import AvatarDefault from "../../assest/images/avatar.jpg"
export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { dataUser, update } = useSelector((state) => state.Login);
  const dataTable = useSelector((state) => state.TodoList.data)
  const isLoggedIn = useSelector((state) => state.Login.login);
  const statusSubmit = useSelector((state) => state.TodoList.success)
  const [showModal, setShowModal] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [showModalUpload, setShowModalUpload] = useState(false)
  const [dataChoose, setDataChoose] = useState(null)
  const [editModal, setEditModal] = useState(false)
  const [tab, setTab] = useState(0)
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
    if (dataChoose) {
      dispatch(deleteTask({ url: `/tasks/${dataChoose._id}` }))
    }
  }
  const showModalAdd = () => {
    setEditModal(false)
    setShowModal(true)
    setDataChoose(null)
  }
  const handleLogout = () => {
    dispatch(logOutUser("/logout"))
  }
  const handleCloseUpload = () => {
    setShowModalUpload(false)
  }
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (update) {
      dispatch(getUser(`/user/${dataUser?._id}`))
    }
    setShowModalUpload(false)
  }, [update])
  useEffect(() => {
    if (statusSubmit && tab === 0) {
      setShowModalConfirm(false)
      dispatch(getListTodo({ url: `/tasks/${dataUser?._id}` }))
    } else if (statusSubmit && tab === 1) {
      dispatch(getListNewTask({ url: `/tasks/${dataUser?._id}/newtask` }))
    } else if (statusSubmit && tab === 2) {
      dispatch(getListNewTask({ url: `/tasks/${dataUser?._id}/completed` }))
    }
  }, [statusSubmit])
  useEffect(() => {
    if (tab === 0) {
      setShowModalConfirm(false)
      dispatch(getListTodo({ url: `/tasks/${dataUser?._id}` }))
    } else if (tab === 1) {
      dispatch(getListNewTask({ url: `/tasks/${dataUser?._id}/newtask` }))
    } else if (tab === 2) {
      dispatch(getListCompleted({ url: `/tasks/${dataUser?._id}/completed` }))
    }
  }, [tab])
  useEffect(() => {
    dispatch(getListTodo({ url: `/tasks/${dataUser?._id}` }))
  }, [])
  return (
    <div className='wrap-homePage'>
      <div className='background-homePage'>
        <div className='wrap-content-inner container'>
          <div>
            <div className='avatar-user'>
              <img onClick={() => setShowModalUpload(true)} alt='' src={dataUser?.avatar === "" ? AvatarDefault : dataUser?.avatar} />
              <span>{dataUser ? dataUser?.username : ""}</span>
            </div>
            <div className='wrap-logout'>
              <span>Logout</span>
              <p onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></p>
            </div>
          </div>
        </div>
      </div>
      <div className='wrap-content container'>
        <div >
          <Tab setShowModal={showModalAdd} tab={tab} setTab={setTab} />
          <Table dataTable={dataTable} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
      </div>
      {showModal && <Modal dataChoose={dataChoose} setShowModal={setShowModal} editModal={editModal} setDataChoose={setDataChoose} />}
      {showModalConfirm && <ModalConfirm handleClose={handleClose} handleSubmit={handleSubmit} />}
      {showModalUpload && <ModalUpload handleCloseUpload={handleCloseUpload} />}
    </div>
  )
}
