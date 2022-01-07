const express = require("express");
const cors = require("cors");
const { firstDoor, secondDoor } = require("./control/login");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

app.post("/login", firstDoor)
app.post("/verify", secondDoor)

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`);
})