import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
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

const initialTools = [
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

const ManageTools = () => {
  const [tools, setTools] = useState(initialTools);
  const [selectedTool, setSelectedTool] = useState(null);
  const [newTool, setNewTool] = useState({ name: '', description: '', img: '' });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTool = () => {
    setShowAddModal(true);
  };

  const handleAddToolSubmit = () => {
    if (!newTool.name || !newTool.description || !newTool.img) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    axios.post('http://localhost:8083/api/tools', newTool)
      .then(response => {
        console.log('Tool added successfully:', response.data);
        alert('Outil ajouté avec succès');
        setShowAddModal(false);
        setTools([...tools, response.data]); // Mise à jour de l'état des outils
      })
      .catch(error => {
        console.error('Error adding tool:', error.response ? error.response.data : error.message);
        alert('Erreur lors de l\'ajout de l\'outil. ' + (error.response ? error.response.data.message : error.message));
      });
  };

  const handleDeleteTool = (id) => {
    axios.delete(`http://localhost:8083/api/tools/${id}`)
      .then(() => {
        console.log(`Tool with ID ${id} deleted`);
        alert('Outil supprimé avec succès');
        setTools(tools.filter(tool => tool.id !== id)); // Mise à jour de l'état des outils après suppression
      })
      .catch(error => {
        console.error('Error deleting tool:', error);
        alert('Erreur lors de la suppression de l\'outil.');
      });
  };

  const handleClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleClose = () => {
    setSelectedTool(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTool(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={styles.tableContainer}>
      <div style={styles.buttonContainer}>
        <button
          onClick={handleAddTool}
          style={styles.addButton}
        >
          <FontAwesomeIcon icon={faPlus} style={styles.icon} />
          Ajouter
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Image</th>
            <th style={styles.headerCell}>Nom</th>
            <th style={styles.headerCell}>Description</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id} style={styles.tableRow}>
              <td>
                <img
                  src={tool.img}
                  alt={tool.name}
                  style={styles.toolImage}
                />
              </td>
              <td style={styles.cell}>{tool.name}</td>
              <td style={styles.cell} dangerouslySetInnerHTML={{ __html: tool.description }}></td>
              <td style={styles.actionsCell}>
                <div style={styles.actionsContainer}>
                  <button
                    onClick={() => handleClick(tool)}
                    style={styles.viewButton}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    onClick={() => handleDeleteTool(tool.id)}
                    style={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTool && (
        <div style={styles.modal}>
          <button
            onClick={handleClose}
            style={styles.closeButton}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <img
            src={selectedTool.img}
            alt={selectedTool.name}
            style={styles.modalImage}
          />
          <h3>{selectedTool.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: selectedTool.description }}></p>
        </div>
      )}
      {selectedTool && (
        <div
          style={styles.overlay}
          onClick={handleClose}
        ></div>
      )}
      {showAddModal && (
        <div style={styles.modal}>
          <button
            onClick={() => setShowAddModal(false)}
            style={styles.closeButton}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>Ajouter un outil</h2>
          <input
            type="text"
            name="name"
            value={newTool.name}
            onChange={handleInputChange}
            placeholder="Nom de l'outil"
            style={styles.input}
          />
          <textarea
            name="description"
            value={newTool.description}
            onChange={handleInputChange}
            placeholder="Description de l'outil"
            style={styles.textarea}
          />
          <input
            type="text"
            name="img"
            value={newTool.img}
            onChange={handleInputChange}
            placeholder="URL de l'image"
            style={styles.input}
          />
          <button
            onClick={handleAddToolSubmit}
            style={styles.submitButton}
          >
            Ajouter
          </button>
        </div>
      )}
      {showAddModal && <div style={styles.overlay}></div>}
    </div>
  );
};

const styles = {
  tableContainer: {
    margin: '20px auto',
    padding: '0 20px',
    maxWidth: '1200px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '10px',
    textAlign: 'left',
    verticalAlign: 'top',
  },
  toolImage: {
    width: '100px',
    height: 'auto',
  },
  actionsCell: {
    padding: '10px',
    textAlign: 'center',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  viewButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
    width: '80%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#dc3545',
  },
  modalImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '999',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default ManageTools;
