import React, {useState} from 'react'
import GroceryAddBar from './GroceryAddBar'
import GroceryTable from './GroceryTable'


function GroceryList() {

    const sortList = (list) => {

        const sortedList = list===null? []: list.sort((a,b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            const priorityA = a.priority
            const priorityB = b.priority

            if(priorityA===priorityB){
                if (nameA > nameB) {
                    return 1;
                } else if (nameA < nameB) {
                    return -1;
                }
            } else {
                if (priorityA > priorityB) {
                    return 1;
                } else if (priorityA < priorityB) {
                    return -1;
                }
            }
            return 1
        })

        return sortedList
    }

    const [ groceryList, setGroceryList ] = useState(sortList(JSON.parse(localStorage.getItem('groceryList'))))

    return (
        <div>
            <GroceryAddBar setGroceryList={setGroceryList} sortList={sortList} />
            <GroceryTable groceryList={groceryList} setGroceryList={setGroceryList} />
        </div>
    )
}

export default GroceryList
