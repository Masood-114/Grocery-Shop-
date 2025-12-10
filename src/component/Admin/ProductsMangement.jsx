import { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Backdrop,
  TextField,
} from "@mui/material";

import { Delete, Edit, Add } from "@mui/icons-material";
import AddProductModal from "./AddProducts";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAndSave,
  deleteProduct,
  fetchProducts,
  updateProduct,
  updateProductAndSave,
} from "../../Features/Products/ProductsSlice";

export default function ProductManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [prePage, setPerPage] = useState(4);
  const { filtered } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [editRowId, setEditRowId] = useState(null);
  const [edit, setEdit] = useState({
    name: "",
    price: "",
    image: "",
  });

  const editHandleClick = (product) => {
    setEditRowId(product.id);
    setEdit({ name: product.name, price: product.price });
  };
  const handleSave = (id) => {
    console.log("HandeProduct", id);
    const editProduct = {
      id,
      ...edit,
      price: Number(edit.price),
    };
    console.log("HandeProduct", editProduct);
    dispatch(updateProductAndSave(editProduct));
    dispatch(updateProduct(editProduct));
    setEditRowId(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
  };
  return (
    <>
      <Box p={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{
              bgcolor: "orange",
              "&:hover": { bgcolor: "#ff9800" },
            }}
          >
            Go Back
          </Button>

          <Typography fontSize={28} fontWeight={700}>
            Product Management
          </Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<Add />}
            sx={{
              bgcolor: "orange",
              "&:hover": { bgcolor: "#ff9800" },
            }}
          >
            Add New Product
          </Button>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Price</b>
                  </TableCell>
                  <TableCell>
                    <b>image</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered
                  ?.slice(page * prePage, page * prePage + prePage)
                  .map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editRowId === product.id ? (
                          <TextField
                            variant="outlined"
                            type="text"
                            value={edit.name}
                            onChange={(e) =>
                              setEdit({ ...edit, name: e.target.value })
                            }
                          />
                        ) : (
                          product.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editRowId === product.id ? (
                          <TextField
                            type="number"
                            value={edit.price}
                            onChange={(e) =>
                              setEdit({ ...edit, price: e.target.value })
                            }
                          />
                        ) : (
                          ` $${product.price} `
                        )}
                      </TableCell>
                      <TableCell>
                        {editRowId === product.id ? (
                          <Box>
                            <TextField
                              label="Image URl"
                              value={edit.image}
                              onChange={(e) =>
                                setEdit({ ...edit, image: e.target.value })
                              }
                              size="small"
                              fullWidth
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            {edit.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                                onError={(e) => {
                                  e.target.src = "/assets/placeholder.png";
                                }}
                              />
                            )}
                          </Box>
                        ) : (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {editRowId === product.id ? (
                          <>
                            <Button
                              onClick={() => handleSave(product.id)}
                              color="primary"
                            >
                              Save
                            </Button>
                            <Button onClick={handleCancel} color="secondary">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <IconButton color="primary">
                              <Edit onClick={() => editHandleClick(product)} />
                            </IconButton>
                            <IconButton color="error">
                              <Delete
                                onClick={() =>
                                  dispatch(deleteAndSave(product.id))
                                }
                              />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filtered.length}
              rowsPerPage={prePage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
