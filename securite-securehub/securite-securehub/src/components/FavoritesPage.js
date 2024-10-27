import React, { useState, useEffect } from 'react';
import axios from 'axios';
import darktraceImg from '../assets/darktrace.png';
import ibmImg from '../assets/ibm.png';
import knowbe4Img from '../assets/knowbe4.png';
import manageEngineImg from '../assets/manageEngine.png';
import mandiantImg from '../assets/mandiant.png';
import rapidImg from '../assets/rapid.png';
import RSAImg from '../assets/RSA.png';
import sentineloneImg from '../assets/sentinelone.png';
import splunkImg from '../assets/splunk.png';
import tenableImg from '../assets/tenable.png';
import varonisImg from '../assets/varonis.png';

const tools = [
  { id: 1, img: darktraceImg, description: 'Description of DarkTrace' },
  { id: 2, img: ibmImg, description: 'Description of IBM' },
  { id: 3, img: knowbe4Img, description: 'Description of KnowBe4' },
  { id: 4, img: manageEngineImg, description: 'Description of ManageEngine' },
  { id: 5, img: mandiantImg, description: 'Description of Mandiant' },
  { id: 6, img: rapidImg, description: 'Description of Rapid' },
  { id: 7, img: RSAImg, description: 'Description of RSA' },
  { id: 8, img: sentineloneImg, description: 'Description of SentinelOne' },
  { id: 9, img: splunkImg, description: 'Description of Splunk' },
  { id: 10, img: tenableImg, description: 'Description of Tenable' },
  { id: 11, img: varonisImg, description: 'Description of Varonis' },
];

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState({});
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8083/api/user/favorites?userId=${userId}`)
        .then(response => setFavorites(response.data.map(fav => fav.toolId)))
        .catch(error => console.error('Error fetching favorites:', error));
    }

    axios.get('http://localhost:8083/api/tools/favorites-count')
      .then(response => setFavoritesCount(response.data))
      .catch(error => console.error('Error fetching favorites count:', error));
  }, [userId]);

  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));

  return (
    <div>
      <h1>My Favorites</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
          padding: '15px',
        }}
      >
        {favoriteTools.map((tool) => (
          <div
            key={tool.id}
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              transition: '0.3s',
              cursor: 'pointer',
              border: '3px solid #003366',  // Increased blue border thickness
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',  // Slightly adjusted shadow effect
            }}
          >
            <img
              src={tool.img}
              alt={`Tool ${tool.id}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
              {favoritesCount[tool.id] || 0} likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
