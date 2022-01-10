import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import AddUser from "./components/AddUser";
import Login from "./components/Login";
import RemoveUser from "./components/RemoveUser";
import Welcome from "./components/Welcome";

function App() {
  const [username, setUsername] = useState(null);
  const [path, setPath] = useState("/");
  const [admin, setAdmin] = useState({admin: false, password: null});
  console.log(username);
  return (
    <Router>
      <Routes>
          <Route path ="/" element={<Welcome />}/>
          <Route path ="/user/add" element={<AddUser admin={admin}/>}/>
          <Route path ="/user/remove" element={<RemoveUser admin={admin}/>}/>
          <Route path ="/login" element={<Login setUsername={setUsername} setAdmin={setAdmin}  admin={admin} path={path} setPath={setPath}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
