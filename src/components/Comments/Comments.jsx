import React, { useState, useEffect } from "react";
import "./Comments.css";
import { db, auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Comments = ({ articleId }) => {
  const [user] = useAuthState(auth);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // get reference to comments collection
    const commentsRef = collection(db, "Comments");

    // fileter to show only comments for this article
    const q = query(commentsRef, where("articleId", "==", articleId));

    // get the comments

    // getDocs(commentsRef)
    // .then ( res =>{
    //     //convet to array
    //     const comments = res.docs.map( item =>(
    //     { id:item.id,
    //         ...item.data()
    //     }
    //      ))
    //.catch(err => console.log(err))

    onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      //   console.log(comments);
      setComments(comments);
    });
  }, []);

  const addNewComment = (e) => {
    e.preventDefault();
    // need to make a new document in comments collection
    // include the newComment, the articleId, the user that added the comment
    // create a reference to the commments collection
    // will create the collection if doesn't exist
    const commentsRef = collection(db, "Comments");
    // adding a document with this articleId and userId, content, username
    addDoc(commentsRef, {
      userId: user?.uid,
      articleId: articleId,
      content: newComment,
      username: user?.displayName,
    })
      .then((res) => {
        toast("Comment added successfully!", {
          type: "success",
          autoClose: 2000,
        });
        setNewComment("");
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id) => {
    // get the particluar document with the id
    deleteDoc(doc(db, "Comments", id))
      .then((res) =>
        toast("Comment deleted successfully!", {
          type: "success",
          autoClose: 2000,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="comments-container">
        {comments.map((item) => (
          <div className="comment">
            <p>
              <span>{item.username}</span>
              {item.content}
            </p>
            {
              // each comment has uid
              // compare to see if I can delete it
              user?.uid === item?.userId && (
                <button onClick={() => deleteComment(item.id)}>Delete</button>
              )
            }
          </div>
        ))}
      </div>
      {user ? (
        <form onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="add comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </form>
      ) : (
        <p>Please login to comment</p>
      )}
    </div>
  );
};

export default Comments;
