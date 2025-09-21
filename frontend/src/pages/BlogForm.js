import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../service/api';
import '../App.css';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          console.log('Fetching blog with ID:', id);
          const res = await axios.get(`/blogs/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setFormData({
            title: res.data.title,
            description: res.data.description,
            tags: res.data.tags.join(', '),
          });
          console.log('Fetched blog:', res.data);
        } catch (err) {
          console.error('Fetch blog error:', err.response?.data || err.message);
          setError('Failed to fetch blog');
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      console.log('Validation failed: Title or description is empty');
      return;
    }
    const submitData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
    };
    console.log('Submitting form with data:', submitData);
    console.log('Token:', localStorage.getItem('token'));
    try {
      if (id) {
        console.log('Updating blog with ID:', id);
        const response = await axios.put(`/blogs/${id}`, submitData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Blog updated:', response.data);
      } else {
        console.log('Creating new blog');
        const response = await axios.post('/blogs', submitData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Blog created:', response.data);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving blog:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers,
      });
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to save blog');
    }
  };

  return (
    <div className="container blog-form">
      <h2>{id ? 'Edit Blog' : 'Create Blog'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="card form-card">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., tech, coding, tutorial"
          />
        </div>
        <button type="submit" className="btn btn-primary auth-btn">
          {id ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;