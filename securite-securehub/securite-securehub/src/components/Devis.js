import React, { useState } from 'react';
import axios from 'axios';

const Devis = () => {
    const [invoiceData, setInvoiceData] = useState({
        nomEntreprise: '',
        totalAmount: '',
        dueDate: '',
        invoiceDate: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/invoices', invoiceData)
            .then(response => {
                console.log("Invoice saved successfully", response.data);
            })
            .catch(error => {
                console.error("Error saving invoice", error);
            });
    };

    const handleChange = (e) => {
        setInvoiceData({
            ...invoiceData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Génération de Devis</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom Entreprise:
                    <input type="text" name="nomEntreprise" value={invoiceData.nomEntreprise} onChange={handleChange} required />
                </label>
                <label>
                    Total Amount:
                    <input type="number" name="totalAmount" value={invoiceData.totalAmount} onChange={handleChange} required />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange} required />
                </label>
                <label>
                    Invoice Date:
                    <input type="date" name="invoiceDate" value={invoiceData.invoiceDate} onChange={handleChange} required />
                </label>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default Devis;
