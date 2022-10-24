import React, { useEffect } from "react";
import TitleComponent from "../components/utils/TitleComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPoster } from "../features/posterSlice";
import Spinner from "../components/Spinner";
const EditPosterPage = () => {
  const { id } = useParams();
  const { poster, loading } = useSelector((state) => state.poster);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPoster(id));
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <TitleComponent title="E'lonni o'zgartirish" />
      <form className="w-96 md:w-80 mx-auto my-8">
        <label htmlFor="title" className="font-mono font-medium">
          E'lon sarlavhasi
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
          defaultValue={poster?.title}
        />
        <label htmlFor="price" className="font-mono font-medium">
          Narxi (so'mda)
        </label>
        <input
          type="number"
          defaultValue={poster?.price}
          id="price"
          name="price"
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
        />
        <label htmlFor="category" className="font-mono font-medium">
          Toifa
        </label>
        <select
          id="category"
          className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular cursor-pointer my-2"
          defaultValue={poster?.category}
          name="category"
        >
          <option disabled={true}>Toifani tanglang</option>
          <option value="realty">Kochmas mulk</option>
          <option value="trasport">Transport</option>
          <option value="job">Ish o'rinlari</option>
          <option value="electronics">Elektrotexnika</option>
        </select>
        <label htmlFor="description" className="font-mono font-medium">
          Tavsif
        </label>
        <textarea
          type="text"
          defaultValue={poster?.description}
          name="description"
          id="description"
          rows="5"
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular mt-2"
        />
        <label htmlFor="region" className="font-mono font-medium">
          Hudud
        </label>
        <select
          id="region"
          className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular cursor-pointer my-2"
          defaultValue={poster?.region}
        >
          <option disabled={true}>Hududni tanlang</option>
          <option value="Toshkent">Toshkent</option>
          <option value="Qarshi">Qarshi</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Navoiy">Navoiy</option>
          <option value="Andijon">Andijon</option>
          <option value="Namangan">Namangan</option>
          <option value="Farg'ona">Farg'ona</option>
          <option value="Guliston">Guliston</option>
          <option value="Termiz">Termiz</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Xorazm">Xorazm</option>
          <option value="Nukus">Nukus</option>
        </select>

        <label htmlFor="image" className="font-mono font-medium">
          Rasm tanlang
        </label>

        <img src={poster?.image?.secure_url} alt="" />
        <div className="flex justify-center items-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 my-2"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold font-mono">Click to upload</span>{" "}
                or drag and drop
              </p>
              <p className="text-xs font-mono font-regular text-gray-500 ">
                PNG, JPG , JPEG (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              multiple
              name="image"
              className="hidden"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 font-mono font-medium text-white px-3 py-2 md:text-sm block w-full "
        >
          O'zgartirish
        </button>
      </form>
    </div>
  );
};

export default EditPosterPage;
