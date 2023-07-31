import React from 'react'
import "./Table.css"
import { TableTilte } from "../RenderData/RenderData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import DropDownEdit from '../DropDownEdit';
export default function Table(props) {
  return (
    <div>
      <table className={props.dataTable.length===0 && "tableNulldata"}>
        <thead>
          <tr>
            {TableTilte.map((el, index) =>
              <th key={index}>{el.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
         {props.dataTable.length>0
         ?
         props.dataTable.map((el,index)=>
         <tr>
          <td>{index+1}</td>
          <td>{el.title}</td>
          <td>{el.description}</td>
          <td>{el.time}</td>
          <td>{el.status}</td>
          <td><DropDownEdit handleEdit={()=>props.handleEdit(el)} handleDelete={()=>props.handleDelete(el)}/></td>
         </tr>
         ):<span className='nullData'>
          Không có công việc vui lòng thêm công việc mới
          </span>}
        </tbody>
      </table>
    </div>
  )
}
