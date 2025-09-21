import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../service/api";
import "../App.css";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log(
          "Fetching user blogs with token:",
          localStorage.getItem("token")
        );
        const res = await axios.get("/blogs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Fetched blogs:", res.data);
        setBlogs(res.data);
      } catch (err) {
        console.error("Fetch blogs error:", err.response?.data || err.message);
        setError("Failed to fetch blogs");
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBlogs(blogs.filter((blog) => blog._id !== id));
        console.log("Blog deleted:", id);
      } catch (err) {
        console.error("Delete blog error:", err.response?.data || err.message);
        setError("Failed to delete blog");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  return (
    <div className="container dashboard">
      <h2>📊Dashboard</h2>
      <button
        onClick={() => navigate("/blogs/new")}
        className="btn btn-primary dashboard-btn"
      >
        📝Create New Blog
      </button>
      {error && <p className="error">{error}</p>}
      <div className="blog-grid">
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="card blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.description?.substring(0, 100)}...</p>
              <p>Tags: {blog.tags.join(", ")}</p>
              <button
                onClick={() => handleEdit(blog._id)}
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="btn btn-danger"
                style={{ marginLeft: "10px" }}
              >
                🗑️Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
