import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CategoryArticle from "./pages/CategoryArticle/CategoryArticle";
import Auth from "./pages/Auth/Auth";
import AddArticle from "./pages/AddArticle/AddArticle";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/category/:categoryName" element={<CategoryArticle />} />
        <Route path="/article/:articleId" element={<ArticleDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
