import React, { useState, useEffect } from 'react';

import '../styles/transaccionlista.css';

const TransaccionLista = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [nuevoTransaccion, setNuevoTransaccion] = useState({
    venta: '',
    metodo: '',
    estado: '',
  });
  const [transaccionModificar, setTransaccionModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para verificar la existencia de un elemento en la base de datos
  const verificarExistencia = async (tipo, valor) => {
    try {
      const response = await fetch(`http://localhost:9000/api/${tipo}/${valor}`);
  
      if (!response.ok) {
        console.error(`Error al verificar la existencia de ${tipo}: ${response.statusText}`);
        alert(`Error al verificar la existencia de ${tipo}`);
        return false;
      }
  
      const data = await response.json();
  
      if (data && data._id === valor) {
        console.log(`Verificación exitosa: ${tipo} con venta ID ${valor} encontrado en la base de datos`);
        return true;
      } else {
        console.error(`Error: ${tipo} con venta ID ${valor} no encontrado en la base de datos`);
        alert(`${tipo} con venta ID ${valor} no encontrado en la base de datos`);
        return false;
      }
    } catch (error) {
      console.error(`Error al verificar la existencia de ${tipo}:`, error);
      alert(`Error al verificar la existencia de ${tipo}`);
      return false;
    }
  };
  
  
  

  useEffect(() => {
    fetch('http://localhost:9000/api/transacciones')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setTransacciones(data);
      })
      .catch(error => console.error('Error fetching transacciones:', error));
  }, [transaccionModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoTransaccion((prevTransaccion) => ({
      ...prevTransaccion,
      [name]: value,
    }));
  };

  const handleSubmitFormulario = async () => {
    try {
      // Validar que no haya campos vacíos
      if (!nuevoTransaccion.venta || !nuevoTransaccion.metodo || !nuevoTransaccion.estado) {
        alert('Por favor, completa todos los campos');
        return;
      }
  
      // Validar que la venta exista en la base de datos
      const ventaExistente = await verificarExistencia("ventas", nuevoTransaccion.venta);
      if (!ventaExistente) {
        alert('La venta no existe en la base de datos');
        return;
      }
  
      // Resto del código para enviar datos al servidor
      const response = await fetch('http://localhost:9000/api/transacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoTransaccion),
      });
  
      if (response.ok) {
        const data = await response.json();
        setTransacciones((prevTransacciones) => [...prevTransacciones, data]);
        alert('Transacción agregada exitosamente');
        setMostrarFormulario(false);
        setNuevoTransaccion({
          venta: '',
          metodo: '',
          estado: '',
        });
      } else {
        console.error('Error al agregar transacción:', response.statusText);
        alert('Error al agregar transacción');
      }
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      alert('Error al procesar el formulario');
    }
  };
  
  

  const handleEliminarTransaccion = async (_id) => {
    try {
      const response = await fetch(`http://localhost:9000/api/transacciones/${_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransacciones((prevTransacciones) => prevTransacciones.filter(transaccion => transaccion._id !== _id));
      } else {
        console.error('Error al eliminar transacción:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
    }
  };

  const handleAgregarTransaccion = () => {
    setMostrarFormulario(true);
    setTransaccionModificar(null);
  };

  const handleSeleccionarModificar = (_id) => {
    const transaccionSeleccionado = transacciones.find(transaccion => transaccion._id === _id);

    if (transaccionSeleccionado) {
      setTransaccionModificar(transaccionSeleccionado);
      setNuevoTransaccion({
        venta: transaccionSeleccionado.venta,
        metodo: transaccionSeleccionado.metodo,
        estado: transaccionSeleccionado.estado,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Transacción no encontrada para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setTransaccionModificar(null);
    setNuevoTransaccion({
      venta: '',
      metodo: '',
      estado: '',
    });
  };

  return (
    <div className="transaccion-lista">
      <div className="cabecera">
        <h1>Lista de Transacciones</h1>
        <button className="btn-agregar" onClick={handleAgregarTransaccion}>Agregar Transacción</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="venta">Venta:</label>
          <input type="text" id="venta" name="venta" value={nuevoTransaccion.venta} onChange={handleChange} />

          <label htmlFor="metodo">Método:</label>
          <input type="text" id="metodo" name="metodo" value={nuevoTransaccion.metodo} onChange={handleChange} />

          <label htmlFor="estado">Estado:</label>
          <input type="text" id="estado" name="estado" value={nuevoTransaccion.estado} onChange={handleChange} />

          <button type="button" onClick={handleSubmitFormulario}>
            {transaccionModificar ? 'Modificar Transacción' : 'Agregar Transacción'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {transacciones.map((transaccion) => (
          <li key={transaccion._id}>
            <strong>Venta:</strong> {transaccion.venta}, <strong>Método:</strong> {transaccion.metodo},{' '}
            <strong>Estado:</strong> {transaccion.estado}
            <button className="btn-eliminar" onClick={() => handleEliminarTransaccion(transaccion._id)}>Eliminar</button>
            <button className="btn-modificar" onClick={() => handleSeleccionarModificar(transaccion._id)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransaccionLista;
