import { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/logo_transparente.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login com:", email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="AutoHub Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Value"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Value"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Sign in</button>
        </form>

        <div className="links-container">
          <a href="#">Forgot password?</a>
          <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}