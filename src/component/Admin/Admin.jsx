import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  useMediaQuery,
  CssBaseline,
  ListItemButton,
} from "@mui/material";
import {
  ShoppingCart,
  Inventory,
  ListAlt,
  PendingActions,
  Logout,
  Menu,
  Search,
  Notifications,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { InvoiceContext } from "../../Context/InvoiceContext";
import { ProductsContext } from "../../Context/ProductContext";
import AdminGraph from "./Graph";

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const navigate = useNavigate();
  const { invoice, totalSale, totalOrder } = useContext(InvoiceContext);
  const { totalProducts } = useContext(ProductsContext);

  // Responsive query: true if screen is md or larger
  const isMdUp = useMediaQuery("(min-width:960px)"); // 960px is md breakpoint

  function handlerSinOut() {
    localStorage.removeItem("auth");

    navigate("/login");
  }

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
    },
    { title: "Product Management", path: "/admin/product" },
    {
      title: "Order Management",
      path: "/admin/order",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ bgcolor: "orange", color: "white", zIndex: 1201 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            color: "black",
            px: 4,
            py: 1.5,
            fontSize: { md: "1.25rem", xs: "1rem" },
          }}
        >
          {/* Menu button for mobile */}
          {!isMdUp && (
            <IconButton onClick={toggleDrawer} sx={{ color: "orange" }}>
              <Menu fontSize="large" />
            </IconButton>
          )}
          <Box>
            <Link to={"/"} className=" text-3xl font-bold">
              Gr<span className="text-orange-500">O</span>cery
            </Link>
          </Box>

          {/* Right icons */}
          <Box display="flex" alignItems="end" gap={2}>
            <IconButton color="inherit">
              <Notifications sx={{ color: "orange", fontSize: "40px" }} />
            </IconButton>
            <IconButton>
              <Avatar>A</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        open={isMdUp || mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: "orange",
            color: "white",
            mt: isMdUp ? 4 : 8,
          },
        }}
      >
        <List sx={{ mt: 10 }}>
          {menuItems.map((text, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                onClick={() => navigate(text.path)}
                sx={{
                  mb: 5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <ListItemText
                  primary={text.title}
                  primaryTypographyProps={{ fontSize: 18, fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box flexGrow={1} />
        <Button
          startIcon={<Logout />}
          sx={{
            mb: 5,
            mx: 2,
            bgcolor: "orange",
            color: "white",
            border: "2px solid white",
            borderRadius: 2,
            "&:hover": { bgcolor: "white", color: "orange" },
          }}
          onClick={handlerSinOut}
        >
          Sign Out
        </Button>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        flex={1}
        p={4}
        pt={15}
        ml={isMdUp ? "260px" : 0} // offset for permanent drawer on desktop
        overflow="auto"
      >
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          }}
          gap={3}
          gridAutoRows="180px"
        >
          {[
            {
              title: "Total Sales",
              value: `$ ${totalSale}`,
              icon: <ShoppingCart sx={{ fontSize: "40px", color: "orange" }} />,
            },
            {
              title: "Total Orders",
              value: totalOrder,
              icon: <ListAlt sx={{ fontSize: "40px", color: "orange" }} />,
            },
            {
              title: "Total Products",
              value: totalProducts,
              icon: <Inventory sx={{ fontSize: "40px", color: "orange" }} />,
            },
            {
              title: "Pending Orders",
              value: "42",
              icon: (
                <PendingActions sx={{ fontSize: "40px", color: "orange" }} />
              ),
            },
          ].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                  bgcolor: "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "whitesmoke",
                  }}
                >
                  {item.icon}
                  <Box>
                    <Typography fontSize={22} fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={30}>{item.value}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
        <Box>
          <AdminGraph props={{ totalSale, totalOrder, totalProducts }} />
        </Box>
      </Box>
    </Box>
  );
}
