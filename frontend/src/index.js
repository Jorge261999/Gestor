import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClienteLista from './components/clientelista';
import VehiculoLista from './components/vehiculolista';
import ConcesionarioLista from './components/concesionariolista';
import VentaLista from './components/ventalista';
import EmpleadoLista from './components/empleadolista';
import TransaccionLista from './components/transaccionlista';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Helmet} from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Helmet>
        <title>Gestor</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clientes" element={<ClienteLista />} />
        <Route path="/vehiculos" element={<VehiculoLista />} />
        <Route path="/concesionarios" element={<ConcesionarioLista />} />
        <Route path="/ventas" element={<VentaLista />} />
        <Route path="/empleados" element={<EmpleadoLista />} />
        <Route path="/transacciones" element={<TransaccionLista />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
