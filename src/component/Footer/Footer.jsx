import { Link, useLocation } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

function Footer() {
  // const { pathname } = useLocation();
  // if (
  //   pathname === "/login" ||
  //   pathname === "/register" ||
  //   pathname === "/admin" ||
  //   pathname === "/admin/product" ||
  //   pathname === "/admin/order" ||
  //   pathname === "*"
  // )
  //   return;

  return (
    <footer className="bg-zinc-200 py-20">
      <div className=" flex flex-wrap max-w-[1400px] mx-auto px-10 ">
        <div className=" flex-1 basis-[300px]">
          <Link to={"#"} className=" text-3xl font-bold">
            Gr<span className="text-orange-500">O</span>cery
          </Link>
          <p className="text-zinc-600 mt-6 max-w-[350px]">
            Bred for a high content of beneficial substances. Our produts are
            all fresh and healthy.
          </p>
          <p className="text-zinc-800">2025 &copy; All Right Reserved</p>
        </div>
        <ul className="flex-1">
          <li>
            <h5 className="text-zinc-800 text-2xl font-bold">Compnay</h5>
          </li>
          <li className="mt-6">
            <Link className="hover:text-orange-500 text-zinc-800">About</Link>
          </li>
          <li className="mt-6">
            <Link className="hover:text-orange-500 text-zinc-800">FAQ'S</Link>
          </li>
        </ul>
        <ul className="flex-1">
          <li>
            <h5 className="text-zinc-800 text-2xl font-bold">Support</h5>
          </li>
          <li className="mt-6">
            <Link className="hover:text-orange-500 text-zinc-800">
              Support Center
            </Link>
          </li>
          <li className="mt-6">
            <Link className="hover:text-orange-500 text-zinc-800">
              Feedback
            </Link>
          </li>
          <li className="mt-6">
            <Link className="hover:text-orange-500 text-zinc-800">
              Contact us
            </Link>
          </li>
        </ul>
        <div>
          <h5 className="text-zinc-800 text-2xl font-bold"> Stay Connected</h5>
          <p className="text-zinc-600 mt-6 max-w-[350px] mt-6">
            Questions or feedback? we'd love to hear from you
          </p>
          <div className=" flex flex-1 p-1 rounded-lg mt-6 ">
            <input
              className="h-[6vh] pl-5 flex-1 focus:outline-none bg-white"
              type="email"
              placeholder="Enter youe E-mail"
              id="email"
              autoComplete="off"
            />
            <button className="bg-gradient-to-b from-orange-400 to-orange-500 p-2 rounded-lg text-white text-2xl ">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
