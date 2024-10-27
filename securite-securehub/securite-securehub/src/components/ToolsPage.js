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
import { FaSearch, FaHeart } from 'react-icons/fa';

const tools = [
  { id: 1, img: darktraceImg, name: 'DarkTrace', description: 'DarkTrace est une plateforme de cybersécurité basée sur l\'IA qui offre des capacités de détection et de réponse aux menaces.<br/>Avantage : détection avancée des menaces grâce à l\'intelligence artificielle.<br />Importance : protège les entreprises contre les cyberattaques sophistiquées.' },
  { id: 2, img: ibmImg, name: 'IBM', description: 'IBM Security offre un portefeuille complet de solutions de sécurité d\'entreprise.<br />Avantage : solutions intégrées pour tous les aspects de la sécurité.<br />Importance : aide les grandes entreprises à sécuriser leurs infrastructures.' },
  { id: 3, img: knowbe4Img, name: 'KnowBe4', description: 'KnowBe4 est une plateforme de formation à la sensibilisation à la sécurité conçue pour aider les organisations à gérer l\'ingénierie sociale.<br />Avantage : améliore la vigilance des employés contre les attaques.<br />Importance : réduit le risque des attaques par hameçonnage.' },
  { id: 4, img: manageEngineImg, name: 'ManageEngine', description: 'ManageEngine propose une suite d\'outils de gestion IT, y compris la surveillance du réseau et des solutions de sécurité IT.<br />Avantage : gestion complète des infrastructures IT.<br />Importance : optimise la performance et la sécurité des réseaux d\'entreprise.' },
  { id: 5, img: mandiantImg, name: 'Mandiant', description: 'Mandiant est connu pour son expertise en réponse aux incidents et en renseignement sur les menaces.<br />Avantage : réponse rapide et efficace aux cyberincidents.<br />Importance : renforce la résilience des entreprises face aux cybermenaces.' },
  { id: 6, img: rapidImg, name: 'Rapid7', description: 'Rapid7 fournit une gamme de solutions de cybersécurité, y compris la gestion des vulnérabilités et la détection des incidents.<br />Avantage : identification et correction rapides des vulnérabilités.<br />Importance : protège contre les failles de sécurité exploitables.' },
  { id: 7, img: RSAImg, name: 'RSA', description: 'RSA offre des solutions de cybersécurité et de gestion des risques numériques, y compris la gestion des identités et des accès.<br />Avantage : sécurisation des accès et des identités numériques.<br />Importance : protège les données sensibles et les ressources critiques.' },
  { id: 8, img: sentineloneImg, name: 'SentinelOne', description: 'SentinelOne fournit une protection des points de terminaison grâce à la détection et à la réponse aux menaces alimentées par l\'IA.<br />Avantage : protection proactive des endpoints.<br />Importance : empêche les menaces d\'affecter les systèmes d\'entreprise.' },
  { id: 9, img: splunkImg, name: 'Splunk', description: 'Splunk est une plateforme d\'analyse de données fournissant des capacités SIEM pour surveiller et analyser les événements de sécurité.<br />Avantage : analyse approfondie des données de sécurité.<br />Importance : aide à identifier et à répondre rapidement aux menaces.' },
  { id: 10, img: tenableImg, name: 'Tenable', description: 'Tenable se spécialise dans la gestion des vulnérabilités et aide à identifier et corriger les vulnérabilités de sécurité.<br />Avantage : visibilité complète des failles de sécurité.<br />Importance : maintient la sécurité des réseaux et des applications.' },
  { id: 11, img: varonisImg, name: 'Varonis', description: 'Varonis fournit des solutions de sécurité des données et d\'analyse pour protéger les informations sensibles contre les cybermenaces.<br />Avantage : protection des données critiques.<br />Importance : assure la confidentialité et la sécurité des informations sensibles.' },
];

const ToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8083/api/user/favorites?userId=${userId}`)
        .then(response => setFavorites(response.data.map(fav => fav.toolId)))
        .catch(error => console.error('Error fetching favorites:', error));
    }
  }, [userId]);

  const handleClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleClose = () => {
    setSelectedTool(null);
  };

  const handleFavorite = (toolId) => {
    if (favorites.includes(toolId)) {
      axios.delete(`http://localhost:8083/api/user/favorites?userId=${userId}&toolId=${toolId}`)
        .then(() => {
          setFavorites(favorites.filter(id => id !== toolId));
        })
        .catch(error => console.error('Error removing favorite:', error));
    } else {
      axios.post('http://localhost:8083/api/user/favorites', { userId, toolId })
        .then(() => {
          setFavorites([...favorites, toolId]);
        })
        .catch(error => console.error('Error adding favorite:', error));
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Barre de recherche */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '25px',
          overflow: 'hidden',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        }}>
          <input
            type="text"
            placeholder="Rechercher un outil..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              padding: '8px 12px',
              fontSize: '16px',
              outline: 'none',
              borderRadius: '25px 0 0 25px',
              flex: '1',
            }}
          />
          <FaSearch
            style={{
              padding: '8px',
              color: '#007BFF',
              fontSize: '20px',
            }}
          />
        </div>
      </div>

      {/* Grille d'outils */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          padding: '10px',
        }}
      >
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              transition: '0.3s',
              cursor: 'pointer',
              border: '3px solid #003366',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => handleClick(tool)}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay');
              const text = e.currentTarget.querySelector('.overlay-text');
              overlay.style.opacity = '1';
              text.style.display = 'block';
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay');
              const text = e.currentTarget.querySelector('.overlay-text');
              overlay.style.opacity = '0';
              text.style.display = 'none';
            }}
          >
            <img
              src={tool.img}
              alt={`Tool ${tool.id}`}
              style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
            <div
              className="overlay"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: '0',
                transition: '0.3s',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <FaHeart
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  fontSize: '24px',
                  color: favorites.includes(tool.id) ? 'red' : 'white',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(tool.id);
                }}
              />
              <span
                className="overlay-text"
                style={{
                  display: 'none',
                }}
              >
                Lire plus
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Détails de l'outil sélectionné */}
      {selectedTool && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            overflowY: 'auto',
          }}
        >
          <h2>{selectedTool.name}</h2>
          <img
            src={selectedTool.img}
            alt={selectedTool.name}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              marginBottom: '10px',
            }}
          />
          <p dangerouslySetInnerHTML={{ __html: selectedTool.description }} />
          <button
            onClick={handleClose}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolsPage;
