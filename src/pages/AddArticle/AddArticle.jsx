import React, { useState } from "react";
import "./AddArticle.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../../config/firebaseConfig";
import { v4 } from "uuid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    paragraghOne: "",
    paragraghTwo: "",
    paragraghThree: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");

    // create a reference for the image
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);

    // now upload the image to bucket
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        //   console.log(res.ref);
        // now get url from this ref
        getDownloadURL(res.ref).then((url) => {
          console.log("this is the url", url);

          //   now we have all data and url
          // create artcle reference
          const articleRef = collection(db, "Articles");
          // use addDoc to add the article
          addDoc(articleRef, {
            title: formData.title,
            summary: formData.summary,
            paragraghOne: formData.paragraghOne,
            paragraghTwo: formData.paragraghTwo,
            paragraghThree: formData.paragraghThree,
            category: formData.category,
            imageUrl: url,
            createdBy: user.displayName,
            userId: user.uid,
            createdAt: Timestamp.now().toDate(),
          });
        });
      })
      .then((res) => {
        toast("Article saved successfully!", {
          type: "success",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-article-container">
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Maximum 100 characters"
            maxLength="100"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            name="summary"
            id="summary"
            placeholder="Maximum 120 characters"
            maxLength="120"
            required
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphOne">Paragraph One</label>
          <textarea
            id="paragraphOne"
            placeholder="Maximum 650 characters"
            maxLength="650"
            required
            onChange={(e) =>
              setFormData({ ...formData, paragraghOne: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphTwo">Paragraph Two</label>
          <textarea
            id="paragraphTwo"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraghTwo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphThree">Paragraph Three</label>
          <textarea
            id="paragraphThree"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraghThree: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            required
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select</option>
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Upload Image</label>
          <input
            type="file"
            id="image"
            required
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
