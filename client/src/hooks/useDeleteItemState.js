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
            api.delete('/images/' + id)
                .then( response => {
                    // console.log(response)
                    snackBar({success: response.data.msg})
                })
                .catch( error => {
                    // console.log(error)
                    snackBar({error: error.response.data.msg})
                })
        } else if (type === 'match'){

        }
        // trigger update on UI
        setItems(items.filter((item) => item.id !== id));
    }

    return [items, handleChange, addItem, deleteItem];
};

export default useDeleteItemState;
