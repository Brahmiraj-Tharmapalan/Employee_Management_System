import './profile.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiCrownedHeart } from 'react-icons/gi';
import { AiOutlineLogout } from "react-icons/ai";
import Carousel from 'react-bootstrap/Carousel';
import { Modal,} from "react-bootstrap";
import Edit from "./Edit";


import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';




export default function PersonalProfile() {
  const { empid } = useParams();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowEditModal = (id) => {
    setSelectedEmployeeId(id);
    setShowEditModal(true);
  };

  useEffect(() => {
    axios
      .get("https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/GetEmployee?id=" + empid, {
        headers: { "Content-Type": "application/json" }
      })
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


const handleSubmit = (e) => {
  e.preventDefault();
  axios({
    url: `https://esystems.cdl.lk/eTraining/reactTestBackEnd/api/Employee/GetEmployees`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    console.log(response.data);
     navigate("/profile/"+empid+"/Registered");
  })
  .catch(error => {
    console.log(error);

  });
}


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <><><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className='nav'>
        <Navbar.Brand />
        <Navbar.Brand href="#" onClick={handleSubmit}><div className='nav1'><BsFillPeopleFill color='white' />View Employee List</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link>
             <div className='nav2' onClick={() => {
              handleShowEditModal(empid);
            }}> Edit</div>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/">
             <div className='nav2'> Logout<AiOutlineLogout /></div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <section className="vh-1">
        <MDBContainer className="py-0 h-15">
          <MDBRow className="justify-content-center align-items-center h-10">
            <MDBCol lg="6" className="mb-0 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" style={{ width: '80px' }} fluid />
                    {/* <MDBTypography tag="h5">Marie Horwitz</MDBTypography> */}
                    <MDBTypography className='fname'>{first_name} {last_name}</MDBTypography>
                    <MDBCardText className='fname'>Web Designer</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol className='info' md="8">
                    <MDBCardBody className="justify-content-center, align-items-center p-4">
                      <MDBTypography tag="h6" className='hinfo'>Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">

                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className='hdetail'><GiCrownedHeart color='red' />First Name</MDBTypography>
                          <MDBTypography>{first_name}</MDBTypography>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className='hdetail'><GiCrownedHeart color='red' />Last Name</MDBTypography>
                          <MDBTypography>{last_name}</MDBTypography>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className='hdetail'><GiCrownedHeart color='red' />Email</MDBTypography>
                          <MDBTypography>{email}</MDBTypography>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6" className='hdetail'><GiCrownedHeart color='red' />Password</MDBTypography>
                          <MDBTypography>{password}</MDBTypography>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section></>
      <div className='section'>
        <Carousel className='slide' activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block "
              src={require("./image/web2.gif")}
              alt="First slide" />
            <Carousel.Caption >
              <h3 className='cap'>HAPPY CODING</h3>
              <p className='cap'>Happiness should be a function without any parameters</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={require("./image/web5.gif")}
              alt="Second slide" />

            <Carousel.Caption>
              <h3 className='cap'>TEAM WORK</h3>
              <p className='cap'>Success is best when it's shared.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src={require("./image/web4.gif")}
              alt="Third slide" />

            <Carousel.Caption>
              <h3 className='cap'>TASK COMPLETE</h3>
              <p className='cap'>
                Error less code is fun less life.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
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