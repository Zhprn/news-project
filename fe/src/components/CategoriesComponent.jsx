import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories/getAllCategories")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire("Error fetching events", error.message, "error");
        setLoading(false);
      });
  }, []);

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    if (!categoryInput || !slugInput) {
      Swal.fire("Error!", "Both category name and slug are required.");
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        nama_kategori: categoryInput,
        Slug: slugInput,
      };

      if (editCategory) {
        await axios.put(
          `http://localhost:3000/api/categories/${editCategory.id}`,
          requestBody
        );
        Swal.fire("Success!", "Category updated successfully!", "success");
      } else {
        await axios.post(
          "http://localhost:3000/api/categories/addCategories",
          requestBody
        );
        Swal.fire("Success!", "Category added successfully!", "success");
      }

      setCategoryInput("");
      setSlugInput("");
      setEditCategory(null);
      setShowModal(false); // Close the modal after form submission
    } catch (err) {
      Swal.fire("Error!", "Failed to save category.", err);
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
            `http://localhost:3000/api/categories/${id}`
          );
          setCategories(categories.filter((category) => category.id !== id));
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete category.", err);
        }
      }
    });
  };

  const handleEdit = (categorie) => {
    setCategoryInput(categorie.nama_kategori);
    setSlugInput(categorie.Slug);
    setEditCategory(categorie);
    setShowModal(true); // Open the modal for editing
  };

  const handleAdd = () => {
    setCategoryInput("");
    setSlugInput("");
    setEditCategory(null);
    setShowModal(true); // Open the modal for adding new category
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Category</h2>
        <button className="btn btn-success" onClick={handleAdd}>
          Tambah
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kategori</th>
            <th>Slug</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((categorie, index) => (
              <tr key={categorie.id}>
                <td>{index + 1}</td>
                <td>{categorie.nama_kategori}</td>
                <td>{categorie.Slug}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(categorie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(categorie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Adding or Editing Category */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editCategory ? "Edit Category" : "Add New Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCategorySubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : editCategory
                ? "Update Category"
                : "Add Category"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoriesComponent;
