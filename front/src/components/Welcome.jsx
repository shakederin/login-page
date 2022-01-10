import {Button, Card} from "react-bootstrap"
import { Link } from "react-router-dom"
import "../style/welcome.css"

export default function Welcome(){
    return(
        <div>
            <Card className="loginCard">
                <Card.Header className="Welcome"><h1>Welcome</h1></Card.Header>
                <Card.Body>
                    <Card.Title>To Continue Please Login</Card.Title>
                    <Link to="/login">
                         <Button className="bigBtn" variant="primary">Login</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}