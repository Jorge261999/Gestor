import React, { useState, useEffect } from 'react';

import '../styles/vehiculolista.css';

const VehiculoLista = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: '',
    precio: '',
  });
  const [vehiculoModificar, setVehiculoModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:9000/api/vehiculos')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setVehiculos(data);
      })
      .catch(error => console.error('Error fetching vehiculos:', error));
  }, [vehiculoModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVehiculo((prevVehiculos) => ({
      ...prevVehiculos,
      [name]: value,
    }));
  };

  const handleEliminarVehiculo = async (_id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/vehiculos/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVehiculos((prevVehiculos) => prevVehiculos.filter(vehiculo => vehiculo._id !== _id));
      } else {
        console.error('Error al eliminar vehiculo:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar vehiculo:', error);
    }
  };

  const handleAgregarVehiculo = () => {
    setMostrarFormulario(true);
    setVehiculoModificar(null);
  };



  const handleSeleccionarModificar = (_id) => {
    const vehiculoSeleccionado = vehiculos.find(vehiculo => vehiculo._id === _id);

    if (vehiculoSeleccionado) {
      setVehiculoModificar(vehiculoSeleccionado);
      setNuevoVehiculo({
        marca: vehiculoSeleccionado.marca,
        precio: vehiculoSeleccionado.precio,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Vehiculo no encontrado para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setVehiculoModificar(null);
    setNuevoVehiculo({
      marca: '',
      precio: '',
    });
  };

  const handleSubmitFormulario = async () => {
    try {
      // Validar si los campos obligatorios están vacíos
      if (!nuevoVehiculo.marca || !nuevoVehiculo.precio) {
        console.error('Error: Todos los campos son obligatorios');
        alert('Todos los campos son obligatorios');
        return;
      }
  
      // Validar el formato del precio
      const precioRegex = /^\d+$/; // Expresión regular para números enteros
  
      if (!precioRegex.test(nuevoVehiculo.precio)) {
        console.error('Error: Precio incorrecto o en formato incorrecto');
        alert('Precio incorrecto o en formato incorrecto');
        return;
      }
  
      let response;
  
      if (vehiculoModificar) {
        response = await fetch(`http://localhost:9000/api/vehiculos/${vehiculoModificar._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVehiculo),
        });
      } else {
        response = await fetch('http://localhost:9000/api/vehiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVehiculo),
        });
      }
  
      if (response.ok) {
        const nuevoVehiculoAgregado = await response.json();
        setVehiculos((prevVehiculos) => {
          if (vehiculoModificar) {
            return prevVehiculos.map((vehiculo) =>
              vehiculo._id === vehiculoModificar._id ? nuevoVehiculoAgregado : vehiculo
            );
          } else {
            return [...prevVehiculos, nuevoVehiculoAgregado];
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
    <div className="vehiculo-lista">
      <div className="cabecera">
        <h1>Lista de Vehiculos</h1>
        <button className="btn-agregar" onClick={handleAgregarVehiculo}>Agregar Vehiculo</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="marca">Marca:</label>
          <input type="text" id="marca" name="marca" value={nuevoVehiculo.marca} onChange={handleChange} />

          <label htmlFor="precio">Precio:</label>
          <input type="text" id="precio" name="precio" value={nuevoVehiculo.precio} onChange={handleChange} />


          <button type="button" onClick={handleSubmitFormulario}>
            {vehiculoModificar ? 'Modificar Vehiculo' : 'Agregar Vehiculo'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {vehiculos.map((vehiculo) => (
          <li key={vehiculo._id}>
            <strong>ID:</strong> {vehiculo._id}, <strong>Marca:</strong> {vehiculo.marca}, <strong>Precio:</strong> {vehiculo.precio},{' '}
            <button className="btn-eliminar" onClick={() => handleEliminarVehiculo(vehiculo._id)}>Eliminar</button>
            <button className="btn-modificar" onClick={() => handleSeleccionarModificar(vehiculo._id)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehiculoLista;
