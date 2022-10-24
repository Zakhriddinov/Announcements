import { Link } from "react-router-dom";
import { Fragment } from "react";
import TitleComponent from "./utils/TitleComponent";
import { useState } from "react";
import { useEffect } from "react";

const Category = ({ categories }) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    setCategory((cat) => categories.filter((item) => !item.name.includes("/")));
  }, [categories]);
  return (
    <>
      <TitleComponent title={"Bosh toifalar"} />
      <section className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 mt-16 md:mt-8 gap-8 md:gap-1">
        {category?.map((value, idx) => (
          <Fragment key={idx}>
            <Link to={`/posters/category/${value?.name}`}>
              <div className="rounded-lg  bg-slate-100 p-6 h-full shadow-lg md:shadow-none text-justify hover:bg-white transition duration-700 ease-in-out">
                <img
                  src={value?.image?.secure_url}
                  alt=""
                  className="w-16 md:w-10"
                />
                <h2 className="font-mono text-xl font-bold md:text-sm">
                  {value.name}
                </h2>
                <p className="font-mono font-regular text-base my-2 text-gray-500 md:text-xs">
                  {value.description}
                </p>
              </div>
            </Link>
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default Category;
