import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTrash, FaEdit, FaBed, FaRupeeSign, FaUsers, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Dashboard.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
    amenities: [],
    capacity: {
      adults: 2,
      children: 0
    },
    size: '20 m²',
    bed: 'Single Bed'
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      const response = await axios.get('https://room-booking-backend-9vb5.onrender.com/api/admin/rooms', config);
      setRooms(response.data.data);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms');
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const adminToken = localStorage.getItem('adminToken');
      
      const roomData = {
        name: newRoom.name,
        type: newRoom.type,
        price: Number(newRoom.price),
        description: newRoom.description,
        image: newRoom.image,
        capacity: {
          adults: Number(newRoom.capacity.adults),
          children: Number(newRoom.capacity.children)
        },
        size: newRoom.size,
        bed: newRoom.bed,
        amenities: newRoom.amenities,
        available: true
      };

      const response = await axios.post('https://room-booking-backend-9vb5.onrender.com/api/admin/rooms', roomData, {
        headers: { 
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setNewRoom({
          name: '',
          type: '',
          price: '',
          description: '',
          image: '',
          amenities: [],
          capacity: {
            adults: 2,
            children: 0
          },
          size: '20 m²',
          bed: 'Single Bed'
        });
        setShowAddForm(false);
        await fetchRooms();
      }
    } catch (error) {
      console.error('Error adding room:', error);
      setError(error.response?.data?.message || 'Failed to add room');
    }
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const adminToken = localStorage.getItem('adminToken');
      
      const roomData = {
        name: editingRoom.name,
        type: editingRoom.type,
        price: Number(editingRoom.price),
        description: editingRoom.description,
        image: editingRoom.image,
        capacity: {
          adults: Number(editingRoom.capacity.adults),
          children: Number(editingRoom.capacity.children)
        },
        size: editingRoom.size,
        bed: editingRoom.bed,
        amenities: editingRoom.amenities,
        available: editingRoom.available
      };

      const response = await axios.put(
        `https://room-booking-backend-9vb5.onrender.com/api/admin/rooms/${editingRoom._id}`,
        roomData,
        {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setEditingRoom(null);
        await fetchRooms();
      }
    } catch (error) {
      console.error('Error updating room:', error);
      setError(error.response?.data?.message || 'Failed to update room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setError('');
      try {
        const adminToken = localStorage.getItem('adminToken');
        const config = {
          headers: { Authorization: `Bearer ${adminToken}` }
        };

        const response = await axios.delete(`https://room-booking-backend-9vb5.onrender.com/api/admin/rooms/${roomId}`, config);
        if (response.data.success) {
          await fetchRooms();
        }
      } catch (error) {
        console.error('Error deleting room:', error);
        setError(error.response?.data?.message || 'Failed to delete room');
      }
    }
  };

  const startEditing = (room) => {
    // Ensure all required fields are present
    const editRoom = {
      ...room,
      capacity: room.capacity || { adults: 2, children: 0 },
      amenities: room.amenities || [],
      available: room.available !== undefined ? room.available : true
    };
    setEditingRoom(editRoom);
    setShowAddForm(false);
    setError('');
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="room-management">
      <div className="page-header">
        <h2>Room Management</h2>
        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
          <button 
            className="btn-add"
            onClick={() => {
              setShowAddForm(true);
              setEditingRoom(null);
              setError('');
            }}
          >
            <FaPlus /> Add New Room
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showAddForm && (
        <div className="add-room-form">
          <h3>Add New Room</h3>
          <form onSubmit={handleAddRoom}>
            <div className="form-group">
              <label>Room Name</label>
              <input
                type="text"
                value={newRoom.name}
                onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select
                value={newRoom.type}
                onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                required
              >
                <option value="">Select Type</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price per Night (₹)</label>
              <input
                type="number"
                value={newRoom.price}
                onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newRoom.description}
                onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Image URL</label>
              <input
                type="text"
                value={newRoom.image}
                onChange={(e) => setNewRoom({...newRoom, image: e.target.value})}
                placeholder="Enter image URL"
                required
              />
              {newRoom.image && (
                <img 
                  src={newRoom.image} 
                  alt="Room preview" 
                  className="preview-image"
                  style={{maxWidth: '200px', marginTop: '10px'}}
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'}
                />
              )}
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <div className="capacity-inputs">
                <input
                  type="number"
                  value={newRoom.capacity.adults}
                  onChange={(e) => setNewRoom({...newRoom, capacity: {...newRoom.capacity, adults: Number(e.target.value)}})}
                  required
                />
                <input
                  type="number"
                  value={newRoom.capacity.children}
                  onChange={(e) => setNewRoom({...newRoom, capacity: {...newRoom.capacity, children: Number(e.target.value)}})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Size</label>
              <input
                type="text"
                value={newRoom.size}
                onChange={(e) => setNewRoom({...newRoom, size: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Bed</label>
              <input
                type="text"
                value={newRoom.bed}
                onChange={(e) => setNewRoom({...newRoom, bed: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Amenities</label>
              <div className="amenities-checkboxes">
                {[
                  { id: 'wifi', label: 'WiFi' },
                  { id: 'ac', label: 'Air Conditioning' },
                  { id: 'tv', label: 'TV' },
                  { id: 'minibar', label: 'Mini Bar' },
                  { id: 'service', label: 'Room Service' },
                  { id: 'bathtub', label: 'Bathtub' },
                  { id: 'workspace', label: 'Workspace' }
                ].map(amenity => (
                  <div key={amenity.id} className="amenity-checkbox">
                    <input
                      type="checkbox"
                      id={amenity.id}
                      checked={newRoom.amenities.includes(amenity.id)}
                      onChange={(e) => {
                        const updatedAmenities = e.target.checked
                          ? [...newRoom.amenities, amenity.id]
                          : newRoom.amenities.filter(a => a !== amenity.id);
                        setNewRoom({...newRoom, amenities: updatedAmenities});
                      }}
                    />
                    <label htmlFor={amenity.id}>{amenity.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Room</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editingRoom && (
        <div className="edit-room-form">
          <h3>Edit Room</h3>
          <form onSubmit={handleEditRoom}>
            <div className="form-group">
              <label>Room Name</label>
              <input
                type="text"
                value={editingRoom.name}
                onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Type</label>
              <select
                value={editingRoom.type}
                onChange={(e) => setEditingRoom({...editingRoom, type: e.target.value})}
                required
              >
                <option value="">Select Type</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price per Night</label>
              <input
                type="number"
                value={editingRoom.price}
                onChange={(e) => setEditingRoom({...editingRoom, price: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editingRoom.description}
                onChange={(e) => setEditingRoom({...editingRoom, description: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Image URL</label>
              <input
                type="text"
                value={editingRoom.image}
                onChange={(e) => setEditingRoom({...editingRoom, image: e.target.value})}
                placeholder="Enter image URL"
                required
              />
              {editingRoom.image && (
                <img 
                  src={editingRoom.image} 
                  alt="Room preview" 
                  className="preview-image"
                  style={{maxWidth: '200px', marginTop: '10px'}}
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'}
                />
              )}
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <div className="capacity-inputs">
                <div>
                  <label>Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={editingRoom.capacity.adults}
                    onChange={(e) => setEditingRoom({
                      ...editingRoom,
                      capacity: {
                        ...editingRoom.capacity,
                        adults: e.target.value
                      }
                    })}
                    required
                  />
                </div>
                <div>
                  <label>Children</label>
                  <input
                    type="number"
                    min="0"
                    value={editingRoom.capacity.children}
                    onChange={(e) => setEditingRoom({
                      ...editingRoom,
                      capacity: {
                        ...editingRoom.capacity,
                        children: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Size</label>
              <input
                type="text"
                value={editingRoom.size}
                onChange={(e) => setEditingRoom({...editingRoom, size: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Bed</label>
              <input
                type="text"
                value={editingRoom.bed}
                onChange={(e) => setEditingRoom({...editingRoom, bed: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Amenities</label>
              <div className="amenities-checkboxes">
                {[
                  { id: 'wifi', label: 'WiFi' },
                  { id: 'ac', label: 'Air Conditioning' },
                  { id: 'tv', label: 'TV' },
                  { id: 'minibar', label: 'Mini Bar' },
                  { id: 'service', label: 'Room Service' },
                  { id: 'bathtub', label: 'Bathtub' },
                  { id: 'workspace', label: 'Workspace' }
                ].map(amenity => (
                  <div key={amenity.id} className="amenity-checkbox">
                    <input
                      type="checkbox"
                      id={`edit-${amenity.id}`}
                      checked={editingRoom.amenities.includes(amenity.id)}
                      onChange={(e) => {
                        const updatedAmenities = e.target.checked
                          ? [...editingRoom.amenities, amenity.id]
                          : editingRoom.amenities.filter(a => a !== amenity.id);
                        setEditingRoom({...editingRoom, amenities: updatedAmenities});
                      }}
                    />
                    <label htmlFor={`edit-${amenity.id}`}>{amenity.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Update Room</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setEditingRoom(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!showAddForm && (
        loading ? (
          <div className="loading">Loading rooms...</div>
        ) : rooms.length === 0 ? (
          <div className="no-rooms">No rooms found.</div>
        ) : (
          <div className="table-responsive">
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Size & Bed</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room._id}>
                    <td>
                      <div className="room-name-cell">
                        <img 
                          src={room.image} 
                          alt={room.name} 
                          className="room-thumbnail"
                          onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'}
                        />
                        <span>{room.name}</span>
                      </div>
                    </td>
                    <td>{room.type}</td>
                    <td>
                      <div className="price-cell">
                        <FaRupeeSign className="icon" />
                        {room.price}
                      </div>
                    </td>
                    <td>
                      <div className="capacity-cell">
                        <FaUsers className="icon" />
                        {room.capacity.adults} Adults, {room.capacity.children} Children
                      </div>
                    </td>
                    <td>
                      <div className="size-bed-cell">
                        <FaBed className="icon" />
                        {room.size} • {room.bed}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${room.available ? 'status-available' : 'status-unavailable'}`}>
                        {room.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn-edit"
                          onClick={() => startEditing(room)}
                          title="Edit room"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteRoom(room._id)}
                          title="Delete room"
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
        )
      )}
    </div>
  );
};

export default RoomManagement;
