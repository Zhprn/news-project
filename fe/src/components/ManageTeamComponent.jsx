import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ManageTeamComponent = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    spesialis: "",
    posisi: "",
    deskripsi: "",
    foto: null,
    portofolio: null,
    instagram: "https://",
    linkedin: "https://",
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get("http://localhost:3000/api/team/getAllTeams")
      .then((response) => setTeams(response.data.teams))
      .catch((error) =>
        Swal.fire("Error fetching teams", error.message, "error")
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (editTeam) {
        await axios.put(
          `http://localhost:3000/api/team/${editTeam.id}`,
          formDataToSend
        );
        Swal.fire("Success!", "Team member updated successfully!", "success");
      } else {
        await axios.post(
          "http://localhost:3000/api/team/addTeam",
          formDataToSend
        );
        Swal.fire("Success!", "Team member added successfully!", "success");
      }

      setShowModal(false);
      setEditTeam(null);
      setFormData({
        nama: "",
        spesialis: "",
        posisi: "",
        deskripsi: "",
        foto: null,
        portofolio: null,
        instagram: "https://",
        linkedin: "https://",
      });
      fetchTeams();
    } catch (err) {
      Swal.fire("Error!", "Failed to save team member.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (team) => {
    setEditTeam(team);
    setFormData({
      nama: team.nama,
      spesialis: team.spesialis,
      posisi: team.posisi,
      deskripsi: team.deskripsi,
      foto: null, // File upload tidak bisa diisi ulang di form
      portofolio: null,
      instagram: team.instagram,
      linkedin: team.linkedin,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/team/${id}`);
  
          if (response.status === 200) {
            Swal.fire("Deleted!", "The team member has been deleted.", "success");
            fetchTeams(); // Refresh daftar tim setelah delete
          } else {
            Swal.fire("Error!", "Failed to delete team member.", "error");
          }
        } catch (err) {
          console.error("Delete Error:", err);
          Swal.fire("Error!", err.response?.data?.message || "Failed to delete team member.", err);
        }
      }
    });
  };
  
  

  return (
    <div className="container mt-4">
      <h2>Manage Team</h2>
      <Button variant="success" onClick={() => setShowModal(true)}>
        Add New Team Member
      </Button>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Spesialis</th>
            <th>Posisi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team.nama}</td>
                <td>{team.spesialis}</td>
                <td>{team.posisi}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(team)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(team.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No team members available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editTeam ? "Edit Team Member" : "Add New Team Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Spesialis</Form.Label>
              <Form.Control
                type="text"
                name="spesialis"
                value={formData.spesialis}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Posisi</Form.Label>
              <Form.Control
                type="text"
                name="posisi"
                value={formData.posisi}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                name="foto"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Portofolio (PDF)</Form.Label>
              <Form.Control
                type="file"
                name="portofolio"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : editTeam
                ? "Update Team Member"
                : "Add Team Member"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageTeamComponent;
