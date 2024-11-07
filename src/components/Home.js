// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Real-Time Chat</h1>
      <Link to="/chat">Enter Chat</Link>
    </div>
  );
}

export default Home;
