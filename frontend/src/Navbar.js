import React from 'react';
import './Navbar.css';
// Download a Netflix logo and place it in src/ as netflix-logo.png, or use a placeholder
import logo from './netflix-logo.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Netflix" className="navbar-logo" />
      <ul className="navbar-links">
        <li>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>New & Popular</li>
        <li>My List</li>
      </ul>
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="navbar-avatar" />
    </nav>
  );
}

export default Navbar; 