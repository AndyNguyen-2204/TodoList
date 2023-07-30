import React, { useEffect } from 'react'
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Tab from '../../Component/Tab/Tab';
export default function Home() {
  const dataUser = useSelector((state) => state.Login.dataUser);
  useEffect(()=>{

  },[])
  return (
    <div className='wrap-homePage'>
      <div className='background-homePage'></div>
      <div className='wrap-content container'>
             <div className='wrap-content-inner'>
                <div className='input-search'>
                  <input/>
                </div>
                <div className='avatar-user'>
                  <img alt='' src='https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA'/>
                  <span>{dataUser?dataUser.user.username:""}</span>
                </div>
              </div>
              <div >
                <Tab/>
                </div>   
        </div>
    </div>
  )
}
