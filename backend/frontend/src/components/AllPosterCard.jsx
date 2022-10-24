import { Link } from "react-router-dom";
const AllPosterCard = (poster) => {
  const { image, title, region, createdAt, price, _id } = poster;
  return (
    <>
      <div className="grid grid-cols-3 mx-auto bg-white rounded-lg border border-gray-200 shadow-md h-44 md:h-36 mt-3">
        <Link to={`/poster-details/${_id}`} className="max-h-screen">
          <img
            src={image?.secure_url}
            alt={title}
            className="h-44 md:h-36 rounded-l-lg"
          />
        </Link>
        <div className="max-w-full col-span-2 p-3 h-44">
          <div className="flex md:flex-col md:items-start items-center justify-between">
            <Link to={`/poster-details/${_id}`}>
              <h5 className=" text-xl md:text-xs hover:text-white hover:bg-slate-900 inline font-bold  text-gray-900 font-bold font-mono">
                {title}
              </h5>
            </Link>
            <h2 className="text-2xl font-bold font-mono md:text-xs md:mt-4">
              {price} so'm
            </h2>
          </div>
          <p className="mb-3 text-gray-700 font-mono font-regular text-sm mt-20 md:mt-4 md:text-xs">
            {region} - {createdAt?.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  );
};

export default AllPosterCard;
