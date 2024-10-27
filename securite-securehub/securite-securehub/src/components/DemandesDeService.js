import React, { useState, useRef } from 'react';
import logo from '../assets/logo.png';

const AccountPage = () => {
    const [formData, setFormData] = useState({
        nomEntreprise: '',
        nomResponsable: '',
        adresse: '',
        ville: '',
        pays: '',
        contactPrincipal: '',
        telephone: '',
        email: '',
        service: '',
        descriptionService: '',
        objectifService: '',
        dureeEstimee: '',
        conditionsSpecifiques: '',
        certificationRequise: '',
        budgetAlloue: '',
        autresInformations: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const formRef = useRef(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nomEntreprise) newErrors.nomEntreprise = "Ce champ est requis";
        if (!formData.nomResponsable) newErrors.nomResponsable = "Ce champ est requis";
        if (!formData.adresse) newErrors.adresse = "Ce champ est requis";
        if (!formData.ville) newErrors.ville = "Ce champ est requis";
        if (!formData.contactPrincipal) newErrors.contactPrincipal = "Ce champ est requis";
        if (!formData.telephone) newErrors.telephone = "Ce champ est requis";
        if (!formData.email) newErrors.email = "Ce champ est requis";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8083/api/service-requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setFormData({
                        nomEntreprise: '',
                        nomResponsable: '',
                        adresse: '',
                        ville: '',
                        pays: '',
                        contactPrincipal: '',
                        telephone: '',
                        email: '',
                        service: '',
                        descriptionService: '',
                        objectifService: '',
                        dureeEstimee: '',
                        conditionsSpecifiques: '',
                        certificationRequise: '',
                        budgetAlloue: '',
                        autresInformations: ''
                    });

                    setSuccessMessage('Votre demande a été enregistrée avec succès!');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 5000);

                    if (formRef.current) {
                        formRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    alert('Une erreur s\'est produite lors de l\'enregistrement.');
                }
            } catch (error) {
                alert('Une erreur s\'est produite lors de l\'enregistrement.');
            }
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        },
        formContainer: {
            maxWidth: '3000px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            flex: 0.75,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '2px solid #ddd',
        },
        logo: {
            marginRight: '20px',
            width: '100px',
            height: 'auto',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1E3A8A',
        },
        fieldset: {
            border: '1px solid #ccc',
            padding: '20px',
            margin: '0 auto',
            borderRadius: '8px',
            maxWidth: '100%',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            fontWeight: 'bold',
            marginLeft: '15px',
        },
        input: {
            width: '99%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            marginLeft: '10px', // Ajout d'espacement à gauche
            marginRight: '10px', // Ajout d'espacement à droite
            boxSizing: 'border-box',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            resize: 'vertical',
            boxSizing: 'border-box',
            marginLeft: '10px', // Ajout d'espacement à gauche
            marginRight: '10px', // Ajout d'espacement à droite
        },
        select: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            marginLeft: '10px', // Ajout d'espacement à gauche
            marginRight: '10px', // Ajout d'espacement à droite
        },
        errorText: {
            color: 'red',
            marginBottom: '10px',
            marginLeft: '10px',
            marginRight: '10px',
        },
        successMessage: {
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            backgroundColor: 'green',
            padding: '10px',
            borderRadius: '5px',
        },
        buttonContainer: {
            textAlign: 'center',
        },
        button: {
            backgroundColor: '#1E3A8A',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <fieldset style={styles.fieldset} ref={formRef}>
                    <div style={styles.header}>
                        <img src={logo} alt="SecureHub Logo" style={styles.logo} />
                        <h1 style={styles.title}>Demande de Service de Sécurité</h1>
                    </div>
                    {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <label style={styles.label}>Nom de l'Entreprise :</label>
                        <input
                            type="text"
                            name="nomEntreprise"
                            value={formData.nomEntreprise}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.nomEntreprise && <p style={styles.errorText}>{errors.nomEntreprise}</p>}

                        <label style={styles.label}>Nom du Responsable :</label>
                        <input
                            type="text"
                            name="nomResponsable"
                            value={formData.nomResponsable}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.nomResponsable && <p style={styles.errorText}>{errors.nomResponsable}</p>}

                        <label style={styles.label}>Adresse :</label>
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.adresse && <p style={styles.errorText}>{errors.adresse}</p>}

                        <label style={styles.label}>Ville :</label>
                        <input
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.ville && <p style={styles.errorText}>{errors.ville}</p>}

                        <label style={styles.label}>Pays :</label>
                        <input
                            type="text"
                            name="pays"
                            value={formData.pays}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.pays && <p style={styles.errorText}>{errors.pays}</p>}

                        <label style={styles.label}>Contact Principal :</label>
                        <input
                            type="text"
                            name="contactPrincipal"
                            value={formData.contactPrincipal}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.contactPrincipal && <p style={styles.errorText}>{errors.contactPrincipal}</p>}

                        <label style={styles.label}>Téléphone :</label>
                        <input
                            type="text"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.telephone && <p style={styles.errorText}>{errors.telephone}</p>}

                        <label style={styles.label}>Email :</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.email && <p style={styles.errorText}>{errors.email}</p>}

                        <label style={styles.label}>Service :</label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            <option value="">Sélectionner un service</option>
                            <option value="">Sélectionnez un service</option>
                            <option value="Darktrace">Darktrace</option>
                            <option value="Delinea">Delinea</option>
                            <option value="KnowBe4">KnowBe4</option>
                            <option value="RSA">RSA</option>
                            <option value="tenable">ManageEngine</option>
                            <option value="ManageEngine">Mandiant</option>
                            <option value="Mandiant">Rapid</option>
                            <option value="Rapid">SentinelOne</option>
                            <option value="SentinelOne">Splunk</option>
                            <option value="Splunk">Tenable</option>
                            <option value="Varonis">Varonis</option>
                        </select>

                        <label style={styles.label}>Description du Service :</label>
                        <textarea
                            name="descriptionService"
                            value={formData.descriptionService}
                            onChange={handleChange}
                            style={styles.textarea}
                        />

                        <label style={styles.label}>Objectif du Service :</label>
                        <textarea
                            name="objectifService"
                            value={formData.objectifService}
                            onChange={handleChange}
                            style={styles.textarea}
                        />

                        <label style={styles.label}>Durée Estimée :</label>
                        <input
                            type="text"
                            name="dureeEstimee"
                            value={formData.dureeEstimee}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <label style={styles.label}>Conditions Spécifiques :</label>
                        <textarea
                            name="conditionsSpecifiques"
                            value={formData.conditionsSpecifiques}
                            onChange={handleChange}
                            style={styles.textarea}
                        />

                        <label style={styles.label}>Certification Requise :</label>
                        <input
                            type="text"
                            name="certificationRequise"
                            value={formData.certificationRequise}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <label style={styles.label}>Budget Alloué :</label>
                        <input
                            type="text"
                            name="budgetAlloue"
                            value={formData.budgetAlloue}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <label style={styles.label}>Autres Informations :</label>
                        <textarea
                            name="autresInformations"
                            value={formData.autresInformations}
                            onChange={handleChange}
                            style={styles.textarea}
                        />

                        <div style={styles.buttonContainer}>
                            <button type="submit" style={styles.button}>Soumettre</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
};

export default AccountPage;