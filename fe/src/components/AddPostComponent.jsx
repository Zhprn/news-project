import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const AddPostComponent = () => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    judul: "",
    slug: "",
    kategori: "",
    body: "",
    gambar: null, // For image upload
  });

  // Handle form input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append("judul", postData.judul);
    formData.append("slug", postData.slug);
    formData.append("kategori", postData.kategori);
    formData.append("body", postData.body);

    if (postData.gambar) {
      formData.append("file", postData.gambar); // Append the file
    }

    try {
      await axios.post("http://localhost:3000/api/post/addPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      Swal.fire("Success", "Post berhasil Ditambahkan!", "success");
      navigate("/admin"); // Redirect after successful post creation
    } catch (err) {
      Swal.fire(
        "Error",
        `Gagal Menambahkan post! ${err.response?.data?.message || err.message}`,
        "error"
      );
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center">Tambah Postingan Baru</h3>
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
            required
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
          Tambah Post
        </Button>
      </Form>
    </Container>
  );
};

export default AddPostComponent;