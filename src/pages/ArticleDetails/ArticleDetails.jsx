import React, { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Likes from "../../components/Likes/Likes";
import Comments from "../../components/Comments/Comments";

const ArticleDetails = () => {
  const { articleId } = useParams();

  const [article, setArticle] = useState({});

  useEffect(() => {
    // set up reference to a single document
    const docRef = doc(db, "Articles", articleId);

    // getting the document with the id
    getDoc(docRef)
      .then((res) => setArticle(res.data()))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="details-container">
      <h1>{article?.title}</h1>

      <h2>{article?.summary}</h2>
      <div className="details-info-container">
        <p>Category: {article?.category}</p>
        <p>
          <span className="article-span">Author:</span>
          {article?.createdBy?.toUpperCase()}
        </p>
        <p>
          <span className="article-span published">Published:</span>{" "}
          {article?.createdAt?.toDate().toDateString()}
        </p>
        <Likes articleId={articleId} />
      </div>
      <div className="details-content">
        <img className="details-img" src={article?.imageUrl} />
        <p className="article-description">{article?.paragraghOne}</p>
        <p className="article-description">{article?.paragraghTwo}</p>
        <p className="article-description">{article?.paragraghThree}</p>
      </div>
      <Comments articleId={articleId} />
    </div>
  );
};

export default ArticleDetails;
