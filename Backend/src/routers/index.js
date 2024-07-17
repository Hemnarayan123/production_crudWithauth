import express from 'express'


const router = express.Router();
import { ForgetPassword, userLogin, userRegister, ResetPassword } from '../controllers/user.controllers.js';

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/forget_password", ForgetPassword)
router.post("/reset_password/:id/:token",ResetPassword)
// router.post("/update_password/:token", UpdatePassword)
// router.post("/verify_otp", VerifyOTP)

//.........................................................................................................

const todo = express.Router();
import {addTodo,updateTodo, deleteTodo, getTodos} from '../controllers/todo.controllers.js';


todo.post('/add-todos', addTodo);
todo.put('/update-todos/:id', updateTodo);
todo.delete('/delete-todos/:id', deleteTodo);
todo.get('/get-todos/:id', getTodos);


export {router, todo}