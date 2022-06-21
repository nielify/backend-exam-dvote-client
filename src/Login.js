import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.message === 'login successful') history.push('/users');
      });
  }

  return (  
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button>Login</button>
    </form>
  );
}
 
export default Login;