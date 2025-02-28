import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const AdminLoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      if (response.data && response.data.refresh_token) {
        const userRole = response.data.user?.role;

        if (userRole !== "admin") {
          throw new Error("Anda tidak memiliki akses sebagai admin!");
        }

        Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });
        Cookies.set("id", response.data.user.id);

        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        });

        navigate("/Admin");
      } else {
        throw new Error("Token tidak ditemukan!");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan!";
      setError(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{
      backgroundImage: "url('https://source.unsplash.com/random/1600x900/?technology')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="card p-4 shadow" style={{ width: "380px", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Admin Logo" style={{ width: "80px" }} />
        </div>
        <h3 className="text-center mb-3">Admin Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginComponent;
