import React, {useState} from 'react'
import { Button } from 'react-bootstrap'


function GroceryAddBar({setGroceryList, sortList}) {
    const defaultValue = {name:"", priority:1, status:"Run Out", lastChanges: null }
    const [product, setProduct] = useState(defaultValue)
    
    const handleChange = (changedParameter) =>{
        setProduct( product => {
            return {
                ...product,
                ...changedParameter
            }
        })
    }

    const onClick = () =>{

        if(product.name.trim().length===0){
            alert("Please, enter product name")
        } else {
            const previousGroceryList = JSON.parse(localStorage.getItem('groceryList'))
            product.lastChanges=new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
            const newGroceryList = previousGroceryList===null? [product] : sortList(previousGroceryList.concat(product))
            localStorage.setItem("groceryList", JSON.stringify(newGroceryList));
            setGroceryList(newGroceryList)
            setProduct(defaultValue)
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="w-50">
                <input className="form-control" type="text" placeholder="Product Name" value={product.name} onChange={(e)=>{handleChange({name: e.target.value})}}></input>
                <select className="form-control" id="priority" value={product.priority} onChange={e=>{handleChange({priority: parseInt(e.target.value)})}}>
                    <option value="1">1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <select className="form-control" id="status" value={product.status} onChange={e=>{handleChange({status: e.target.value})}}>
                    <option>Run Out</option>
                    <option>Have</option>
                </select>
                <Button variant="primary" onClick={onClick}>
                    Add Product
                </Button>
            </div>
        </div>
    )
}

export default GroceryAddBar
