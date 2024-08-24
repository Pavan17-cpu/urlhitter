import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL_TO_HIT = 'https://mserver-lzs3.onrender.com'; // Replace with your URL

function App() {
  const [timestamps, setTimestamps] = useState([]);

  const fetchAndLogTimestamp = async () => {
    try {
      await axios.get(URL_TO_HIT); // Hit the URL
      const now = new Date().toLocaleString();
      setTimestamps((prevTimestamps) => {
        const newTimestamps = [now, ...prevTimestamps];
        return newTimestamps.slice(0, 50); // Keep only the latest 50 timestamps
      });
    } catch (error) {
      console.error('Error hitting the URL:', error);
    }
  };

  useEffect(() => {
    fetchAndLogTimestamp(); // Initial fetch

    const intervalId = setInterval(fetchAndLogTimestamp, 5 * 60 * 1000); // 5 minutes interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      <h1>URL Hit Timestamps</h1>
      <ul>
        {timestamps.map((timestamp, index) => (
          <li key={index}>{timestamp}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
