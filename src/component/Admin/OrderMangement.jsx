import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Chip,
  Button,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Fetch orders from JSON server
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/invoice");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Order fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={4} mt="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
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
        <Typography fontSize={28} fontWeight={700} mb={3}>
          Order Management
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Order ID</b>
                </TableCell>
                <TableCell>
                  <b>Total Amount</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>${order.total}</TableCell>

                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "PAID"
                            ? "success"
                            : order.status === "PENDING"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(order.createAt).toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton color="primary">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
