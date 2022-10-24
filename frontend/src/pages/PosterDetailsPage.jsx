import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { deletePoster, getPoster } from "../features/posterSlice";
import { toast } from "react-toastify";

const PosterDetailsPage = () => {
  const { posterId } = useParams();
  const navigate = useNavigate();
  const { poster, loading } = useSelector((state) => state.poster);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const showToastMessage = () => {
    toast.success("E'lon olib tashlandi!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      bodyClassName: "success"
    });
  };
  useEffect(() => {
    dispatch(getPoster(posterId));
  }, [posterId]);

  const onDeletedPoster = () => {
    dispatch(deletePoster(posterId));
    showToastMessage();
    navigate("/posters");
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="grid grid-cols-6 md:grid-cols-1 gap-4 mt-16 pb-20">
        <div className="col-span-4">
          <div className=" max-h-96 h-screen md:max-h-60 md:h-88 h-screen md:col-span-6 col-span-2 w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <img
              src={poster?.image?.secure_url}
              className="h-full w-full rounded-lg"
              alt={poster?.title}
            />
          </div>
          <div className="col-span-2 w-full bg-white rounded-lg border border-gray-200 shadow-md p-5 mt-5">
            <h3 className="font-mono font-regular text-gray-400 text-sm">
              Joylashtirildi {poster?.createdAt?.slice(0, 10)}
            </h3>
            <h1 className="font-regular font-mono text-3xl mt-2 md:text-xl">
              {poster?.title}
            </h1>
            <h2 className="font-bold font-mono text-3xl my-4 md:my-3 mb-8 md:text-2xl">
              {poster?.price} so'm
            </h2>

            <span className="font-bold font-mono text-3xl text-gray-600 md:text-2xl">
              Tavsif
            </span>
            <p className="font-regular font-mono text-gray-500 mt-4 md:text-sm md:mt-2">
              {poster?.description}
            </p>
            <hr className="mt-8 mb-4 border-1 bg-gray-300" />
            <div className="flex items-center justify-between">
              <span className="font-medium font-mono text-sm">
                ID:{poster?._id}
              </span>
              <span className="font-medium font-mono text-sm">
                Ko'rildi:{poster.visits}
              </span>
            </div>
          </div>
        </div>
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
                {poster?.user?.name} {poster?.user?.lastName}
              </h3>
              <h4 className="font-mono font-semibold my-1 md:text-sm">
                Saytda:{" "}
                <span className="font-mono font-regular text-gray-400 md:text-sm">
                  {poster?.user?.createdAt?.slice(0, 10)}
                </span>
              </h4>
              <h4 className="font-mono font-semibold md:text-sm">
                E'lonlar soni:{" "}
                <span className="font-mono font-regular text-gray-400 md:text-sm">
                  {poster?.user?.posters?.length}
                </span>
              </h4>
              <h4 className="font-mono font-semibold md:text-sm">
                Telefon:{" "}
                <span className="font-mono font-regular text-green-400 md:text-sm">
                  +998 {poster?.user?.phone}
                </span>
              </h4>
            </div>
          </div>
          <div className="mt-4 md:mt-2 flex items-center justify-center flex-col p-7 gap-2">
            <Link
              to={`/user-posters/${poster?.user?._id}`}
              className="w-full bg-green-500 font-regular font-mono text-white p-2 text-center md:p-1.5 md:text-xs"
            >
              Muallifning boshqa e'lonlari
            </Link>
            {user?._id === poster?.user?._id ? (
              <>
                <Link
                  to={`/edit-poster/${posterId}`}
                  className="w-full bg-yellow-500 font-regular font-mono text-white p-2 text-center md:p-1.5 md:text-xs"
                >
                  O'zgartirish
                </Link>
                <button
                  type="button"
                  onClick={onDeletedPoster}
                  className="bg-red-500 font-regular font-mono text-white p-2 w-full md:p-1.5 md:text-xs"
                >
                  O'chirish
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PosterDetailsPage;
