import React, { Fragment } from "react";
import { FaUser } from "react-icons/fa";
import PosterCard from "../components/PosterCard";
import TitleComponent from "../components/utils/TitleComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe, updateUser } from "../features/userSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NotFoundPoters from "../components/NotFoundPoters";
const ProfilePage = () => {
  const { users, loading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const showToastMessage = () => {
    toast.success("Ma'lumotlaringizni yangiladingiz!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      bodyClassName: "success"
    });
  };
  useEffect(() => {
    dispatch(getMe(user._id));
  }, [user._id,dispatch]);
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const formData = {
      name,
      lastName,
      phone,
      password
    };
    if (password !== confirmPassword) {
      toast.error("Parollar mos kelmadi", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else if (
      name === "" ||
      lastName === "" ||
      password === "" ||
      phone === ""
    ) {
      toast.error("Ma'lumotlarni teshiring", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else if (name && lastName && phone && password) {
      dispatch(updateUser(formData));
      showToastMessage();
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="grid grid-cols-6 gap-4 md:grid-cols-1 mb-16">
        <div className="w-full h-max  md:col-span-4 col-span-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  p-3">
          <h2 className="font-mono font-bold text-xl text-center mt-3">
            Foydalanuvchi
          </h2>
          <div className="mt-4 flex items-center">
            <div className="border w-24 rounded-full h-24 flex items-center justify-center shadow-md">
              <FaUser className="text-5xl text-neutral-600" />
            </div>
            <div className="ml-7">
              <h3 className="font-mono font-bold text-xl text-blue-400 md:text-base">
                {users?.name} {users?.lastName}
              </h3>
              <h4 className="font-mono font-semibold my-1 md:text-sm">
                Saytda:{" "}
                <span className="font-mono font-regular text-sm text-gray-400 md:text-sm">
                  {users?.createdAt?.slice(0, 10)} dan beri
                </span>
              </h4>
              <h4 className="font-mono font-semibold md:text-sm">
                E'lonlar soni:{" "}
                <span className="font-mono font-regular text-sm text-gray-400 md:text-sm">
                  {users?.posters?.length}
                </span>
              </h4>
              <h4 className="font-mono font-semibold md:text-sm">
                Telefon:{" "}
                <span className="font-mono font-regular text-sm text-green-400 md:text-sm">
                  +998 {users?.phone}
                </span>
              </h4>
              <h4 className="font-mono font-semibold md:text-sm">
                Email:{" "}
                <span className="font-mono font-regular text-sm text-green-400 md:text-sm">
                  {users?.email}
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-span-4 w-full h-max  md:col-span-4 col-span-2  bg-white rounded-lg border border-gray-200 shadow-md  p-3">
          <form
            className="grid grid-cols-2 md:grid-cols-1 gap-2"
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="name" className="font-mono font-medium">
                Ism
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-300 text-gray-900 my-2 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular"
                defaultValue={user?.name}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="font-mono font-medium">
                Familiyangiz
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
                defaultValue={user?.lastName}
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-mono font-medium">
                Telefon raqam
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
                defaultValue={user?.phone}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono font-medium">
                Elektron pochta
              </label>
              <input
                type="email"
                name="email"
                id="email"
                disabled={true}
                className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
                defaultValue={user?.email}
              />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
              placeholder="Parol"
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
              placeholder="Parolni tekshirish"
            />
            <div className="mt-4 md:mt-2 flex-col ">
              <button
                type="submit"
                className="bg-green-500 font-regular font-mono text-white p-2 w-full md:p-1.5 md:text-xs"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>
      <TitleComponent title="Mening e'lonlarim" />
      {users?.posters?.length > 0 ? (
        <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 mt-16 md:mt-8 gap-4 md:gap-1">
          <>
            {users?.posters?.map((poster, idx) => (
              <Fragment key={idx}>
                <PosterCard {...poster} />
              </Fragment>
            ))}
          </>
        </div>
      ) : (
        <NotFoundPoters />
      )}
    </div>
  );
};

export default ProfilePage;
