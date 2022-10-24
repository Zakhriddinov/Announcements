import React from "react";
import { useState } from "react";
import TitleComponent from "../components/utils/TitleComponent";
import { useDispatch, useSelector } from "react-redux";
import { createPoster } from "../features/posterSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const CreatePosterPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const showToastMessage = () => {
    toast.success("E'lon muvafaqqiyatli joylandi!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      bodyClassName: "success"
    });
  };
  const { loading } = useSelector((state) => state.poster);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const onSubmit = (e) => {
    e.preventDefault();
    const posterData = new FormData();
    posterData.append("image", image);
    posterData.append("title", title);
    posterData.append("price", price);
    posterData.append("description", description);
    posterData.append("category", category);
    posterData.append("region", region);

    if (
      title === "" ||
      price === "" ||
      description === "" ||
      category === "" ||
      image === "" ||
      region === ""
    ) {
      toast.error("Barcha ma'lumotlarni to'ldiring", {
        position: toast.POSITION.BOTTOM_RIGHT,
        bodyClassName: "error"
      });
    } else {
      dispatch(createPoster(posterData));
      if (posterData) {
        navigate("/posters");
        showToastMessage();
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <TitleComponent title="E'lon yaratish" />
      <form className="w-96 md:w-80 mx-auto my-8" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-mono font-medium">
          E'lon sarlavhasi
        </label>
        <input
          type="text"
          placeholder="Samsung S22+"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
        />
        <label htmlFor="price" className="font-mono font-medium">
          Narxi (so'mda)
        </label>
        <input
          type="number"
          placeholder="2 000 000"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular my-2"
        />
        <label htmlFor="description" className="font-mono font-medium">
          Tavsif
        </label>
        <textarea
          type="text"
          placeholder="holati yangi..."
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          className="border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular mt-2"
        />
        <label htmlFor="region" className="font-mono font-medium">
          Toifa
        </label>
        <select
          id="category"
          className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular cursor-pointer my-2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
        >
          <option disabled={true}>Toifani tanglang</option>
          <option value="Kochmas mulk">Kochmas mulk</option>
          <option value="Transport">Transport</option>
          <option value="Ish o'rinlari">Ish o'rinlari</option>
          <option value="Elektrotexnika">Elektrotexnika</option>
        </select>
        <label htmlFor="region" className="font-mono font-medium">
          Hudud
        </label>
        <select
          id="region"
          className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-regular cursor-pointer my-2"
          onChange={(e) => setRegion(e.target.value)}
          name="region"
        >
          <option>Hududni tanlang</option>
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

        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100   my-2"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              multiple
              className="hidden"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 font-mono font-medium text-white px-3 py-2 md:text-sm block w-full "
        >
          Joylash
        </button>
      </form>
    </div>
  );
};

export default CreatePosterPage;
