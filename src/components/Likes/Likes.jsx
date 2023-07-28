import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Likes.css";
import { auth, db } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Likes = ({ articleId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [user] = useAuthState(auth);
  const likesRef = collection(db, "Likes");

  useEffect(() => {
    // did this user like this article?
    // need the collection
    // const likesRef = collection(db, "Likes");
    // should hav an if statement to check if user exists
    if (user) {
      // make query to see if we liked this article
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      //   look for a matching document
      getDocs(q, likesRef)
        .then((res) => {
          // is there a match?
          if (res.size > 0) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLiked(false);
    }
  }, [user]);

  useEffect(() => {
    // find out like count for this article
    // make a query to count likes
    const q2 = query(likesRef, where("articleId", "==", articleId));

    // look for matching documents
    getDocs(q2, likesRef)
      .then((res) => setLikeCount(res.size))
      .catch((err) => console.log(err));
  }, [isLiked]);

  const handleLike = () => {
    // make sure the user is logged in
    if (user) {
      // create reference to likes collection
      // will create collection if not exist
      //   const likesRef = collection(db, "Likes");

      // adding a document with this articleId and userId
      addDoc(likesRef, {
        userId: user?.uid,
        articleId: articleId,
      })
        .then((res) => {
          // dont need the res
          // want to show as liked
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUnlike = () => {
    if (user) {
      console.log("userId", user?.uid);
      console.log("articleId", articleId);

      //   need to find document with this articleId and userId to get its document ID
      const likesRef = collection(db, "Likes");

      //   setup query to find id of the record to delete
      const q = query(
        likesRef,
        where("articleId", "==", articleId),
        where("userId", "==", user?.uid)
      );

      //   get match
      getDocs(q, likesRef)
        .then((res) => {
          console.log(res.size);
          console.log(res.docs[0].id);
          const likeId = res.docs[0].id;
          //   now delete this doc from likes collection
          deleteDoc(doc(db, "Likes", likeId))
            .then((res) => {
              // change the heart icon
              setIsLiked(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLiked ? (
        <FaHeart onClick={handleUnlike} />
      ) : (
        <FaRegHeart onClick={handleLike} />
      )}
      <span> {likeCount}</span>
    </div>
  );
};

export default Likes;
