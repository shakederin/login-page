const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path')
const { firstDoor, secondDoor } = require("./control/login");
const { addUser, deleteUser } = require("./control/Users");
const { ErrorHandler } = require("./middlewares/errorHandler");
const { checkCookies } = require("./middlewares/cookiesCheck");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://'}));
app.use(express.static(path.join(__dirname, '../front/build/')));
app.use(express.static(path.join(__dirname, '../frontend/build/')));

app.post("/login", firstDoor);
app.post("/verify", secondDoor);
app.post("/adduser", addUser);
app.post("/deleteuser", deleteUser);

app.get('/home', checkCookies, (req, res) => {
    console.log("in get-home");
    res.sendFile(path.join(__dirname, '../frontend/build/index.html')); // serve homepage
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build/index.html'));
  });

app.use(ErrorHandler);

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})