import React, { useRef } from 'react'
import {Button, Form} from "react-bootstrap";
const url = "http://localhost:8080";
export default function RemoveUser() {

    const userNameInput = useRef()
    const passwordInput = useRef()
    
    return (
        <div>
        <div className="formbg">
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
                <Form.Control className="formInput" ref={passwordInput} type="email" placeholder="Email" />
            </Form.Group>
            <Button style={{marginBottom:"4vh", marginTop:"4vh"}} className="formInput"  variant="success" type="submit">Give Access To That User</Button>                  
        </div>
    </div>
    )
}
