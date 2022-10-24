import { Link } from "react-router-dom";

const Pagination = ({
  paginationLinksNumber,
  pageNum,
  categoryName,
  searchQuery
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/posters/${category}${search}`;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        {[...Array(paginationLinksNumber).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={`${url}${x + 1}`}
              aria-current="page"
              className={
                x + 1 === pageNum
                  ? "py-3 px-4 md:px-3 md:py-2 text-white bg-blue-400 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 font-mono font-medium"
                  : "py-3 px-4 md:px-3 md:py-2 text-black bg-white border border-gray-300 hover:bg-blue-100 hover:text-blue-700 font-mono font-medium"
              }
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
