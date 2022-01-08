const express = require("express");
const cors = require("cors");
const path = require('path')
const { firstDoor, secondDoor } = require("./control/login");
const { addUser, deleteUser } = require("./control/Users");
const { ErrorHandler } = require("./middlewares/errorHandler");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors({credentials: true, origin: 'http://'}));
app.use(express.static(path.join(__dirname, '../front/build/')));
app.use(express.static(path.join(__dirname)));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../html.html'));
  });
app.post("/login", firstDoor);
app.post("/verify", secondDoor);
app.post("/adduser", addUser);
app.post("/deleteuser", deleteUser);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build/index.html'));
  });
app.use(ErrorHandler);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})