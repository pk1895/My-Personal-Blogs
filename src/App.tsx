import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Prasad Khanapure
        </footer>
      </div>
    </Router>
  );
}
