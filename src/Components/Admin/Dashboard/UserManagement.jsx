import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash, FaEdit, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';
import './Dashboard.css';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      const response = await axios.get('http://localhost:5000/api/admin/users', config);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const config = {
          headers: { Authorization: `Bearer ${adminToken}` }
        };

        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, config);
        toast.success('User deleted successfully');
        fetchUsers(); // Refresh the users list
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <div className="page-header">
        <h2>User Management</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Total Bookings</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-name-cell">
                      <span className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      {user.name}
                    </div>
                  </td>
                  <td>
                    <div className="user-email">
                      <FaEnvelope className="icon" />
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <div className="join-date">
                      <FaCalendar className="icon" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="bookings-count">
                    {user.bookings?.length || 0}
                  </td>
                  <td>
                    <span className={`status-badge ${user.active ? 'status-active' : 'status-inactive'}`}>
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-edit" title="Edit user">
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
