import { useState } from "react";

const useDeleteItemState = (initialValue) => {
    const [items, setItems] = useState(initialValue);

    const handleChange = (itemsList) => {
        setItems(itemsList)
    }

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    }

    return [items, handleChange, deleteItem];
};

export default useDeleteItemState;
