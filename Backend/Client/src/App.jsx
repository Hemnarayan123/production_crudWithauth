import './App.css'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Home from './components/pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import SignOut from './components/auth/SignOut'
import Todo from './components/pages/Todo'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'
import EmailConfirmation from './components/pages/EmailConfirmation'

function App() {

  return (
<>
   <BrowserRouter>
   <Toaster />
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/signup" element={<SignUp/>}/>
   <Route path="/signin" element={<SignIn/>}/>
   <Route path="/signout" element={<SignOut/>}/>
   <Route path="/todo" element={<Todo/>}/>
   <Route path="/forget_password" element={<ForgetPassword/>}/>
   <Route path="/reset_password/:id/:token" element={<ResetPassword/>}/>
   <Route path="/email_confirmation" element={<EmailConfirmation/>}/>
   </Routes>
   </BrowserRouter>
</>
  )
}

export default App
