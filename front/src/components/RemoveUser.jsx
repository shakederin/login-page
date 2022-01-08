import React, { useRef, useState } from 'react'
import {Button, Form} from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
const url = "http://localhost:8080";

export default function RemoveUser(props) {
    const [color, setColor] = useState(null)
    console.log(props);
    const admin = props.admin
    const userNameInput = useRef()
    const message = useRef()
    
    const removeUser = async () =>{
        const username = userNameInput.current.value;
        if(!username) return;
        try {
            const response = await axios.post(`${url}/deleteuser`, {username}, { withCredentials: true });
            console.log(response.data);
            setColor("green")
            message.current.innerText = "User Deleted Successfully!"
            setTimeout(()=>{
                message.current.innerText = ""
            }, 3000)
        } catch (error) {
            setColor("red")
            message.current.innerText = "Someting Went Wrong, Please Try Again"
            setTimeout(()=>{
                message.current.innerText = ""
            }, 4000)
            console.log(error.response.data.message);
        }
        userNameInput.current.value = "";
    }

    return (
        <div>
        {admin ?
            <div>
                <Link to={"/"}>
                    <div style={{ marginLeft:"8%", width: "6vh", padding:"5vh", fontSize:"40px"}}><i className="fas fa-arrow-left"></i></div>
                </Link>
                <div className="formbgAdd">
                    <h2 className="formHeader">Remove User</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="formTitle">Remove By User Name</Form.Label>
                        <Form.Control className="formInput" ref={userNameInput} type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Button onClick={removeUser} style={{marginBottom:"4vh", marginTop:"4vh"}} className="formInput"  variant="danger" type="submit">Delete User</Button>                  
                <div ref={message} style={{display:"flex", justifyContent:"center" , color:`${color}`, padding:"2vh"}}></div>
                </div>
            </div> :
        <div className="formbg" style={{textAlign:"center"}}> only the admin can remove users</div>
        }
        </div>
    )
}
