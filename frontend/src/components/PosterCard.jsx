import React from "react";
import { Link } from "react-router-dom";

const PosterCard = (poster) => {
  const { title, image, price, createdAt, region, _id } = poster;
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
      <Link to={`/poster-details/${_id}`}>
        <img
          className="rounded-t-lg w-full h-52 md:h-32"
          src={image?.secure_url}
          alt={title}
        />
      </Link>
      <div className="p-5 md:p-2">
        <Link to={`/poster-details/${_id}`}>
          <h5 className="mb-2 text-xl md:text-xs hover:text-white hover:bg-slate-900 inline font-bold tracking-tight text-gray-900 font-bold font-mono">
            {title}
          </h5>
        </Link>
        <h2 className="text-2xl font-bold font-mono mt-6 md:mt-2 md:text-xs">
          {price} so'm
        </h2>
        <p className="mb-3 text-gray-700 font-mono font-regular text-sm mt-6 md:mt-2 md:text-xs">
          {region} - {createdAt?.slice(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default PosterCard;
