import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import List from "./components/List";
import api from "../server/mainserver";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: true, mssg: "", status: "" });
  const [userID, setUserID] = useState(null);

  useEffect(async () => {
    try {
      const response = await api.get("/");
      if (response.data.tasks) {
        const newList = response.data.tasks;
        setList(newList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [list]);

  const showAlert = (show = false, mssg = "", status = "") => {
    setAlert({ show, mssg, status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "mssing Value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item._id === userID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      try {
        const patchItem = { model: name };
        await api.patch(`/${userID}`, { ...patchItem });
        showAlert(true, "item edited", "success");
        setIsEditing(false);
        setName("");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newItem = { model: name };
        const response = await api.post("/", newItem);
        const newData = [...list, response.data];
        showAlert(true, "sucess", "success");
        setList(newData);
        setName("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item._id === id);

    setIsEditing(true);
    setName(specificItem.model);
    setUserID(id);
  };
  const deleteItem = (id) => {
    setList(list.filter((item) => item._id !== id));
    try {
      api.delete(`/${id}`);
    } catch (error) {
      console.log(error);
    }

    console.log(list);
    showAlert(true, "item deleted", "danger");
  };
  return (
    <div className="section-center">
      <div className="grocery-form">
        {alert.show && <Alert removeAlert={showAlert} list={list} alert={alert} />}
        <h1 className="text-center my-4 text-xl">Grocery buds</h1>
        <form className="form-control">
          <input
            className="grocery "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit} className="submit-button">
            {isEditing ? "edit" : "submit"}
          </button>
        </form>
        <ul className="grocery-container">
          {list.map((item) => (
            <List item={item} key={item._id} editItem={editItem} deleteItem={deleteItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
