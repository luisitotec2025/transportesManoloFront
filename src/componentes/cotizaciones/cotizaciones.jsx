// cotizaciones.jsx - RESPONSIVE
import React, { useState } from 'react';
import { API_URL } from '../../config';

const Cotizaciones = ({ vehiculo, onCerrar }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('');

    if (!nombre || !telefono || !fecha) {
      setMensaje('⚠️ Todos los campos son obligatorios');
      setEnviando(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`${API_URL}/cotizaciones/agregar/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehiculo_id: vehiculo.id,
          nombre,
          telefono,
          fecha,
          comentario
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok) {
        setMensaje('✅ Cotización enviada correctamente');
        setNombre('');
        setTelefono('');
        setFecha('');
        setComentario('');
        setTimeout(() => onCerrar(), 2000);
      } else {
        setMensaje('❌ Error al enviar la cotización');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setMensaje('⚠️ Timeout - El servidor tardó demasiado');
      } else {
        setMensaje('⚠️ Error de conexión con el servidor');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Cotización: {vehiculo.marca} {vehiculo.modelo}
          </h2>
          <button
            onClick={onCerrar}
            className="text-2xl sm:text-3xl text-gray-500 hover:text-gray-700 font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mi nombre:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono:
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              placeholder="Tu teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de servicio:
            </label>
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentario:
            </label>
            <textarea
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
              rows="4"
              placeholder="Agrega detalles adicionales..."
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-base"
          >
            {enviando ? 'Enviando...' : 'Enviar Cotización'}
          </button>
        </form>

        {/* Mensaje */}
        {mensaje && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <p className={`p-3 rounded-lg text-center ${
              mensaje.includes('✅') ? 'bg-green-100 text-green-800' :
              mensaje.includes('❌') ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {mensaje}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cotizaciones;