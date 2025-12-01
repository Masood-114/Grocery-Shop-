import { useState, useContext } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  MenuItem,
  Typography,
  TablePagination,
} from "@mui/material";
import { ProductsContext } from "../../Context/ProductContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function AddProductModal({ open, onClose }) {
  const { product, setProduct } = useContext(ProductsContext);


  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: String(Date.now()),
      ...form,
    };

    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    setProduct([...product, newProduct]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Add New Product
        </Typography>

        <TextField
          name="name"
          label="Product Name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          name="price"
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={handleChange}
        />

        <TextField
          select
          name="category"
          label="Category"
          fullWidth
          margin="normal"
          value={form.category}
          onChange={handleChange}
        >
          <MenuItem value="Fruits">Fruits</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
          <MenuItem value="Dairy">Dairy</MenuItem>
          <MenuItem value="Meat">Meat</MenuItem>
          <MenuItem value="SeaFood">SeaFood</MenuItem>
        </TextField>

        <TextField
          name="image"
          label="Image URL"
          fullWidth
          margin="normal"
          value={form.image}
          onChange={handleChange}
        />

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
