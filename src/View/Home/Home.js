import React, { useEffect } from 'react'
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../../Component/Tab/Tab';
import { getListTodo } from '../../Redux/ListTodoSlice/listTodo';
export default function Home() {
  const dataUser = useSelector((state) => state.Login.dataUser);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getListTodo({url:`/tasks/${dataUser.user._id}`}))
  },[])
  return (
    <div className='wrap-homePage'>
      <div className='background-homePage'>
      <div className='wrap-content-inner container'>
                <div className='input-search'>
                  <span>Tasks</span>
                  <input/>
                </div>
                <div className='avatar-user'>
                  <img alt='' src='https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA'/>
                  <span>{dataUser?dataUser.user.username:""}</span>
                </div>
              </div>
      </div>
      <div className='wrap-content container'>
              <div >
                <Tab/>
                </div>   
        </div>
    </div>
  )
}
