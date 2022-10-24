import AllPosterCard from "../components/AllPosterCard";
import FilterPoster from "../components/filtering/FilterPoster";
import Pagination from "../components/filtering/Pagination";
import Search from "../components/filtering/Search";
import TitleComponent from "../components/utils/TitleComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import NotFoundPoters from "../components/NotFoundPoters";

let filterUrl = "";
const proceedFilters = (filters) => {
  filterUrl = "";
  Object.keys(filters).map((key, value) => {
    if (key === "category") {
      return (filterUrl += `&category=${filters[key]}`);
    } else if (key === "from") {
      return (filterUrl += `&from=${filters[key]}`);
    } else if (key === "to") {
      return (filterUrl += `&to=${filters[key]}`);
    } else if (key === "region") {
      return (filterUrl += `&region=${filters[key]}`);
    }
    return "";
  });
  return filterUrl;
};
const getPosters = async (
  pageNumParam = 1,
  filters = {},
  categoryName = "",
  searchQuery = ""
) => {
  filterUrl = proceedFilters(filters);
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const category = categoryName ? `category/${categoryName}/` : "";
  const url = `/api/posters/${category}${search}?pageNum=${pageNumParam}${filterUrl}`;
  const { data } = await axios.get(url);
  return data;
};
const AllPostersPage = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoding] = useState(true);
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
  const [filters, setFilters] = useState({});
  const [from, setFrom] = useState(5);
  const [to, setTo] = useState(435345345342);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const { categoryName } = useParams() || "";
  const { pageNumParam = 1 } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    getPosters(pageNumParam, filters, categoryName, searchQuery).then(
      (data) => {
        setPosters(data.posters);
        setPageNum(data.pageNum);
        setPaginationLinksNumber(data.paginationLinksNumber);
        setLoding(false);
      }
    );
  }, [pageNumParam, filters, categoryName, searchQuery]);

  const handleFilters = () => {
    navigate(location.pathname.replace(/\/[0-9]+$/), "");
    setFilters({
      category,
      from,
      to,
      region
    });
    setShowResetFiltersButton(true);
  };

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    setCategory("");
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
     
      <Search categoryName={categoryName} />
      <TitleComponent title="Filtirlash" />
      <FilterPoster
        setCategory={setCategory}
        setTo={setTo}
        setFrom={setFrom}
        setRegion={setRegion}
        handleFilters={handleFilters}
        showResetFiltersButton={showResetFiltersButton}
        resetFilters={resetFilters}
        filters={filters}
      />

      <div className="mt-20">
        {posters?.length > 0 ? (
          <>
            {" "}
            {posters?.map((poster, idx) => (
              <AllPosterCard {...poster} key={idx} />
            ))}
          </>
        ) : (
          <NotFoundPoters />
        )}
      </div>

      {paginationLinksNumber > 1 ? (
        <div className="my-6 flex justify-end md:justify-center">
          <Pagination
            pageNum={pageNum}
            paginationLinksNumber={paginationLinksNumber}
            pageNumParam={pageNumParam}
            searchQuery={searchQuery}
          />
        </div>
      ) : null}
    </>
  );
};

export default AllPostersPage;
