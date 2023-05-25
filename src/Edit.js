import { useEffect, useState } from "react";
import axios from "axios";
import './edit.css'

const Edit = ({ empid }) => {
  useEffect(() => {
    axios
      .get(
        "https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/GetEmployee?id=" +
          empid,
        {
          headers: { Authorization: "Bearer YOUR_API_KEY" },
        }
      )
      .then((resp) => {
        Fnamechange(resp.data.First_name);
        Lnamechange(resp.data.Last_name);
        emailchange(resp.data.Email);
        passwordchange(resp.data.Password);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const [first_name, Fnamechange] = useState("");
  const [last_name, Lnamechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [validation, valchange] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const regobj = { First_name, Last_name, Email, Password };
    // axios
    //   .put("https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/UpdateEmployee?id=" + empid, regobj, {
    //     headers: { "Authorization": "Bearer YOUR_API_KEY" }
    //   })
    const data = {
      Id: empid,
      First_name: first_name,
      Last_name: last_name,
      Email: email,
      Password: password,
    };
    axios({
      url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/UpdateEmployee/`,
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        alert("Saved successfully.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row1">
        <div className="offset-lg-3 col-lg-6">
          <form className="container-fluid2">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        required
                        value={first_name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => Fnamechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {first_name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        value={last_name}
                        onChange={(e) => Lnamechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        value={password}
                        onChange={(e) => passwordchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="buttons">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
