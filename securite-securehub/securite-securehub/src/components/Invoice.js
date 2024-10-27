import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import companyLogo from '../assets/logo.png';

const Invoice = () => {
    const location = useLocation();
    const { selectedProject } = location.state || {}; // Récupérer les données du projet sélectionné

    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [clientName, setClientName] = useState(selectedProject ? selectedProject.nomEntreprise : '');
    const [clientAddress, setClientAddress] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [items, setItems] = useState([
        { description: '', quantity: 0, unitPrice: 0, taxRate: 0 }
    ]);

    const handleInputChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 0, unitPrice: 0, taxRate: 0 }]);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => {
            const itemTotal = item.quantity * item.unitPrice * (1 + item.taxRate / 100);
            return acc + itemTotal;
        }, 0).toFixed(2);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={companyLogo} alt="Company Logo" style={{ width: '100px', height: 'auto' }} />
                <h1>Facture</h1>
            </header>
            <section style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Nom de l'Entreprise:</strong> {clientName}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Adresse de l'Entreprise:</strong> {clientAddress}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Nom du Responsable:</strong> {selectedProject?.nomResponsable || 'Non disponible'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Adresse:</strong> {selectedProject?.adresse || 'Non disponible'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Date d'Émission:</strong> {issueDate}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Date d'Expiration:</strong> {expiryDate}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Numéro de Facture:</strong> {invoiceNumber}
                </div>
            </section>
            <section style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantité</th>
                            <th>Prix Unitaire</th>
                            <th>Taux de Taxe (%)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        value={item.description}
                                        onChange={event => handleInputChange(index, event)}
                                        style={{ width: '100%' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={event => handleInputChange(index, event)}
                                        style={{ width: '100%' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        value={item.unitPrice}
                                        onChange={event => handleInputChange(index, event)}
                                        style={{ width: '100%' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="taxRate"
                                        value={item.taxRate}
                                        onChange={event => handleInputChange(index, event)}
                                        style={{ width: '100%' }}
                                    />
                                </td>
                                <td>
                                    {(item.quantity * item.unitPrice * (1 + item.taxRate / 100)).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addItem} style={{ marginTop: '10px' }}>Ajouter un article</button>
            </section>
            <section style={{ textAlign: 'right' }}>
                <h2>Total: {calculateTotal()} €</h2>
            </section>
        </div>
    );
};

export default Invoice;
