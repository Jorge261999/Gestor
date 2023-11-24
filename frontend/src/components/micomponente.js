import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Ajusta la ruta según tu estructura

const MiComponente = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET al backend
    api.get('http://localhost:9000/clientes') // Ajusta la ruta según tu backend
      .then(response => {
        console.log('Datos recibidos del backend:', response.data);
        setDatos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Mi Componente</h2>
      <ul>
        {datos.map(item => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MiComponente;