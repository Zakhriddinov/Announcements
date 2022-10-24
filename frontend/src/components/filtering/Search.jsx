import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ categoryName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchQuery) {
        navigate(`/posters/search/${searchQuery}`);
      } else {
        navigate(`/posters/category/${categoryName}/search/${searchQuery}`);
      }
    } else if (searchQuery === "") {
      navigate(`/posters/category/${categoryName}`);
    } else {
      navigate("/posters");
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      if (categoryName) {
        navigate(`/posters/category/${categoryName}/search/${searchQuery}`);
      } else if (searchQuery) {
        navigate(`/posters/search/${searchQuery}`);
      }
    } else if (categoryName) {
      navigate(`/posters/category/${categoryName}`);
    } else {
      navigate("/posters");
    }
  }, [searchQuery, categoryName, navigate]);
  return (
    <div className="flex mb-16 md:mb-3">
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    font-mono font-regular"
        onKeyUp={submitHandler}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* <button
        onClick={submitHandler}
        className="bg-blue-400 font-mono font-medium text-white px-3"
      >
        Qidiruv
      </button> */}
    </div>
  );
};

export default Search;
