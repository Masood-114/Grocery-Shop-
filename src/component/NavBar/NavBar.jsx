import { Link } from "react-router-dom";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { TbMenu2, TbMenu3 } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [navShadow, setNavshadow] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useContext(CartContext);
  console.log(cart);

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
                type="text"
                id="text"
                placeholder="Search"
                className="flex-1 px-3  h-[5vh] focus:outline-none focus:ring-0"
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
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to={"/login"}
              className="bg-gradient-to-b from-orange-400 to-orange-500
     text-white px-8 py-3 rounded-lg md:text-xl text-md 
     hover:scale-105 hover:to-orange-600 transition-all duration-300 cursor-pointer"
            >
              LogIn
            </Link>
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
                to={"#"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
                className="hover:text-orange-500  font-semibold text-zinc-800 tracking-wider"
              >
                Process
              </Link>
            </li>
            <li>
              <Link
                to={"#"}
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
