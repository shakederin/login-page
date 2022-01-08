import React, { useRef } from 'react'
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState } from 'react';
const url = "http://localhost:8080";

export default function AddUser(props) {
    const [color, setColor] = useState (null)
    console.log(props);
    const admin = props.admin
    const userNameInput = useRef()
    const passwordInput = useRef()
    const emailInput = useRef()
    const message = useRef()
    
    const addUser = async () =>{
        const username = userNameInput.current.value;
        const password = passwordInput.current.value;
        const email = emailInput.current.value;
        if(!password || !username || !email) return;
        try {
            const response = await axios.post(`${url}/adduser`, {username, password, email}, { withCredentials: true });
            console.log(response.data);
            setColor("green")
            message.current.innerText = "User Add Successfully!"
            setTimeout(()=>{
                message.current.innerText = ""
            }, 3000)
        } catch (error) {
            setColor("red")
            message.current.innerText = "Someting Went Wrong, Please Try Again"
            setTimeout(()=>{
                message.current.innerText = ""
            }, 3000)
            console.log(error);
        }
        userNameInput.current.value = "";
        passwordInput.current.value = "";
        emailInput.current.value = "";
    }

    return (
        <div>
        {admin ?
            <div>
                <Link to={"/"}>
                    <div style={{ marginLeft:"8%", width: "6vh", padding:"5vh", fontSize:"40px"}}><i className="fas fa-arrow-left"></i></div>
                </Link>
                <div className="formbgAdd">
                    <h2 className="formHeader">Add User</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="formTitle">User Name</Form.Label>
                        <Form.Control className="formInput" ref={userNameInput} type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="formTitle">Password</Form.Label>
                        <Form.Control className="formInput" ref={passwordInput} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="formTitle">Email</Form.Label>
                        <Form.Control className="formInput" ref={emailInput} type="email" placeholder="Email" />
                    </Form.Group>
                    <Button onClick={addUser} style={{marginBottom:"4vh", marginTop:"4vh"}} className="formInput"  variant="success" type="submit">Give Access To That User</Button>                  
                <div ref={message} style={{display:"flex", justifyContent:"center" , color:`${color}`, padding:"2vh"}}></div>
                </div>
            </div> :
        <div className="formbg" style={{textAlign:"center"}}> only the admin can add users</div>
        }
        </div>
    )
}
