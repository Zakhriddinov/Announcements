import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CgClose, CgMenuRight } from "react-icons/cg";
import { TiMessage } from "react-icons/ti";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const handleClick = () => setMenuState((prev) => !prev);
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    dispatch(reset());
  };
  return (
    <>
      <header className={"bg-slate-900"}>
        <nav className="flex items-center justify-between full-container h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo/img" className={`w-12 md:w-8 xl:w-10`} />
            <span className="text-2xl lg:text-lg xl:text-xl md:text-md  font-mono font-bold ml-2 text-white">
              E'lonlar doskasi{" "}
              <sup className="font-bold font-mono text-xs text-green-400 border-solid border-2 border-green-400 rounded">
                Beta
              </sup>
            </span>
          </Link>
          <button
            className="text-xl text-white hidden md:block"
            type="button"
            onClick={handleClick}
          >
            {menuState ? <CgClose /> : <CgMenuRight />}
          </button>
          <ul
            className={
              menuState
                ? `md:flex md:left-0 md:absolute md:max-w-full md:w-full md:max-h-screen md:gap-3 md:pl-8 md:pt-8 md:h-screen md:bg-slate-900 md:md:flex-col md:top-16 md:overflow-hidden md:items-start md:justify-start flex items-center justify-center gap-8 z-50`
                : `md:hidden flex items-center justify-center gap-8`
            }
            onClick={handleClick}
          >
            <li className="grid items-center">
              <Link
                to="/create-poster"
                className="text-white flex items-center"
              >
                <TiMessage className="text-xl lg:text-lg xl:text-xl md:text-md" />
                <span className="text-xl lg:text-lg xl:text-xl md:text-md  font-mono font-medium ml-2 text-white">
                  E'lon berish
                </span>
              </Link>
            </li>
            {user ? (
              <>
                <li className="grid items-center">
                  <Link to="/profile" className="text-white flex items-center">
                    <FaRegUser className="text-xl lg:text-lg xl:text-xl md:text-md" />
                    <span className="text-xl lg:text-lg xl:text-xl md:text-md  font-mono font-medium ml-2 text-white">
                      Mening sahifam
                    </span>
                  </Link>
                </li>
                <li className="grid items-center">
                  <button
                    className="text-white flex items-center"
                    onClick={onLogout}
                  >
                    <BiLogOut className="text-xl lg:text-lg xl:text-xl md:text-md" />
                    <span className="text-xl lg:text-lg xl:text-xl md:text-md  font-mono font-medium ml-2 text-white">
                      Chiqish
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="grid items-center">
                  <Link to="/login" className="text-white flex items-center">
                    <BiLogIn className="text-xl lg:text-lg xl:text-xl md:text-md" />
                    <span className="text-xl lg:text-lg xl:text-xl md:text-md  font-mono font-medium ml-2 text-white">
                      Kirish
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
