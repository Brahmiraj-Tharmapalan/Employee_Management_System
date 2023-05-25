import { useEffect, useState } from "react";
import './login.css';
import './forgotpassword.css';
import { Link } from "react-router-dom";





function Login() {
    const [Email, emailchange] = useState("");
 
  useEffect(()=>{
    sessionStorage.clear();
  },[]);

  
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Forgot Password</h3>

          <div className='Auth-form1' >

            <div className="femail">
                <label>Email address</label>
                <input
                  value={Email}
                  onChange={e => emailchange(e.target.value)}
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                />
              </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
             Submit
            </button>
            <Link to="/"> <button type="submit" className="btn btn-primary">
             Back to login
            </button></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;