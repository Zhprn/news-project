import { Nav, Button } from "react-bootstrap";
import { FaHome, FaFileAlt, FaFolder, FaImages, FaUsers, FaUserTie } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Logout",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout Success!", "", "success");
        Cookies.remove("refresh_token");
        Cookies.remove("id");
        navigate("/admin/login");
      } else if (result.isDenied) {
        Swal.fire("Cancelled Logout");
      }
    });
  };

  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light sidebar">
      {/* Logo */}
      <div className="text-center mb-4">
        <h4 className="fw-bold text-primary">FIABLE</h4>
        <p className="text-warning fw-semibold">LAW OFFICE</p>
      </div>

      {/* Navigation */}
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("dashboard")}
            className={`d-flex align-items-center ${activeTab === "dashboard" ? "text-primary" : "text-secondary"}`}
          >
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("addPost")}
            className={`d-flex align-items-center ${activeTab === "addPost" ? "text-primary" : "text-secondary"}`}
          >
            <FaFileAlt className="me-2" /> Add Post
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("managePost")}
            className={`d-flex align-items-center ${activeTab === "managePost" ? "text-primary" : "text-secondary"}`}
          >
            <FaFolder className="me-2" /> Manage Post
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("manageCategory")}
            className={`d-flex align-items-center ${activeTab === "manageCategory" ? "text-primary" : "text-secondary"}`}
          >
            <FaFolder className="me-2" /> Manage Category
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("manageGallery")}
            className={`d-flex align-items-center ${activeTab === "manageGallery" ? "text-primary" : "text-secondary"}`}
          >
            <FaImages className="me-2" /> Manage Gallery
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("manageTeam")}
            className={`d-flex align-items-center ${activeTab === "manageTeam" ? "text-primary" : "text-secondary"}`}
          >
            <FaUsers className="me-2" /> Manage Team
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            onClick={() => onTabChange("managePosition")}
            className={`d-flex align-items-center ${activeTab === "managePosition" ? "text-primary" : "text-secondary"}`}
          >
            <FaUserTie className="me-2" /> Manage Position
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Logout Button */}
      <div className="mt-auto text-center">
        <Button variant="warning" className="w-100 fw-bold" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
