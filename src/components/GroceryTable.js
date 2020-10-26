import React, {useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'

import GroceryItem from './GroceryItem'

function GroceryTable({groceryList, setGroceryList}) {

    const [sortBy, setSortBy] = useState("Show All")
    const [filteredList, setFilteredList] = useState(groceryList)

    useEffect(() => {
        switch (sortBy){
            case "Have":
            case "Run Out":
                setFilteredList(groceryList.filter(item => item.status===sortBy? true: false))
            break;
            default: setFilteredList(groceryList)
        }
    }, [sortBy, groceryList])

    const onDelete = deleteIndex =>{
        const newList = groceryList.filter((item, index)=>{
            return deleteIndex===index?false:true
        })
        
        setGroceryList(newList)
        localStorage.setItem("groceryList", JSON.stringify(newList))
    }

    const onEdit = (editedItem, editedIndex) => {
        console.log(editedItem, editedIndex)
        const newGroceryList = groceryList.map((item, index)=>{
            console.log(index===editedIndex && item.status!==editedItem.status)
            if(index===editedIndex && item.status!==editedItem.status){
                editedItem.lastChanges=new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                return editedItem
            }
            return item
        })
        setGroceryList(newGroceryList)
        localStorage.setItem("groceryList", JSON.stringify(newGroceryList));
    }

        return (
            <div>
                <select class="form-control" id="priority" style={{width: "15%"}} value={sortBy} onChange={e => {setSortBy(e.target.value)}}>
                    <option>Show All</option>
                    <option>Run Out</option>
                    <option>Have</option>
                </select>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Last Time Changed</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        filteredList===null?
                        null:
                        filteredList.map((item, index) => {
                            return <GroceryItem item={item} index={index} onDelete={onDelete} onEdit={onEdit}/>
                        })}
                        
            
                    </tbody>
                </Table>
            </div>
        )
}

export default GroceryTable
