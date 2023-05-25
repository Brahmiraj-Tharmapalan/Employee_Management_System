import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./registration.css";
import { Modal,} from "react-bootstrap";
import { OverlayTrigger, Popover, CloseButton } from "react-bootstrap";
import Create from "./Create";
import Edit from "./Edit";

const Registered = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [empdata, empdatachange] = useState(null);
  const { empid } = useParams();
  const navigate = useNavigate();
  const popoverRef = useRef();
  const [popoverOpen, setPopoverOpen] = useState(false);



  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowEditModal = (id) => {
    setSelectedEmployeeId(id);
    setShowEditModal(true);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      axios({
        url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/DeleteEmployee/${id}`,
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    axios({
      url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/GetEmployees`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.data;
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/GetEmployees`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/profile/" + empid);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };
  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      !event.target.closest(".popover")
    ) {
      setPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container className="nav">
            <Navbar.Brand />
            <div ref={popoverRef}>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={popoverOpen}
                rootClose
                overlay={
                  <Popover id="popover-create">
                    <Popover.Header className="d-flex justify-content-between align-items-center">
                      <div className="h3">New Employee Registreation</div>
                      <CloseButton onClick={togglePopover} />
                    </Popover.Header>
                    <Popover.Body>
                      <Create />
                    </Popover.Body>
                  </Popover>
                }
              >
                <Navbar.Brand
                  href="#"
                  onClick={togglePopover}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 className="nav1">
                    Add New <AiOutlineUserAdd size={30} />
                  </h1>
                </Navbar.Brand>
              </OverlayTrigger>
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link eventKey={2} onClick={handleSubmit}>
                  <div className="nav2"> Back to Profile</div>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link eventKey={2} href="/">
                  <div className="nav2"> Logout</div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      <div className="container-fluid g-0">
        <div className=" tableContainer">
          <div className="cardnpmnpmn">
            <div className="card-title">
              <div className="eheading">Employee Listing</div>
            </div>
            <div className="card-body1">
              <table className="table table-bordered">
                <thead className="bg ">
                  <tr>
                    <td>Employee Id</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Password</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                {empdata &&
                   empdata.map((item) => {
    if (item.Id === parseInt(empid)) {
      return null;
    }
    return (
      <tr key={item.Id}>
        <td>{item.Id}</td>
        <td>{item.First_name}</td>
        <td>{item.Last_name}</td>
        <td>{item.Email}</td>
        <td>{item.Password}</td>
        <td className="buttonse">
          <button
            onClick={() => {
              Removefunction(item.Id);
            }}
            className="btn btn-danger"
          >
            Remove
          </button>
          <button
            onClick={() => {
              handleShowEditModal(item.Id);
            }}
            className="btn btn-success"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  })}
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Modal show={showEditModal} onHide={handleCloseEditModal} >
        <Modal.Header closeButton>
          <Modal.Title>Edit the Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit empid={selectedEmployeeId} handleClose={handleCloseEditModal} />
        </Modal.Body>
      </Modal>
    </>
  );
                        }
 export default Registered;