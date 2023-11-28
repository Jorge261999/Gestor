import React, { useState, useEffect } from 'react';

import '../styles/concesionariolista.css';

const ConcesionarioLista = () => {
  const [concesionarios, setConcesionarios] = useState([]);
  const [nuevoConcesionario, setNuevoConcesionario] = useState({
    nombre: '',
    direccion: '',
  });
  const [concesionarioModificar, setConcesionarioModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:9000/api/concesionarios')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setConcesionarios(data);
      })
      .catch(error => console.error('Error fetching vehiculos:', error));
  }, [concesionarioModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoConcesionario((prevConcesionarios) => ({
      ...prevConcesionarios,
      [name]: value,
    }));
  };

  const handleEliminarConcesionario = async (_id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/concesionarios/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConcesionarios((prevConcesionarios) => prevConcesionarios.filter(concesionario => concesionario._id !== _id));
      } else {
        console.error('Error al eliminar concesionario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar concesionario:', error);
    }
  };

  const handleAgregarConcesionario = () => {
    setMostrarFormulario(true);
    setConcesionarioModificar(null);
  };



  const handleSeleccionarModificar = (_id) => {
    const concesionarioSeleccionado = concesionarios.find(concesionario => concesionario._id === _id);

    if (concesionarioSeleccionado) {
      setConcesionarioModificar(concesionarioSeleccionado);
      setNuevoConcesionario({
        nombre: concesionarioSeleccionado.nombre,
        direccion: concesionarioSeleccionado.direccion,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Concesionario no encontrado para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setConcesionarioModificar(null);
    setNuevoConcesionario({
      nombre: '',
      direccion: '',
    });
  };

  const handleSubmitFormulario = async () => {
    try {
      // Validar si los campos obligatorios están vacíos
      if (!nuevoConcesionario.nombre || !nuevoConcesionario.direccion) {
        console.error('Error: Todos los campos son obligatorios');
        alert('Todos los campos son obligatorios');
        return;
      }
  
      // Validar el formato de nombre y dirección (ambos deben ser cadenas no vacías)
      if (typeof nuevoConcesionario.nombre !== 'string' || typeof nuevoConcesionario.direccion !== 'string') {
        console.error('Error: Nombre y dirección deben ser cadenas de texto');
        alert('Nombre y dirección deben ser cadenas de texto');
        return;
      }
  
      let response;
  
      if (concesionarioModificar) {
        response = await fetch(`http://localhost:9000/api/concesionarios/${concesionarioModificar._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoConcesionario),
        });
      } else {
        response = await fetch('http://localhost:9000/api/concesionarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoConcesionario),
        });
      }
  
      if (response.ok) {
        const nuevoConcesionarioAgregado = await response.json();
        setConcesionarios((prevConcesionarios) => {
          if (concesionarioModificar) {
            return prevConcesionarios.map((concesionario) =>
              concesionario._id === concesionarioModificar._id ? nuevoConcesionarioAgregado : concesionario
            );
          } else {
            return [...prevConcesionarios, nuevoConcesionarioAgregado];
          }
        });
        handleOcultarFormulario();
      } else {
        console.error('Error al procesar el formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
    }
  };
  

  return (
    <div className="concesionario-lista">
      <div className="cabecera">
        <h1>Lista de concesionarios</h1>
        <button className="btn-agregar" onClick={handleAgregarConcesionario}>Agregar Concesionario</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={nuevoConcesionario.nombre} onChange={handleChange} />

          <label htmlFor="direccion">Direccion:</label>
          <input type="text" id="direccion" name="direccion" value={nuevoConcesionario.direccion} onChange={handleChange} />


          <button type="button" onClick={handleSubmitFormulario}>
            {concesionarioModificar ? 'Modificar Concesionario' : 'Agregar Concesionario'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {concesionarios.map((concesionario) => (
          <li key={concesionario._id}>
            <strong>ID:</strong> {concesionario._id}, <strong>Nombre:</strong> {concesionario.nombre}, <strong>Direccion:</strong> {concesionario.direccion},{' '}
            <button className="btn-eliminar" onClick={() => handleEliminarConcesionario(concesionario._id)}>Eliminar</button>
            <button className="btn-modificar" onClick={() => handleSeleccionarModificar(concesionario._id)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConcesionarioLista;
