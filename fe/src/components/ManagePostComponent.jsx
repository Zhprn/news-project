import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const ManagePostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState({
    id: "",
    judul: "",
    slug: "",
    kategori: "",
    body: "",
    gambar: null, // For image upload
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/post/getAllPost")
      .then((response) => {
        setPosts(response.data.post);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire("Error fetching posts", error.message, "error");
        setLoading(false);
      });
  }, []);

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
          await axios.delete(`http://localhost:3000/api/post/${id}`);
          setPosts(posts.filter((post) => post.id !== id));
          Swal.fire("Deleted!", "Post has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete post.", err.message, "error");
        }
      }
    });
  };

  const handleEdit = (post) => {
    setPostData({
      id: post.id,
      judul: post.judul,
      slug: post.slug,
      kategori: post.kategori,
      body: post.body,
      gambar: null,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files) {
      setPostData((prevData) => ({
        ...prevData,
        gambar: files[0],
      }));
    } else {
      setPostData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", postData.judul);
    formData.append("slug", postData.slug);
    formData.append("kategori", postData.kategori);
    formData.append("body", postData.body);

    if (postData.gambar) {
      formData.append("file", postData.gambar);
    }

    try {
      await axios.put(`http://localhost:3000/api/post/${postData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success", "Post successfully updated!", "success");
      setShowModal(false);
      setPostData({
        id: "",
        judul: "",
        slug: "",
        kategori: "",
        body: "",
        gambar: null,
      });
      // Reload the post list after the update
      axios
        .get("http://localhost:3000/api/post/getAllPost")
        .then((response) => {
          setPosts(response.data.post);
        })
        .catch((error) => {
          Swal.fire("Error fetching posts", error.message, "error");
        });
    } catch (err) {
      Swal.fire("Error", `Failed to update post! ${err.response?.data?.message || err.message}`, "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.id}>
                  <td>{index + 1}</td>
                  <td>{post.judul}</td>
                  <td>{post.kategori}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(post)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                name="judul"
                value={postData.judul}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={postData.slug}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                name="kategori"
                value={postData.kategori}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                value={postData.body}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Perbarui Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManagePostComponent;