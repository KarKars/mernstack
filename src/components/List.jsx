import React from "react";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const List = ({ item, editItem, deleteItem }) => {
  const { _id, model } = item;
  return (
    <div className="grocery-item" key={_id}>
      <h1 className=" flex items-center">{model}</h1>
      <div className="space-x-1 flex items-center">
        <button className="p-1 hover:bg-blue-200 rounded self-center">
          <AiFillEdit onClick={() => editItem(_id)} />
        </button>
        <button className="p-1 hover:bg-blue-200 rounded">
          <AiFillDelete onClick={() => deleteItem(_id)} />
        </button>
      </div>
    </div>
  );
};

export default List;
