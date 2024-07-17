import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthToken";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { ToastBar, toast } from "react-hot-toast";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [itemAdd, setItemAdd] = useState({
    title: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { token } = useContext(AuthContext);
  //   console.log(token);

  //........................................................................................

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  useEffect(() => {
    if (token && userId) {
      fetchTodos();
    }
  }, [token, userId]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v2/get-todos/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data.todoList);
    } catch (error) {
      console.log("Error fetching todos: ", error);
    }
  };

  //................................................................................................

  const handleOnchange = (e) => {
    setItemAdd({
      ...itemAdd,
      [e.target.name]: e.target.value,
    });
  };
  const addHandleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        await axios
          .post(`http://localhost:8000/api/v2/add-todos`, itemAdd, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
          });
          fetchTodos();
          setItemAdd({
            title: "",
            description: "",
          });
          toast.success("Todo added successfully");
          
      } catch (error) {
        console.log("Error: " + error);
      }
    } else {
      console.log("No token found");
    }
  };

  //........................................................................................

  const handleEditChange = (e) => {
    if (e.target.name === "editTitle") {
      setEditTitle(e.target.value);
    } else if (e.target.name === "editDescription") {
      setEditDescription(e.target.value);
    }
  };

  const updateTodo = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        await axios.put(
          `http://localhost:8000/api/v2/update-todos/${editId}`,
          { title: editTitle, description: editDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchTodos(); // Refresh the todo list
        setEditId(null);
        setEditTitle("");
        setEditDescription("");
        toast.success("Todo updated successfully");
      } catch (error) {
        console.log("Error updating todo: ", error);
      }
    }
  };

  //.................................................................................................

  const deleteTodo = async (id) => {
    if (token) {
      try {
        await axios.delete(`http://localhost:8000/api/v2/delete-todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchTodos(); // Refresh the todo list
        toast.success("Todo deleted successfully");
      } catch (error) {
        console.log("Error deleting todo: ", error);
      }
    }
  };

  //..........................................................................................

  return (
    <>
    <div className="flex justify-end items-center">
    <h1 className="sm:absolute top-0 right-0 bg-white rounded-2xl p-3 font-bold m-4"><Link to={'/'}>Home</Link></h1>
    </div>
      
      <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22)">
        <div className="grid place-items-center sm:w-full sm:max-w-md">
          <div className="bg-gray-600 p-6 sm:p-8 lg:p-10 rounded shadow-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">To-Do List</h1>
            <form className="mb-6" onSubmit={addHandleSubmit}>
              <label htmlFor="title" className="block text-gray-100 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Title"
                name="title"
                value={itemAdd.title}
                onChange={handleOnchange}
                required
              />
              <label htmlFor="description" className="block text-gray-100 mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Description"
                name="description"
                value={itemAdd.description}
                onChange={handleOnchange}
                required
              />
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="p-4 bg-gray-100 text-gray-900 font-bold py-2 rounded hover:bg-gray-300 transition duration-300"
                >
                  Add Todo
                </button>
              </div>
            </form>
            <div>
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="mb-4 p-4 border rounded shadow-sm bg-gray-50 hover:shadow-md transition duration-300"
                >
                  {editId === todo._id ? (
                    <>
                      <input
                        type="text"
                        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        name="editTitle"
                        value={editTitle}
                        onChange={handleEditChange}
                      />
                      <input
                        type="text"
                        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        name="editDescription"
                        value={editDescription}
                        onChange={handleEditChange}
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={updateTodo}
                          className="mr-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{todo.title}</h3>
                      <p>{todo.description}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setEditId(todo._id);
                            setEditTitle(todo.title);
                            setEditDescription(todo.description);
                          }}
                          className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  
}

export default Todo;
