import { useState } from "react";
import { api, setToken } from "../helperFunctions/axiosInstace";

const useDeleteItemState = (initialValue) => {
    const [items, setItems] = useState(initialValue);

    const handleChange = (itemsList) => {
        setItems(itemsList)
    }

    const addItem = (item) => {
        var temp = items;
        temp.push(item)
        setItems(temp)
    }

    const deleteItem = (id, type, snackBar) => {
        if (type === 'image'){
            setToken(localStorage.token)
            api.delete('/images/' + id)
                .then( response => {
                    setItems(items.filter((item) => item.image_id !== id));
                    snackBar({success: response.data.msg})
                })
                .catch( error => {
                    console.log(error)
                    snackBar({error: error.response.data.msg})
                })
        } else if (type === 'match'){
            setToken(localStorage.token)
            api.delete('/matches/' + id)
                .then( response => {
                    setItems(items.filter((item) => item.match_id !== id));
                    snackBar({success: response.data.msg})
                })
                .catch( error => {
                    console.log(error)
                    snackBar({error: error.response.data.msg})
                })
        } 
    }

    return [items, handleChange, addItem, deleteItem];
};

export default useDeleteItemState;
