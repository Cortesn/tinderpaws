import { useState } from "react";

const useDeleteItemState = (initialValue) => {
    const [items, setItems] = useState(initialValue);

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    }

    return [items, deleteItem];
};

export default useDeleteItemState;
