import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import Verify from "./Verify";
import "../style/login.css"
const url = "http://localhost:8080";

axios.defaults.withCredentials = true

export default function Login(props){
    const [show, setShow] = useState(false);
    const admin = props.admin.admin;
    const userNameInput = useRef()
    const passwordInput = useRef()
    const message = useRef()
    const verifyMessage = useRef()

    const handleClose = () => {
        userNameInput.current.value = ""
        passwordInput.current.value = ""
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const submitForm = async ()=>{
        const username = userNameInput.current.value;
        const password = passwordInput.current.value;
        if(!password || !username) {
            message.current.innerText = "Either username or password are missing";
            setTimeout(()=>{
                message.current.innerText = ""
            }, 3000)
            return;
        }
        try {
            const response = await axios.post(`${url}/login`, {username, password}, { withCredentials: true });
            props.setAdmin({admin: response.data, password: passwordInput.current.value});
            console.log(response.data);
            handleShow()
        } catch (error) {
            console.log(error.response.data.message);
            message.current.innerText = error.response.data.message
            setTimeout(()=>{
                message.current.innerText = ""
            }, 3000)
        }
    }

    const submitVerify = async ()=>{
        let code = ""
        const inputArray = document.getElementsByClassName("verifyCode");
        for(const input of inputArray){
            code += input.value
        }
        if(code.length !== 6){
            verifyMessage.current.innerText = "Missing Params";
            setTimeout(() => {
                verifyMessage.current.innerText = "";
            }, 3000);
            return;
        };
        const username = userNameInput.current.value;
        try {
            const response = await axios.post(`${url}/verify`, {key: code, username});
            console.log(response.data, 2);
            window.location.replace(response.data);
            return
        } catch (error) {
            console.log("inerror");
            if(error.response.data.message === "Expired Key"){
                verifyMessage.current.innerText = error.response.data.message + ". Please Login Again.";
                setTimeout(() => {
                    document.getElementById("closeVerify").click()
                    verifyMessage.current.innerText = ""
                    userNameInput.current.value ="";
                    passwordInput.current.value ="";
                }, 4000);
                return
            }
            verifyMessage.current.innerText = error.response.data.message + ". Please Try Again.";
            setTimeout(() => {
                verifyMessage.current.innerText = "";
            }, 3000);
        }
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
                <div ref={message} style={{display:"flex", justifyContent:"center" , color:`red`, padding:"2vh"}}></div>                
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
                            <Button className="blueButton" variant="success">Add User</Button>
                        </Link>
                        <Link to="/user/remove">
                            <Button className="blueButton" variant="danger">Remove User</Button>
                        </Link>
                    </div> 
                :
                    <div>
                        <Button id="closeVerify" variant="secondary" onClick={handleClose}>Close</Button>
                        <Button className="blueButton" id="sumbmitVerify" onClick={submitVerify} variant="primary">Submit</Button> 
                    </div>
                }
                </Modal.Footer>
                <div ref={verifyMessage} style={{display:"flex", justifyContent:"center", color:`red`, fontSize:"3vh", textAlign:"center"}}></div>
            </Modal>
        </div>
    )
} 