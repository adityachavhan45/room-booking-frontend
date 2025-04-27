import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash, FaEdit, FaEnvelope, FaPhone, FaCalendar, FaTimes, FaKey } from 'react-icons/fa';
import './Dashboard.css';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      const response = await axios.get('https://room-booking-backend-9vb5.onrender.com/api/admin/users', config);
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || ''
    });
  };

  const handleUpdateUser = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      await axios.put(
        `https://room-booking-backend-9vb5.onrender.com/api/admin/users/${editingUser._id}`,
        editFormData,
        config
      );

      toast.success('User updated successfully');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      await axios.put(
        `https://room-booking-backend-9vb5.onrender.com/api/admin/users/${editingUser._id}/password`,
        { newPassword },
        config
      );

      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const config = {
          headers: { Authorization: `Bearer ${adminToken}` }
        };

        await axios.delete(`https://room-booking-backend-9vb5.onrender.com/api/admin/users/${userId}`, config);
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
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit User</h3>
              <button className="close-btn" onClick={() => setEditingUser(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleUpdateUser}>Save Changes</button>
                <button className="btn-secondary" onClick={() => setShowPasswordModal(true)}>
                  <FaKey /> Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="close-btn" onClick={() => setShowPasswordModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleUpdatePassword}>Update Password</button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                      <button 
                        className="btn-edit" 
                        title="Edit user"
                        onClick={() => handleEditUser(user)}
                      >
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
