import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import ClienteLista from './components/clientelista';

function App() {
  return (
    <div className="App">
      <nav className="menu">
        <div className="menu-header">Menú</div> {/* Agrega la cabecera aquí */}
        <ul>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/vehiculos">Vehículos</Link>
          </li>
          <li>
            <Link to="/ventas">Ventas</Link>
          </li>
          <li>
            <Link to="/concesionarios">Concesionarios</Link>
          </li>
          <li>
            <Link to="/empleados">Empleados</Link>
          </li>
          <li>
            <Link to="/transacciones">Transacciones</Link>
          </li>
        </ul>
      </nav>

      <main className="content">
        {/*agregar contenido */}
        <Routes>
          <Route path="/clientes" element={<ClienteLista />} />
          {/* Agrega rutas y componentes para las otras vistas */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
