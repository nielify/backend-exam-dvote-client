import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const EditUser = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setUser(location.state);
    setFirstName(location.state.first_name);
    setLastName(location.state.last_name);
    setAddress(location.state.address);
    setPostcode(location.state.postcode);
    setContactNumber(location.state.contact_phone_number);
    setEmail(location.state.email);
    setUsername(location.state.username);
    setPassword(location.state.password);

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const editOject = {};

    if (firstName !== user.first_name) editOject.first_name = firstName;
    if (lastName !== user.last_name) editOject.last_name = lastName;
    if (address !== user.address) editOject.address = address;
    if (postcode !== user.postcode) editOject.postcode = postcode;
    if (contactNumber !== user.contact_phone_number) editOject.contact_phone_number = contactNumber;
    if (email !== user.email) editOject.email = email;
    if (username !== user.username) editOject.username = username;
    if (password !== user.password) editOject.password = password;

    if (Object.keys(editOject).length > 0) {
      fetch(`http://localhost:3001/user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(editOject)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.message === 'user updated') {
            history.push('/users');
          }
        });
    } else {
      alert('no changes made')
    }
    
  }

  return (
    <>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>PostCode</label>
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </div>
        <div>
          <label>Contact Phone Number</label>
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button>SAVE</button>
      </form>
    </>

  );
}

export default EditUser;