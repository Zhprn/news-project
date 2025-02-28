import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManagePositionComponent = () => {
  const [positions, setPositions] = useState([]);
  const [positionInput, setPositionInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editPosition, setEditPosition] = useState(null);

  const modalRef = useRef(null);  // Reference to the modal

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/position/getAllPosition")
      .then((response) => {
        console.log("API Response:", response.data.position);
        setPositions(response.data.position);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
        Swal.fire("Error fetching positions", error.message, "error");
        setLoading(false);
      });
  }, []);

  const handlePositionSubmit = async (event) => {
    event.preventDefault();

    if (!positionInput) {
      Swal.fire("Error!", "Position name is required.");
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        position: positionInput,
      };

      if (editPosition) {
        await axios.put(
          `http://localhost:3000/api/positions/${editPosition.id}`,
          requestBody
        );
        Swal.fire("Success!", "Position updated successfully!", "success");
      } else {
        await axios.post(
          "http://localhost:3000/api/positions/addPosition",
          requestBody
        );
        Swal.fire("Success!", "Position added successfully!", "success");
      }

      setPositionInput("");
      setEditPosition(null);
      
      const modal = window.bootstrap.Modal.getInstance(modalRef.current); 
      modal.hide();  // Close the modal after form submission
    } catch (err) {
      Swal.fire("Error!", "Failed to save position.", err);
    } finally {
      setLoading(false);
    }
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
          await axios.delete(
            `http://localhost:3000/api/position/${id}`
          );
          setPositions(positions.filter((position) => position.id !== id));
          Swal.fire("Deleted!", "Position has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete position.", err);
        }
      }
    });
  };

  const handleEdit = (position) => {
    setPositionInput(position.nama_posisi);
    setEditPosition(position);
    
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Position</h2>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addPositionModal"
          onClick={() => setEditPosition(null)} // Reset edit mode
        >
          Add
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.length > 0 ? (
            positions.map((position, index) => (
              <tr key={position.id}>
                <td>{index + 1}</td>
                <td>{position.kategori}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(position)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(position.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No positions available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="addPositionModal"
        tabIndex="-1"
        aria-labelledby="addPositionModalLabel"
        aria-hidden="true"
        ref={modalRef}  // Add the ref to the modal element
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPositionModalLabel">
                {editPosition ? "Edit Position" : "Add New Position"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditPosition(null)} // Reset the form on close
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePositionSubmit}>
                <div className="mb-3">
                  <label htmlFor="positionInput" className="form-label">
                    Position Name
                  </label>
                  <input
                    type="text"
                    id="positionInput"
                    className="form-control"
                    value={positionInput}
                    onChange={(e) => setPositionInput(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : editPosition
                    ? "Update Position"
                    : "Add Position"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePositionComponent;
