import React, { Fragment } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";
import Spinner from "../components/Spinner";
import { getMe } from "../features/userSlice";

const MyPosters = () => {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getMe(id));
  }, [id]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex items-center justify-between bg-white border">
        <div className=" font-mono font-bold text-black py-4 md:text-sm text-3xl pl-4 flex items-center">
          <div className="border w-24 rounded-full md:w-8 md:h-8 h-24 flex items-center justify-center shadow-md mr-5">
            <FaUser className="text-5xl md:text-2xl text-neutral-600" />
          </div>
          {users?.name} {users?.lastName}
        </div>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 mt-16 md:mt-8 gap-4 md:gap-1">
        {users?.posters?.map((poster, idx) => (
          <Fragment key={idx}>
            <PosterCard {...poster} />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MyPosters;
