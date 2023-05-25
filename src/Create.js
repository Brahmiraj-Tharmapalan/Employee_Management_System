import { useState } from "react";
import axios from 'axios';
import './create.css';

const Create = () => {
    const [First_name, Fnamechange] = useState("");
    const [Last_name, Lnamechange] = useState("");
    const [Email, emailchange] = useState("");
    const [Password, passwordchange] = useState("");
    const[validation,valchange]=useState(false);


  
    const handlesubmit=(e)=>{
      e.preventDefault();
      let regobj = { First_name, Last_name, Email, Password};
      console.log(regobj);
      // useEffect
      axios({
        url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/AddEmployee/`,
        method: "POST",
        data: regobj,
        headers: { "Content-Type": "application/json" },
      }).then((res)=>{
        alert('Saved successfully.')
        window.location.reload();
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div className="container-fluid1">
                    <form onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left", justifyContent: "center"}}>
                            <div className="card-body1">
                                <div className="row">
                                    <div className="col1">
                                        <div className="form-group1">
                                            <label>Full Name</label>
                                            <input required value={First_name} onMouseDown={e=>valchange(true)} onChange={e=>Fnamechange(e.target.value)} className="form-control"></input>
                                        {First_name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col1">
                                        <div className="form-group1">
                                            <label>Last Name</label>
                                            <input value={Last_name} onChange={e=>Lnamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col1">
                                        <div className="form-group1">
                                            <label>Email</label>
                                            <input type="email" value={Email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col1">
                                        <div className="form-group1">
                                            <label>Password</label>
                                            <input value={Password} onChange={e=>passwordchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col1">
                                        <div className="form-group2">
                                        <button className="btn btn-success" type="submit" >Save</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

    );
}

export default Create;