import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../service/api';
import '../App.css';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log('Fetching blog with ID:', id);
        const res = await axios.get(`/blogs/${id}`);
        console.log('Fetched blog:', res.data);
        setBlog(res.data);
      } catch (err) {
        console.error('Fetch blog error:', err.response?.data || err.message);
        setError('Failed to fetch blog');
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container blog-view">
      <h2>{blog.title}</h2>
      {error && <p className="error">{error}</p>}
      <p>{blog.description}</p>
      <p>Tags: {blog.tags.join(', ')}</p>
      <p>Author: {blog.author.name}</p>
      <p>Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogView;