import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import axios from "axios";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 18,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  updateNews = async () => {
    const { category, country, pageSize, apiKey } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      this.setState({ loading: true });
      const response = await axios.get(url);
      this.setState({
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      await this.setState({ page: this.state.page + 1 });
      this.updateNews();
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://www.hindustantimes.com/static-content/1y/ht/ht-logo.png"
                  }
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark previous"
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark next"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
