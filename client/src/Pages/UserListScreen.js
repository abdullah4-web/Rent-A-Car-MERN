import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { RentContext } from './RentContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUserId, setEditUserId] = useState('');
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserIsAdmin, setEditUserIsAdmin] = useState(false);

  const { state } = useContext(RentContext);
  const { user } = state;

  useEffect(() => {
    if (user.token) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(data);
    } catch (error) {
      console.log('Error fetching users:', error);
      // Handle token-related errors (e.g., expired token)
      if (error.response && error.response.status === 401) {
        // Clear the invalid token from local storage and reload the page
        localStorage.removeItem('user');
        window.location.reload();
      }
    }
  };

  const handleEditModalShow = (user) => {
    setEditUserId(user._id);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserIsAdmin(user.isAdmin);
    setEditModalShow(true);
  };

  const handleEditModalClose = () => {
    setEditModalShow(false);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `/api/users/${editUserId}`,
        {
          name: editUserName,
          email: editUserEmail,
          isAdmin: editUserIsAdmin,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update the user in the local state with the edited information
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editUserId
            ? { ...user, name: editUserName, email: editUserEmail, isAdmin: editUserIsAdmin }
            : user
        )
      );

      setEditModalShow(false);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.log('Error deleting user:', error);
      }
    }
  };

  return (
    <>
    <Spinner />
   <div>
      <h2>User List</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button variant="danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                  
                </div>
              </td>
              <td>
                <div>
                <Button variant="primary" onClick={() => handleEditModalShow(user)}>
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editUserIsAdmin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={editUserIsAdmin}
                onChange={(e) => setEditUserIsAdmin(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default UserList;
