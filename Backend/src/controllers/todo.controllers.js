import { List} from '../models/list.model.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'




// ..........................................................Add a new todo
// http://localhost:8000/api/v2/add-todos
export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing from header' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const existingUser = await User.findById(decoded.userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const list = new List({ title, description, users: existingUser._id });

    await list.save();
    existingUser.list.push(list._id);
    await existingUser.save();

    res.status(201).json({ list });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ message: error.message });
  }
};


//.......................................................... Get todos by user id
// ​​http://localhost:8000/api/v2/get-todos/665028efc540aca2b7487359

export const getTodos = async (req, res) => {
  try {
    const todoList = await List.find({ users: req.params.id }).sort({ createdAt: -1 }); // 'list' to filter by user ID
   
    if (todoList.length > 0) {
      res.status(200).json({ todoList });

    } else {
      res.status(404).json({ 
        message: 'User not found or no tasks' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};





// .................................................................Update a todo
// ​http://localhost:8000/api/v2/update-todos/66505785b22dff802fb57ef2

export const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing from header' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const existingUser = await User.findById(decoded.userId);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateList = await List.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (updateList) {
      res.status(200).json({ message: "Updated Todo" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ...........................................................Delete a todo
// http://localhost:8000/api/v2/delete-todos/665028efc540aca2b7487359

export const deleteTodo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing from header' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const existingUser = await User.findByIdAndUpdate(
      decoded.userId, 
      { $pull: { list: req.params.id } }
    );

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Deleted Todo" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





















