import React from "react";
import "./Header.css";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Header = () => {
  // get user data
  const [user] = useAuthState(auth);

  const categories = ["Health", "Food", "Travel", "Technology"];

  const navigate = useNavigate();

  return (
    <div className="header-container">
      <FaHome onClick={() => navigate("/")} />
      {user && (
        <Link to="/addarticle" className="auth-link">
          Add Article
        </Link>
      )}
      <div className="categories-container">
        {categories.map((item) => (
          <Link to={`/category/${item}`} className="nav-link">
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span className="username">
            {user.displayName ? user.displayName : user.email}
          </span>
          <button className="auth-link" onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="auth-link" to={"/auth"}>
          Sign up
        </Link>
      )}
    </div>
  );
};
