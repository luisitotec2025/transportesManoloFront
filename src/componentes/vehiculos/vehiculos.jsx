import React, { useEffect, useState } from 'react';
import Cotizaciones from '../cotizaciones/cotizaciones';
import { API_URL } from '../../config';
import './vehiculos.css';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [filtroMarca, setFiltroMarca] = useState('todos');
  const [filtroCapacidad, setFiltroCapacidad] = useState('todos');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(`${API_URL}/vehiculos/`);
        if (!response.ok) throw new Error('Error al cargar vehículos');

        const data = await response.json();

        // Como las fotos ya están en Cloudinary, usamos directamente vehiculo.foto
        const dataConURL = data.map(v => ({
          ...v,
          fotoURL: v.foto || '/sin-foto.png'
        }));

        setVehiculos(dataConURL);
      } catch (err) {
        console.error(err);
        setError('⚠️ No se pudieron cargar los vehículos. Intenta más tarde.');
      } finally {
        setCargando(false);
      }
    };

    fetchVehiculos();
  }, []);

  // Listas únicas para filtros
  const marcasUnicas = [...new Set(vehiculos.map(v => v.marca))].sort();
  const capacidadesUnicas = [...new Set(vehiculos.map(v => v.capacidad))].sort();

  // Aplicar filtros
  const vehiculosFiltrados = vehiculos.filter(v => {
    const coincideMarca = filtroMarca === 'todos' || v.marca === filtroMarca;
    const coincideCapacidad = filtroCapacidad === 'todos' || v.capacidad === filtroCapacidad;
    return coincideMarca && coincideCapacidad;
  });

  if (cargando) return <p>Cargando vehículos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vehiculos-container">
      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtro-item">
          <label htmlFor="marca">Filtrar por marca:</label>
          <select
            id="marca"
            value={filtroMarca}
            onChange={(e) => setFiltroMarca(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todas las marcas</option>
            {marcasUnicas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <label htmlFor="capacidad">Filtrar por capacidad:</label>
          <select
            id="capacidad"
            value={filtroCapacidad}
            onChange={(e) => setFiltroCapacidad(e.target.value)}
            className="filtro-select"
          >
            <option value="todos">Todas las capacidades</option>
            {capacidadesUnicas.map(cap => (
              <option key={cap} value={cap}>{cap}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de vehículos */}
      {vehiculosFiltrados.length === 0 ? (
        <p>No hay vehículos que coincidan con los filtros seleccionados.</p>
      ) : (
        vehiculosFiltrados.map((vehiculo) => (
          <div className="vehiculo-card" key={vehiculo.id}>
            <img
              src={vehiculo.fotoURL}
              alt={vehiculo.modelo}
              className="vehiculo-imagen"
            />
            <h3>{vehiculo.marca} {vehiculo.modelo}</h3>
            <p>Año: {vehiculo.anio}</p>
            <p>Placa: {vehiculo.placa}</p>
            <p>Tipo: {vehiculo.tipo}</p>
            <p>Capacidad: {vehiculo.capacidad}</p>
            <p>Color: {vehiculo.color || 'N/A'}</p>

            <div className="vehiculo-botones">
              <button
                className="btn-cotizar"
                onClick={() => setVehiculoSeleccionado(vehiculo)}
              >
                Cotizar
              </button>
              <button className="btn-contratar">Contratar</button>
            </div>
          </div>
        ))
      )}

      {/* Modal de cotización */}
      {vehiculoSeleccionado && (
        <Cotizaciones
          vehiculo={vehiculoSeleccionado}
          onCerrar={() => setVehiculoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default Vehiculos;
