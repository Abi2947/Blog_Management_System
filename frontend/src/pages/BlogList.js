import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../service/api';
import '../App.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching all blogs');
        const res = await axios.get('/blogs');
        console.log('Fetched blogs:', res.data);
        setBlogs(res.data);
      } catch (err) {
        console.error('Fetch blogs error:', err.response?.data || err.message);
        setError('Failed to fetch blogs');
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container blog-list">
      <h2>✍️All Blogs</h2>
      {error && <p className="error">{error}</p>}
      <div className="blog-grid">
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="card blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.description?.substring(0, 100)}...</p>
              <p>Tags: {blog.tags.join(', ')}</p>
              <Link to={`/blogs/${blog._id}`}>Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;