import { useState } from "react";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName !== '' && lastName !== '' && address !== '' && postcode !== '' && contactNumber !== '' && email !== '' && username !== '' && password !== '') {
      fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          postcode,
          contactNumber,
          email,
          username,
          password
        })
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.message === 'new user added') history.push('/users');
        })
    } else {
      alert('all fields must be filled');
    }

  }

  return (  
    <>
      <h2>Add User</h2>
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
        <button>ADD</button>
      </form>
    </>
  );
}
 
export default AddUser;