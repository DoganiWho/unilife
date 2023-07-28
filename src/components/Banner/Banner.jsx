import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import { db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [mainArticle, setMainArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // create a variable reference to the articles collection
    const articleRef = collection(db, "Articles");

    // setup query to filter responses
    // sort and then get first 5 articles
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5));

    getDocs(q, articleRef)
      .then((res) => {
        // console.log(res.docs[0].data());

        const articles = res.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        });

        // console.log(articles);
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        onClick={() => navigate(`/article/${mainArticle?.id}`)}
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
        <div className="banner-info">
          <h2>{mainArticle?.title}</h2>
          <div className="main-article-info">
            <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="other-articles-container">
        {otherArticles.map((item) => {
          return (
            <div
              key={item?.id}
              className="other-article-item"
              onClick={() => navigate(`/article/${item?.id}`)}
              style={{ backgroundImage: `url(${item?.imageUrl})` }}
            >
              <div className="banner-info">
                <h3>{item?.title}</h3>
                <small>{item?.createdAt?.toDate().toDateString()}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
