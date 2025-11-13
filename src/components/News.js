import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import axios from "axios";

const News = ({
  country = "us",
  pageSize = 18,
  category = "general",
  domain,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const updateNews = async () => {
    const url = `${domain}/api/news?category=${category}&country=${country}&page=${page}&pageSize=${pageSize}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsByReact`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  const handlePrevClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container my-3" style={{ paddingTop: "70px" }}>
      <h1 className="text-center">
        NewsByReact - Top Headlines on {capitalizeFirstLetter(category)}
      </h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description ? element.description.slice(0, 88) : ""
                }
                imageUrl={
                  element.urlToImage ||
                  "https://www.hindustantimes.com/static-content/1y/ht/ht-logo.png"
                }
                newsUrl={element.url}
              />
            </div>
          ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  domain: PropTypes.string.isRequired,
};

export default News;
