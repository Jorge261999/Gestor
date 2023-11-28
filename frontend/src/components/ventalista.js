import React, { useState, useEffect } from 'react';

import '../styles/ventalista.css';

const VentaLista = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevoVenta, setNuevoVenta] = useState({
    vehiculo: '',
    cliente: '',
    concesionario: '',
    precio: '',
  });
  const [ventaModificar, setVentaModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:9000/api/ventas')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setVentas(data);
      })
      .catch(error => console.error('Error fetching ventas:', error));
  }, [ventaModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVenta((prevVentas) => ({
      ...prevVentas,
      [name]: value,
    }));
  };

  const handleEliminarVenta = async (_id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/ventas/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVentas((prevVentas) => prevVentas.filter(venta => venta._id !== _id));
      } else {
        console.error('Error al eliminar venta:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar venta:', error);
    }
  };

  const handleAgregarVenta = () => {
    setMostrarFormulario(true);
    setVentaModificar(null);
  };

  const handleSeleccionarModificar = (_id) => {
    const ventaSeleccionado = ventas.find(venta => venta._id === _id);

    if (ventaSeleccionado) {
      setVentaModificar(ventaSeleccionado);
      setNuevoVenta({
        vehiculo: ventaSeleccionado.vehiculo,
        cliente: ventaSeleccionado.cliente,
        concesionario: ventaSeleccionado.concesionario,
        precio: ventaSeleccionado.precio,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Venta no encontrado para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setVentaModificar(null);
    setNuevoVenta({
      vehiculo: '',
      cliente: '',
      concesionario: '',
      precio: '',
    });
  };

  const verificarExistencia = async (tipo, valor) => {
    try {
      const response = await fetch(`http://localhost:9000/api/${tipo}/${valor}`);
  
      if (!response.ok) {
        console.error(`Error al verificar la existencia de ${tipo}: ${response.statusText}`);
        alert(`Error al verificar la existencia de ${tipo}`);
        return false;
      }
  
      const data = await response.json();
  
      if (data && (tipo === 'clientes' ? data.rut === valor : data._id === valor)) {
        console.log(`Verificación exitosa: ${tipo} con ID/RUT ${valor} encontrado en la base de datos`);
        return true;
      } else {
        console.error(`Error: ${tipo} con ID/RUT ${valor} no encontrado en la base de datos`);
        alert(`${tipo} con ID/RUT ${valor} no encontrado en la base de datos`);
        return false;
      }
    } catch (error) {
      console.error(`Error al verificar la existencia de ${tipo}:`, error);
      alert(`Error al verificar la existencia de ${tipo}`);
      return false;
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  

  const handleSubmitFormulario = async () => {
    try {
      // Validar campos obligatorios
      if (!nuevoVenta.vehiculo || !nuevoVenta.cliente || !nuevoVenta.concesionario || !nuevoVenta.precio) {
        console.error('Error: Todos los campos son obligatorios');
        setError('Todos los campos son obligatorios');
        return;
      }
  
      // Validar que los vehículo, cliente y concesionario existan
      const vehiculoExistente = await verificarExistencia("vehiculos", nuevoVenta.vehiculo);
      const clienteExistente = await verificarExistencia("clientes", nuevoVenta.cliente);
      const concesionarioExistente = await verificarExistencia("concesionarios", nuevoVenta.concesionario);
  
      // Mostrar resultados de la verificación en la consola
      console.log('Verificación de vehículo:', vehiculoExistente);
      console.log('Verificación de cliente:', clienteExistente);
      console.log('Verificación de concesionario:', concesionarioExistente);
  
      // Si alguno no existe, mostrar mensaje de error
      if (!vehiculoExistente || !clienteExistente || !concesionarioExistente) {
        console.error('Error: Al menos uno de los elementos referenciados no existe en la base de datos');
        setError('Al menos uno de los elementos referenciados no existe en la base de datos');
        return;
      }
  
      // Resto del código después de la verificación
      // Limpiar el estado de error si todo está bien
      setError(null);
  
      let response;
  
      if (ventaModificar) {
        response = await fetch(`http://localhost:9000/api/ventas/${ventaModificar._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVenta),
        });
      } else {
        response = await fetch('http://localhost:9000/api/ventas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVenta),
        });
      }
  
      if (response.ok) {
        const nuevoVentaAgregado = await response.json();
        setVentas((prevVentas) => {
          if (ventaModificar) {
            return prevVentas.map(venta =>
              venta._id === ventaModificar._id ? nuevoVentaAgregado : venta
            );
          } else {
            return [...prevVentas, nuevoVentaAgregado];
          }
        });
        handleOcultarFormulario();
      } else {
        console.error('Error al procesar el formulario:', response.statusText);
        setError('Error al procesar el formulario. Consulta la consola para obtener más detalles.');
      }
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      setError('Error al procesar el formulario. Consulta la consola para obtener más detalles.');
    }
  };
  
  
  
  
  

  return (
    <div className="venta-lista">
      <div className="cabecera">
        <h1>Lista de Ventas</h1>
        <button className="btn-agregar" onClick={handleAgregarVenta}>Agregar Venta</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="vehiculo">Vehiculo:</label>
          <input type="text" id="vehiculo" name="vehiculo" value={nuevoVenta.vehiculo} onChange={handleChange} />

          <label htmlFor="cliente">Cliente:</label>
          <input type="text" id="cliente" name="cliente" value={nuevoVenta.cliente} onChange={handleChange} />

          <label htmlFor="concesionario">Concesionario:</label>
          <input type="text" id="concesionario" name="concesionario" value={nuevoVenta.concesionario} onChange={handleChange} />

          <label htmlFor="precio">Precio:</label>
          <input type="text" id="precio" name="precio" value={nuevoVenta.precio} onChange={handleChange} />

          <button type="button" onClick={handleSubmitFormulario}>
            {ventaModificar ? 'Modificar Venta' : 'Agregar Venta'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}

      <ul>
      {ventas.map((venta) => (
    <li key={venta._id}>
      <strong>ID:</strong> {venta._id}, <strong>Vehiculo ID:</strong> {venta.vehiculo}, <strong>Rut Cliente:</strong> {venta.cliente}, <strong>Concesionario ID:</strong> {venta.concesionario}, <strong>Precio:</strong> {venta.precio},{' '}
      <button className="btn-eliminar" onClick={() => handleEliminarVenta(venta._id)}>Eliminar</button>
      <button className="btn-modificar" onClick={() => handleSeleccionarModificar(venta._id)}>Modificar</button>
    </li>
  ))}

      </ul>
    </div>
  );
};

export default VentaLista;
