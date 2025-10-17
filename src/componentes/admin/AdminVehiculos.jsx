import React, { useState } from "react";
import { API_URL } from "../../config";
import "./AdminVehiculos.css";

const AdminVehiculos = () => {
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    placa: "",
    anio: "",
    tipo: "",
    capacidad: "",
    observaciones: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);        // Vista previa antes de subir
  const [fotoSubida, setFotoSubida] = useState(null);  // Imagen devuelta por el servidor
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Actualiza campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  // Maneja cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVehiculo({ ...vehiculo, foto: file });
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubiendo(true);
    setMensaje("");
    setFotoSubida(null);

    const formData = new FormData();
    for (const key in vehiculo) {
      if (vehiculo[key] !== null) formData.append(key, vehiculo[key]);
    }

    try {
      const response = await fetch(`${API_URL}/vehiculos/agregar/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`✅ Vehículo agregado correctamente (ID: ${data.id})`);

        // Mostrar imagen subida desde backend (Cloudinary)
        if (data.foto_url) setFotoSubida(data.foto_url);

        // Limpiar formulario
        setVehiculo({
          marca: "",
          modelo: "",
          placa: "",
          anio: "",
          tipo: "",
          capacidad: "",
          observaciones: "",
          foto: null,
        });
        setPreview(null);
      } else {
        setMensaje("❌ Error al guardar el vehículo");
      }
    } catch (error) {
      setMensaje("⚠️ Error de conexión con el servidor");
      console.error("Error:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración de Vehículos</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="marca" placeholder="Marca" value={vehiculo.marca} onChange={handleChange} required />
        <input name="modelo" placeholder="Modelo" value={vehiculo.modelo} onChange={handleChange} required />
        <input name="placa" placeholder="Placa" value={vehiculo.placa} onChange={handleChange} required />
        <input name="anio" type="number" placeholder="Año" value={vehiculo.anio} onChange={handleChange} required />
        <input name="tipo" placeholder="Tipo" value={vehiculo.tipo} onChange={handleChange} required />
        <input name="capacidad" placeholder="Capacidad" value={vehiculo.capacidad} onChange={handleChange} required />
        <textarea
          name="observaciones"
          placeholder="Observaciones"
          value={vehiculo.observaciones}
          onChange={handleChange}
        ></textarea>

        <label className="file-label">
          📸 Subir foto del vehículo
          <input type="file" name="foto" onChange={handleFileChange} accept="image/*" />
        </label>

        {preview && (
          <div className="preview-container">
            <p>Vista previa (antes de subir):</p>
            <img src={preview} alt="Vista previa del vehículo" className="preview-img" />
          </div>
        )}

        {fotoSubida && (
          <div className="preview-container">
            <p>Imagen subida al servidor:</p>
            <img src={fotoSubida} alt="Vehículo guardado" className="preview-img" />
          </div>
        )}

        <button type="submit" disabled={subiendo}>
          {subiendo ? "Guardando..." : "Guardar vehículo"}
        </button>

        {mensaje && <p className="feedback">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AdminVehiculos;
