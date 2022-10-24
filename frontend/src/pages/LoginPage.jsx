import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, reset } from "../features/authSlice";
import Spinner from "../components/Spinner";
const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = userData;

  const showToastMessage = () => {
    toast.success("Muvafaqqiyatli o'tdingiz!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      bodyClassName: "success"
    });
  };

  const { user, loading, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (status === "rejected") {
      toast.error("Email yoki parol noto'g'ri!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    }
    if (status === "fulfilled" && user) {
      navigate("/");
      showToastMessage();
    }

    dispatch(reset());
  }, [user, status, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    if (email === "" || password === "") {
      toast.error("Ma'lumotlarni to'ldiring!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else {
      dispatch(loginUser(userData));
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="w-full mx-auto mt-16 h-max  max-w-sm bg-white border border-gray-200 shadow-md  p-3">
        <h2 className="text-center font-mono font-bold text-2xl md:text-sm ">
          Kirish
        </h2>
        <form className="p-4" onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Elektron pochta"
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Parol"
            value={password}
            onChange={onChange}
          />
          <button
            type="submit"
            className="bg-blue-600 font-regular font-mono text-white p-2 w-full md:p-1.5 md:text-xs"
          >
            Kirish
          </button>
          <p className="font-mono font-regular text-sm text-gray-500 mt-3">
            Yangi foydalanuvchimisiz?{" "}
            <Link to="/register" className="font-bold text-blue-500">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
