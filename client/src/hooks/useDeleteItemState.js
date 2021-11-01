import { useState } from "react";

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

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    }

    return [items, handleChange, addItem, deleteItem];
};

export default useDeleteItemState;
