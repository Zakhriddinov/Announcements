import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, lastName, email, phone, password, confirmPassword } = userData;

  const showToastMessage = () => {
    toast.success("Ro'yxatdan o'tdingiz!", {
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
    if (status === "fulfilled" && user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, status, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      lastName,
      email,
      phone,
      password
    };
    if (
      name === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      phone === ""
    ) {
      toast.error("Ma'lumotlaringizni qaytadan tekshiring", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else if (password !== confirmPassword) {
      toast.error("Parollar mos tushmadi", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else {
      dispatch(registerUser(userData));
      showToastMessage();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto mt-8 h-max  max-w-sm bg-white border border-gray-200 shadow-md  p-3">
        <h2 className="text-center font-mono font-bold text-2xl md:text-sm ">
          Ro'yxatdan o'tish
        </h2>
        <form className="p-4 validateForm" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 my-2 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular"
            placeholder="Ismingizni kiriting"
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Familiyangizni kiriting"
          />
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Telefon raqam"
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="E'lektron pochta"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Parol"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
            placeholder="Parolni tekshirish"
          />
          <button
            type="submit"
            className="bg-blue-600 font-regular font-mono text-white p-2 w-full md:p-1.5 md:text-xs"
          >
            Ro'yxatdan o'tish
          </button>
          <p className="font-mono font-regular text-sm text-gray-500 mt-3">
            Men allaqachon ro'yhatdan o'tganman?{" "}
            <Link to="/login" className="font-bold text-blue-500">
              Kirish
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
