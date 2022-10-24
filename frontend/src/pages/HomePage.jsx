import React from "react";
import Category from "../components/Category";
import LastPosters from "../components/LastPosters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { newPoster } from "../features/posterSlice";
import { getCategories } from "../features/categorySlice";
import Main from "../components/Main";
import Spinner from "../components/Spinner";
import MetaComponent from "../components/MetaComponent";

const HomePage = () => {
  const { newposter, loading } = useSelector((state) => state.poster);
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(newPoster());
  }, [dispatch]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <MetaComponent />
      <div className="h-100">
        <Main />
        <Category categories={category} />
        <LastPosters posters={newposter} />
      </div>
    </>
  );
};

export default HomePage;
