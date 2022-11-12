import React, { useState, useEffect } from "react";
import "../User-Profile/User.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

function User() {
  const { login } = useParams();

  const [user, setUser] = useState(null);
  const [repo, setRepo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalrepos, setTotalRepos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await axios.get(
        `https://api.github.com/users/${login}`
      );
      const userRepos = await axios.get(
        `https://api.github.com/users/${login}/repos`,
        {
          params: {
            page,
            per_page: 10,
          },
        }
      );
      let reposSum = await axios.get(
        `https://api.github.com/users/${login}/repos`,
        {
          params: {
            per_page: 100,
          },
        }
      );
      setUser(userResponse.data);
      setRepo(userRepos.data);
      setTotalRepos(reposSum.data);
    };
    fetchUser();

    // eslint-disable-next-line
  }, [page]);

  // Pagination Functions

  const handlePrevClick = () => {
    if (page === 1) {
      return page;
    } else {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    setPage((page) => page + 1);
  };

  console.table(repo);
  if (user) {
    return (
      <div className="container">
        <Link to="/" className="back-button">
          &laquo; Back
        </Link>
        <div className="information">
          <div className="image">
            <img src={user?.avatar_url} alt="User_Image" />
          </div>
          <div className="user-content">
            <h3>{user.name ? user.name : "Name is missing!"}</h3>
            <p>{user.bio ? user.bio : "Description is not set by user"}</p>
            <small>Total Number of Repository: {totalrepos.length}</small>
          </div>
        </div>
        <div className="user-repo">
          {/* Pagination */}
          <div className="pagination">
            <button onClick={handlePrevClick}>&laquo; Prev</button>
            <button onClick={handleNextClick}>Next &raquo;</button>
          </div>
          {repo.map((rep) => {
            return (
              <div className="repo" key={rep.id}>
                <h3>
                  <b>Name: </b>
                  {rep.name}
                </h3>
                <p>
                  <b>Open Issues: </b> {rep.open_issues}{" "}
                </p>
                <p>
                  <b>Description: </b>
                  {rep.description
                    ? rep.description
                    : "Description is not set by user"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default User;
