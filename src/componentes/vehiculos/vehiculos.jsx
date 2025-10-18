// vehiculos.jsx - RESPONSIVE
import React, { useEffect, useState } from 'react';
import Cotizaciones from '../cotizaciones/cotizaciones';
import { API_URL } from '../../config';

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

  const marcasUnicas = [...new Set(vehiculos.map(v => v.marca))].sort();
  const capacidadesUnicas = [...new Set(vehiculos.map(v => v.capacidad))].sort();

  const vehiculosFiltrados = vehiculos.filter(v => {
    const coincideMarca = filtroMarca === 'todos' || v.marca === filtroMarca;
    const coincideCapacidad = filtroCapacidad === 'todos' || v.capacidad === filtroCapacidad;
    return coincideMarca && coincideCapacidad;
  });

  if (cargando) return <div className="flex justify-center items-center h-screen"><p className="text-lg">Cargando vehículos...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 text-lg">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="filtro-item">
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por marca:
            </label>
            <select
              id="marca"
              value={filtroMarca}
              onChange={(e) => setFiltroMarca(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            >
              <option value="todos">Todas las marcas</option>
              {marcasUnicas.map(marca => (
                <option key={marca} value={marca}>{marca}</option>
              ))}
            </select>
          </div>

          <div className="filtro-item">
            <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por capacidad:
            </label>
            <select
              id="capacidad"
              value={filtroCapacidad}
              onChange={(e) => setFiltroCapacidad(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            >
              <option value="todos">Todas las capacidades</option>
              {capacidadesUnicas.map(cap => (
                <option key={cap} value={cap}>{cap}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de vehículos */}
        {vehiculosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay vehículos que coincidan con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosFiltrados.map((vehiculo) => (
              <div 
                key={vehiculo.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Imagen */}
                <div className="h-48 sm:h-56 overflow-hidden bg-gray-200">
                  <img
                    src={vehiculo.fotoURL}
                    alt={vehiculo.modelo}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {vehiculo.marca} {vehiculo.modelo}
                  </h3>
                  
                  <div className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
                    <p><strong>Año:</strong> {vehiculo.anio}</p>
                    <p><strong>Placa:</strong> {vehiculo.placa}</p>
                    <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
                    <p><strong>Capacidad:</strong> {vehiculo.capacidad}</p>
                    <p><strong>Color:</strong> {vehiculo.color || 'N/A'}</p>
                  </div>

                  {/* Botones */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => setVehiculoSeleccionado(vehiculo)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      Cotizar
                    </button>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-3 sm:py-3 sm:px-4 rounded-lg transition-colors text-sm sm:text-base">
                      Contratar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
