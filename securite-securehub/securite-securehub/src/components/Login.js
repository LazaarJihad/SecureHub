import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import illustration from '../assets/logo.png';

const Login = () => {
    const [registering, setRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const toggleRegister = () => {
        setRegistering(!registering);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (registering) {
            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas !");
                return;
            }
            const signUpData = { username, email, password };
            try {
                const response = await axios.post('http://localhost:8083/api/auth/register', signUpData);
                alert(response.data);
                setRegistering(false);
            } catch (error) {
                console.error('Erreur lors de l\'inscription :', error);
                alert('Échec de l\'inscription !');
            }
        } else {
            const authData = { username, password };
            try {
                const response = await axios.post('http://localhost:8083/api/auth/signin', authData);
                console.log('Connexion réussie ! Utilisateur :', response.data);

                // Stocker l'utilisateur dans localStorage
                localStorage.setItem('user', JSON.stringify(response.data));

                // Rediriger en fonction du rôle utilisateur
                const userRole = response.data.role;
                if (userRole === 'ROLE_ADMIN') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/user-dashboard');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
                alert('Échec de la connexion !');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <div className="login-box">
                    <h2>{registering ? 'Inscription' : 'Connexion'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label>Nom d'utilisateur</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Mot de passe</label>
                        </div>
                        {registering && (
                            <>
                                <div className="input-box">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label>Confirmer le mot de passe</label>
                                </div>
                            </>
                        )}
                        {!registering && (
                            <div className="remember-me">
                                <label>
                                    <input type="checkbox" />
                                    Se souvenir de moi
                                </label>
                            </div>
                        )}
                        <button type="submit">{registering ? 'S\'inscrire' : 'Se connecter'}</button>
                        <div className="login-links">
                            <a href="/">Mot de passe oublié ?</a>
                            <a href="#" onClick={toggleRegister}>
                                {registering ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right-section" style={{ backgroundImage: `url(${illustration})` }}>
                {/* Section pour l'image */}
            </div>
        </div>
    );
};

export default Login;
