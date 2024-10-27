import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProjects = async () => {
      if (user && user.nomEntreprise) {
        const url = `http://localhost:8083/api/service-requests/details?nomEntreprise=${user.nomEntreprise}`;
        console.log('Request URL:', url);
        try {
          const response = await axios.get(url);
          console.log('Response data:', response.data);
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
          setError('Failed to fetch projects.');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No user found in localStorage or user.nomEntreprise is missing.');
        setLoading(false);
        setError('User not found.');
      }
    };

    fetchProjects();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Service Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.nomEntreprise}</td>
                <td>{project.typeService}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsPage;
