import React, { useEffect, useState } from 'react'
import "./ModalConfirm.css"
import { StatusTask } from "../RenderData/RenderData"
import { useDispatch, useSelector } from 'react-redux'
import { uploadAvatar } from '../../Redux/Login/login'
export default function ModalUpload(props) {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(null)
  const dispatch = useDispatch()
  const changeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('image', event.target.files[0])
      setFormData(formData)
      setFile(URL.createObjectURL(event.target.files[0]))
    }
  }
  const handleSubmitUpload = () => {
    if (formData) {
      console.log("🚀 ~ file: ModalUpload.js:20 ~ handleSubmitUpload ~ formData:", formData)
      dispatch(uploadAvatar(formData))
    }
  }

  return (
    <div id="myModal" className="modal">
      <div className="modalConfirm-content">
        <div onClick={() => props.handleCloseUpload()} className="close">&times;</div>
        <h1>Upload Avatar</h1>
        <div className="profile-img-wrap edit-img">
          <img className="inline-block" src={file !== null ? file : "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA"} alt="user" />
          <div className="fileupload btn">
            <span className="btn-text">edit</span>
            <input className="upload" type="file" onChange={changeHandler} accept="image/jpeg, image/png, image/gif" />
          </div>
        </div>
        <p>Are you sure you want to change avatar?</p>
        <div className='wrap-button-submitModal'>
          <button onClick={() => props.handleCloseUpload()} className='cancle-ConfirmModal'>Cancle</button>
          <button onClick={handleSubmitUpload} className='delete-SubmitModal'>Upload</button>
        </div>
      </div>
    </div>
  )
}
