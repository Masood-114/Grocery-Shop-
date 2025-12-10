import React, { useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import { Modal, Paper } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoice } from "../../Features/Invoice/InvoiceSlice";

export default function OrderManagement() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const { invoice } = useSelector((state) => state.invoice);
  console.log(invoice, "ordermange");
  useEffect(() => {
    dispatch(loadInvoice());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOverView = (order) => {
    setselectedOrder(order);
    setOpenModal(true);
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
              {invoice
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      {new Date(order.date).toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleOverView(order)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="order-detail-title"
            aria-describedby="order-detail-description"
          >
            <Paper
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 350, sm: 500 },
                maxHeight: "80vh",
                overflowY: "auto",
                p: 4,
                borderRadius: 3,
                boxShadow: 24,
                bgcolor: "background.paper",
              }}
            >
              {/* Header */}
              <Typography
                id="order-detail-title"
                variant="h6"
                fontWeight={700}
                gutterBottom
                textAlign="center"
              >
                Order Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Order Summary */}
              <Box mb={3}>
                <Typography component="div">
                  <strong>Order ID:</strong> {selectedOrder?.id}
                </Typography>
                <Typography component="div">
                  <strong>Total:</strong> ${selectedOrder?.total.toFixed(2)}
                </Typography>
                <Typography component="div">
                  <strong>Status:</strong>{" "}
                  <Chip
                    label={selectedOrder?.status}
                    color={
                      selectedOrder?.status === "PAID"
                        ? "success"
                        : selectedOrder?.status === "PENDING"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </Typography>
                <Typography component="div">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedOrder?.date).toLocaleString()}
                </Typography>
              </Box>

              {/* Items Table */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  Items:
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  {selectedOrder?.cart?.items?.map((item) => (
                    <Box
                      key={item.id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      px={2}
                      py={1}
                      sx={{
                        bgcolor: "#fafafa",
                        borderBottom: "1px solid #e0e0e0",
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Footer Button */}
              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(false)}
                  sx={{ px: 4 }}
                >
                  Close
                </Button>
              </Box>
            </Paper>
          </Modal>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={invoice?.length}
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
