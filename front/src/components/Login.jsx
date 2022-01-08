import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Verify from "./Verify";
import "../login.css"
const url = "http://localhost:8080";

axios.defaults.withCredentials = true

export default function Login(props){
    const [show, setShow] = useState(false);
    const admin = props.admin;
    const userNameInput = useRef()
    const passwordInput = useRef()
    

    const handleClose = () => {
        userNameInput.current.value = ""
        passwordInput.current.value = ""
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const submitForm = async ()=>{
        const username = userNameInput.current.value;
        const password = passwordInput.current.value;
        if(!password || !username) return;
        try {
            const response = await axios.post(`${url}/login`, {username, password}, { withCredentials: true });
            props.setAdmin(response.data);
            console.log(response.data);
            handleShow()
        } catch (error) {
            console.log(error);
        }
    }

    const submitVerify = async ()=>{
        let code = ""
        const inputArray = document.getElementsByClassName("verifyCode");
        for(const input of inputArray){
            code += input.value
        }
        if(code.length !== 6){
            return
        };
        const username = userNameInput.current.value;
        const response = await axios.post(`${url}/verify`, {key: code, username});
        console.log();
        if(response.data === "wrong/invalid token" || response.data ==="wrong token"){
            document.getElementById("closeVerify").click()
            userNameInput.current.value ="";
            passwordInput.current.value ="";
            return
        }
        console.log(response);
    }

    return(
        <div>
            <div className="formbg">
                <h2 className="formHeader">Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="formTitle">User Name</Form.Label>
                    <Form.Control className="formInput" ref={userNameInput} type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="formTitle">Password</Form.Label>
                    <Form.Control className="formInput" ref={passwordInput} type="password" placeholder="Password" />
                </Form.Group>
                <Button style={{marginBottom:"4vh"}} className="formInput" onClick={submitForm} variant="primary" type="submit">Login</Button>                  
            </div>
     

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{diplay: "flex", justifyContent: "center"}}
            >
                <Modal.Header>
                    <Modal.Title>Verify User</Modal.Title>
                </Modal.Header >
                <div style={{padding: "16px"}} className="messageDiv">
                    We Sent You A Code To Your Email address. 
                </div>
                <Modal.Body>{<Verify/>}</Modal.Body>
                <Modal.Footer>
                {admin ? 
                    <div>
                        <Button id="closeVerify" variant="secondary" onClick={handleClose}>Close</Button>
                        <Button className="blueButton" id="sumbmitVerify" onClick={submitVerify} variant="primary">Submit</Button> 
                        <Link to="/user/add">
                            <Button className="blueButton" admin={1} variant="success">Add User</Button>
                        </Link>
                        <Link to="/user/remove">
                            <Button className="blueButton" admin={admin.toString()} variant="danger">Remove User</Button>
                        </Link>
                    </div> 
                :
                    <div>
                        <Button id="closeVerify" variant="secondary" onClick={handleClose}>Close</Button>
                        <Button className="blueButton" id="sumbmitVerify" onClick={submitVerify} variant="primary">Submit</Button> 
                    </div>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
} 