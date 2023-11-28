import React, { useState, useEffect } from 'react';

import '../styles/empleadolista.css';

const EmpleadoLista = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    rut: '',
    nombre: '',
    telefono: '',
    cargo: '',
  });
  const [empleadoModificar, setEmpleadoModificar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:9000/api/empleados')
      .then(response => response.json())
      .then(data => {
        console.log('Datos del servidor:', data);
        setEmpleados(data);
      })
      .catch(error => console.error('Error fetching empleados:', error));
  }, [empleadoModificar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      [name]: value,
    }));
  };

  const handleEliminarEmpleado = async (rut) => {
    try {
      const response = await fetch(`http://localhost:9000/api/empleados/${rut}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmpleados((prevEmpleados) => prevEmpleados.filter(empleado => empleado.rut !== rut));
      } else {
        console.error('Error al eliminar empleado:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleAgregarEmpleado = () => {
    setMostrarFormulario(true);
    setEmpleadoModificar(null);
  };



  const handleSeleccionarModificar = (rut) => {
    const empleadoSeleccionado = empleados.find(empleado => empleado.rut === rut);

    if (empleadoSeleccionado) {
      setEmpleadoModificar(empleadoSeleccionado);
      setNuevoEmpleado({
        rut: empleadoSeleccionado.rut,
        nombre: empleadoSeleccionado.nombre,
        telefono: empleadoSeleccionado.telefono,
        cargo: empleadoSeleccionado.cargo,
      });
      setMostrarFormulario(true);
    } else {
      console.error('Empleado no encontrado para modificar');
    }
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    setEmpleadoModificar(null);
    setNuevoEmpleado({
      rut: '',
      nombre: '',
      telefono: '',
      cargo: '',
    });
  };

  const handleSubmitFormulario = async () => {
    // Validar si los campos obligatorios están vacíos
    if (!nuevoEmpleado.rut || !nuevoEmpleado.nombre || !nuevoEmpleado.telefono || !nuevoEmpleado.cargo) {
      console.error('Error: Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios');
      return;
    }
  
    // Validar el formato del RUT y el teléfono
    const rutRegex = /^\d+$/; // Expresión regular para números enteros
    const telefonoRegex = /^\d+$/; // Expresión regular para números enteros
  
    if (!rutRegex.test(nuevoEmpleado.rut) || typeof nuevoEmpleado.nombre !== 'string' || !telefonoRegex.test(nuevoEmpleado.telefono)) {
      console.error('Error: Datos incorrectos o en formato incorrecto');
      alert('Datos incorrectos o en formato incorrecto');
      return;
    }
  
    try {
      let response;
  
      if (empleadoModificar) {
        response = await fetch(`http://localhost:9000/api/empleados/${empleadoModificar.rut}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoEmpleado),
        });
      } else {
        response = await fetch('http://localhost:9000/api/empleados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoEmpleado),
        });
      }
  
      if (response.ok) {
        const nuevoEmpleadoAgregado = await response.json();
        setEmpleados((prevEmpleados) => {
          if (empleadoModificar) {
            return prevEmpleados.map(empleado =>
              empleado.rut === empleadoModificar.rut ? nuevoEmpleadoAgregado : empleado
            );
          } else {
            return [...prevEmpleados, nuevoEmpleadoAgregado];
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
    <div className="empleado-lista">
      <div className="cabecera">
        <h1>Lista de Empleados</h1>
        <button className="btn-agregar" onClick={handleAgregarEmpleado}>Agregar Empleado</button>
      </div>

      {mostrarFormulario && (
        <form>
          <label htmlFor="rut">RUT:</label>
          <input type="text" id="rut" name="rut" value={nuevoEmpleado.rut} onChange={handleChange} />

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={nuevoEmpleado.nombre} onChange={handleChange} />

          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" value={nuevoEmpleado.telefono} onChange={handleChange} />

          <label htmlFor="cargo">Cargo:</label>
          <input type="text" id="cargo" name="cargo" value={nuevoEmpleado.cargo} onChange={handleChange} />

          <button type="button" onClick={handleSubmitFormulario}>
            {empleadoModificar ? 'Modificar Empleado' : 'Agregar Empleado'}
          </button>
          <button type="button" onClick={handleOcultarFormulario}>
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {empleados.map((empleado) => (
          <li key={empleado._id || empleado.rut}>
            <strong>RUT:</strong> {empleado.rut}, <strong>Nombre:</strong> {empleado.nombre},{' '}
            <strong>Teléfono:</strong> {empleado.telefono}, <strong>Cargo:</strong> {empleado.cargo}
            <button className="btn-eliminar" onClick={() => handleEliminarEmpleado(empleado.rut)}>Eliminar</button>
            <button className="btn-modificar" onClick={() => handleSeleccionarModificar(empleado.rut)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpleadoLista;
