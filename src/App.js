// import { ToastContainer } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Registered from './Registered';
import Create from './Create';
import Edit from './Edit';
import Forgotpassword from './Forgotpassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
<div className='App'>
  <ToastContainer/>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/profile/:empid' element={<Profile/>}></Route>
    {/* <Route path='/home' element={<Home/>}></Route> */}
    <Route path="/profile/:empid/Registered" element={<Registered/>}></Route>
    <Route path='/profile/:empid/Registered' element={<Create />}></Route>
    <Route path='/profile/:empid/Registered' element={<Edit />}></Route>
    <Route path='/Forgotpassword' element={<Forgotpassword />}></Route>
  </Routes>
  </BrowserRouter>
</div>
    
  );
}


export default App;

