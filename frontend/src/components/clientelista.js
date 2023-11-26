import React, { useState, useEffect } from 'react';

import '../styles/clientelista.css';

const ClienteLista = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    rut: '',
    nombre: '',
    telefono: '',
  });
  const [clienteModificar, setClienteModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:9000/api/clientes')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setClientes(data);
      })
      .catch(error => console.error('Error fetching clientes:', error));
  }, [clienteModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleEliminarCliente = async (rut) => {
    try {
      const response = await fetch(`http://localhost:9000/api/clientes/${rut}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClientes((prevClientes) => prevClientes.filter(cliente => cliente.rut !== rut));
      } else {
        console.error('Error al eliminar cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const handleAgregarCliente = () => {
    setMostrarFormulario(true);
    setClienteModificar(null);
  };



  const handleSeleccionarModificar = (rut) => {
    const clienteSeleccionado = clientes.find(cliente => cliente.rut === rut);

    if (clienteSeleccionado) {
      setClienteModificar(clienteSeleccionado);
      setNuevoCliente({
        rut: clienteSeleccionado.rut,
        nombre: clienteSeleccionado.nombre,
        telefono: clienteSeleccionado.telefono,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Cliente no encontrado para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setClienteModificar(null);
    setNuevoCliente({
      rut: '',
      nombre: '',
      telefono: '',
    });
  };

  const handleSubmitFormulario = async () => {
    try {
      let response;

      if (clienteModificar) {
        response = await fetch(`http://localhost:9000/api/clientes/${clienteModificar.rut}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoCliente),
        });
      } else {
        response = await fetch('http://localhost:9000/api/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoCliente),
        });
      }

      if (response.ok) {
        const nuevoClienteAgregado = await response.json();
        setClientes((prevClientes) => {
          if (clienteModificar) {
            return prevClientes.map(cliente =>
              cliente.rut === clienteModificar.rut ? nuevoClienteAgregado : cliente
            );
          } else {
            return [...prevClientes, nuevoClienteAgregado];
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
    <div className="cliente-lista">
      <div className="cabecera">
        <h1>Lista de Clientes</h1>
        <button className="btn-agregar" onClick={handleAgregarCliente}>Agregar Cliente</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="rut">RUT:</label>
          <input type="text" id="rut" name="rut" value={nuevoCliente.rut} onChange={handleChange} />

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={nuevoCliente.nombre} onChange={handleChange} />

          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" value={nuevoCliente.telefono} onChange={handleChange} />

          <button type="button" onClick={handleSubmitFormulario}>
            {clienteModificar ? 'Modificar Cliente' : 'Agregar Cliente'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id || cliente.rut}>
            <strong>RUT:</strong> {cliente.rut}, <strong>Nombre:</strong> {cliente.nombre},{' '}
            <strong>Teléfono:</strong> {cliente.telefono}
            <button className="btn-eliminar" onClick={() => handleEliminarCliente(cliente.rut)}>Eliminar</button>
            <button className="btn-modificar" onClick={() => handleSeleccionarModificar(cliente.rut)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteLista;
