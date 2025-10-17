import React, { useState } from 'react';
import { API_URL } from '../../config';
import './cotizaciones.css';

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
            const response = await fetch(`${API_URL}/cotizaciones/agregar/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vehiculo_id: vehiculo.id,
                    nombre,
                    telefono,
                    fecha,
                    comentario
                })
            });

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
            setMensaje('⚠️ Error de conexión con el servidor');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="cotizacion-modal">
            <div className="cotizacion-content">
                <button className="cerrar-btn" onClick={onCerrar}>×</button>
                <h2>Cotización: {vehiculo.marca} {vehiculo.modelo}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Mi nombre:</label>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />

                    <label>Teléfono:</label>
                    <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} required />

                    <label>Fecha de servicio:</label>
                    <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />

                    <label>Comentario:</label>
                    <textarea value={comentario} onChange={e => setComentario(e.target.value)} />

                    <button type="submit" disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar Cotización'}
                    </button>
                </form>
                {mensaje && <p className="mensaje">{mensaje}</p>}
            </div>
        </div>
    );
};

export default Cotizaciones;
