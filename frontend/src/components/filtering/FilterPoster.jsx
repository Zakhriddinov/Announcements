import React from "react";
import "./index.css";
const FilterPoster = ({
  setCategory,
  setFrom,
  setTo,
  handleFilters,
  setRegion,
  showResetFiltersButton,
  resetFilters,
  filters
}) => {
  return (
    <div className="mt-4 overflow-x-auto ">
      <form className="flex gap-2 overflow-x-auto  md:w-max">
        <div className="flex flex-col">
          <span className="font-mono font-regular text-gray-400 mb-2">
            Toifa
          </span>
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-semibold cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" className="font-mono font-medium">
              Hammasi
            </option>
            <option value="Kochmas mulk" className="font-mono font-medium">
              Ko'chmas mulk
            </option>
            <option value="Transport" className="font-mono font-medium">
              Transport
            </option>
            <option value="Elektronika" className="font-mono font-medium">
              Elektronika
            </option>
            <option value="Ish o'rinlari" className="font-mono font-medium">
              Ish o'rinlari
            </option>
          </select>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-center font-regular text-gray-400 mb-2">
            Narxi
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="dan"
              className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2    font-mono font-regular"
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              type="number"
              placeholder="gacha"
              className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2    font-mono font-regular"
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-regular text-gray-400 mb-2">
            Hudud
          </span>
          <div className="flex gap-2">
            <select
              onChange={(e) => setRegion(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-mono font-semibold cursor-pointer"
            >
              <option>Hududni tanlang</option>
              <option className="font-mono font-medium" value="Toshkent">
                Toshkent
              </option>
              <option className="font-mono font-medium" value="Qarshi">
                Qarshi
              </option>
              <option className="font-mono font-medium" value="Buxoro">
                Buxoro
              </option>
              <option className="font-mono font-medium" value="Navoiy">
                Navoiy
              </option>
              <option className="font-mono font-medium" value="Andijon">
                Andijon
              </option>
              <option className="font-mono font-medium" value="Namangan">
                Namangan
              </option>
              <option className="font-mono font-medium" value="Farg'ona">
                Farg'ona
              </option>
              <option className="font-mono font-medium" value="Guliston">
                Guliston
              </option>
              <option className="font-mono font-medium" value="Termiz">
                Termiz
              </option>
              <option className="font-mono font-medium" value="Samarqand">
                Samarqand
              </option>
              <option className="font-mono font-medium" value="Xorazm">
                Xorazm
              </option>
              <option className="font-mono font-medium" value="Nukus">
                Nukus
              </option>
            </select>
            <button
              type="button"
              className={
                "bg-blue-400 font-mono font-medium text-white px-3 md:text-sm"
              }
              onClick={handleFilters}
            >
              Filterlash
            </button>
            {showResetFiltersButton && (
              <button
                type="reset"
                className="bg-red-700 font-mono font-medium text-white px-3 md:text-sm"
                onClick={resetFilters}
              >
                Tozalash
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterPoster;
