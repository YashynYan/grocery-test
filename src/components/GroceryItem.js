import React, {useState} from 'react'
import { AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'

function GroceryItem({item, index, onDelete, onEdit}) {

    const [ editStatus, setEditStatus ] = useState(false)
    const [ status, setStatus ] = useState(item.status)

    const onEditClick = () => {
        if (editStatus){
            onEdit({...item, status: status}, index)
            setEditStatus(!editStatus)
        } else {
            setEditStatus(!editStatus)
        }
    }



    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.priority}</td>
            {
                editStatus?
                <td>
                    <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between" }}>
                    <select className="form-control" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                        <option>Run Out</option>
                        <option>Have</option>
                    </select>
                    <AiOutlineCheck onClick={onEditClick} style={{width: "38px", height:"38px"}}/>
                    </div>
                </td>: 
                <td>{item.status} <BsPencil onClick={onEditClick}/></td>
                }
            <td>{item.lastChanges}</td>
            
            <td><AiFillDelete onClick={()=>{onDelete(index)}}/> 
            
            </td>
        </tr>
    )
}

export default GroceryItem
