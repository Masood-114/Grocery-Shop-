import { useContext, useState } from "react";
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
} from "@mui/material";

import { Delete, Edit, Add, Flag, Pages } from "@mui/icons-material";
import { ProductsContext } from "../../Context/ProductContext";
import AddProductModal from "./AddProducts";
import { useNavigate } from "react-router";

export default function ProductManagement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [prePage, setPerPage] = useState(4);
  const { product, removeFromProducts, updateFromProducts } =
    useContext(ProductsContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
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
                {product
                  ?.slice(page * prePage, page * prePage + prePage)
                  .map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <img
                          src={product.image || "/assets/placeholder.png"}
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <IconButton color="primary">
                          <Edit
                            onClick={() => updateFromProducts(product.id)}
                          />
                        </IconButton>
                        <IconButton color="error">
                          <Delete
                            onClick={() => removeFromProducts(product.id)}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={product.length}
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
