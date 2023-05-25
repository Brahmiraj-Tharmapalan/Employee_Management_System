import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import './login.css';
import axios from 'axios';

import { toast } from 'react-toastify';



function Login() {
  const navigate = useNavigate();
  const notify = () => toast.error("invalid credentials",{autoClose: 3000,});

  let [authMode, setAuthMode] = useState("signin")
  const [First_name, Fnamechange] = useState("");
  const [Last_name, Lnamechange] = useState("");
  const [Email, emailchange] = useState("");
  const [Password, passwordchange] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  useEffect(()=>{
    sessionStorage.clear();
  },[]);



  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/Login?Email=${Email}&Password=${Password}`,
      method: "POST",
      data: { Email, Password },
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      console.log(response.data);
         if(Email === response.data.Email && Password === response.data.Password)  {
          navigate("/profile/"+response.data.Id);
         }else{
          console.log("wrong");
          notify()
         }
      // navigate("/profile/"+response.data.Id);
    })
    .catch(error => {
      console.log(error);

    });
  }
  
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <div>
          <img className='pic1' src={require('./image/web3.gif')} alt="login pic" />
        </div>
        <form className="Auth-form" onSubmit={handleSignupSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group10 mt-3">
              <label>Email address</label>
              <input
                value={Email}
                onChange={e => emailchange(e.target.value)}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group10 mt-3">
              <label>Password</label>
              <input
                value={Password}
                onChange={e => passwordchange(e.target.value)}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="./Forgotpassword">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { First_name, Last_name, Email, Password};
    console.log(regobj);
    axios({
      url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/AddEmployee/`,
      method: "POST",
      data: regobj,
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      alert("Saved successfully.");
      setAuthMode(authMode = "signin")
    })
}
  
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className='Auth-form1' >
            <div>
              <div className="form-group mt-3">
                <label>First Name</label>
                <input
                  value={First_name}
                  onChange={e => Fnamechange(e.target.value)}
                  type="text"
                  className="form-control mt-1"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Last Name</label>
                <input
                  value={Last_name}
                  onChange={e => Lnamechange(e.target.value)}
                  type="text"
                  className="form-control mt-1"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div>
            <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  value={Email}
                  onChange={e => emailchange(e.target.value)}
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                />
              </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                  value={Password}
                  onChange={e => passwordchange(e.target.value)}
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
             Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;