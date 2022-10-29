import { Fragment } from "react";
import { Link } from "react-router-dom";
import PosterCard from "./PosterCard";

const LastPosters = ({ posters }) => {
  return (
    <section className="mt-16 md:mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-bold font-mono font-bold text-3xl xl:text-xl lg:text-lg md:text-md">
          Oxirgi e'lonlar
        </h3>
        <Link
          to="/posters"
          className="font-bold font-mono bg-blue-400 text-white p-1 rounded-lg border hover:border-blue-400 hover:bg-white hover:text-blue-400 shadow transition duration-700 ease-in-out md:text-sm"
        >
          Barchasi
        </Link>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 mt-16 md:mt-8 gap-4 md:gap-1">
        {posters
          .map((poster, idx) => (
            <Fragment key={idx}>
              <PosterCard {...poster} />
            </Fragment>
          ))
          .reverse()}
      </div>
    </section>
  );
};

export default LastPosters;
