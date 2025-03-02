import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Swal from "sweetalert2";

export default function ManageGalleryComponent() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach(({ file }) => formData.append("file", file));

    try {
      await axios.post("http://localhost:3000/api/galery/addGalery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Gambar berhasil diunggah!", "success");
      navigate("/admin");
    } catch (err) {
      Swal.fire("Error", `Gagal mengunggah gambar! ${err.response?.data?.message || err.message}`, "error");
    }
  };

  return (
    <div className="p-4 bg-light rounded shadow-sm">
      <h2 className="h5 mb-3">Manage Gallery</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Upload</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
        </Form.Group>
        <div className="mb-3">
          <Form.Label>Foto</Form.Label>
          <div className="d-flex gap-2 border p-2 rounded bg-white">
            {images.map(({ preview }, index) => (
              <Card key={index} style={{ width: "4rem", position: "relative" }}>
                <Card.Img variant="top" src={preview} className="rounded" />
                <CloseButton
                  onClick={() => removeImage(index)}
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                />
              </Card>
            ))}
          </div>
        </div>
        <Button variant="primary" type="submit">Upload</Button>
      </Form>
    </div>
  );
}