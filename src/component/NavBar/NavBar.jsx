import { Link, useNavigate } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2, TbMenu3 } from "react-icons/tb";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { logOut } from "../../Features/User/UserSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [navShadow, setNavshadow] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openUser = Boolean(anchorElUser);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const setting = ["Setting", "ProfileEdit", "LogOut"];
  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    function toggleSahdow() {
      setNavshadow(window.scrollY > 10);
    }
    window.addEventListener("scroll", toggleSahdow);
  }, []);

  return (
    <>
      <header
        className={`bg-white fixed right-0 left-0 top-0 z-50  ${
          navShadow ? "shadow-xl" : ""
        }`}
      >
        <nav
          className={`flex justify-between max-w-[1400px] md:h-[14vh] h-[12vh] items-center mx-auto px-10 `}
        >
          <Link to={"/"} className=" text-3xl font-bold">
            Gr<span className="text-orange-500">O</span>cery
          </Link>
          <ul className="md:flex items-center gap-x-15 hidden ">
            <li>
              <Link
                to={"/"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={"/process"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Process
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                About us
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-x-5 ">
            <div className="md:flex  border-2 border-orange-500 rounded-full p-1 hidden">
              <input
                autoComplete="off"
                type="text"
                id="text"
                placeholder="Search"
                className="flex-1 px-3  h-[5vh] focus:outline-none focus:ring-0 "
              />
              <button className="bg-orange-500 flex h-10 w-10 justify-center items-center rounded-full text-white">
                <IoSearch />
              </button>
            </div>

            <Link
              className="text-zinc-800 hover:text-orange-500 text-3xl relative"
              to={"/cart"}
            >
              <HiMiniShoppingBag />
              {cart?.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart?.items?.length}
                </span>
              )}
            </Link>
            {!user ? (
              <Link
                to={"/login"}
                className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
              >
                LogIn
              </Link>
            ) : (
              <Box>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    src={user?.image}
                    alt={user?.name || "User"}
                    sx={{
                      width: 35,
                      height: 35,
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#ffedd5",
                        color: "#f97316",
                      },
                    }}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  open={openUser}
                  onClose={handleCloseUserMenu}
                  TransitionComponent={Slide}
                  TransitionProps={{ direction: "down" }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    sx: {
                      bgcolor: "rgba(255, 165, 0, 0.1)",
                      backdropFilter: "blur(5px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      borderRadius: "1.5rem",
                      p: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      minWidth: "220px",
                      marginTop: "20px",
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>Settings</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>Edit Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      onLogout();
                    }}
                  >
                    <Typography>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <Link
              className="text-2xl text-zinc-800 hover:text-orange-500 md:hidden "
              onClick={toggleMenu}
            >
              {showMenu ? <TbMenu3 /> : <TbMenu2 />}
            </Link>
          </div>
          <ul
            className={`flex flex-col items-center gap-y-10 bg-orange-500/10 backdrop-blur-xl p-10  shadow-2xl
         gap-x-12 md:hidden absolute top-30 -left-full -translate-x-1/2
         rounded-2xl transition-all duration-500 ${showMenu ? "left-1/2" : ""}`}
          >
            <li>
              <Link
                to={"/"}
                onClick={() => setShowMenu(false)}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowMenu(false)}
                to={"/contact"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowMenu(false)}
                to={"/process"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Process
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowMenu(false)}
                to={"/about"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                About us
              </Link>
            </li>
            <li className="flex  border-2 border-orange-500 rounded-full p-1 md:hidden">
              <input
                type="text"
                id="text"
                placeholder="Search"
                className="flex-1 px-3  h-[5vh] focus:outline-none focus:ring-0"
              />
              <button className="bg-orange-500 flex h-10 w-10 justify-center items-center rounded-full text-white">
                <IoSearch />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
