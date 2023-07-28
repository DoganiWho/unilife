import React, { useState } from "react";
import "./Auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log('signup')

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // add username as display name
        updateProfile(auth.currentUser, { displayName: name });
        // console.log(res.user.displayName);

        // Navigate the user to HomePage after signup
        navigate("/");
      })
      .catch((err) => alert(err.code));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      {form ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Login with your email</h1>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="form-link" onClick={() => setForm(false)}>
              Signup
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h1>Sign up with your email</h1>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span className="form-link" onClick={() => setForm(true)}>
              Log in
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
