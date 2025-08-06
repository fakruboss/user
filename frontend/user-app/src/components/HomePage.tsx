import React, { useState } from 'react';
import { createUser, getUser, CreateUserRequest, User } from '../services/userService';
import { ReactComponent as CustomLogo } from '../logo-custom.svg';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [userData, setUserData] = useState<User | User[] | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    email: '',
  });

  const handleCreateUser = async () => {
    if (!showCreateForm) {
      setShowCreateForm(true);
      setMessage('');
      setUserData(null);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const user = await createUser(formData);
      setUserData(user);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '' });
      setShowCreateForm(false);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUser = async () => {
    setLoading(true);
    setMessage('');
    setShowCreateForm(false);
    
    try {
      const users = await getUser();
      setUserData(users);
      setMessage('Users retrieved successfully!');
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({ name: '', email: '' });
    setMessage('');
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="logo-header">
          <CustomLogo className="logo" />
          <h1>User Management App</h1>
        </div>
        
        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={handleCreateUser}
            disabled={loading}
          >
            {loading && showCreateForm ? 'Creating...' : 'Create User'}
          </button>
          
          <button
            className="btn btn-secondary"
            onClick={handleGetUser}
            disabled={loading}
          >
            {loading && !showCreateForm ? 'Loading...' : 'Get Users'}
          </button>
        </div>

        {showCreateForm && (
          <div className="form-container">
            <h3>Create New User</h3>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button
                className="btn btn-success"
                onClick={handleCreateUser}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Submit'}
              </button>
              <button
                className="btn btn-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {userData && (
          <div className="user-data">
            <h3>User Data:</h3>
            <pre className="json-display">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;