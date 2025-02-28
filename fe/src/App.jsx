import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminloginComponent from './components/AdminLoginComponent';
import Admin from "./pages/Admin"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<Home /> /> 
        <Route path="admin/login" element={<AdminloginComponent />}/>
        <Route path="admin" element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;